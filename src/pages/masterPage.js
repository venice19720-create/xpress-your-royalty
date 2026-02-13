// API Reference: https://www.wix.com/velo/reference/api-overview/introduction

const REVEAL_GROUPS = [
    { selector: 'Strip', effectName: 'fade', duration: 320, delayStep: 70, limit: 5 },
    { selector: 'Box', effectName: 'fade', duration: 300, delayStep: 55, limit: 8 },
    { selector: 'Image', effectName: 'glide', duration: 360, delayStep: 55, limit: 8 },
    { selector: 'Text', effectName: 'fade', duration: 240, delayStep: 30, limit: 14 },
    { selector: 'Button', effectName: 'fade', duration: 220, delayStep: 35, limit: 10 }
];

const BUTTON_LOADING_LABEL = 'Loading...';
const BUTTON_LOADING_RESET_MS = 1400;

$w.onReady(function () {
    runEnhancedPageReveal();
    addButtonLoadingFeedback();
});

function runEnhancedPageReveal() {
    REVEAL_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        elements.slice(0, group.limit).forEach((element, index) => {
            if (!element.hidden) {
                return;
            }

            const effectDelay = index * group.delayStep;
            setTimeout(() => showElementWithEffect(element, group.effectName, group.duration), effectDelay);
        });
    });
}

function showElementWithEffect(element, effectName, duration) {
    if (!element || typeof element.show !== 'function') {
        return;
    }

    try {
        element.show(effectName, { duration });
    } catch (error) {
        element.show();
    }
}

function addButtonLoadingFeedback() {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    buttons.forEach((button) => {
        if (!button || typeof button.onClick !== 'function') {
            return;
        }

        let isLoading = false;
        const defaultLabel = button.label;

        button.onClick(() => {
            if (isLoading || button.disabled) {
                return;
            }

            isLoading = true;
            button.disable();

            if (defaultLabel && defaultLabel !== BUTTON_LOADING_LABEL) {
                button.label = BUTTON_LOADING_LABEL;
            }

            setTimeout(() => {
                isLoading = false;

                if (defaultLabel && button.label === BUTTON_LOADING_LABEL) {
                    button.label = defaultLabel;
                }

                button.enable();
            }, BUTTON_LOADING_RESET_MS);
        });
    });
}
