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
        {/if}
    </div>
</Modal>
