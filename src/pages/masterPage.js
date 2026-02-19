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

const HEADER_FOOTER_ENHANCEMENT = {
    headerCount: 2,
    footerCount: 2,
    footerPulseDelay: 1200,
    footerPulseStagger: 260
};

$w.onReady(function () {
    const profile = getExperienceProfile();

    runInitialRevealEnhancements(profile);
    runViewportRevealEnhancements(profile);
    addInteractiveMicroAnimations(profile);
    addFocusMicroAnimations(profile);
    addButtonClickFeedback(profile);
    addTrustSignals(profile);
    enhanceHeaderAndFooter(profile);
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

function enhanceHeaderAndFooter(profile) {
    const sections = $w('Section') || [];
    const strips = $w('Strip') || [];
    const headerCandidates = sections.slice(0, HEADER_FOOTER_ENHANCEMENT.headerCount)
        .concat(strips.slice(0, HEADER_FOOTER_ENHANCEMENT.headerCount));
    const footerCandidates = sections.slice(Math.max(0, sections.length - HEADER_FOOTER_ENHANCEMENT.footerCount))
        .concat(strips.slice(Math.max(0, strips.length - HEADER_FOOTER_ENHANCEMENT.footerCount)));

    applyRegionEnhancement(headerCandidates, {
        revealEffect: 'float',
        hoverInEffect: 'glide',
        hoverOutEffect: 'fade',
        revealDuration: scaleDuration(260, profile.durationMultiplier),
        hoverDuration: scaleDuration(180, profile.durationMultiplier)
    });

    applyRegionEnhancement(footerCandidates, {
        revealEffect: 'fade',
        hoverInEffect: 'puff',
        hoverOutEffect: 'fade',
        revealDuration: scaleDuration(280, profile.durationMultiplier),
        hoverDuration: scaleDuration(190, profile.durationMultiplier)
    });

    addFooterCtaPulse(profile);
}

function applyRegionEnhancement(elements, config) {
    elements.forEach((element, index) => {
        if (!element) {
            return;
        }

        if (element.hidden) {
            const delay = index * 120;
            setTimeout(() => safeShow(element, config.revealEffect, config.revealDuration), delay);
        }

        if (typeof element.onViewportEnter === 'function') {
            let hasAnimated = false;
            element.onViewportEnter(() => {
                if (hasAnimated) {
                    return;
                }

                hasAnimated = true;
                safeShow(element, config.revealEffect, config.revealDuration);
            });
        }

        if (typeof element.onMouseIn === 'function') {
            element.onMouseIn(() => safeShow(element, config.hoverInEffect, config.hoverDuration));
        }

        if (typeof element.onMouseOut === 'function') {
            element.onMouseOut(() => safeShow(element, config.hoverOutEffect, Math.max(120, config.hoverDuration - 20)));
        }
    });
}

function addFooterCtaPulse(profile) {
    const buttons = $w('Button');

    if (!buttons || !buttons.length) {
        return;
    }

    const footerButtons = buttons.slice(Math.max(0, buttons.length - 3));

    footerButtons.forEach((button, index) => {
        if (!button) {
            return;
        }

        const delay = HEADER_FOOTER_ENHANCEMENT.footerPulseDelay + (index * HEADER_FOOTER_ENHANCEMENT.footerPulseStagger);
        setTimeout(() => {
            safeShow(button, 'puff', scaleDuration(170, profile.durationMultiplier));
        }, delay);
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
