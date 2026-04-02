// État de l'application
let items = [{ desc: '', qty: 1, price: 0 }];
let currentLanguage = 'fr';
let currentCurrency = { code: 'XOF', symbol: 'CFA', name: 'Francs CFA', locale: 'fr-FR' };
let currentFont = 'font-sans';
let currentColor = 'color-blue';

const currencies = [
    { code: 'XOF', symbol: 'CFA', name: 'Francs CFA', locale: 'fr-FR' },
    { code: 'EUR', symbol: '€', name: 'Euros', locale: 'fr-FR' },
    { code: 'USD', symbol: '$', name: 'Dollars', locale: 'en-US' },
    { code: 'NGN', symbol: '₦', name: 'Naira', locale: 'en-NG' },
    { code: 'GHS', symbol: 'GH₵', name: 'Cedis', locale: 'en-GH' },
    { code: 'XAF', symbol: 'FCFA', name: 'Francs CFA (BEAC)', locale: 'fr-CM' },
    { code: 'CNY', symbol: '¥', name: 'Yuan', locale: 'zh-CN' },
    { code: 'ZAR', symbol: 'R', name: 'Rand', locale: 'en-ZA' },
    { code: 'MAD', symbol: 'DH', name: 'Dirham Marocain', locale: 'ar-MA' },
    { code: 'GBP', symbol: '£', name: 'Pounds', locale: 'en-GB' },
    { code: 'CAD', symbol: 'CA$', name: 'Dollars Canadiens', locale: 'en-CA' }
];

const translations = {
    fr: {
        title_biller: "Vos Informations",
        label_logo: "Logo de l'entreprise",
        ph_biller_name: "Nom officiel de votre entreprise",
        ph_rccm: "N° Registre de Commerce (RCCM)",
        ph_ifu: "N° Identifiant Fiscal (IFU)",
        ph_email: "Email de contact",
        ph_phone: "Numéro de téléphone",
        ph_address: "Siège social / Adresse",
        label_address: "Adresse",
        label_phone: "Téléphone",
        label_email: "Email",
        label_logo_btn: "Choisir un logo",
        label_no_file: "Aucun fichier choisi",
        label_date_invoice: "Date Facture",
        label_due_date: "Échéance paiement",
        title_client: "Informations du Client",
        ph_client_name: "Nom ou Raison sociale du client",
        ph_client_name_preview: "NOM DU CLIENT",
        ph_biller_name_preview: "NOM DE VOTRE STRUCTURE",
        label_not_specified: "Non spécifié",
        label_desc_none: "Sans description",
        ph_client_phone: "Téléphone du client",
        ph_rccm_opt: "RCCM Client (Optionnel)",
        ph_ifu_opt: "IFU Client (Optionnel)",
        title_items: "Prestations",
        label_desc: "Désignation",
        label_qty: "Qté",
        label_price: "P. Unit.",
        ph_item_name: "Nom du produit ou service",
        btn_add: "Ajouter",
        title_taxes: "Gestion des Taxes",
        label_tax_preset: "Taxes Prédéfinies",
        ph_tax_name: "Nom (ex: TVA)",
        ph_tax_rate: "Taux (%)",
        btn_add_tax: "Ajouter une Taxe",
        no_tax: "Aucune taxe ajoutée.",
        title_preview: "Aperçu",
        btn_download: "Télécharger la facture",
        invoice_title: "FACTURE",
        label_issue_date: "Date d'émission :",
        label_expiry: "Échéance :",
        label_dest: "DESTINATAIRE",
        th_desc: "Désignation",
        th_qty: "Qté",
        th_price: "P. Unit.",
        th_total: "Montant",
        label_subtotal: "Sous-total",
        label_net_total: "TOTAL NET",
        label_sum_words: "Arrêtée la présente facture à la somme de :",
        theme_blue: "Bleu Pro",
        theme_indigo: "Indigo Royal",
        theme_green: "Vert Émeraude",
        theme_teal: "Turquoise",
        theme_purple: "Violet Moderne",
        theme_orange: "Orange Énergie",
        theme_slate: "Gris Anthracite",
        theme_pink: "Rose Business",
        theme_amber: "Ambre Chaud",
        theme_cyan: "Cyan Arctique",
        theme_lime: "Citron Vert",
        theme_dark: "Noir Intense",
        footer_quote: "\"L'excellence dans votre facturation reflète le sérieux de votre expertise.\"",
        footer_help: "Besoin d'un logiciel de gestion complet ?",
        footer_support: "Support & Expertise",
        footer_whatsapp: "Contact Direct WhatsApp",
        footer_social: "Nos Réseaux Sociaux",
        msg_loading_pdf: "Génération du PDF en cours..."
    },
    en: {
        title_biller: "Your Information",
        label_logo: "Company Logo",
        ph_biller_name: "Your official company name",
        ph_rccm: "Business Reg Number (RCCM)",
        ph_ifu: "Tax ID Number (IFU)",
        ph_email: "Contact Email",
        ph_phone: "Phone Number",
        ph_address: "Headquarters / Address",
        label_address: "Address",
        label_phone: "Phone",
        label_email: "Email",
        label_logo_btn: "Choose a logo",
        label_no_file: "No file chosen",
        label_date_invoice: "Invoice Date",
        label_due_date: "Due Date",
        title_client: "Client Information",
        ph_client_name: "Client Name or Company",
        ph_client_name_preview: "CLIENT NAME",
        ph_biller_name_preview: "YOUR COMPANY NAME",
        label_not_specified: "Not specified",
        label_desc_none: "No description",
        ph_client_phone: "Client Phone Number",
        ph_rccm_opt: "Client RCCM (Optional)",
        ph_ifu_opt: "Client IFU (Optional)",
        title_items: "Services/Items",
        label_desc: "Description",
        label_qty: "Qty",
        label_price: "Unit Price",
        ph_item_name: "Product or service name",
        btn_add: "Add Item",
        title_taxes: "Tax Management",
        label_tax_preset: "Predefined Taxes",
        ph_tax_name: "Name (e.g. VAT)",
        ph_tax_rate: "Rate (%)",
        btn_add_tax: "Add Tax",
        no_tax: "No taxes added.",
        title_preview: "Preview",
        btn_download: "Download Invoice",
        invoice_title: "INVOICE",
        label_issue_date: "Issue Date:",
        label_expiry: "Due Date:",
        label_dest: "BILL TO",
        th_desc: "Description",
        th_qty: "Qty",
        th_price: "Unit Price",
        th_total: "Amount",
        label_subtotal: "Subtotal",
        label_net_total: "NET TOTAL",
        label_sum_words: "This invoice is settled at the total amount of:",
        theme_blue: "Pro Blue",
        theme_indigo: "Royal Indigo",
        theme_green: "Emerald Green",
        theme_teal: "Teal",
        theme_purple: "Modern Purple",
        theme_orange: "Energy Orange",
        theme_slate: "Slate Grey",
        theme_pink: "Business Pink",
        theme_amber: "Warm Amber",
        theme_cyan: "Arctic Cyan",
        theme_lime: "Lime Green",
        theme_dark: "Deep Black",
        footer_quote: "\"Excellence in your invoicing reflects the quality of your expertise.\"",
        footer_help: "Need a complete management software?",
        footer_support: "Support & Expertise",
        footer_whatsapp: "Direct WhatsApp Contact",
        footer_social: "Our Social Networks",
        msg_loading_pdf: "Generating PDF..."
    }
};

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

function formatDateByLang(dateStr) {
    if(!dateStr) return '-';
    const date = new Date(dateStr + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', options);
}

function updateInvoiceDate() {
    const dateInput = document.getElementById('invoice-date');
    const prevDate = document.getElementById('prev-date');
    if (dateInput.value) {
        prevDate.textContent = formatDateByLang(dateInput.value);
    }
}

function init() {
    // Charger les préférences
    const prefs = JSON.parse(localStorage.getItem('facturePro_prefs')) || {};
    currentLanguage = prefs.lang || 'fr';
    currentColor = prefs.color || 'color-blue';
    currentFont = prefs.font || 'font-sans';
    const savedCurrency = currencies.find(c => c.code === (prefs.currencyCode || 'XOF'));
    if(savedCurrency) currentCurrency = savedCurrency;

    // Remplir les sélecteurs
    populateCurrencySelector();
    document.getElementById('lang-selector').value = currentLanguage;
    document.getElementById('font-selector').value = currentFont;
    document.getElementById('color-selector').value = currentColor;

    // Appliquer les styles initiaux
    changeFont(currentFont);
    changeColor(currentColor);

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoice-date').value = today;
    
    loadBillerInfo();
    applyTranslations();
    populateTaxDropdown();
    renderItems();
    updatePreview();
}

function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('hidden');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    savePreferences();
    applyTranslations();
    updatePreview();
}

function populateCurrencySelector() {
    const sel = document.getElementById('currency-selector');
    sel.innerHTML = currencies.map(c => `<option value="${c.code}">${c.code} (${c.symbol})</option>`).join('');
    sel.value = currentCurrency.code;
}

function changeCurrency(code) {
    currentCurrency = currencies.find(c => c.code === code);
    savePreferences();
    updatePreview();
}

function savePreferences() {
    const prefs = {
        lang: currentLanguage,
        currencyCode: currentCurrency.code,
        font: currentFont,
        color: currentColor
    };
    localStorage.setItem('facturePro_prefs', JSON.stringify(prefs));
}

function applyTranslations() {
    const dict = translations[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            // Préserver l'icône si elle existe
            const icon = el.querySelector('i');
            el.textContent = dict[key];
            if (icon) el.prepend(icon, " ");
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });
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
    const fileNameDisplay = document.getElementById('file-name-display');
    if (file) {
        fileNameDisplay.textContent = file.name;
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
    const dict = translations[currentLanguage];
    
    items.forEach((item, index) => {
        container.innerHTML += `
            <div class="bg-blue-50/30 p-3 border border-blue-100">
                <div class="mb-2">
                    <label class="text-xs font-bold text-gray-600 uppercase">${dict.label_desc}</label>
                    <input type="text" placeholder="${dict.ph_item_name}" class="w-full border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm mt-1" value="${item.desc}" oninput="updateItem(${index}, 'desc', this.value)">
                </div>
                <div class="flex gap-3 items-end">
                    <div>
                        <label class="text-xs font-bold text-gray-600 uppercase">${dict.label_qty}</label>
                        <input type="number" min="1" class="w-20 border border-gray-300 p-2 focus:border-blue-700 focus:outline-none text-sm font-bold mt-1" value="${item.qty}" oninput="updateItem(${index}, 'qty', this.value)">
                    </div>
                    <div class="flex-grow">
                        <label class="text-xs font-bold text-gray-600 uppercase">${dict.label_price} (${currentCurrency.code})</label>
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
    const taxList = [...burkinaTaxes];
    if(currentLanguage === 'en') taxList[2].name = "Housing Tax";
    
    taxList.forEach((tax, index) => {
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
    const dict = translations[currentLanguage];

    // Vos Infos
    document.getElementById('prev-biller-name').textContent = document.getElementById('biller-name').value || dict.ph_biller_name_preview;
    document.getElementById('prev-biller-phone').textContent = document.getElementById('biller-phone').value || dict.label_not_specified;
    document.getElementById('prev-biller-email').textContent = document.getElementById('biller-email').value || 'email@exemple.com';
    document.getElementById('prev-biller-address').textContent = document.getElementById('biller-address').value || '-';
    document.getElementById('prev-biller-rccm').textContent = document.getElementById('biller-rccm').value || '-';
    document.getElementById('prev-biller-ifu').textContent = document.getElementById('biller-ifu').value || '-';
    
    // Dates
    const dueDate = document.getElementById('invoice-due-date').value;
    const prevDueDate = document.getElementById('prev-due-date');
    prevDueDate.textContent = dueDate ? formatDateByLang(dueDate) : dict.label_not_specified;

    // Client
    document.getElementById('prev-client-name').textContent = document.getElementById('client-name').value || dict.ph_client_name_preview;
    document.getElementById('prev-client-phone').textContent = document.getElementById('client-phone').value || '-';
    document.getElementById('prev-client-rccm').textContent = document.getElementById('client-rccm').value || '-';
    document.getElementById('prev-client-ifu').textContent = document.getElementById('client-ifu').value || '-';

    const tbody = document.getElementById('prev-items-body');
    tbody.innerHTML = '';
    let subtotal = 0;
    const locale = currentCurrency.locale;

    items.forEach(item => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.qty) || 0;
        const totalLine = Math.round(qty * price * 100) / 100;
        subtotal += totalLine;
        
        tbody.innerHTML += `
            <tr class="border-b border-gray-100">
                <td class="py-3 px-4 text-gray-800">${item.desc || dict.label_desc_none}</td>
                <td class="py-3 px-4 text-center text-gray-800">${qty}</td>
                <td class="py-3 px-4 text-right text-gray-800">${price.toLocaleString(locale)}</td>
                <td class="py-3 px-4 text-right text-blue-900 font-bold">${totalLine.toLocaleString(locale)}</td>
            </tr>
        `;
    });

    let taxesAmount = 0;
    appliedTaxes.forEach(tax => {
        const taxAmount = Math.round(subtotal * (tax.rate / 100) * 100) / 100;
        taxesAmount += taxAmount;
    });
    const total = Math.round((subtotal + taxesAmount) * 100) / 100;

    document.getElementById('prev-subtotal').textContent = subtotal.toLocaleString(locale) + ' ' + currentCurrency.symbol;
    
    // Afficher les taxes appliquées
    const taxesContainer = document.getElementById('prev-taxes-container');
    taxesContainer.innerHTML = '';
    appliedTaxes.forEach(tax => {
        const taxAmount = Math.round(subtotal * (tax.rate / 100) * 100) / 100;
        taxesContainer.innerHTML += `
            <div class="flex justify-between py-1 border-b border-gray-100">
                <span class="text-gray-600 font-medium">${tax.name}</span>
                <span class="font-bold">${taxAmount.toLocaleString(locale)} ${currentCurrency.symbol}</span>
            </div>
        `;
    });
    
    document.getElementById('prev-total').textContent = total.toLocaleString(locale) + ' ' + currentCurrency.symbol;
    
    // Afficher le montant en lettres
    const totalRounded = Math.round(total);
    const totalWords = numberToWords(totalRounded, currentLanguage) + ' ' + (currentLanguage === 'fr' ? currentCurrency.name : currentCurrency.code);
    const totalCapitalized = totalWords.charAt(0).toUpperCase() + totalWords.slice(1);
    document.getElementById('prev-total-words').textContent = totalCapitalized;
}

function changeFont(fontClass) {
    currentFont = fontClass;
    const preview = document.getElementById('invoice-preview');
    preview.classList.remove('font-sans', 'font-serif', 'font-mono', 'font-modern', 'font-playfair');
    preview.classList.add(fontClass);
    savePreferences();
}

function changeColor(colorClass) {
    currentColor = colorClass;
    const preview = document.getElementById('invoice-preview');
    preview.classList.remove('color-blue', 'color-indigo', 'color-green', 'color-teal', 'color-purple', 'color-orange', 'color-slate');
    preview.classList.add(colorClass);
    savePreferences();
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