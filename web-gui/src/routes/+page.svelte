<script>
    import { onMount } from "svelte";

    let registries = [];
    let isLoading = true;
    let error = null;

    async function showRegistries() {
        try {
            isLoading = true;
            const response = await fetch("/api/registries");
            if (!response.ok) {
                throw new Error("No se pudieron cargar los registros");
            }
            const { data } = await response.json();
            registries = data;
        } catch (err) {
            error = err.message;
            console.error("Error al cargar registros:", err);
        } finally {
            isLoading = false;
        }
    }

    onMount(async () => {
        await showRegistries();
    });
</script>

<div class="flex-1 flex flex-col h-screen bg-gray-100">
    <header
        class="flex justify-between items-center p-6 bg-white border-b border-gray-200 sticky top-0 z-10"
    >
        <div class="flex items-center">
            <h1 class="text-2xl font-semibold text-gray-900">
                Registro de cajas
            </h1>
            <span
                class="ml-3 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                >{registries.length || 0} registros</span
            >
        </div>
        <button
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            Abrir caja
        </button>
    </header>

    <main class="p-6">
        {#if isLoading}
            <div class="flex justify-center items-center py-12">
                <div
                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
                ></div>
                <span class="ml-3 text-gray-700">Cargando registros...</span>
            </div>
        {:else if error}
            <div
                class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6"
            >
                <p class="flex items-center">
                    <svg
                        class="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            </div>
        {:else if registries.length === 0}
            <div
                class="bg-white border border-gray-200 rounded-lg p-8 text-center"
            >
                <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">
                    No hay registros
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                    Comienza abriendo una nueva caja.
                </p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each registries as registry}
                    <div
                        class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                    >
                        <div class="flex justify-between items-start">
                            <h2 class="text-lg font-semibold text-gray-900">
                                {registry.cashBox.name}
                            </h2>
                            <span
                                class={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                    registry.isOpen
                                        ? "bg-green-100 text-green-700 border border-green-200"
                                        : "bg-red-100 text-red-700 border border-red-200"
                                }`}
                            >
                                {registry.isOpen ? "Abierta" : "Cerrada"}
                            </span>
                        </div>

                        <p
                            class="text-gray-600 flex items-center gap-1 mt-2 text-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            {registry.cashBox.location}
                        </p>

                        <div
                            class="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200"
                        >
                            <div class="flex justify-between items-center">
                                <p class="text-gray-700 text-sm font-medium">
                                    Monto inicial:
                                </p>
                                <p
                                    class="text-base font-semibold text-gray-900"
                                >
                                    ${registry.openAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div
                            class="mt-4 pt-3 border-t border-gray-100 flex justify-end"
                        >
                            <button
                                class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:bg-blue-50 rounded-md px-3 py-1 transition-colors"
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
                                Ver detalles
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </main>
</div>
