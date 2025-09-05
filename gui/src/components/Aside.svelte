<script>
    import { page } from "$app/stores";
    import { asideStore } from "@store/AsideStore";
    import { Settings } from "@components/icons";
    import { userStore } from "@store/UserStore";
    import Tooltip from "@components/Tooltip.svelte";
</script>

<aside
    class="min-h-screen aside z-[200] border-r bg-red-200 border-gray-200 flex flex-col overflow-hidden"
>
    <div class="flex flex-col p-4 flex-1">
        {#each $asideStore.menu as item}
            <Tooltip
                text={item.title}
                tooltipDirection="right"
                background="#3e3e3e"
                color="#ffffff"
                padding="8px 14px"
                borderRadius="6px"
                fontSize="0.8rem"
            >
                <a
                    class:item-active={item.href === $page.url.pathname ||
                        $page.url.pathname.startsWith(item.href + "/")}
                    href={item.href}
                    class="menu-item outline-none focus:outline-none"
                >
                    <svelte:component
                        this={item.icon}
                        size={20}
                        class="text-gray-700 icon"
                        className="text-gray-700 icon"
                    />
                    <!-- <span>{item.title}</span> -->
                    {#if item.notifications > 0}
                        <span class="notification-badge"
                            >{item.notifications}</span
                        >
                    {/if}
                </a>
            </Tooltip>
        {/each}
    </div>

    <div class="flex flex-col p-4 flex-1 justify-end w-full">
        <Tooltip
            text="Ajustes"
            tooltipDirection="right"
            background="#3e3e3e"
            color="#ffffff"
            padding="8px 14px"
            borderRadius="6px"
        >
            <a
                class:item-active={"/settings" === $page.url.pathname ||
                    $page.url.pathname.startsWith("/settings" + "/")}
                href="/settings"
                class="menu-item flex gap-2"
            >
                <Settings size={20} class="icon" />
            </a>
        </Tooltip>

        {#if $userStore.isLogged}
            <Tooltip
                text="Cerrar Sesión"
                tooltipDirection="right"
                background="#3e3e3e"
                color="#ffffff"
                padding="8px 14px"
                borderRadius="6px"
            >
                <button
                    class="menu-item logout-button"
                    aria-label="Logout"
                    on:click={userStore.logout()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-log-out"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                        ></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </Tooltip>
        {/if}
    </div>
</aside>

<style>
    .aside {
        position: sticky;
        top: 0;
        background-color: #f6f8fa; /* GitHub sidebar gray */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #d0d7de;
    }

    .menu-item {
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.25rem;
        text-decoration: none;
        color: #24292f;
        transition: background-color 0.1s ease;
        border-radius: 0px 6px 6px 0px;
        font-weight: 500;
        display: flex;
        align-items: center;
        position: relative;
        gap: 0.5rem;
    }

    .menu-item:hover {
        background-color: #eaeef2;
        color: #1f2328;
    }

    .item-active {
        background-color: #dbefff;
        color: #0969da;
        font-weight: 600;
        border-left: 3px solid #0969da;
        padding-left: calc(0.75rem - 3px);
    }

    .notification-badge {
        position: absolute;
        right: 1rem;
        background: #cf222e;
        color: white;
        border-radius: 9999px;
        padding: 0.125rem 0.5rem;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .logout-button {
        color: #cf222e;
        border: 1px solid transparent;
        transition: all 0.15s ease;
        border-radius: 6px;
    }

    .logout-button:hover {
        background-color: #fbeaec;
        color: #a40e26;
        border-color: #f5c2c7;
    }
</style>
