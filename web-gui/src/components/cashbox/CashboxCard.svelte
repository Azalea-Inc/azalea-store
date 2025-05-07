<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let box;
    function handleDelete() {
        if (!confirm("¿Estás seguro que deseas borrar esta caja?")) {
            return;
        }
        dispatch("delete");
    }
</script>

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
        <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
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
        <button
            on:click={handleDelete}
            class="text-sm font-medium text-red-600 hover:text-red-800 flex items-center"
        >
            <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                />
            </svg>
            Borrar
        </button>
    </div>
</div>
