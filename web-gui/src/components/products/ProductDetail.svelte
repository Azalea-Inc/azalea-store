<script>
    import Modal from "@components/Modal.svelte";
    import Spinner from "@components/Spinner.svelte";
    import { productDetailStore } from "@store/products/ProductDetailStore";
    import { onDestroy } from "svelte";
    const state = productDetailStore;

    onDestroy(state.reset());
</script>

<Modal
    isOpen={$state.isOpen}
    on:close={() => state.close()}
    title="Información del producto"
>
    <div class="flex flex-col items-start p-6 space-y-4">
        {#if $state.isLoading}
            <Spinner />
        {:else}
            <h2 class="text-2xl font-bold text-gray-800">{$state.name}</h2>
            <p class="text-gray-600 leading-relaxed">{$state.description}</p>
            <p class="text-xl font-semibold text-purple-600">
                Precio: {$state.price}€
            </p>

            <button
                class="px-4 py-2 text-white rounded {$state.isActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'}"
                on:click={() =>
                    state[$state.isActive ? "deactivate" : "activate"](
                        $state.id,
                    )}
            >
                {$state.isActive ? "Desactivar" : "Activar"}
            </button>
        {/if}
    </div>
</Modal>
