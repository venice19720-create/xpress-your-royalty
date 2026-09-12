const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
const PAGE_HEADING = 'Event Design, Décor, Draping & Rentals';

$w.onReady(function () {
    replaceHeading(['services', 'our services'], PAGE_HEADING);
    refineServiceCopy();
    connectInquiryButtons();
});

function refineServiceCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);

        if (text === 'event décor & design' || text === 'event decor & design') {
            element.text = 'Event Design & Décor';
            return;
        }

        if (text === 'balloon garlands & backdrops' || text === 'balloon garlands and backdrops') {
            element.text = 'Draping & Backdrops';
            return;
        }

        if (text === 'event planning & setup support' || text === 'event planning and setup support') {
            element.text = 'Rentals & Event Support';
            return;
        }

        if (text.includes('custom décor styling') && text.includes('table design')) {
            element.text = 'Cohesive styling, focal areas, table details, and finishing touches designed around your event vision.';
            return;
        }

        if (text.includes('elegant balloon garlands') && text.includes('pipe & drape')) {
            element.text = 'Custom draping and backdrop installations for photo moments, stages, ceremonies, sweetheart areas, and statement spaces.';
            return;
        }

        if (text.includes('professional support including décor planning')) {
            element.text = 'Curated rentals plus clearly defined delivery, setup, styling, and breakdown support for qualifying events.';
            return;
        }

        if (text.includes('event planning') && text.includes('balloon garlands') && text.length > 50) {
            element.text = 'Xpress Your Royalty provides event design and décor, custom draping and backdrops, curated rentals, and selected event support for social celebrations, corporate and community events, milestone occasions, and intimate weddings.';
        }
    });
}

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

        if (['book now', 'get started', 'request a quote', 'contact us'].includes(normalize(button.label))) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
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
