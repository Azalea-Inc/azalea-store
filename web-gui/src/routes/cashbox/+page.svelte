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
<div class="h-screen overflow-y-auto flex flex-col p-4 px-8 flex-1 bg-gray-50">
    <Breadcrumb />

    <nav class="flex flex-row items-center justify-between w-full">
        <h1 class="text-2xl font-bold">Cajas registradoras</h1>

        <button class="btn btn-primary" on:click={() => (isOpen = true)}
            >Agregar caja</button
        >
    </nav>
    <main class="flex-1 pt-6">
        <div class="grid grid-cols-3 gap-6">
            {#each boxes as box}
                <div
                    class="bg-white rounded-xl border border-gray-200 hover:shadow-md shadow-lg p-4"
                >
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
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 400;
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
        background-color: #22c55e;
        &:hover {
            background-color: #16a34a;
        }
    }
</style>
