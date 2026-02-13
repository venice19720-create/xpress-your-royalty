// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

const REVEAL_GROUPS = [
    { selector: 'Section', effectName: 'fade', duration: 420, delayStep: 90, limit: 8 },
    { selector: 'Strip', effectName: 'glide', duration: 380, delayStep: 80, limit: 10 },
    { selector: 'Box', effectName: 'float', duration: 340, delayStep: 60, limit: 14 },
    { selector: 'Image', effectName: 'expand', duration: 360, delayStep: 50, limit: 14 },
    { selector: 'VectorImage', effectName: 'fade', duration: 300, delayStep: 45, limit: 16 },
    { selector: 'Text', effectName: 'fade', duration: 260, delayStep: 35, limit: 28 },
    { selector: 'Button', effectName: 'puff', duration: 260, delayStep: 40, limit: 16 }
];

const VIEWPORT_GROUPS = [
    { selector: 'Section', effectName: 'fade', duration: 320, limit: 10 },
    { selector: 'Box', effectName: 'glide', duration: 300, limit: 18 },
    { selector: 'Image', effectName: 'expand', duration: 340, limit: 18 },
    { selector: 'Text', effectName: 'fade', duration: 240, limit: 30 },
    { selector: 'Button', effectName: 'puff', duration: 220, limit: 16 }
];

const MICRO_INTERACTIONS = [
    { selector: 'Button', inEffect: 'puff', outEffect: 'fade', duration: 170, limit: 20 },
    { selector: 'Image', inEffect: 'expand', outEffect: 'fade', duration: 210, limit: 20 },
    { selector: 'Box', inEffect: 'glide', outEffect: 'fade', duration: 180, limit: 20 },
    { selector: 'VectorImage', inEffect: 'puff', outEffect: 'fade', duration: 180, limit: 20 }
];

const BUTTON_FEEDBACK = {
    limit: 20,
    loadingLabel: 'Loading...',
    restoreDelayMs: 700
};

$w.onReady(function () {
    runInitialRevealEnhancements();
    runViewportRevealEnhancements();
    addInteractiveMicroAnimations();
    addFocusMicroAnimations();
    addButtonClickFeedback();
});

function runInitialRevealEnhancements() {
    REVEAL_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        elements.slice(0, group.limit).forEach((element, index) => {
            if (!element || !element.hidden) {
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

        elements.slice(0, group.limit).forEach((element, index) => {
            if (!element || typeof element.onViewportEnter !== 'function') {
                return;
            }

            let hasAnimated = false;

            element.onViewportEnter(() => {
                if (hasAnimated) {
                    return;
                }

                hasAnimated = true;
                const duration = group.duration + Math.min(index * 10, 120);
                safeShow(element, group.effectName, duration);
            });
        });
    });
}

function addInteractiveMicroAnimations() {
    MICRO_INTERACTIONS.forEach((interaction) => {
        addHoverAnimation(
            interaction.selector,
            interaction.inEffect,
            interaction.outEffect,
            interaction.duration,
            interaction.limit
        );
    });
}

function addFocusMicroAnimations() {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    buttons.slice(0, 20).forEach((element) => {
        if (!element) {
            return;
        }

        if (typeof element.onFocus === 'function') {
            element.onFocus(() => safeShow(element, 'puff', 150));
        }

        if (typeof element.onBlur === 'function') {
            element.onBlur(() => safeShow(element, 'fade', 130));
        }
    });
}

function addButtonClickFeedback() {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    buttons.slice(0, BUTTON_FEEDBACK.limit).forEach((button) => {
        if (!button || typeof button.onClick !== 'function') {
            return;
        }

        let isLoading = false;

        button.onClick(() => {
            if (isLoading) {
                return;
            }

            isLoading = true;
            const originalLabel = typeof button.label === 'string' ? button.label : '';

            if (typeof button.disable === 'function') {
                button.disable();
            }

            if (typeof button.label === 'string') {
                button.label = BUTTON_FEEDBACK.loadingLabel;
            }

            safeShow(button, 'puff', 140);

            setTimeout(() => {
                if (typeof button.label === 'string') {
                    button.label = originalLabel;
                }

                if (typeof button.enable === 'function') {
                    button.enable();
                }

                isLoading = false;
            }, BUTTON_FEEDBACK.restoreDelayMs);
        });
    });
}

function addHoverAnimation(selector, inEffect, outEffect, duration, limit) {
    const elements = $w(selector);

    if (!elements || !elements.length) {
        return;
    }

    elements.slice(0, limit).forEach((element) => {
        if (!element) {
            return;
        }

        if (typeof element.onMouseIn === 'function') {
            element.onMouseIn(() => safeShow(element, inEffect, duration));
        }

        if (typeof element.onMouseOut === 'function') {
            element.onMouseOut(() => safeShow(element, outEffect, Math.max(120, duration - 20)));
        }
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
