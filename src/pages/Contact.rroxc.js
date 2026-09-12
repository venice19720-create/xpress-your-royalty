const INQUIRY_URL = 'https://www.honeybook.com/widget/xpress_your_royalty_295315/cf_id/69330d82817cf30030275bf5';

$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

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
            return;
        }

        if (label === 'submit') {
            setAriaLabel(button, 'Submit your event inquiry details');
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
