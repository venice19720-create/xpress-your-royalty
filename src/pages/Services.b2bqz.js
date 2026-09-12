const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';
const PAGE_HEADING = 'Event Design, Draping, Décor & Rentals';

const SERVICE_COPY = new Map([
    ['services', PAGE_HEADING],
    ['our services', PAGE_HEADING],
    ['what we offer', 'Signature Services'],
    ['event planning', 'Event Design & Décor'],
    ['elegant styling', 'Designed Around Your Vision'],
    ['decor and design', 'Draping & Backdrops'],
    ['décor and design', 'Draping & Backdrops'],
    ['personalized touch', 'Transform the Room. Frame the Moment.'],
    ['balloon garlands and arches', 'Rentals & Event Support'],
    ['balloon garlands & arches', 'Rentals & Event Support'],
    ['whimsical charm', 'The Pieces That Bring It Together'],
    ['ready to get started?', 'Ready to Build the Right Event Scope?'],
    ['let’s get started', 'Tell Us About Your Event']
]);

$w.onReady(function () {
    refineServiceCopy();
    strengthenDecisionCopy();
    connectInquiryButtons();
});

function refineServiceCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (SERVICE_COPY.has(text)) {
            element.text = SERVICE_COPY.get(text);
            return;
        }

        if (text.includes('dedicated to creating unforgettable events') && text.includes('balloon garlands')) {
            element.text = 'Xpress Your Royalty creates polished event environments through thoughtful design, custom draping and backdrops, décor, curated rentals, and clearly defined setup support. We serve social, corporate, community, milestone, and intimate wedding events across Delaware, Pennsylvania, New Jersey, and Maryland.';
            return;
        }

        if (text.includes('personalized experiences for our clients') && text.includes('elegant, professional')) {
            element.text = 'Cohesive styling, focal areas, table details, and finishing touches are developed around your vision, venue, priorities, and guest experience.';
            return;
        }

        if (text.includes('our decor and design services are tailored') || text.includes('our décor and design services are tailored')) {
            element.text = 'Custom draping and backdrop installations create intentional focal points for stages, ceremonies, sweetheart areas, photo moments, corporate presentations, and statement spaces.';
            return;
        }

        if (text.includes('add a touch of whimsy and charm') && text.includes('balloon garlands')) {
            element.text = 'Tables, chairs, linens, games, AV and event equipment, backdrop elements, specialty décor, delivery, and selected setup or breakdown support are available based on your event scope.';
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
        }
    });
}

function strengthenDecisionCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text.includes('not sure what you need') || text.includes('which service is right')) {
            element.text = 'Not sure which service mix fits your event? Share the date, venue, guest count, priorities, and inspiration. We’ll help define the right scope before you commit.';
            return;
        }

        if (text.includes('we offer a variety of services') && text.length > 45) {
            element.text = 'Choose a focused service or combine design, draping, décor, rentals, and selected setup support into one clearly defined event scope.';
            return;
        }

        if (text.includes('contact us today') || text.includes('book your consultation')) {
            element.text = 'Start with your event details so we can confirm fit, availability, and the most useful next step.';
        }
    });
}

function connectInquiryButtons() {
    getElements('Button').forEach((button) => {
        if (!button || typeof button.label !== 'string') return;

        const label = normalize(button.label);
        if (['book now', 'get started', 'request a quote', 'contact us', 'book your event consultation', 'check availability', 'start your event inquiry'].includes(label)) {
            button.label = 'Start Your Event Inquiry';
            button.link = INQUIRY_URL;
            button.target = '_blank';
            setAriaLabel(button, 'Start your event inquiry with Xpress Your Royalty');
        }
    });
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
