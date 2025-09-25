<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    const dispatch = createEventDispatcher();
    export let totalItems;

    let limit = 50;
    let currentPage = 1;

    $: totalPages = Math.ceil(totalItems / limit);
    $: startItem = (currentPage - 1) * limit + 1;
    $: endItem = Math.min(currentPage * limit, totalItems);
    $: pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const limitOptions = [10, 20, 50, 100];

    function handleLimitChange() {
        currentPage = 1;
        dispatchChange();
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage -= 1;
            dispatchChange();
        }
    }

    function goToPage(page) {
        currentPage = page;
        dispatchChange();
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            dispatchChange();
        }
    }

    function dispatchChange() {
        dispatch("change", { page: currentPage, limit });
    }

    onMount(() => {
        dispatchChange();
    });
</script>

<div class="flex items-center justify-between py-4">
    <div class="flex items-center gap-1">
        <span class="text-xs text-gray-600">Items por página:</span>
        <select
            bind:value={limit}
            on:change={handleLimitChange}
            class="text-xs border border-gray-300 rounded-md px-1 py-0.5"
        >
            {#each limitOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>

    <div class="flex gap-2">
        <button
            disabled={currentPage === 1}
            on:click={goToPreviousPage}
            class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Anterior
        </button>

        {#each pages as page}
            <button
                on:click={() => goToPage(page)}
                class="px-2 py-1 border rounded-md text-xs {page === currentPage
                    ? 'bg-[#0969da] text-white border-[#0969da]'
                    : 'border-gray-300 hover:bg-gray-50'}"
            >
                {page}
            </button>
        {/each}

        <button
            disabled={currentPage === totalPages}
            on:click={goToNextPage}
            class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Siguiente
        </button>
    </div>

    <span class="text-xs text-gray-600">
        Mostrando {startItem}-{endItem} de {totalItems} resultados
    </span>
</div>
