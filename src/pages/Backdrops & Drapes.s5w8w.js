const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);

        if (['backdrops & drapes', 'backdrops and drapes', 'draping & backdrops'].includes(text)) {
            element.text = 'Custom Draping & Backdrops for Events Across DE, PA, NJ & MD';
            return;
        }

        if (text.includes('backdrops') && text.includes('drapes') && text.length > 40) {
            element.text = 'Create a focal point guests remember. Xpress Your Royalty designs custom draping and backdrop experiences for social celebrations, corporate and community events, intimate weddings, stages, photo moments, sweetheart areas, and other statement spaces.';
            return;
        }

        if (text === 'coming soon') {
            element.text = 'Signature draping looks, layered fabric, statement backdrops, and custom color combinations are available based on your venue and event scope.';
            return;
        }

        if (text.includes('balloon') && text.includes('backdrop') && text.length > 35) {
            element.text = 'Layered fabric, statement backdrops, and coordinated focal-area styling are selected to complement your event colors, venue, and desired atmosphere.';
        }
    });

    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us', 'book your event consultation'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your draping and backdrop inquiry with Xpress Your Royalty');
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
