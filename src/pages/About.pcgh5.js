$w.onReady(function () {
    const heading = getElements('Text').find((element) => {
        const text = element && typeof element.text === 'string' ? normalize(element.text) : '';
        return ['about', 'about us', 'meet our expert team'].includes(text);
    });

    if (heading) {
        heading.text = 'Creating Celebrations With Vision, Purpose & Royalty';
    }
});

function normalize(value) {
    return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
}

function getElements(selector) {
    try {
        const elements = $w(selector);
        return elements && typeof elements.find === 'function' ? elements : [];
    } catch (error) {
        return [];
    }
}
