<script>
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
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
            console.log(data);
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

<div class="h-screen flex-1">
    <header class="p-4 border-b border-gray-200">
        <Breadcrumb />
        <div class="mb-2">
            <h1 class="text-2xl font-bold">{cashbox.name}</h1>
            <p class="text-gray-600 pt-4">
                📍
                {cashbox.location || "No location specified"}
            </p>
        </div>

        <nav class="flex gap-2 items-center">
            <button
                class="py-2 px-4 border-b-2 border-blue-500 font-medium text-blue-600 cursor-pointer"
            >
                Registros
            </button>
            <button
                class="py-2 px-4 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
            >
                Configuración
            </button>
        </nav>
    </header>

    <main class="p-4">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Fecha de apertura</th
                        >
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Fecha de cierre</th
                        >
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Monto de apertura</th
                        >
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Monto de cierre</th
                        >
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >Usuario</th
                        >
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#if records.length === 0}
                        <tr>
                            <td
                                colspan="5"
                                class="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                No se encontraron resultados
                            </td>
                        </tr>
                    {:else}
                        {#each records as record}
                            <tr class="hover:bg-gray-50">
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >{new Date(
                                        record.openDate,
                                    ).toLocaleDateString()}</td
                                >

                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >{new Date(
                                        record.closeDate,
                                    ).toLocaleDateString()}</td
                                >

                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                >
                                    ${record.openAmount.toFixed(2)}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                >
                                    ${record.closeAmount.toFixed(2)}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >{record.user_id || "Anónimo"}</td
                                >
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </main>
</div>
