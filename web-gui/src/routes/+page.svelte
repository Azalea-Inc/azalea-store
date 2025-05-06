<script>
    import { onMount } from "svelte";

    let registries = [];

    async function showRegistries() {
        const response = await fetch("/api/registries");
        const { data } = await response.json();
        registries = data;
    }

    onMount(async () => {
        await showRegistries();
    });
</script>

<div class="flex-1 flex flex-col h-screen bg-gray-50">
    <header class="flex justify-between items-center p-6">
        <h1 class="text-2xl font-semibold text-gray-800">Registro de cajas</h1>
        <button
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
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

    <main class="grid grid-cols-3 p-6">
        {#each registries as registry}
            <div
                class="bg-white rounded-md shadow-sm p-5 border border-gray-200 hover:border-gray-300 transition-all"
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

                <p class="text-gray-600 flex items-center gap-1 mt-2 text-sm">
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
                        <p class="text-base font-semibold text-gray-900">
                            ${registry.openAmount.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div
                    class="mt-4 pt-3 border-t border-gray-100 flex justify-end"
                >
                    <button
                        class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
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
    </main>
</div>
