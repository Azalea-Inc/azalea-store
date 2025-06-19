<script>
    import { userStore } from "@store/UserStore";
</script>

<div class="p-4 pb-0">
    <div class="flex items-center">
        {#if $userStore.avatar}
            <img
                src={$userStore.avatar}
                alt="Imagen de usuario"
                class="w-8 h-8 rounded-full mr-3 object-cover border-2 border-gray-200"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-12 h-12 rounded-full mr-3 p-2 bg-gray-200 hidden"
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
                class="w-12 h-12 rounded-full mr-3 p-2 bg-gray-200"
            >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
        {/if}
        <div>
            <a
                href="/profile"
                class="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >{$userStore.name}</a
            >
        </div>
    </div>
</div>
