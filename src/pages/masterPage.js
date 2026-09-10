// Site-wide content and conversion upgrades for Xpress Your Royalty.
// Avoid global decorative animations so pages remain stable and readable.

const CLIENT_EMAIL = 'info@xpressyourroyalty.com';
const LEGACY_EMAIL = 't.o.l.endeavors@gmail.com';
const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

const INQUIRY_LABELS = new Set([
    'book now',
    'book online',
    'get started',
    'request a quote',
    'start your event inquiry'
]);

$w.onReady(function () {
    updateClientFacingEmail();
    connectInquiryButtons();
});

function updateClientFacingEmail() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        if (element.text.toLowerCase().includes(LEGACY_EMAIL)) {
            element.text = element.text.replace(new RegExp(LEGACY_EMAIL, 'gi'), CLIENT_EMAIL);
        }
    });
}

function connectInquiryButtons() {
    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        const normalizedLabel = button.label.trim().toLowerCase();
        if (!INQUIRY_LABELS.has(normalizedLabel)) {
            return;
        }

        button.label = 'Start Your Event Inquiry';
        button.link = INQUIRY_URL;
        button.target = '_blank';
        setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
    });
}

function setAriaLabel(element, label) {
    if (element.accessibility) {
        element.accessibility.ariaLabel = label;
    }
}

function getElements(selector) {
    try {
        const elements = $w(selector);
        return elements && typeof elements.forEach === 'function' ? elements : [];
    } catch (error) {
        return [];
    }
}
