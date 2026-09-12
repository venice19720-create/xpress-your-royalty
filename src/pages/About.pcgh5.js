const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

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
            element.text = 'Xpress Your Royalty creates intentional event experiences through design, draping, décor, rentals, and hands-on setup support. We listen first, define the scope clearly, and build each event around your vision, venue, priorities, and guest experience.';
            return;
        }

        if (text.includes('planning, decor') && text.includes('balloon')) {
            element.text = 'Our services include event design and décor, custom draping and backdrops, curated rentals, social and corporate celebrations, community events, intimate weddings, and selected setup support.';
            return;
        }

        if (text.includes('our expert team') || text.includes('meet the team') || text.includes('our talented team')) {
            element.text = 'A Hands-On, Detail-Focused Approach';
            return;
        }

        if (text.includes('years of experience') && text.includes('team')) {
            element.text = 'Every event is approached with care, clear communication, and a practical eye for the details that shape the guest experience.';
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
