<script>
    import UserAsideInfo from "@components/users/UserAsideInfo.svelte";
    import { page } from "$app/stores";
    import { asideStore } from "@store/AsideStore";
    import { Settings } from "lucide-svelte";
</script>

<aside class="min-h-screen aside border-r flex flex-col overflow-hidden">
    <UserAsideInfo />

    <div class="flex flex-col p-4 flex-1">
        {#each $asideStore.menu as item}
            <a
                class:item-active={item.href === $page.url.pathname ||
                    $page.url.pathname.startsWith(item.href + "/")}
                href={item.href}
                class="menu-item"
            >
                <svelte:component this={item.icon} size={16} class="mr-2" />
                <span>{item.title}</span>
                {#if item.notifications > 0}
                    <span class="notification-badge">{item.notifications}</span>
                {/if}
            </a>
        {/each}
    </div>

    <div class="flex flex-col p-4 absolute bottom-10 w-full">
        <a href="/settings" class="menu-item flex gap-2">
            <Settings size={16} />
            <span>Configuración</span>
        </a>
    </div>
</aside>

<style>
    .aside {
        min-width: 200px;
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #d0d7de;
    }
    .menu-item {
        padding: 0.375rem 0.75rem;
        margin-bottom: 0.125rem;
        text-decoration: none;
        color: #24292f;
        transition: all 0.1s ease;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        position: relative;
    }
    .menu-item:hover {
        background-color: #f6f8fa;
        transform: none;
    }

    .item-active {
        background-color: #f6f8fa;
        color: #24292f;
        font-weight: 500;
    }

    .notification-badge {
        position: absolute;
        right: 1rem;
        background: #cf222e;
        color: white;
        border-radius: 9999px;
        padding: 0.125rem 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
    }
</style>
