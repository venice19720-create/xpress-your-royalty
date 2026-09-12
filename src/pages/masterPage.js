// Site-wide content and conversion upgrades for Xpress Your Royalty.
// Keep motion restrained so pages remain stable, readable, and accessible.

const CLIENT_EMAIL = 'info@xpressyourroyalty.com';
const LEGACY_EMAIL = 't.o.l.endeavors@gmail.com';
const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

const INQUIRY_LABELS = new Set([
    'book now',
    'book online',
    'get started',
    'request a quote',
    'book your event consultation',
    'start your event inquiry'
]);

$w.onReady(function () {
    updateClientFacingCopy();
    connectInquiryButtons();
});

function updateClientFacingCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        let updated = element.text;

        if (updated.toLowerCase().includes(LEGACY_EMAIL)) {
            updated = updated.replace(new RegExp(LEGACY_EMAIL, 'gi'), CLIENT_EMAIL);
        }

        if (/©\s*2025/i.test(updated)) {
            updated = updated.replace(/©\s*2025/gi, '© 2026');
        }

        if (/express your royalty/i.test(updated)) {
            updated = updated.replace(/express your royalty/gi, 'Xpress Your Royalty');
        }

        if (updated !== element.text) {
            element.text = updated;
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
