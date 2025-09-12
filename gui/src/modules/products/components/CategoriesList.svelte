<script>
    let categories = [
        { name: "Electrónica", count: 10, selected: true },
        { name: "Snacks", count: 27 },
        { name: "Lácteos", count: 14 },
        { name: "Carnes frías", count: 12 },
        { name: "Frutas", count: 36 },
        { name: "Verduras", count: 30 },
        { name: "Abarrotes", count: 44 },
        { name: "Limpieza", count: 20 },
        { name: "Farmacia", count: 22 },
        { name: "Papelería", count: 19 },
        { name: "Juguetes", count: 13 },
        { name: "Ropa", count: 28 },
        { name: "Accesorios", count: 16 },
        { name: "Hogar", count: 25 },
        { name: "Bebidas", count: 20 },
        { name: "Hogar", count: 25 },
        { name: "Bebidas", count: 20 },
        { name: "Hogar", count: 25 },
        { name: "Bebidas", count: 20 },

        { name: "Hogar", count: 25 },
        { name: "Bebidas", count: 20 },

        { name: "Hogar", count: 25 },
        { name: "Bebidas", count: 20 },
    ];

    let search = "";

    function handleCategoryClick(cat) {
        categories = categories.map((c) => {
            c.selected = c.name === cat.name;
            return c;
        });
    }

    function handleCleanCategories() {
        categories = categories.map((c) => {
            c.selected = false;
            return c;
        });
    }

    $: filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
    );
</script>

<div class="pb-6 pl-6">
    <aside
        class="flex flex-col w-52 border-gray-300 h-full rounded-lg"
        aria-label="Aside de categorías"
    >
        <div class="py-2 border-gray-300 bg-gray-50 rounded-t-lg mb-2">
            <h2 class="font-semibold tracking-wide text-gray-600">
                Categorías
            </h2>
            <div class="flex gap-2">
                <input
                    type="text"
                    bind:value={search}
                    placeholder="Buscar..."
                    class="mt-3 w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                />

                <button
                    on:click={handleCleanCategories}
                    class="btn btn-small mt-3"
                    aria-label="Limpiar categorías"
                >
                    <svg
                        class="w-3 h-3 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>

        <nav role="navigation" class="overflow-y-scroll pr-4">
            {#if filteredCategories.length === 0}
                <div class="p-2 text-center text-gray-500">
                    No hay categorías disponibles.
                </div>
            {/if}

            <ul class="space-y-1">
                {#each filteredCategories as cat}
                    <li>
                        <button
                            on:click={() => handleCategoryClick(cat)}
                            class="{cat.selected
                                ? 'bg-blue-100 text-blue-600 hover:border-blue-300'
                                : 'text-gray-700 hover:bg-gray-200 hover:border-gray-300'} border border-transparent w-full text-left px-3 py-2 rounded-md text-sm transition-colors"
                        >
                            {cat.name}
                            {#if cat.count > 0}
                                <span class="ml-2 text-xs text-gray-500"
                                    >{cat.count}</span
                                >
                            {/if}
                        </button>
                    </li>
                {/each}
            </ul>
        </nav>
    </aside>
</div>
