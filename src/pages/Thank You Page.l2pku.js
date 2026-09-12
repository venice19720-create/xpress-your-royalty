$w.onReady(function () {
    getElements('Text').forEach((element) => {
        if (!element || typeof element.text !== 'string') {
            return;
        }

        const text = normalize(element.text);

        if (['thank you', 'thanks', 'thank you!'].includes(text)) {
            element.text = 'Thank You for Reaching Out';
            return;
        }

        if (text.includes('we received your') || text.includes('your submission has been received')) {
            element.text = 'Your inquiry has been received. We’ll review the details you shared and follow up with availability and the best next step for your event.';
            return;
        }

        if (text.includes('we will get back to you') || text.includes('someone will contact you')) {
            element.text = 'We appreciate the opportunity to learn more about your celebration. Your Vision. Your Vibe. Your Royalty.';
        }
    });
});

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
