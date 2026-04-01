// État de l'application
let items = [ { desc: '', qty: 1, price: 0 } ];

// Taxes du Burkina Faso
const burkinaTaxes = [
    { name: 'TVA (18%)', rate: 18 },
    { name: 'TVA (5.5%)', rate: 5.5 },
    { name: 'Taxe d\'habitation', rate: 10 },
    { name: 'Taxe professionnelle', rate: 2 },
    { name: 'Taxe personnalisée', rate: 0, custom: true }
];

// Taxes appliquées
let appliedTaxes = [];

function formatDateToFrench(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

function updateInvoiceDate() {
    const dateInput = document.getElementById('invoice-date');
    const prevDate = document.getElementById('prev-date');
    if (dateInput.value) {
        prevDate.textContent = formatDateToFrench(dateInput.value);
    }
}

function init() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('invoice-date').value = `${year}-${month}-${day}`;
    
    loadBillerInfo();
    updateInvoiceDate();
    populateTaxDropdown();
    renderItems();
    updatePreview();
}

function addItem() {
    items.push({ desc: '', qty: 1, price: 0 });
    renderItems();
    updatePreview();
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
    updatePreview();
}

function updateItem(index, field, value) {
    items[index][field] = value;
    updatePreview();
}

function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoPrev = document.getElementById('prev-logo');
            logoPrev.src = e.target.result;
            document.getElementById('prev-logo-container').classList.remove('hidden');
            saveBillerInfo();
        };
        reader.readAsDataURL(file);
    }
}

function saveBillerInfo() {
    const billerData = {
        name: document.getElementById('biller-name').value,
        rccm: document.getElementById('biller-rccm').value,
        ifu: document.getElementById('biller-ifu').value,
        email: document.getElementById('biller-email').value,
        phone: document.getElementById('biller-phone').value,
        address: document.getElementById('biller-address').value,
        logo: document.getElementById('prev-logo').src
    };
    localStorage.setItem('facturePro_biller', JSON.stringify(billerData));
}

function loadBillerInfo() {
    const saved = localStorage.getItem('facturePro_biller');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('biller-name').value = data.name || '';
        document.getElementById('biller-rccm').value = data.rccm || '';
        document.getElementById('biller-ifu').value = data.ifu || '';
        document.getElementById('biller-email').value = data.email || '';
        document.getElementById('biller-phone').value = data.phone || '';
        document.getElementById('biller-address').value = data.address || '';
        if (data.logo && data.logo.startsWith('data:image')) {
            document.getElementById('prev-logo').src = data.logo;
            document.getElementById('prev-logo-container').classList.remove('hidden');
        }
    }
}

function renderItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    items.forEach((item, index) => {
        container.innerHTML += `
            <div class="bg-blue-50/30 p-3 border border-blue-100">
                <div class="mb-2">
                    <label class="text-xs font-bold text-gray-600 uppercase">Désignation</label>
                    <input type="text" placeholder="Nom du produit ou service" class="w-full border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm mt-1" value="${item.desc}" oninput="updateItem(${index}, 'desc', this.value)">
                </div>
                <div class="flex gap-3 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-600 uppercase">Quantité</label>
                        <input type="number" min="1" class="w-20 border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm font-bold mt-1" value="${item.qty}" oninput="updateItem(${index}, 'qty', this.value)">
                    </div>
                    <div class="flex-grow">
                        <label class="text-xs font-bold text-gray-600 uppercase">Prix Unitaire (CFA)</label>
                        <input type="number" min="0" step="0.01" class="w-full border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm mt-1" value="${item.price}" oninput="updateItem(${index}, 'price', this.value)">
                    </div>
                    <button onclick="removeItem(${index})" class="text-white bg-red-500 hover:bg-red-700 w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg shadow-sm transition-transform active:scale-90" title="Supprimer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

function populateTaxDropdown() {
    const dropdown = document.getElementById('tax-preset-selector');
    dropdown.innerHTML = '';
    burkinaTaxes.forEach((tax, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = tax.name + (tax.custom ? '' : ` - ${tax.rate}%`);
        dropdown.appendChild(option);
    });
}

function addTax() {
    const presetIndex = document.getElementById('tax-preset-selector').value;
    const customName = document.getElementById('custom-tax-name').value;
    const customRate = parseFloat(document.getElementById('custom-tax-rate').value) || 0;
    
    const selectedPreset = burkinaTaxes[presetIndex];
    let tax;
    // On vérifie si le preset sélectionné n'est PAS marqué comme personnalisé
    if (selectedPreset && !selectedPreset.custom) {
        tax = { ...selectedPreset, applied: true };
    } else {
        if (!customName || customRate === 0) {
            alert('Veuillez entrer le nom et le taux de la taxe');
            return;
        }
        tax = { name: customName, rate: customRate, applied: true, custom: true };
    }
    
    // Vérifier si la taxe existe déjà
    const exists = appliedTaxes.some(t => t.name === tax.name);
    if (!exists) {
        appliedTaxes.push(tax);
    }
    
    document.getElementById('custom-tax-name').value = '';
    document.getElementById('custom-tax-rate').value = '';
    renderAppliedTaxes();
    updatePreview();
}

function removeTax(index) {
    appliedTaxes.splice(index, 1);
    renderAppliedTaxes();
    updatePreview();
}

function renderAppliedTaxes() {
    const container = document.getElementById('applied-taxes-container');
    container.innerHTML = '';
    if (appliedTaxes.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">Aucune taxe ajoutée.</p>';
        return;
    }
    
    appliedTaxes.forEach((tax, index) => {
        container.innerHTML += `
            <div class="flex justify-between items-center bg-gray-50 p-2 border border-gray-200 text-sm">
                <span><strong>${tax.name}</strong> - ${tax.rate}%</span>
                <button onclick="removeTax(${index})" class="text-red-600 hover:text-red-800 px-2">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;
    });
}

function updatePreview() {
    saveBillerInfo();
    // Vos Infos
    document.getElementById('prev-biller-name').textContent = document.getElementById('biller-name').value || 'NOM DE VOTRE STRUCTURE';
    document.getElementById('prev-biller-phone').textContent = document.getElementById('biller-phone').value || 'Téléphone non spécifié';
    document.getElementById('prev-biller-email').textContent = document.getElementById('biller-email').value || 'email@exemple.com';
    document.getElementById('prev-biller-address').textContent = document.getElementById('biller-address').value || '-';
    document.getElementById('prev-biller-rccm').textContent = document.getElementById('biller-rccm').value || '-';
    document.getElementById('prev-biller-ifu').textContent = document.getElementById('biller-ifu').value || '-';
    
    // Dates
    const dueDate = document.getElementById('invoice-due-date').value;
    const prevDueDate = document.getElementById('prev-due-date');
    prevDueDate.textContent = dueDate ? formatDateToFrench(dueDate) : 'Non définie';

    // Client
    document.getElementById('prev-client-name').textContent = document.getElementById('client-name').value || 'NOM DU CLIENT';
    document.getElementById('prev-client-phone').textContent = document.getElementById('client-phone').value || '-';
    document.getElementById('prev-client-rccm').textContent = document.getElementById('client-rccm').value || '-';
    document.getElementById('prev-client-ifu').textContent = document.getElementById('client-ifu').value || '-';

    const tbody = document.getElementById('prev-items-body');
    tbody.innerHTML = '';
    let subtotal = 0;

    items.forEach(item => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.qty) || 0;
        const totalLine = Math.round(qty * price * 100) / 100;
        subtotal += totalLine;
        
        tbody.innerHTML += `
            <tr class="border-b border-gray-100">
                <td class="py-3 px-4 text-gray-800">${item.desc || 'Sans description'}</td>
                <td class="py-3 px-4 text-center text-gray-800">${qty}</td>
                <td class="py-3 px-4 text-right text-gray-800">${price.toLocaleString('fr-FR')}</td>
                <td class="py-3 px-4 text-right text-blue-900 font-bold">${totalLine.toLocaleString('fr-FR')}</td>
            </tr>
        `;
    });

    let taxesAmount = 0;
    appliedTaxes.forEach(tax => {
        const taxAmount = Math.round(subtotal * (tax.rate / 100) * 100) / 100;
        taxesAmount += taxAmount;
    });
    const total = Math.round((subtotal + taxesAmount) * 100) / 100;

    document.getElementById('prev-subtotal').textContent = subtotal.toLocaleString('fr-FR') + ' CFA';
    
    // Afficher les taxes appliquées
    const taxesContainer = document.getElementById('prev-taxes-container');
    taxesContainer.innerHTML = '';
    appliedTaxes.forEach(tax => {
        const taxAmount = Math.round(subtotal * (tax.rate / 100) * 100) / 100;
        taxesContainer.innerHTML += `
            <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600 font-medium">${tax.name}</span>
                <span class="font-bold">${taxAmount.toLocaleString('fr-FR')} CFA</span>
            </div>
        `;
    });
    
    document.getElementById('prev-total').textContent = total.toLocaleString('fr-FR') + ' CFA';
    
    // Afficher le montant en lettres
    const totalRounded = Math.round(total);
    const totalWords = numberToWords(totalRounded) + ' francs CFA';
    const totalCapitalized = totalWords.charAt(0).toUpperCase() + totalWords.slice(1);
    document.getElementById('prev-total-words').textContent = totalCapitalized;
}

function changeFont() {
    const selector = document.getElementById('font-selector');
    const preview = document.getElementById('invoice-preview');
    preview.classList.remove('font-sans', 'font-serif', 'font-mono', 'font-modern');
    preview.classList.add(selector.value);
}

function changeColor() {
    const selector = document.getElementById('color-selector');
    const preview = document.getElementById('invoice-preview');
    preview.classList.remove('color-blue', 'color-green', 'color-red', 'color-orange', 'color-purple', 'color-teal');
    preview.classList.add(selector.value);
}

async function downloadPDF() {
    const originalElement = document.getElementById('invoice-preview');
    const loader = document.getElementById('pdf-loader');
    
    loader.classList.remove('hidden');

    // Création d'un clone invisible pour ne pas altérer l'affichage mobile
    const clone = originalElement.cloneNode(true);
    
    // On s'assure que l'ID est conservé ou ciblé correctement pour le CSS
    clone.classList.add('pdf-export-mode');
    
    // Style pour rendre le clone invisible mais capturable
    Object.assign(clone.style, {
        position: 'absolute',
        top: '-9999px',
        left: '0',
        display: 'block', 
        visibility: 'visible',
        boxShadow: 'none',
        border: 'none',
        backgroundColor: '#ffffff'
    });
    
    clone.style.width = '210mm';
    
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            scale: 4, // Qualité ultra-haute pour impression
            useCORS: true,
            allowTaint: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            logging: false,
            windowWidth: 1122 // Force le rendu A4 standard
        });

        const { jsPDF } = window.jspdf;
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const now = new Date();
        const timestamp = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}_${now.getHours()}h${now.getMinutes()}`;
        const clientName = document.getElementById('client-name').value || 'Client';
        
        // Format A4 : Gestion multi-pages standard
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 297;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save(`Facture_${clientName}_${timestamp}.pdf`);

    } catch (err) {
        console.error('Erreur PDF:', err);
        alert('Une erreur est survenue lors de la génération.');
    } finally {
        document.body.removeChild(clone);
        loader.classList.add('hidden');
    }
}

window.onload = init;