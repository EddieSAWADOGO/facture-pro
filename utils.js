/**
 * Utilitaires pour FacturePro
 */

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
        result += (hundreds > 1 ? ones[hundreds] + ' ' : '') + 'cent';
        if (hundreds > 1 && num % 100 === 0) result += 's';
        num %= 100;
        if (num > 0) result += ' ';
    }

    if (num >= 20) {
        const ten = Math.floor(num / 10);
        const one = num % 10;
        result += tens[ten];
        if (one > 0) {
            if (one === 1 && ten !== 8 && ten !== 9) {
                result += ' et un';
            } else {
                result += '-' + ones[one];
            }
        }
    } else if (num >= 10) {
        result += teens[num - 10];
    } else if (num > 0) {
        result += ones[num];
    }

    return result.trim();
}