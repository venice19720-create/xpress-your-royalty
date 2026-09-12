const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    refineContactCopy();
    strengthenInquiryExpectations();
    connectInquiryButtons();
});

function refineContactCopy() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text === 'contact' || text === 'contact us') {
            element.text = 'Tell Us About Your Event';
            return;
        }

        if (text.includes('we would love to hear from you') || text.includes('reach out to us')) {
            element.text = 'Share your event type, date, venue or location, estimated guest count, services you are interested in, colors or style, and any inspiration or special requirements. The more detail you provide, the better we can recommend the right next step.';
            return;
        }

        if (text.includes('t.o.l.endeavors@gmail.com')) {
            element.text = element.text.replace(/t\.o\.l\.endeavors@gmail\.com/gi, 'info@xpressyourroyalty.com');
            return;
        }

        if (text.includes('serving') && text.includes('delaware') && text.includes('pennsylvania')) {
            element.text = 'Serving Delaware, Pennsylvania, New Jersey, and Maryland based on event scope, logistics, and availability.';
        }
    });
}

function strengthenInquiryExpectations() {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') return;

        const text = normalize(element.text);

        if (text.includes('what happens next') || text.includes('after you submit')) {
            element.text = 'After you share your event details, we review the date, venue, requested services, logistics, and scope. If the event looks like a fit, we’ll follow up with the most useful next step.';
            return;
        }

        if (text.includes('consultation') && text.includes('schedule') && text.length > 45) {
            element.text = 'A consultation may be recommended after the initial inquiry when the project needs design discussion, measurements, venue details, or a more detailed scope review.';
            return;
        }

        if (text.includes('response') && text.includes('business') && text.includes('hours')) {
            element.text = 'Please include complete event details so we can respond efficiently and avoid unnecessary back-and-forth.';
            return;
        }

        if (text.includes('ready to start') && text.includes('event')) {
            element.text = 'Ready to move forward? Start with your event details and we’ll guide you to the right next step.';
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
            return;
        }

        if (label === 'submit') {
            setAriaLabel(button, 'Submit your event inquiry details');
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
