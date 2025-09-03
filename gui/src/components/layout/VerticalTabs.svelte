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
        {
            label: "Pestaña 2",
            content: "<p>Contenido HTML de la pestaña 2</p>",
        },
        {
            label: "Pestaña 2",
            content: "<p>Contenido HTML de la pestaña 2</p>",
        },
        {
            label: "Pestaña 2",
            content: "<p>Contenido HTML de la pestaña 2</p>",
        },
        {
            label: "Pestaña 2",
            content: "<p>Contenido HTML de la pestaña 2</p>",
        },
    ];
    export let activeTab = 0;
    export let bordered = true;
    export let position = "left"; // "left" | "right"

    function selectTab(index) {
        activeTab = index;
    }
</script>

<div class="tabs-container {position}" class:bordered>
    <nav class="tabs-nav">
        {#each tabs as tab, index}
            <button
                class="tab-item {index === activeTab ? 'active' : ''}"
                on:click={() => selectTab(index)}
                aria-selected={index === activeTab}
            >
                {#if tab.icon}
                    <span class="icon">
                        <svelte:component this={tab.icon} size={16} />
                    </span>
                {/if}
                <span class="label">{tab.label}</span>
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
    .tabs-container {
        display: flex;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: var(--tab-text-color);
        width: 100%;
    }

    /* Posicionamiento */
    .tabs-container.left {
        flex-direction: row;
    }

    .tabs-container.right {
        flex-direction: row-reverse;
    }

    /* Navegación vertical */
    .tabs-nav {
        display: flex;
        flex-direction: column;
        width: 240px;
        min-width: 240px;
        border-right: 1px solid var(--tab-border-color);
        padding: 8px 0;
    }

    .tabs-container.right .tabs-nav {
        border-right: none;
        border-left: 1px solid var(--tab-border-color);
    }

    /* Estilo con borde */
    .tabs-container.bordered {
        border: 1px solid var(--tab-border-color);
        border-radius: 6px;
        overflow: hidden;
    }

    .tabs-container.bordered .tabs-nav {
        background-color: #f6f8fa;
    }

    /* Items */
    .tab-item {
        position: relative;
        padding: 8px 16px;
        margin: 2px 8px;
        background: transparent;
        border: none;
        border-radius: 6px;
        text-align: left;
        font-weight: 500;
        color: var(--tab-text-color);
        cursor: pointer;
        transition: all 0.2s ease-out;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .tab-item:hover {
        background-color: var(--tab-hover-bg);
    }

    .tab-item.active {
        background-color: white;
        box-shadow: inset 0 0 0 1px var(--tab-border-color);
    }

    .tab-item.active::before {
        content: "";
        position: absolute;
        left: -1px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--tab-active-border);
    }

    .tabs-container.right .tab-item.active::before {
        left: auto;
        right: -1px;
    }

    .icon {
        display: flex;
        align-items: center;
        opacity: 0.8;
    }

    .label {
        flex-grow: 1;
    }

    .counter {
        font-size: 12px;
        background-color: var(--counter-bg);
        color: var(--counter-text);
        padding: 2px 6px;
        border-radius: 12px;
        font-weight: 500;
    }

    /* Contenido */
    .tab-content {
        flex-grow: 1;
        padding: 16px;
        min-width: 0; /* Para evitar overflow */
    }
</style>
