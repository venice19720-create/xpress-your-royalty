// Pass 2 conversion redesign: make the homepage guide visitors from
// positioning -> services -> proof -> process -> inquiry with minimal friction.

const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
const APPROVED_HERO_HEADLINE = 'Where Every Celebration Is Crowned With Elegance';
const APPROVED_SERVICE_LINE = 'EVENT DESIGN • DRAPING & BACKDROPS • DÉCOR • RENTALS';
const APPROVED_SUPPORTING_COPY = 'Elevated event design, draping, backdrops, rentals, and celebration styling for social, corporate, community, and intimate wedding events across Delaware, Pennsylvania, New Jersey, and Maryland.';

const COPY_REPLACEMENTS = new Map([
    ['about xpress your royalty', 'About Xpress Your Royalty'],
    ['our mission', 'Design With Purpose. Celebrate With Royalty.'],
    ['event décor & design', 'Event Design & Décor'],
    ['event decor & design', 'Event Design & Décor'],
    ['balloon garlands & backdrops', 'Draping & Backdrops'],
    ['balloon garlands and backdrops', 'Draping & Backdrops'],
    ['event planning & setup support', 'Rentals & Event Support'],
    ['event planning and setup support', 'Rentals & Event Support'],
    ['initial consultation', 'Share Your Vision'],
    ['understanding your vision', 'Tell us about your event, priorities, venue, and style.'],
    ['detailed planning', 'Consultation & Scope'],
    ['creating the perfect blueprint', 'We define the services, logistics, and design direction that fit your event.'],
    ['flawless execution', 'Design & Preparation'],
    ['bringing your event to life', 'We finalize details, rentals, measurements, sourcing, and setup plans.'],
    ['post-event evaluation', 'Setup, Styling & Breakdown'],
    ['ensuring success', 'We complete the contracted installation, styling, event support, and breakdown.'],
    ['our process', 'Your Event Journey'],
    ['how it works', 'Your Event Journey'],
    ['why choose us', 'Why Xpress Your Royalty'],
    ['why choose xpress your royalty', 'Why Xpress Your Royalty'],
    ['testimonials', 'Client Experiences'],
    ['what our clients say', 'Client Experiences'],
    ['gallery', 'Recent Work'],
    ['our gallery', 'Recent Work'],
    ['contact us', 'Ready to Bring Your Vision to Life?'],
    ['ready to start planning your event?', 'Tell us about your celebration and let’s create the right next step.']
]);

$w.onReady(function () {
    collapsePlaceholderContent();
    applyLiveHomepageHotfix();
    refreshHomepagePositioning();
    refreshHomepageContent();
    strengthenTrustAndProof();
    refreshHomepageCallsToAction();
    removeUnverifiedTestimonial();
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

function refreshHomepagePositioning() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

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

        if (copy.includes('xpress your royalty is an event planning') ||
            (copy.includes('transforming spaces') && copy.includes('balloon garlands'))) {
            element.text = 'Xpress Your Royalty transforms celebrations through thoughtful event design, custom draping and backdrops, décor, rentals, and polished setup support. Every event is shaped around the client’s vision, venue, priorities, and guest experience.';
            return;
        }

        if (copy.includes('our approach is hands-on') && copy.includes('baby shower')) {
            element.text = 'Our approach is personal, intentional, and practical. We listen first, define the scope clearly, and prepare each detail with care for social celebrations, corporate and community events, milestone occasions, and intimate weddings.';
            return;
        }

        if (copy.includes('delaware') && copy.includes('pennsylvania') &&
            (copy.includes('event') || copy.includes('celebration'))) {
            element.text = APPROVED_SUPPORTING_COPY;
        }
    });
}

function refreshHomepageContent() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (COPY_REPLACEMENTS.has(text)) {
            element.text = COPY_REPLACEMENTS.get(text);
            return;
        }

        if (text.includes('custom décor styling') && text.includes('table design')) {
            element.text = 'Cohesive event styling, focal areas, table details, and finishing touches designed around your vision.';
            return;
        }

        if (text.includes('elegant balloon garlands') && text.includes('pipe & drape')) {
            element.text = 'Custom draping and backdrop installations for photo moments, stages, sweetheart areas, ceremonies, and statement spaces.';
            return;
        }

        if (text.includes('professional support including décor planning')) {
            element.text = 'Curated rentals plus clearly defined setup, styling, delivery, and breakdown support for qualifying events.';
            return;
        }

        if (text.includes('tell us a little about your vision below')) {
            element.text = 'Share your event type, date, venue or location, estimated guest count, services of interest, colors or style, and any inspiration. We’ll follow up with availability and the best next step.';
            return;
        }

        if (text.includes('every event is unique') && text.includes('special')) {
            element.text = 'Every event starts with your vision. We help shape that vision into a polished, practical plan with clear scope, thoughtful design, and professional execution.';
            return;
        }

        if (text.includes('we take pride') && text.includes('attention to detail')) {
            element.text = 'Clients choose Xpress Your Royalty for intentional design, clear communication, insured business operations, dependable logistics, and hands-on attention to the details that shape the guest experience.';
        }
    });
}

function strengthenTrustAndProof() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text === 'elegance meets excellence' || text === 'quality and elegance') {
            element.text = 'Intentional Design. Professional Execution.';
            return;
        }

        if (text.includes('serving delaware') && text.includes('new jersey')) {
            element.text = 'Serving Delaware, Pennsylvania, New Jersey, and Maryland for qualifying events.';
            return;
        }

        if (text.includes('book your consultation') && text.includes('today')) {
            element.text = 'Ready to talk through your event? Start with a few details so we can confirm fit, availability, and the right next step.';
        }
    });
}

function refreshHomepageCallsToAction() {
    const buttons = getElements('Button');
    let primaryInquiryAssigned = false;

    buttons.forEach((button) => {
        if (!button || typeof button.label !== 'string') return;

        const label = normalize(button.label);

        if (!primaryInquiryAssigned &&
            ['book now', 'book online', 'get started', 'request a quote', 'book your event consultation', 'contact us', 'start your event inquiry'].includes(label)) {
            configureInquiryButton(button);
            primaryInquiryAssigned = true;
            return;
        }

        if (['request a quote', 'book your event consultation', 'start your event inquiry', 'check availability'].includes(label)) {
            configureInquiryButton(button);
            return;
        }

        if (['view gallery', 'our gallery', 'portfolio', 'view portfolio', 'view our work'].includes(label)) {
            button.label = 'Explore Our Work';
            setAriaLabel(button, 'Explore recent Xpress Your Royalty event work');
            return;
        }

        if (['learn more', 'about us'].includes(label)) {
            button.label = 'Discover Xpress Your Royalty';
            setAriaLabel(button, 'Learn more about Xpress Your Royalty');
            return;
        }

        if (['services', 'view services', 'our services'].includes(label)) {
            button.label = 'Explore Our Services';
            setAriaLabel(button, 'Explore Xpress Your Royalty event services');
        }
    });
}

function removeUnverifiedTestimonial() {
    let removedUnverifiedProof = false;

    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);
        const isUnverifiedAttribution = text.includes('emily & michael') && text.includes('newlywed');
        const isUnverifiedQuote = text.includes('made our wedding day truly magical') && text.includes('seamless timeline');

        if (isUnverifiedAttribution || isUnverifiedQuote) {
            removedUnverifiedProof = true;
            safeCollapse(element);
        }
    });

    if (removedUnverifiedProof) {
        getElements('Text').forEach((element) => {
            if (!element || typeof element.text !== 'string') return;
            const text = normalize(element.text);

            if (['client experiences', 'testimonials', 'what our clients say'].includes(text)) {
                safeCollapse(element);
            }
        });
    }
}

function configureInquiryButton(button) {
    button.label = 'Start Your Event Inquiry';
    button.link = INQUIRY_URL;
    button.target = '_blank';
    setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
}

function safeCollapse(element) {
    if (element && typeof element.collapse === 'function') {
        element.collapse();
    }
}

function setText(selector, value) {
    try {
        const element = $w(selector);
        if (element && typeof element.text === 'string') element.text = value;
    } catch (error) {
        // Keep the rest of the homepage upgrade running if Wix removes an ID.
    }
}

function connectInquiryElement(selector) {
    try {
        const element = $w(selector);
        if (!element) return;

        if (typeof element.label === 'string') element.label = 'Start Your Event Inquiry';
        if ('link' in element) element.link = INQUIRY_URL;
        if ('target' in element) element.target = '_blank';
        setAriaLabel(element, 'Start your event inquiry with Xpress Your Royalty');
    } catch (error) {
        // A missing or incompatible component must not break page rendering.
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
