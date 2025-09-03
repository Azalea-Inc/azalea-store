<script>
    import Breadcrumb from "@components/Breadcrumb.svelte";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    $: id = $page.params.id;

    let cashbox = {};
    $: records = [];
    const host = "http://localhost:3000";

    async function fetchCashbox() {
        try {
            const response = await fetch(host + `/api/cashbox/${id}`);
            const { data } = await response.json();
            cashbox = data;
        } catch (error) {
            console.error("Error fetching cashbox:", error);
        }
    }

    async function fetchRecords() {
        try {
            const response = await fetch(
                host + `/api/cashbox/${id}/registries`,
            );
            const { data } = await response.json();
            records = data;
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    }

    onMount(async () => {
        await fetchCashbox();
        await fetchRecords();
    });
</script>

<div class="min-h-screen bg-gray-50 flex-1">
    <header class="bg-white border-b border-gray-200 pt-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb />
            <div class="py-4">
                <div class="flex items-center">
                    <h1 class="text-2xl font-semibold text-gray-900">
                        {cashbox.name}
                    </h1>
                    <span
                        class="ml-4 px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                        📍 {cashbox.location || "No location specified"}
                    </span>
                </div>
            </div>

            <nav class="flex space-x-8" aria-label="Tabs">
                <button
                    class="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                    Registros
                </button>
                <button
                    class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                    Configuración
                </button>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Fecha de apertura
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Fecha de cierre
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Monto de apertura
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Monto de cierre
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Usuario
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#if records.length === 0}
                        <tr>
                            <td
                                colspan="5"
                                class="px-6 py-10 text-center text-sm text-gray-500 bg-gray-50"
                            >
                                No se encontraron resultados
                            </td>
                        </tr>
                    {:else}
                        {#each records as record}
                            <tr class="hover:bg-gray-50">
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {new Date(
                                        record.openDate,
                                    ).toLocaleDateString()}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {new Date(
                                        record.closeDate,
                                    ).toLocaleDateString()}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600"
                                >
                                    ${record.openAmount.toFixed(2)}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600"
                                >
                                    ${record.closeAmount.toFixed(2)}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {record.user_id || "Anónimo"}
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </main>
</div>
