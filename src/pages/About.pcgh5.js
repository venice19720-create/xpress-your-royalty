$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);

        if (['about', 'about us', 'meet our expert team'].includes(text)) {
            element.text = 'Creating Celebrations With Vision, Purpose & Royalty';
            return;
        }

        if (text.includes('premier event planning company') || text.includes('dedicated team specializes')) {
            element.text = 'Xpress Your Royalty creates intentional event experiences through design, draping, décor, rentals, and hands-on setup support. We listen first, define the scope clearly, and build each event around your vision, venue, priorities, and budget.';
            return;
        }

        if (text.includes('planning, decor') && text.includes('balloon')) {
            element.text = 'Our services include event design and décor, custom draping and backdrops, curated rentals, social and corporate celebrations, community events, intimate weddings, and selected setup support.';
        }
    });

    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') {
            return;
        }

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
            button.target = '_blank';
            setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
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
