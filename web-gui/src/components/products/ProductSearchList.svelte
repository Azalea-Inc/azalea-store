<script>
    import { slide } from "svelte/transition";
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

<div
    class="overflow-hidden flex flex-col shadow-sm sm:rounded-2xl bg-white"
    transition={{ slide }}
>
    <div class="px-4 py-3">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 flex-1 max-w-md">
                <input
                    type="text"
                    bind:value={searchTerm}
                    placeholder="Buscar productos..."
                    class="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    on:keydown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    on:click={handleSearch}
                    class="px-4 py-2 text-xs text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                    Buscar
                </button>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-600">Items por página:</span>
                <select
                    bind:value={$state.limit}
                    on:change={() => state.getProducts()}
                    class="text-xs border rounded px-2 py-1"
                >
                    <option value={5}>5</option>
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
                    class="px-2 py-1 border rounded hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >Anterior</button
                >
                {#each Array($state.totalPages) as _, i}
                    <button
                        on:click={() => handlePageClick(i + 1)}
                        class="px-2 py-1 {$state.page === i + 1
                            ? 'bg-gray-200'
                            : 'border'} rounded hover:bg-gray-50 text-xs"
                        >{i + 1}</button
                    >
                {/each}
                <button
                    on:click={handleNextPage}
                    disabled={$state.page === $state.totalPages}
                    class="px-2 py-1 border rounded hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>

    {#if !$state.products.length}
        <div
            class="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm"
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
            <p class="text-lg font-medium text-center text-gray-600">
                No hay productos disponibles
            </p>
            <p class="text-sm text-center mt-2 text-gray-500">
                Agrega un nuevo producto utilizando el botón "Agregar"
            </p>
        </div>
    {/if}

    <!-- <div class="overflow-y-auto">
            <table class="w-full text-xs text-left text-gray-700">
                <thead class="text-2xs sticky top-0 bg-white">
                    <tr>
                        <th
                            scope="col"
                            class="px-4 py-3 cursor-pointer"
                            on:click={() => handleSort("name")}
                        >
                            Nombre {sortField === "name"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-3">Descripción</th>
                        <th
                            scope="col"
                            class="px-4 py-3 cursor-pointer"
                            on:click={() => handleSort("price")}
                        >
                            Precio {sortField === "price"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-3">Stock</th>
                        <th
                            scope="col"
                            class="px-4 py-3 cursor-pointer"
                            on:click={() => handleSort("code")}
                        >
                            Código {sortField === "code"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-4 py-3">Estado</th>
                        <th scope="col" class="px-4 py-3">Actualización</th>
                        <th scope="col" class="px-4 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $state.products as product}
                        <tr
                            class="bg-white hover:bg-gray-100 border-b border-gray-200 transition-colors"
                        >
                            <td
                                class="px-4 py-3 font-medium whitespace-nowrap text-gray-900"
                            >
                                {product.name}
                            </td>
                            <td class="px-4 py-3">
                                {product.description}
                            </td>
                            <td class="px-4 py-3 font-medium">
                                ${product.price}
                            </td>
                            <td class="px-4 py-3">
                                {product.stock} unidades
                            </td>
                            <td class="px-4 py-3 font-mono">
                                {product.code}
                            </td>
                            <td class="px-4 py-3">
                                <span
                                    class={`px-2 py-1 rounded-full text-2xs font-medium ${STATUS[product.status]?.class || STATUS.inactive.class}`}
                                >
                                    {STATUS[product.status]?.text ||
                                        STATUS.inactive.text}
                                </span>
                            </td>
                            <td class="px-4 py-3 text-gray-500">
                                {new Date(
                                    product.updatedAt,
                                ).toLocaleDateString()}
                            </td>
                            <td class="px-4 py-3">
                                <a
                                    class="text-blue-600 hover:text-blue-800"
                                    href={`/products/${product.id}`}
                                >
                                    Ver detalles
                                </a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div> -->
</div>
