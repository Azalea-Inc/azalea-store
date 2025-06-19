<script>
    export let text = "";
    export let tooltipDirection = "auto"; // 'top', 'bottom', 'left', 'right', 'auto'

    export let background = "rgba(0, 0, 0, 0.85)";
    export let color = "white";
    export let padding = "6px 12px";
    export let borderRadius = "4px";
    export let fontSize = "0.75rem";

    let parentEl;
    let tooltipEl;
    let tooltipVisible = false;
    let tooltipPos = { top: 0, left: 0 };
    let currentDirection = "top";

    const margin = 6;

    function updateTooltipPosition() {
        if (!parentEl || !tooltipEl) return;

        const parentRect = parentEl.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const positions = {
            top: () => ({
                top: parentRect.top - tooltipRect.height - margin,
                left:
                    parentRect.left +
                    parentRect.width / 2 -
                    tooltipRect.width / 2,
            }),
            bottom: () => ({
                top: parentRect.bottom + margin,
                left:
                    parentRect.left +
                    parentRect.width / 2 -
                    tooltipRect.width / 2,
            }),
            left: () => ({
                top:
                    parentRect.top +
                    parentRect.height / 2 -
                    tooltipRect.height / 2,
                left: parentRect.left - tooltipRect.width - margin,
            }),
            right: () => ({
                top:
                    parentRect.top +
                    parentRect.height / 2 -
                    tooltipRect.height / 2,
                left: parentRect.right + margin,
            }),
        };

        if (tooltipDirection === "left" || tooltipDirection === "right") {
            const pos = positions[tooltipDirection]();
            tooltipPos = pos;
            currentDirection = tooltipDirection;
            return;
        }

        const spaceAbove = parentRect.top;
        const spaceBelow = windowHeight - parentRect.bottom;

        if (tooltipDirection === "top" || tooltipDirection === "bottom") {
            const pos = positions[tooltipDirection]();
            tooltipPos = pos;
            currentDirection = tooltipDirection;
            return;
        }

        if (spaceBelow >= tooltipRect.height + margin) {
            tooltipPos = positions.bottom();
            currentDirection = "bottom";
        } else if (spaceAbove >= tooltipRect.height + margin) {
            tooltipPos = positions.top();
            currentDirection = "top";
        } else {
            tooltipPos = positions.bottom(); // Forzar aunque no haya espacio
            currentDirection = "bottom";
        }

        // Corregir límites horizontales
        if (tooltipPos.left < margin) tooltipPos.left = margin;
        if (tooltipPos.left + tooltipRect.width > windowWidth - margin)
            tooltipPos.left = windowWidth - tooltipRect.width - margin;
    }

    function onWindowChange() {
        if (tooltipVisible) updateTooltipPosition();
    }

    function showTooltip() {
        tooltipVisible = true;
        window.addEventListener("scroll", onWindowChange, true);
        window.addEventListener("resize", onWindowChange);
        requestAnimationFrame(() => updateTooltipPosition());
    }

    function hideTooltip() {
        tooltipVisible = false;
        window.removeEventListener("scroll", onWindowChange, true);
        window.removeEventListener("resize", onWindowChange);
    }
</script>

<div
    bind:this={parentEl}
    on:mouseenter={showTooltip}
    on:mouseleave={hideTooltip}
    style="display: inline-block;"
>
    <slot />
</div>

{#if tooltipVisible}
    <div
        bind:this={tooltipEl}
        class="tooltip {currentDirection} z-[100]"
        style="top: {tooltipPos.top}px; left: {tooltipPos.left}px;  background: {background}; color: {color}; padding: {padding}; border-radius: {borderRadius};font-size: {fontSize}"
    >
        {text}
    </div>
{/if}

<style>
    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.75rem;
        pointer-events: none;
        white-space: nowrap;
        user-select: none;
        transition: opacity 0.15s ease;
    }
</style>
