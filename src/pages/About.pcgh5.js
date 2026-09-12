const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    collapsePlaceholderContent();
    strengthenAboutCopy();
    connectInquiryButtons();
});

function collapsePlaceholderContent() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;
        const text = normalize(element.text);
        if (text === 'coming soon' || text === 'placeholder' || text === 'sample text') {
            safeCollapse(element);
        }
    });

    getElements('Image').forEach((element) => {
        if (!element) return;
        const alt = typeof element.alt === 'string' ? normalize(element.alt) : '';
        if (alt.includes('coming soon') || alt.includes('placeholder')) {
            safeCollapse(element);
        }
    });
}

function strengthenAboutCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

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
            return;
        }

        if (text.includes('we believe every event') || text.includes('your vision is our priority')) {
            element.text = 'Your vision sets the direction. Our role is to translate it into a polished, practical event experience with clear communication, thoughtful details, and professional execution.';
            return;
        }

        if (text.includes('why choose') || text === 'our promise') {
            element.text = 'What You Can Expect';
            return;
        }

        if (text.includes('attention to detail') && text.includes('quality')) {
            element.text = 'Clear scope, intentional design, dependable logistics, insured business operations, and hands-on attention to the details that matter most.';
            return;
        }

        if (text.includes('delaware') && text.includes('pennsylvania') && text.includes('new jersey')) {
            element.text = 'Serving Delaware, Pennsylvania, New Jersey, and Maryland for qualifying events based on scope, logistics, and availability.';
        }
    });
}

function connectInquiryButtons() {
    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') return;

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us', 'book your event consultation', 'start your event inquiry'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
        }
    });
}

function safeCollapse(element) {
    if (element && typeof element.collapse === 'function') element.collapse();
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
