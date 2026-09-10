const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
const PAGE_HEADING = 'Event Design, Décor, Draping & Rentals';

$w.onReady(function () {
    replaceHeading(['services', 'our services'], PAGE_HEADING);
    connectInquiryButtons();
});

function replaceHeading(matches, replacement) {
    const heading = getElements('Text').find((element) =>
        element && typeof element.text === 'string' && matches.includes(normalize(element.text))
    );

    if (heading) {
        heading.text = replacement;
    }
}

function connectInquiryButtons() {
    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        if (['book now', 'get started', 'request a quote'].includes(normalize(button.label))) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
        }
    });
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
