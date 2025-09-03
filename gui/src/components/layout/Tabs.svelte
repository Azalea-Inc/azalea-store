<script>
    export let tabs = [
        {
            label: "Pestaña 1",
            content: "<p>Contenido HTML de la pestaña 1</p>",
        },
        {
            label: "Pestaña 2",
            content: "<p>Contenido HTML de la pestaña 2</p>",
        },
    ];
    export let activeTab = 0;
    export let bordered = false;

    function selectTab(index) {
        activeTab = index;
    }
</script>

<div class="tabs-container" class:bordered>
    <nav class="tabs-nav">
        {#each tabs as tab, index}
            <button
                class="tab-item {index === activeTab ? 'active' : ''}"
                on:click={() => selectTab(index)}
                aria-selected={index === activeTab}
            >
                {tab.label}
                {#if tab.count}
                    <span class="counter">{tab.count}</span>
                {/if}
            </button>
        {/each}
    </nav>

    <div class="tab-content">
        {#if tabs[activeTab]}
            {#if typeof tabs[activeTab].content === "function"}
                <svelte:component this={tabs[activeTab].content} />
            {:else}
                {@html tabs[activeTab].content}
            {/if}
        {/if}
    </div>
</div>

<style>
    :global(:root) {
        --tab-border-color: #d0d7de;
        --tab-text-color: #24292f;
        --tab-active-border: #0d6efd;
        --tab-active-text: #24292f;
        --tab-hover-bg: #f6f8fa;
        --counter-bg: #d0d7de;
        --counter-text: #24292f;
    }

    .tabs-container {
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: var(--tab-text-color);
    }

    .tabs-nav {
        display: flex;
        border-bottom: 1px solid var(--tab-border-color);
        padding: 0 16px;
        margin-bottom: 16px;
    }

    .tabs-container.bordered {
        border: 1px solid var(--tab-border-color);
        border-radius: 6px;
    }

    .tabs-container.bordered .tabs-nav {
        background-color: #f6f8fa;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        margin-bottom: 0;
    }

    .tab-item {
        position: relative;
        padding: 8px 16px;
        margin: 0 8px -1px 0;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 6px 6px 0 0;
        font-weight: 500;
        color: var(--tab-text-color);
        cursor: pointer;
        transition: all 0.2s ease-out;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .tab-item:hover {
        background-color: var(--tab-hover-bg);
        border-color: var(--tab-border-color);
    }

    .tab-item.active {
        background-color: #ffffff;
        border-color: var(--tab-border-color);
        border-bottom-color: transparent;
        color: var(--tab-active-text);
    }

    .tab-item.active::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--tab-active-border);
    }

    .counter {
        font-size: 12px;
        background-color: var(--counter-bg);
        color: var(--counter-text);
        padding: 2px 6px;
        border-radius: 12px;
        font-weight: 500;
    }

    .tab-content {
        padding: 16px;
    }
</style>
