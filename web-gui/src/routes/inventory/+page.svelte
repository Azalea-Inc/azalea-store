<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Spinner from "@components/Spinner.svelte";

    let inventory = [];
    let loading = true;
    let searchQuery = "";

    let filteredInventory = [];

    $: {
        filteredInventory = inventory.filter((item) =>
            item.product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }

    async function showInventory() {
        loading = true;
        try {
            const response = await fetch("/api/inventory");
            const { data } = await response.json();
            inventory = data;
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        await showInventory();
    });
</script>

<div class="flex-1 flex flex-col h-screen bg-gray-50">
    <header
        class="flex justify-between items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10"
    >
        <h1 class="text-2xl font-bold text-gray-900">Registro de Inventario</h1>
        <div class="flex items-center gap-4">
            <div class="relative">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Buscar producto..."
                    class="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 absolute left-2.5 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <button
                class="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Añadir producto
            </button>
        </div>
    </header>

    <main class="p-4 overflow-auto flex-1">
        {#if loading}
            <Spinner></Spinner>
        {:else if filteredInventory.length === 0}
            <div
                class="flex flex-col items-center justify-center h-64 text-gray-600 bg-white border border-gray-200 rounded-md shadow-sm p-6"
                in:fade
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 mb-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p class="text-lg font-medium">No se encontraron productos</p>
                <p class="text-gray-500 mt-1 text-sm">
                    Intenta con otra búsqueda o añade un nuevo producto
                </p>
            </div>
        {:else}
            <div
                class="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
            >
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Codigo
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Producto
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Estado
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Cantidad
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Precio
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Precio venta
                                </th>

                                <th
                                    scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each filteredInventory as item, i}
                                <tr
                                    in:fly={{
                                        y: 10,
                                        delay: i * 30,
                                        duration: 200,
                                    }}
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {item.product.code}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            {item.product.name}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span
                                            class={`px-2 py-1 text-xs font-medium rounded-full ${
                                                item.stock > 10
                                                    ? "bg-green-100 text-green-800"
                                                    : item.stock > 0
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {item.stock > 10
                                                ? "En stock"
                                                : item.stock > 0
                                                  ? "Stock bajo"
                                                  : "Agotado"}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div
                                                class={`w-2 h-2 rounded-full mr-2 ${item.stock > 10 ? "bg-green-500" : item.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`}
                                            ></div>
                                            <div class="text-sm text-gray-900">
                                                {item.stock} unidades
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        ${item.product.price.toFixed(2)}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        ${item.price.toFixed(2)}
                                    </td>
                                    <td
                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                    >
                                        <div class="flex justify-end space-x-3">
                                            <button
                                                class="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                Ver
                                            </button>
                                            <button
                                                class="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
    </main>
</div>
