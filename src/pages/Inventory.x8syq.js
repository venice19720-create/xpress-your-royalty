const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

const RENTAL_CATEGORY_COPY = [
    'Tables & Chairs',
    'Draping & Backdrop Elements',
    'Linens & Table Styling',
    'Games & Interactive Rentals',
    'AV & Event Equipment',
    'Specialty Décor & Add-ons'
];

const LEGACY_THRONE_COMPONENT_IDS = [
    '#comp-mkj823nw',
    '#comp-mkj85rl9'
];

$w.onReady(function () {
    hideComingSoonThroneSection();
    refineRentalCopy();
    strengthenRentalDecisionPath();
    applyCategoryAccessibility();
    connectInquiryButtons();
});

function hideComingSoonThroneSection() {
    let placeholderFound = false;

    // These are the two legacy Inventory-page components previously flagged by
    // the Wix accessibility scan. Collapse them directly so the unfinished
    // throne-chair block cannot remain visible even if its text or alt text changes.
    LEGACY_THRONE_COMPONENT_IDS.forEach((selector) => {
        try {
            const element = $w(selector);
            if (element) {
                placeholderFound = true;
                safeCollapse(element);
            }
        } catch (error) {
            // Keep the page running if Wix later removes or renames the element.
        }
    });

    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);
        if (text === 'coming soon' ||
            text.includes('coming soon in purple background and gold text') ||
            (text.includes('throne chairs') && text.includes('specialty seating'))) {
            placeholderFound = true;
            safeCollapse(element);
        }
    });

    getElements('Image').forEach((element) => {
        if (!element) return;

        const alt = typeof element.alt === 'string' ? normalize(element.alt) : '';
        if (alt.includes('coming soon')) {
            placeholderFound = true;
            safeCollapse(element);
        }
    });

    getElements('Gallery').forEach((gallery) => {
        if (!gallery || !Array.isArray(gallery.items)) return;

        const hasComingSoonItem = gallery.items.some((item) => {
            const title = normalize(item && item.title ? item.title : '');
            const description = normalize(item && item.description ? item.description : '');
            return title.includes('coming soon') || description.includes('coming soon');
        });

        if (hasComingSoonItem) {
            placeholderFound = true;
            safeCollapse(gallery);
        }
    });

    // The legacy inventory page had a second quote button attached to the
    // unfinished throne-chair block. Collapse that duplicate only when the
    // Coming Soon placeholder was actually detected.
    if (placeholderFound) {
        const legacyQuoteButtons = getElements('Button').filter((button) => {
            return button && typeof button.label === 'string' && normalize(button.label) === 'request a quote';
        });

        if (legacyQuoteButtons.length > 1) {
            safeCollapse(legacyQuoteButtons[legacyQuoteButtons.length - 1]);
        }
    }
}

function refineRentalCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text === 'inventory' || text === 'our inventory') {
            element.text = 'Event Rentals That Support the Full Celebration';
            return;
        }

        if (text === 'coming soon') {
            safeCollapse(element);
            return;
        }

        if (text.includes('throne chairs') && text.includes('specialty seating')) {
            safeCollapse(element);
            return;
        }

        if (text.includes('backdrops') && text.includes('drapes')) {
            element.text = 'Draping & Backdrop Elements';
            return;
        }

        if (text.includes('pickup') && text.includes('rental')) {
            element.text = 'Rental service is delivery-focused. Client pickup is not available. Final delivery, setup, return, access, and timing requirements are confirmed in the signed agreement.';
            return;
        }

        if (text.includes('tables') && text.includes('chairs') && text.includes('available') && text.length > 55) {
            element.text = 'Tables, chairs, linens, games, AV and event equipment, draping elements, and specialty additions are available based on quantity, event date, delivery logistics, and contracted scope.';
        }
    });
}

function strengthenRentalDecisionPath() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text.includes('rental needs') || text.includes('what do you need')) {
            element.text = 'For the fastest rental review, share your event date, venue, guest count, requested items and quantities, setup location or floor, delivery window, and any styling or setup support you need.';
            return;
        }

        if (text.includes('availability') && text.includes('first come')) {
            element.text = 'Rental availability is date- and quantity-specific. Your requested items are confirmed only after scope, logistics, agreement, and required payment are complete.';
            return;
        }

        if (text.includes('delivery') && text.includes('fees') && text.length > 45) {
            element.text = 'Delivery and logistics are quoted based on location, access, quantity, timing, setup needs, and return requirements. First-floor service is standard unless otherwise agreed in writing.';
            return;
        }

        if (text.includes('contact us') && text.includes('rental')) {
            element.text = 'Tell us what you need and where it is going. We’ll review availability, logistics, and the best next step for your event.';
        }
    });
}

function applyCategoryAccessibility() {
    const textElements = getElements('Text');
    RENTAL_CATEGORY_COPY.forEach((category) => {
        const match = textElements.find((element) => element && typeof element.text === 'string' && normalize(element.text) === normalize(category));
        if (match && match.accessibility) match.accessibility.ariaLabel = category;
    });
}

function connectInquiryButtons() {
    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') return;

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us', 'book your event consultation', 'check availability', 'start your event inquiry'].includes(label)) {
            button.label = 'Check Rental Availability';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Check rental availability with Xpress Your Royalty');
        }
    });
}

function safeCollapse(element) {
    if (element && typeof element.collapse === 'function') {
        element.collapse();
    }
}

function setAriaLabel(element, label) {
    if (element.accessibility) element.accessibility.ariaLabel = label;
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
