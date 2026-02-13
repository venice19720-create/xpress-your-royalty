// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

const REVEAL_GROUPS = [
    { selector: 'Strip', effectName: 'fade', duration: 360, delayStep: 80, limit: 8 },
    { selector: 'Box', effectName: 'fade', duration: 320, delayStep: 60, limit: 12 },
    { selector: 'Image', effectName: 'glide', duration: 360, delayStep: 50, limit: 12 },
    { selector: 'Text', effectName: 'fade', duration: 260, delayStep: 30, limit: 24 },
    { selector: 'Button', effectName: 'puff', duration: 240, delayStep: 35, limit: 12 }
];

const VIEWPORT_GROUPS = [
    { selector: 'Box', effectName: 'fade', duration: 280, limit: 16 },
    { selector: 'Image', effectName: 'glide', duration: 320, limit: 16 },
    { selector: 'Text', effectName: 'fade', duration: 220, limit: 28 }
];

$w.onReady(function () {
    runInitialRevealEnhancements();
    runViewportRevealEnhancements();
    addInteractiveMicroAnimations();
});

function runInitialRevealEnhancements() {
    REVEAL_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        elements.slice(0, group.limit).forEach((element, index) => {
            if (!element.hidden) {
                return;
            }

            const delayMs = index * group.delayStep;
            setTimeout(() => safeShow(element, group.effectName, group.duration), delayMs);
        });
    });
}

function runViewportRevealEnhancements() {
    VIEWPORT_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        elements.slice(0, group.limit).forEach((element) => {
            if (!element || typeof element.onViewportEnter !== 'function') {
                return;
            }

            let hasAnimated = false;

            element.onViewportEnter(() => {
                if (hasAnimated) {
                    return;
                }

                hasAnimated = true;
                safeShow(element, group.effectName, group.duration);
            });
        });
    });
}

function addInteractiveMicroAnimations() {
    addHoverAnimation('Button', 'puff', 160, 20);
    addHoverAnimation('Image', 'glide', 190, 20);
    addHoverAnimation('Box', 'fade', 170, 20);
}

function addHoverAnimation(selector, effectName, duration, limit) {
    const elements = $w(selector);

    if (!elements || !elements.length) {
        return;
    }

    elements.slice(0, limit).forEach((element) => {
        if (!element || typeof element.onMouseIn !== 'function') {
            return;
        }

        element.onMouseIn(() => {
            safeShow(element, effectName, duration);
        });
    });
}

function safeShow(element, effectName, duration) {
    if (!element || typeof element.show !== 'function') {
        return;
    }

    try {
        element.show(effectName, { duration });
    } catch (error) {
        element.show();
    }
}
