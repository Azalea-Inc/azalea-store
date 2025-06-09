<script>
    export let onClick;
    export let buttonType = "";
    export let showTooltip = false;
    export let tooltipText = "Example";
    export let tooltipAlign = "center";

    let tooltipSpan;
    let buttonEl;

    $: tooltipPositionClass =
        tooltipAlign === "center"
            ? "left-1/2 transform -translate-x-1/2"
            : tooltipAlign === "left"
              ? "left-0"
              : "-right-0";
</script>

<button
    class="relative group cursor-pointer flex gap-1 items-center justify-center btn {buttonType
        ? `btn-${buttonType}`
        : ''}"
    on:click={onClick}
>
    <slot />
    {#if showTooltip}
        <span
            class="absolute {tooltipPositionClass} bottom-[calc(-100%-0.5rem)] bg-gray-800 text-white text-xs rounded-md py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-gray-700 whitespace-nowrap hidden group-hover:block"
            role="tooltip"
        >
            {tooltipText}
        </span>
    {/if}
</button>
