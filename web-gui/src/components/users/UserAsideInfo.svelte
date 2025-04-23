<script>
    import { userStore } from "@store/UserStore";
</script>

<div class="p-4">
    <div class="flex items-center">
        {#if $userStore.avatar}
            <img
                src={$userStore.avatar}
                alt="Imagen de usuario"
                class="w-12 h-12 rounded-full mr-2 object-cover"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-12 h-12 rounded-full mr-2 p-2 bg-gray-100 hidden"
            >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
        {:else}
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
        {/if}
        <div>
            <h2 class="text-lg font-bold">{$userStore.name}</h2>
            <a href="/profile" class="text-sm text-gray-500 hover:underline"
                >Ver perfil</a
            >
        </div>
    </div>
</div>
