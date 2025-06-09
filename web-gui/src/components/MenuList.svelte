<script>
    export let items = [];
    export let buttonIcon = {
        viewBox: "0 0 20 20",
        path: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z",
    };

    function handleItemClick(item) {
        item.onClick();
    }
</script>

<div class="ml-auto relative group">
    <button
        title="Opciones de usuario"
        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full group-hover:text-gray-700 group-hover:bg-gray-100"
        aria-label="Opciones de usuario"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={buttonIcon.viewBox}
            fill="currentColor"
            class="w-5 h-5"
        >
            <path d={buttonIcon.path} />
        </svg>
    </button>

    <div
        class="absolute right-0 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden group-hover:block"
    >
        <ul class="py-1">
            {#each items as item}
                <li>
                    <button
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        on:click={() => handleItemClick(item)}
                    >
                        {#if item.icon}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={item.icon.viewBox || "0 0 20 20"}
                                fill="currentColor"
                                class="w-4 h-4 mr-2 text-gray-700"
                            >
                                <path d={item.icon.path} fill-rule="evenodd" />
                            </svg>
                        {/if}
                        {item.label}
                    </button>
                </li>
            {/each}
        </ul>
    </div>
</div>
