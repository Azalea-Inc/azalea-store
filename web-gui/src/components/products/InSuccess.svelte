<script>
    import { slide } from "svelte/transition";
    import Spinner from "@components/Spinner.svelte";
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
    <div
        class="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-md border border-gray-200"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
        </svg>
        <p class="text-lg font-medium text-center text-gray-900">
            No hay productos disponibles
        </p>
        <p class="text-sm text-center mt-2 text-gray-600">
            Agrega un nuevo producto utilizando el botón "Agregar"
        </p>
    </div>
{:else}
    <div
        class="overflow-hidden flex flex-col border border-gray-200 rounded-md bg-white"
        transition={{ slide }}
    >
        <div class="px-4 py-3 border-b border-gray-200">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2 flex-1 max-w-md">
                    <input
                        type="text"
                        bind:value={searchTerm}
                        placeholder="Buscar productos..."
                        class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        on:keydown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        on:click={handleSearch}
                        class="px-3 py-1.5 text-sm text-white bg-[#2da44e] rounded-md hover:bg-[#2c974b] border border-[#288b46]"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Items por página:</span>
                    <select
                        bind:value={$state.limit}
                        on:change={onItemsHandle}
                        class="text-sm border border-gray-300 rounded-md px-2 py-1"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div class="flex gap-1">
                    <button
                        on:click={handlePrevPage}
                        disabled={state.page === 1}
                        class="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >Anterior</button
                    >
                    {#if $state.totalPages <= 6}
                        {#each Array($state.totalPages) as _, i}
                            <button
                                on:click={() => handlePageClick(i + 1)}
                                class="px-3 py-1.5 {$state.page === i + 1
                                    ? 'bg-[#0969da] text-white border-[#0969da]'
                                    : 'border-gray-300 hover:bg-gray-50'} border rounded-md text-sm"
                                >{i + 1}</button
                            >
                        {/each}
                    {:else}
                        {#each [1, 2, 3, 4, 5, $state.totalPages].filter((p, i, arr) => i === arr.indexOf(p) && p <= $state.totalPages && (p <= 3 || p >= $state.totalPages || p === $state.page || p === $state.page - 1 || p === $state.page + 1)) as page}
                            <button
                                on:click={() => handlePageClick(page)}
                                class="px-3 py-1.5 {$state.page === page
                                    ? 'bg-[#0969da] text-white border-[#0969da]'
                                    : 'border-gray-300 hover:bg-gray-50'} border rounded-md text-sm"
                                >{page}</button
                            >
                        {/each}
                    {/if}
                    <button
                        on:click={handleNextPage}
                        disabled={$state.page === $state.totalPages}
                        class="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >Siguiente</button
                    >
                </div>
                <span class="text-sm text-gray-600"
                    >Mostrando {($state.page - 1) * $state.limit + 1}-{Math.min(
                        $state.page * $state.limit,
                        $state.total,
                    )} de {$state.total} resultados</span
                >
            </div>
        </div>
        <div class="overflow-y-auto">
            <table class="w-full text-sm text-left text-gray-700">
                <thead class="text-sm bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th
                            scope="col"
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("name")}
                        >
                            Nombre {sortField === "name"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-2">Descripción</th>
                        <th
                            scope="col"
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("price")}
                        >
                            Precio {sortField === "price"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-2">Stock</th>
                        <th
                            scope="col"
                            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            on:click={() => handleSort("code")}
                        >
                            Código {sortField === "code"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-2">Estado</th>
                        <th scope="col" class="px-4 py-2">Actualización</th>
                        <th scope="col" class="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    {#each $state.products as product}
                        <tr class="bg-white hover:bg-gray-50 transition-colors">
                            <td
                                class="px-4 py-2 font-medium whitespace-nowrap text-gray-900"
                            >
                                {product.name}
                            </td>
                            <td class="px-4 py-2">
                                {product.description}
                            </td>
                            <td class="px-4 py-2 font-medium">
                                ${product.price}
                            </td>
                            <td class="px-4 py-2">
                                {product.stock} unidades
                            </td>
                            <td class="px-4 py-2 font-mono">
                                {product.code}
                            </td>
                            <td class="px-4 py-2">
                                <span
                                    class={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? STATUS.active.class : STATUS.inactive.class}`}
                                >
                                    {product.isActive
                                        ? STATUS.active.text
                                        : STATUS.inactive.text}
                                </span>
                            </td>
                            <td class="px-4 py-2 text-gray-500">
                                {new Date(
                                    product.updatedAt,
                                ).toLocaleDateString()}
                            </td>
                            <td class="px-4 py-2">
                                <button
                                    class="text-[#0969da] hover:underline"
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
    .product-card {
        padding: 1rem;
        border-radius: 6px;
        box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
        background-color: #fff;
        transition: background-color 0.2s ease;
        cursor: pointer;
        &:hover {
            background-color: #f6f8fa;
        }

        font-size: 0.875rem;
        color: #24292f;
        border: 1px solid #d0d7de;
    }

    .btn {
        padding: 5px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        background-color: #2da44e;
        border: 1px solid rgba(27, 31, 36, 0.15);
        box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1);
        transition: all 0.2s ease;
        &:hover {
            background-color: #2c974b;
        }
    }

    .btn-primary {
        background-color: #2da44e;
        &:hover {
            background-color: #2c974b;
        }
    }

    .btn-secondary {
        background-color: #f6f8fa;
        color: #24292f;
        border: 1px solid rgba(27, 31, 36, 0.15);
        &:hover {
            background-color: #f3f4f6;
            border-color: rgba(27, 31, 36, 0.15);
        }
    }

    th {
        font-weight: 600;
        font-size: 14px;
        color: #24292f;
    }
</style>
