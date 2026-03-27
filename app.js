// État de l'application
let items = [ { desc: '', qty: 1, price: 0 } ];

// Taxes du Burkina Faso
const burkinaTaxes = [
    { name: 'TVA (18%)', rate: 18 },
    { name: 'TVA (5.5%)', rate: 5.5 },
    { name: 'Taxe d\'habitation', rate: 10 },
    { name: 'Taxe professionnelle', rate: 2 },
    { name: 'Sans taxe (personnalisée)', rate: 0, custom: true }
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
        };
        reader.readAsDataURL(file);
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
                    <button onclick="removeItem(${index})" class="text-white bg-red-500 hover:bg-red-700 px-3 py-2 text-sm" title="Supprimer">
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
    
    let tax;
    if (presetIndex !== 'custom') {
        tax = { ...burkinaTaxes[presetIndex], applied: true };
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

// Convertir les nombres en lettres (français)
function numberToWords(num) {
    const ones = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const scales = ['', 'mille', 'million', 'milliard'];

    if (num === 0) return 'zéro';
    if (num < 0) return 'moins ' + numberToWords(-num);

    let words = '';
    let scaleIndex = 0;

    while (num > 0) {
        if (num % 1000 !== 0) {
            words = convertBelow1000(num % 1000, ones, teens, tens) + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + (words ? ' ' + words : '');
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
    }

    return words.trim();
}

function convertBelow1000(num, ones, teens, tens) {
    let result = '';

    const hundreds = Math.floor(num / 100);
    if (hundreds > 0) {
        result += ones[hundreds] + ' cent';
        if (hundreds > 1 && num % 100 === 0) result += 's';
        num %= 100;
        if (num > 0) result += ' ';
    }

    if (num >= 20) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        result += tens[ten];
        if (one > 0) result += (ten === 8 ? '-' : '-') + ones[one];
    } else if (num >= 10) {
        result += teens[num - 10];
    } else if (num > 0) {
        result += ones[num];
    }

    return result.trim();
}

function updatePreview() {
    // Vos Infos
    document.getElementById('prev-biller-name').textContent = document.getElementById('biller-name').value || 'NOM DE VOTRE STRUCTURE';
    document.getElementById('prev-biller-phone').textContent = document.getElementById('biller-phone').value || 'Téléphone non spécifié';
    document.getElementById('prev-biller-rccm').textContent = document.getElementById('biller-rccm').value || '-';
    document.getElementById('prev-biller-ifu').textContent = document.getElementById('biller-ifu').value || '-';
    
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
        const totalLine = qty * price;
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
        taxesAmount += subtotal * (tax.rate / 100);
    });
    const total = subtotal + taxesAmount;

    document.getElementById('prev-subtotal').textContent = subtotal.toLocaleString('fr-FR') + ' CFA';
    
    // Afficher les taxes appliquées
    const taxesContainer = document.getElementById('prev-taxes-container');
    taxesContainer.innerHTML = '';
    appliedTaxes.forEach(tax => {
        const taxAmount = subtotal * (tax.rate / 100);
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

function downloadPDF() {
    const element = document.getElementById('invoice-preview');
    const loader = document.getElementById('pdf-loader');
    
    element.classList.add('pdf-export-mode');
    loader.classList.remove('hidden');

    setTimeout(() => {
        html2canvas(element, {
            scale: 10, // Qualité ultra-haute pour texte net et lisible
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            imageTimeout: 15000,
            windowHeight: element.scrollHeight,
            windowWidth: element.scrollWidth,
            letterRendering: true, // Améliore le rendu du texte
            removeContainer: false
        }).then(canvas => {
            const { jsPDF } = window.jspdf;
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pageHeight = 295;
            
            const pdf = new jsPDF('p', 'mm', 'a4');
            let heightLeft = imgHeight;
            let position = 0;
            
            // Utiliser PNG pour meilleure qualité (par défaut JPEG)
            const imgData = canvas.toDataURL('image/png', 1.0); 
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save('FacturePro_Export.pdf');
            element.classList.remove('pdf-export-mode');
            loader.classList.add('hidden');
        }).catch(err => {
            console.error('Erreur:', err);
            element.classList.remove('pdf-export-mode');
            loader.classList.add('hidden');
            alert('Erreur PDF: ' + err.message);
        });
    }, 500); // Délai pour que le DOM se mette à jour
}

window.onload = init;