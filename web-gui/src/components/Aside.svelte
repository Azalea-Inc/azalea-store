<script>
    import { page } from "$app/stores";
    import {
        ShoppingCart,
        Package,
        Box,
        Settings,
        NotebookPen,
    } from "lucide-svelte";

    let menu = [
        {
            title: "Ventas",
            href: "/",
            icon: ShoppingCart,
            notifications: 0,
        },
        {
            title: "Inventario",
            href: "/inventory",
            icon: NotebookPen,
            notifications: 0,
        },
        {
            title: "Productos",
            href: "/products",
            icon: Package,
            notifications: 0,
        },
        {
            title: "Cajas",
            href: "/cashbox",
            icon: Box,
            notifications: 0,
        },
    ];
</script>

<aside class="min-h-screen aside border-r flex flex-col overflow-hidden">
    <div class="p-4">
        <div class="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-12 h-12 rounded-full mr-2 p-2 bg-gray-100"
            >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <div>
                <h2 class="text-lg font-bold">Usuario</h2>
                <a href="/profile" class="text-sm text-gray-500"
                    >Apartado de usuario</a
                >
            </div>
        </div>
    </div>

    <div class="flex flex-col p-4 flex-1">
        {#each menu as item}
            <a
                class:item-active={item.href === $page.url.pathname ||
                    $page.url.pathname.startsWith(item.href + "/")}
                href={item.href}
                class="menu-item"
            >
                <svelte:component this={item.icon} size={18} class="mr-2" />
                <span>{item.title}</span>
                {#if item.notifications > 0}
                    <span class="notification-badge">{item.notifications}</span>
                {/if}
            </a>
        {/each}
    </div>

    <div class="flex flex-col p-4 absolute bottom-10 w-full">
        <a href="/settings" class="menu-item flex gap-2">
            <Settings size={18} />
            <span>Configuración</span>
        </a>
    </div>
</aside>

<style>
    .aside {
        min-width: 180px;
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        overflow-y: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-right: 1px solid #f0f0f0;
    }
    .menu-item {
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
        text-decoration: none;
        color: #666666;
        transition: all 0.2s ease;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        position: relative;
    }
    .menu-item:hover {
        background-color: #f5f5f5;
        transform: translateX(4px);
    }

    .item-active {
        background-color: #f8f8f8;
        color: #333333;
        /* font-weight: 600; */
    }

    .notification-badge {
        position: absolute;
        right: 1rem;
        background: #ef4444;
        color: white;
        border-radius: 9999px;
        padding: 0.1rem 0.5rem;
        font-size: 0.75rem;
    }
</style>
