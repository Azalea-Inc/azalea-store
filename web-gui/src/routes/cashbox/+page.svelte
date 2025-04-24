<script>
    import { onMount } from "svelte";
    import Breadcrumb from "@components/Breadcrumb.svelte";

    const host = "http://localhost:3000/api";
    import AddBoxModal from "@components/cashbox/AddBoxModal.svelte";

    let isOpen = false;
    let boxes = [];

    async function getBoxes() {
        const response = await fetch(`${host}/cashbox`);
        const { data } = await response.json();
        boxes = data;
    }

    onMount(getBoxes);
</script>

<AddBoxModal {isOpen} on:close={() => (isOpen = false)} />
<div class="min-h-screen bg-gray-50 flex flex-col flex-1">
    <div class="p-4 px-8">
        <Breadcrumb />

        <div class="border-b border-gray-200 pb-4 mb-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold text-gray-900">
                    Cajas registradoras
                </h1>
                <button
                    class="btn btn-primary inline-flex items-center"
                    on:click={() => (isOpen = true)}
                >
                    <svg
                        class="w-4 h-4 mr-1"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                        />
                    </svg>
                    Agregar caja
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each boxes as box}
                <div
                    class="bg-white border border-gray-200 rounded-md p-4 hover:border-gray-300"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900">
                            {box.name}
                        </h2>
                        <span
                            class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                        >
                            Activa
                        </span>
                    </div>
                    <p class="mt-2 text-sm text-gray-500 flex items-center">
                        <svg
                            class="w-4 h-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        {box.location}
                    </p>
                    <div class="mt-4 flex items-center justify-between">
                        <a
                            href={`/cashbox/${box.id}`}
                            class="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            Ver detalles →
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .btn {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 0.375rem;
        border: 1px solid transparent;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.2s;
        color: #fff;
        background-color: #1f2937;
        &:hover {
            background-color: #111827;
        }
    }

    .btn-primary {
        background-color: #2da44e;
        &:hover {
            background-color: #2c974b;
        }
    }
</style>
