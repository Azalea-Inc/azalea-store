<script>
    import { onMount } from "svelte";

    const host = "http://localhost:3000/api";

    let boxes = [];

    async function getBoxes() {
        const response = await fetch(`${host}/cashbox`);
        const { data } = await response.json();
        boxes = data;
    }

    onMount(getBoxes);
</script>

<div class="h-screen overflow-y-auto flex flex-col p-10 flex-1 bg-gray-50">
    <nav class="flex flex-row items-center justify-between w-full">
        <h1 class="text-2xl font-bold text-gray-600">Cajas registradoras</h1>

        <button class="btn btn-primary">Agregar caja</button>
    </nav>
    <main class="flex-1 pt-6">
        <div class="grid grid-cols-3 gap-6">
            {#each boxes as box}
                <div class="bg-white rounded-lg hover:shadow-md shadow-lg p-4">
                    <h2 class="text-lg text-gray-600 font-bold">{box.name}</h2>
                    <p class="text-gray-500">📍 {box.location}</p>

                    <div class="pt-4">
                        <a
                            href={`/cashbox/${box.id}`}
                            class="text-blue-600 hover:text-blue-800 underline"
                            >Más información</a
                        >
                    </div>
                </div>
            {/each}
        </div>
    </main>
</div>

<style>
    .btn {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.55rem;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .btn-primary {
        background-color: #10b981;
        color: white;
        border: 1px solid #10b981;
    }

    .btn-primary:hover {
        background-color: #059669;
        border-color: #059669;
    }
</style>
