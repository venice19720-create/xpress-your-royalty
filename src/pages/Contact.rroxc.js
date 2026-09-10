const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);
        if (text === 'contact' || text === 'contact us') {
            element.text = 'Tell Us About Your Event';
        }
    });

    getElements('Button').forEach((button) => {
        if (button && typeof button.label === 'string' &&
            ['book now', 'get started', 'request a quote'].includes(normalize(button.label))) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
        }
    });
});

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
