<script>
    import { onDestroy, tick } from "svelte";

    let triggerEl;
    let dropdownEl;
    let isOpen = false;
    let dropdownPos = { top: 0, left: 0 };

    export let align = "center";
    export let offset = 6;

    async function toggleDropdown() {
        isOpen = !isOpen;
        if (isOpen) {
            await tick();
            updatePosition();
            addListeners();
        } else {
            cleanup();
        }
    }

    function updatePosition() {
        if (!triggerEl || !dropdownEl) return;

        const triggerRect = triggerEl.getBoundingClientRect();
        const dropdownRect = dropdownEl.getBoundingClientRect();

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let top = triggerRect.bottom + offset;
        if (top + dropdownRect.height > windowHeight) {
            top = triggerRect.top - dropdownRect.height - offset;
        }

        let left;
        if (align === "left") {
            left = triggerRect.left;
        } else if (align === "right") {
            left = triggerRect.right - dropdownRect.width;
        } else {
            left =
                triggerRect.left +
                triggerRect.width / 2 -
                dropdownRect.width / 2;
        }

        if (left < offset) left = offset;
        if (left + dropdownRect.width > windowWidth - offset) {
            left = windowWidth - dropdownRect.width - offset;
        }

        dropdownPos = { top, left };
    }

    function handleClickOutside(e) {
        if (
            !dropdownEl ||
            !triggerEl ||
            (!dropdownEl.contains(e.target) && !triggerEl.contains(e.target))
        ) {
            closeDropdown();
        }
    }

    function addListeners() {
        window.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", closeDropdown);
        window.addEventListener("scroll", updatePosition, true);
    }

    function removeListeners() {
        window.removeEventListener("click", handleClickOutside);
        window.removeEventListener("resize", closeDropdown);
        window.removeEventListener("scroll", updatePosition, true);
    }

    function cleanup() {
        removeListeners();
    }

    function closeDropdown() {
        isOpen = false;
        cleanup();
    }

    onDestroy(cleanup);
</script>

<div bind:this={triggerEl} style="display: inline-block;">
    <div on:click={toggleDropdown}>
        <slot name="trigger" />
    </div>
</div>
{#if isOpen}
    <div
        bind:this={dropdownEl}
        class="dropdown"
        style="top: {dropdownPos.top}px; left: {dropdownPos.left}px;"
    >
        <slot />
    </div>
{/if}

<style>
    .dropdown {
        position: fixed;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        padding: 0.5rem;
        z-index: 10000;
        min-width: 160px;
        animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
