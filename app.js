// État de l'application
let items = [ { desc: '', qty: 1, price: 0 } ];

function init() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('prev-date').textContent = today.toLocaleDateString('fr-FR', options);
    
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
            <div class="flex flex-wrap md:flex-nowrap gap-2 items-center mb-2 bg-blue-50/30 p-2 border border-blue-100">
                <input type="text" placeholder="Désignation du produit ou service" class="flex-grow w-full md:w-auto border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm" value="${item.desc}" oninput="updateItem(${index}, 'desc', this.value)">
                <div class="flex gap-2 w-full md:w-auto">
                    <input type="number" min="1" placeholder="Qté" class="w-16 border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm font-bold" value="${item.qty}" oninput="updateItem(${index}, 'qty', this.value)">
                    <input type="number" min="0" placeholder="Prix Unit. CFA" class="w-28 border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm" value="${item.price}" oninput="updateItem(${index}, 'price', this.value)">
                    <button onclick="removeItem(${index})" class="text-white bg-red-500 hover:bg-red-700 px-3 py-2 text-sm" title="Supprimer">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    });
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

    const applyTva = document.getElementById('apply-tva').checked;
    const tva = applyTva ? subtotal * 0.18 : 0;
    const total = subtotal + tva;

    document.getElementById('prev-subtotal').textContent = subtotal.toLocaleString('fr-FR') + ' CFA';
    const tvaRow = document.getElementById('tva-row');
    if(applyTva) { tvaRow.classList.remove('hidden'); document.getElementById('prev-tva').textContent = tva.toLocaleString('fr-FR') + ' CFA'; }
    else { tvaRow.classList.add('hidden'); }
    document.getElementById('prev-total').textContent = total.toLocaleString('fr-FR') + ' CFA';
}

function changeTemplate() {
    const selector = document.getElementById('template-selector');
    const preview = document.getElementById('invoice-preview');
    preview.classList.remove('template-classique', 'template-moderne', 'template-minimal');
    preview.classList.add(selector.value);
}

function downloadPDF() {
    const element = document.getElementById('invoice-preview');
    
    // On ajoute une classe pour forcer le format "Document" avant la capture
    element.classList.add('pdf-export-mode');

    const opt = { 
        margin: 0, // Les marges sont gérées par le padding CSS pour plus de précision
        filename: 'FacturePro_Export.pdf', 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { 
            scale: 2, // Qualité équilibrée pour mobile
            useCORS: true, 
            width: 800, // On capture exactement 800px de largeur
            windowWidth: 800
        }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    
    window.scrollTo(0,0);
    
    html2pdf().set(opt).from(element).save().then(() => {
        // On retire la classe pour revenir à l'affichage mobile normal
        element.classList.remove('pdf-export-mode');
    });
}

window.onload = init;