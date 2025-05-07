<script>
    import { slide } from "svelte/transition";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import { onMount, onDestroy } from "svelte";

    const state = productsPageStore;

    onMount(() => state.getProducts());
    onDestroy(() => state.resetState());

    let searchTerm = "";
    let sortDirection = "asc";
    let sortField = "price";

    const STATUS = {
        active: {
            class: "bg-green-100 text-green-800",
            text: "Activo",
        },
        inactive: {
            class: "bg-red-100 text-red-800",
            text: "Inactivo",
        },
    };

    function onItemsHandle() {
        $state.page = 1;
        state.getProducts();
    }

    function handlePrevPage() {
        if ($state.page > 1) {
            $state.page--;
        }
        state.getProducts();
    }

    function handleNextPage() {
        if ($state.page < $state.totalPages) $state.page++;
        state.getProducts();
    }

    function handlePageClick(p) {
        $state.page = p;
        state.getProducts();
    }

    function handleSearch() {
        $state.page = 1;
    }

    function handleSort(field) {
        if (sortField === field) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortField = field;
            sortDirection = "asc";
        }

        $state.products = $state.products.sort((a, b) => {
            const aValue =
                field === "price" ? a[field] : String(a[field]).toLowerCase();
            const bValue =
                field === "price" ? b[field] : String(b[field]).toLowerCase();

            if (sortDirection === "asc") {
                return field === "price"
                    ? aValue - bValue
                    : aValue.localeCompare(bValue);
            } else {
                return field === "price"
                    ? bValue - aValue
                    : bValue.localeCompare(aValue);
            }
        });
    }
</script>

{#if $state.inLoading}
    <Spinner />
{:else if !$state.products.length}
    <EmptyState
        title="No hay productos disponibles"
        description="Aún no se han agregado productos"
    >
        <button class="btn btn-primary">Agregar producto</button>
    </EmptyState>
{:else}
    <div class="overflow-hidden flex flex-col box" transition={{ slide }}>
        <div class="flex items-center justify-between pb-4">
            <div class="flex items-center gap-1">
                <span class="text-xs text-gray-600">Items por página:</span>
                <select
                    bind:value={$state.limit}
                    on:change={onItemsHandle}
                    class="text-xs border border-gray-300 rounded-md px-1 py-0.5"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <div class="flex gap-2">
                <button
                    on:click={handlePrevPage}
                    disabled={state.page === 1}
                    class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >Anterior</button
                >
                {#if $state.totalPages <= 6}
                    {#each Array($state.totalPages) as _, i}
                        <button
                            on:click={() => handlePageClick(i + 1)}
                            class="px-2 py-1 {$state.page === i + 1
                                ? 'bg-[#0969da] text-white border-[#0969da]'
                                : 'border-gray-300 hover:bg-gray-50'} border rounded-md text-xs"
                            >{i + 1}</button
                        >
                    {/each}
                {:else}
                    {#each [1, 2, 3, 4, 5, $state.totalPages].filter((p, i, arr) => i === arr.indexOf(p) && p <= $state.totalPages && (p <= 3 || p >= $state.totalPages || p === $state.page || p === $state.page - 1 || p === $state.page + 1)) as page}
                        <button
                            on:click={() => handlePageClick(page)}
                            class="px-2 py-1 {$state.page === page
                                ? 'bg-[#0969da] text-white border-[#0969da]'
                                : 'border-gray-300 hover:bg-gray-50'} border rounded-md text-xs"
                            >{page}</button
                        >
                    {/each}
                {/if}
                <button
                    on:click={handleNextPage}
                    disabled={$state.page === $state.totalPages}
                    class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >Siguiente</button
                >
            </div>
            <span class="text-xs text-gray-600"
                >Mostrando {($state.page - 1) * $state.limit + 1}-{Math.min(
                    $state.page * $state.limit,
                    $state.total,
                )} de {$state.total} resultados</span
            >
        </div>
        <div class="overflow-y-auto">
            <table class="w-full text-xs text-left text-gray-700">
                <thead class="text-xs bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th
                            scope="col"
                            class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("name")}
                        >
                            Nombre {sortField === "name"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-3 py-1.5">Descripción</th>
                        <th
                            scope="col"
                            class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("price")}
                        >
                            Precio {sortField === "price"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-3 py-1.5">Stock</th>
                        <th
                            scope="col"
                            class="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("code")}
                        >
                            Código {sortField === "code"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-3 py-1.5">Estado</th>
                        <th scope="col" class="px-3 py-1.5">Actualización</th>
                        <th scope="col" class="px-3 py-1.5">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 text-xs">
                    {#each $state.products as product}
                        <tr class="bg-white hover:bg-gray-50 transition-colors">
                            <td
                                class="px-3 py-1.5 font-medium whitespace-nowrap text-gray-900"
                            >
                                {product.name}
                            </td>
                            <td class="px-3 py-1.5">
                                {product.description}
                            </td>
                            <td class="px-3 py-1.5 font-medium">
                                ${product.price}
                            </td>
                            <td class="px-3 py-1.5">
                                {product.stock} unidades
                            </td>
                            <td class="px-3 py-1.5 font-mono">
                                {product.code}
                            </td>
                            <td class="px-3 py-1.5">
                                <span
                                    class={`px-1.5 py-0.5 rounded-full text-2xs font-medium ${product.isActive ? STATUS.active.class : STATUS.inactive.class}`}
                                >
                                    {product.isActive
                                        ? STATUS.active.text
                                        : STATUS.inactive.text}
                                </span>
                            </td>
                            <td class="px-3 py-1.5 text-gray-500">
                                {new Date(
                                    product.updatedAt,
                                ).toLocaleDateString()}
                            </td>
                            <td class="px-3 py-1.5">
                                <button
                                    class="text-[#0969da] hover:underline text-xs"
                                    on:click={() =>
                                        state.openProductDetail(product.id)}
                                >
                                    Ver detalles
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}

<style>
    th {
        font-weight: 600;
        font-size: 12px;
        color: #24292f;
    }

    :global(.text-2xs) {
        font-size: 0.625rem;
    }
</style>
