const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

const RENTAL_CATEGORY_COPY = [
    'Tables & Chairs',
    'Draping & Backdrop Elements',
    'Linens & Table Styling',
    'Games & Interactive Rentals',
    'AV & Event Equipment',
    'Specialty Décor & Add-ons'
];

$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);

        if (text === 'inventory' || text === 'our inventory') {
            element.text = 'Event Rentals That Support the Full Celebration';
            return;
        }

        if (text === 'coming soon') {
            element.text = 'Curated rental categories are available for qualifying events. Availability varies by event date, quantity, delivery requirements, and contracted scope.';
            return;
        }

        if (text.includes('throne chairs') && text.includes('specialty seating')) {
            element.text = 'Specialty Seating & Statement Pieces';
            return;
        }

        if (text.includes('backdrops') && text.includes('drapes')) {
            element.text = 'Draping & Backdrop Elements';
        }
    });

    const textElements = getElements('Text');
    RENTAL_CATEGORY_COPY.forEach((category) => {
        const match = textElements.find((element) => element && typeof element.text === 'string' && normalize(element.text) === normalize(category));
        if (match && match.accessibility) {
            match.accessibility.ariaLabel = category;
        }
    });

    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your rental inquiry with Xpress Your Royalty');
        }
    });
});

function setAriaLabel(element, label) {
    if (element.accessibility) {
        element.accessibility.ariaLabel = label;
    }
}

function normalize(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
}

function getElements(selector) {
    try {
        const elements = $w(selector);
        return elements && typeof elements.forEach === 'function' ? elements : [];
    } catch (error) {
        return [];
    }
}
