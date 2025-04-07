<script>
    import { goto } from "$app/navigation";
    import { slide } from "svelte/transition";
    export let products = [];

    export let actions;
    export let page = 1;
    export let limit = 20;
    export let total = 0;
    export let totalPages = 1;
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
        if (page > 1) page--;
        actions.setState("loading", { page, limit });
    }

    function handleNextPage() {
        if (page < totalPages) page++;
        actions.setState("loading", { page, limit });
    }

    function handlePageClick(p) {
        page = p;
        actions.setState("loading", { page, limit });
    }

    function handleSearch() {
        page = 1;
        actions.setState("loading", { page, limit, search: searchTerm });
    }

    function handleSort(field) {
        if (sortField === field) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortField = field;
            sortDirection = "asc";
        }

        products = products.sort((a, b) => {
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

{#if !products.length}
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
{:else}
    <div
        class="overflow-hidden shadow-sm sm:rounded-2xl bg-white"
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
                        bind:value={limit}
                        on:change={() =>
                            actions.setState("loading", { page: 1, limit })}
                        class="text-xs border rounded px-2 py-1"
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
                        disabled={page === 1}
                        class="px-2 py-1 border rounded hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >Anterior</button
                    >
                    {#each Array(totalPages) as _, i}
                        <button
                            on:click={() => handlePageClick(i + 1)}
                            class="px-2 py-1 {page === i + 1
                                ? 'bg-gray-200'
                                : 'border'} rounded hover:bg-gray-50 text-xs"
                            >{i + 1}</button
                        >
                    {/each}
                    <button
                        on:click={handleNextPage}
                        disabled={page === totalPages}
                        class="px-2 py-1 border rounded hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >Siguiente</button
                    >
                </div>
                <span class="text-xs text-gray-600"
                    >Mostrando {(page - 1) * limit + 1}-{Math.min(
                        page * limit,
                        total,
                    )} de {total} resultados</span
                >
            </div>
        </div>
        <div class="max-h-[calc(100vh-210px)] overflow-y-auto">
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
                    {#each products as product}
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
        </div>
    </div>
{/if}

<style>
    .product-card {
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
        background-color: #fff;
        transition: background-color 0.3s ease;
        cursor: pointer;
        &:hover {
            background-color: #fafafa;
        }

        font-size: 0.875rem;
        color: #3e3e3e;
        border-color: #f5f5f5;
        border-width: 1px;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: #fff;
        background-color: #666;
        border: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
        &:hover {
            background-color: #555;
            transform: translateY(-1px);
        }
    }

    .btn-primary {
        background-color: #666;
        &:hover {
            background-color: #555;
        }
    }

    .btn-secondary {
        background-color: transparent;
        color: #666;
        box-shadow: none;
        &:hover {
            background-color: rgba(102, 102, 102, 0.1);
        }
    }

    th {
        font-weight: 600;
        font-size: 0.75rem;
        color: #666;
    }
</style>
