<script>
    import { slide } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import { productsPageStore } from "@modules/products/viewmodel/ProductsPageStore";
    import { onMount, onDestroy } from "svelte";
    import Dropdown from "@components/Dropdown.svelte";

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
                field === "salePrice"
                    ? a[field]
                    : String(a[field]).toLowerCase();
            const bValue =
                field === "salePrice"
                    ? b[field]
                    : String(b[field]).toLowerCase();

            if (sortDirection === "asc") {
                return field === "salePrice"
                    ? aValue - bValue
                    : aValue.localeCompare(bValue);
            } else {
                return field === "salePrice"
                    ? bValue - aValue
                    : bValue.localeCompare(aValue);
            }
        });
    }
</script>

{#if $state.inLoading}
    <Spinner />
{:else if !$state.products.length}
    <div class="px-6 pb-4">
        <EmptyState
            title="No hay productos disponibles"
            description="Aún no se han agregado productos"
        >
            <button
                class="btn btn-primary"
                on:click={() => state.addProductHandler()}
                >Agregar producto</button
            >
        </EmptyState>
    </div>
{:else}
    <div
        class="flex flex-col flex-1 px-6 pb-4 overflow-hidden"
        transition={{ slide }}
    >
        <div class="overflow-y-auto box-table flex-1">
            <table
                class="w-full text-xs text-left text-gray-700 border-collapse"
            >
                <thead
                    class="text-xs bg-gray-50 border-b border-black sticky top-0"
                >
                    <tr>
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
                        <th
                            scope="col"
                            class="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b"
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
                            on:click={() => handleSort("salePrice")}
                        >
                            Precio venta {sortField === "salePrice"
                                ? sortDirection === "asc"
                                    ? "↑"
                                    : "↓"
                                : ""}
                        </th>
                        <th scope="col" class="px-3 py-1.5">Stock</th>
                        <th scope="col" class="px-3 py-1.5">Estado</th>
                        <th scope="col" class="px-3 py-1.5"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 text-xs">
                    {#each $state.products as product (product.id)}
                        <tr
                            class="hover:bg-gray-100 transition-colors"
                            animate:flip={{ duration: 300 }}
                        >
                            <td class="px-3 py-1.5 font-mono">
                                {product.code}
                            </td>
                            <td
                                class="px-3 py-1.5 font-medium whitespace-nowrap text-gray-900"
                            >
                                {product.name}
                            </td>
                            <td class="px-3 py-1.5">
                                {product.description}
                            </td>

                            <td class="px-3 py-1.5 font-medium">
                                {new Intl.NumberFormat("es-MX", {
                                    style: "currency",
                                    currency: "MXN",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(product.salePrice)}
                            </td>
                            <td class="px-3 py-1.5">
                                {product.stock}
                                {product.unitOfMeasure}
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
                            <td class="px-3 py-1.5">
                                <Dropdown>
                                    <button
                                        slot="trigger"
                                        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                                        aria-label="Opciones de usuario"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="w-5 h-5"
                                        >
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                            />
                                        </svg>
                                    </button>

                                    <ul class="dropdown-menu">
                                        <li>
                                            <button
                                                class="dropdown-btn"
                                                on:click={() =>
                                                    state.editProductHandler(
                                                        product,
                                                    )}
                                            >
                                                <svg
                                                    class="w-4 h-4 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
                                                    ></path>
                                                </svg>
                                                Editar
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                class="dropdown-btn danger"
                                                on:click={() =>
                                                    state.deleteProductHandler(
                                                        product.id,
                                                    )}
                                            >
                                                <svg
                                                    class="w-4 h-4 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"
                                                    ></path>
                                                </svg>
                                                Eliminar
                                            </button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between py-4">
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
