// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixWindow from 'wix-window';

const EXPERIENCE_PROFILES = {
    desktop: {
        durationMultiplier: 1,
        delayMultiplier: 1,
        listLimitMultiplier: 1,
        buttonFeedbackDelayMs: 700
    },
    mobile: {
        durationMultiplier: 0.8,
        delayMultiplier: 0.6,
        listLimitMultiplier: 0.65,
        buttonFeedbackDelayMs: 520
    }
};

const REVEAL_GROUPS = [
    { selector: 'Section', effectName: 'fade', duration: 420, delayStep: 90, limit: 10 },
    { selector: 'Strip', effectName: 'glide', duration: 380, delayStep: 80, limit: 12 },
    { selector: 'Box', effectName: 'float', duration: 340, delayStep: 60, limit: 16 },
    { selector: 'Image', effectName: 'expand', duration: 360, delayStep: 50, limit: 16 },
    { selector: 'VectorImage', effectName: 'fade', duration: 300, delayStep: 45, limit: 18 },
    { selector: 'Text', effectName: 'fade', duration: 260, delayStep: 35, limit: 36 },
    { selector: 'Button', effectName: 'puff', duration: 260, delayStep: 40, limit: 20 }
];

const VIEWPORT_GROUPS = [
    { selector: 'Section', effectName: 'fade', duration: 320, limit: 14 },
    { selector: 'Box', effectName: 'glide', duration: 300, limit: 20 },
    { selector: 'Image', effectName: 'expand', duration: 340, limit: 20 },
    { selector: 'Text', effectName: 'fade', duration: 240, limit: 36 },
    { selector: 'Button', effectName: 'puff', duration: 220, limit: 20 }
];

const MICRO_INTERACTIONS = [
    { selector: 'Button', inEffect: 'puff', outEffect: 'fade', duration: 170, limit: 24 },
    { selector: 'Image', inEffect: 'expand', outEffect: 'fade', duration: 210, limit: 24 },
    { selector: 'Box', inEffect: 'glide', outEffect: 'fade', duration: 180, limit: 24 },
    { selector: 'VectorImage', inEffect: 'puff', outEffect: 'fade', duration: 180, limit: 24 }
];

const BUTTON_FEEDBACK = {
    limit: 24,
    loadingLabel: 'Loading...',
    pressedEffect: 'puff'
};

$w.onReady(function () {
    const profile = getExperienceProfile();

    runInitialRevealEnhancements(profile);
    runViewportRevealEnhancements(profile);
    addInteractiveMicroAnimations(profile);
    addFocusMicroAnimations(profile);
    addButtonClickFeedback(profile);
    addTrustSignals(profile);
});

function getExperienceProfile() {
    const isMobile = wixWindow.formFactor === 'Mobile';
    return isMobile ? EXPERIENCE_PROFILES.mobile : EXPERIENCE_PROFILES.desktop;
}

function runInitialRevealEnhancements(profile) {
    REVEAL_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        const limit = scaleLimit(group.limit, profile.listLimitMultiplier);
        const duration = scaleDuration(group.duration, profile.durationMultiplier);
        const delayStep = scaleDuration(group.delayStep, profile.delayMultiplier);

        elements.slice(0, limit).forEach((element, index) => {
            if (!element || !element.hidden) {
                return;
            }

            const delayMs = index * delayStep;
            setTimeout(() => safeShow(element, group.effectName, duration), delayMs);
        });
    });
}

function runViewportRevealEnhancements(profile) {
    VIEWPORT_GROUPS.forEach((group) => {
        const elements = $w(group.selector);

        if (!elements || !elements.length) {
            return;
        }

        const limit = scaleLimit(group.limit, profile.listLimitMultiplier);
        const baseDuration = scaleDuration(group.duration, profile.durationMultiplier);

        elements.slice(0, limit).forEach((element, index) => {
            if (!element || typeof element.onViewportEnter !== 'function') {
                return;
            }

            let hasAnimated = false;

            element.onViewportEnter(() => {
                if (hasAnimated) {
                    return;
                }

                hasAnimated = true;
                const duration = baseDuration + Math.min(index * 10, 120);
                safeShow(element, group.effectName, duration);
            });
        });
    });
}

function addInteractiveMicroAnimations(profile) {
    MICRO_INTERACTIONS.forEach((interaction) => {
        const limit = scaleLimit(interaction.limit, profile.listLimitMultiplier);
        const duration = scaleDuration(interaction.duration, profile.durationMultiplier);

        addHoverAnimation(
            interaction.selector,
            interaction.inEffect,
            interaction.outEffect,
            duration,
            limit
        );
    });
}

function addFocusMicroAnimations(profile) {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    const limit = scaleLimit(24, profile.listLimitMultiplier);

    buttons.slice(0, limit).forEach((element) => {
        if (!element) {
            return;
        }

        if (typeof element.onFocus === 'function') {
            element.onFocus(() => safeShow(element, 'puff', scaleDuration(150, profile.durationMultiplier)));
        }

        if (typeof element.onBlur === 'function') {
            element.onBlur(() => safeShow(element, 'fade', scaleDuration(130, profile.durationMultiplier)));
        }
    });
}

function addButtonClickFeedback(profile) {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    const limit = scaleLimit(BUTTON_FEEDBACK.limit, profile.listLimitMultiplier);

    buttons.slice(0, limit).forEach((button) => {
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

            safeShow(button, BUTTON_FEEDBACK.pressedEffect, scaleDuration(140, profile.durationMultiplier));

            setTimeout(() => {
                if (typeof button.label === 'string') {
                    button.label = originalLabel;
                }

                if (typeof button.enable === 'function') {
                    button.enable();
                }

                isLoading = false;
            }, profile.buttonFeedbackDelayMs);
        });
    });
}

function addTrustSignals(profile) {
    const primaryButtons = $w('Button');

    if (!primaryButtons || !primaryButtons.length) {
        return;
    }

    primaryButtons.slice(0, 2).forEach((button, index) => {
        if (!button) {
            return;
        }

        const pulseDelay = 800 + (index * 220);
        setTimeout(() => {
            safeShow(button, 'puff', scaleDuration(180, profile.durationMultiplier));
        }, pulseDelay);
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

function scaleDuration(value, multiplier) {
    return Math.max(120, Math.round(value * multiplier));
}

function scaleLimit(value, multiplier) {
    return Math.max(1, Math.round(value * multiplier));
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
