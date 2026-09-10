// Homepage Phase 1: immediate positioning and conversion improvements.

const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
const APPROVED_HERO_HEADLINE = 'Where Every Celebration Is Crowned With Elegance';
const APPROVED_SERVICE_LINE = 'EVENT DESIGN • DRAPING & BACKDROPS • DÉCOR • RENTALS';
const APPROVED_SUPPORTING_COPY = 'Elevated event design, draping, backdrops, rentals, and celebration styling for social, corporate, community, and intimate wedding events across Delaware, Pennsylvania, New Jersey, and Maryland.';

$w.onReady(function () {
    applyLiveHomepageHotfix();
    refreshHomepagePositioning();
    refreshHomepageCallsToAction();
    replaceUnfinishedInventoryCopy();
});

// These IDs are mapped from the published Wix homepage. Explicit targeting
// keeps the launch copy working for both classic and newer stylable elements.
function applyLiveHomepageHotfix() {
    setText('#comp-m7opvstb14', APPROVED_SERVICE_LINE);
    setText(
        '#comp-m7opvsth22',
        'Xpress Your Royalty creates polished event environments through custom design, draping, backdrops, décor, rentals, and setup support. We serve social, corporate, community, and intimate wedding events across Delaware, Pennsylvania, New Jersey, and Maryland.'
    );

    [
        '#comp-m7opvstc2',
        '#comp-mk7tfg9o2',
        '#comp-mk7tfg9y',
        '#comp-mk7tfga3'
    ].forEach(connectInquiryElement);
}

function setText(selector, value) {
    try {
        const element = $w(selector);
        if (element && typeof element.text === 'string') {
            element.text = value;
        }
    } catch (error) {
        // Keep the rest of the homepage upgrade running if Wix removes an ID.
    }
}

function connectInquiryElement(selector) {
    try {
        const element = $w(selector);
        if (!element) {
            return;
        }

        if (typeof element.label === 'string') {
            element.label = 'Start Your Event Inquiry';
        }
        if ('link' in element) {
            element.link = INQUIRY_URL;
        }
        if ('target' in element) {
            element.target = '_blank';
        }
        setAriaLabel(element, 'Start your event inquiry with Xpress Your Royalty');
    } catch (error) {
        // A missing or incompatible component must not break page rendering.
    }
}

function refreshHomepagePositioning() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const copy = normalize(element.text);

        if (copy.includes('where every celebration is crowned')) {
            element.text = APPROVED_HERO_HEADLINE;
            return;
        }

        if (copy.includes('event planning') &&
            (copy.includes('balloon') || copy.includes('backdrop') || copy.includes('rental'))) {
            element.text = APPROVED_SERVICE_LINE;
            return;
        }

        if (copy.includes('delaware') && copy.includes('pennsylvania') &&
            (copy.includes('event') || copy.includes('celebration'))) {
            element.text = APPROVED_SUPPORTING_COPY;
        }
    });
}

function refreshHomepageCallsToAction() {
    const buttons = getElements('Button');
    let primaryInquiryAssigned = false;

    buttons.forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        const label = normalize(button.label);

        if (!primaryInquiryAssigned &&
            ['book now', 'book online', 'get started', 'request a quote', 'contact us'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
            primaryInquiryAssigned = true;
            return;
        }

        if (['view gallery', 'our gallery', 'portfolio'].includes(label)) {
            button.label = 'Explore Our Work';
            setAriaLabel(button, 'Explore recent Xpress Your Royalty event work');
        }
    });
}

function replaceUnfinishedInventoryCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        if (normalize(element.text) === 'coming soon') {
            element.text = 'Curated rentals for celebrations of every size';
        }
    });
}

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
