<script>
    import Modal from "@components/Modal.svelte";
    import Spinner from "@components/Spinner.svelte";
    import { productDetailStore } from "@modules/products/viewmodel/ProductDetailStore";
    import { onDestroy } from "svelte";

    const state = productDetailStore;
    const buttonClasses =
        "px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-2 border";

    $: activeButtonClasses = $state.isActive
        ? `${buttonClasses} text-red-700 bg-red-100 hover:bg-red-200 border-red-300`
        : `${buttonClasses} text-green-700 bg-green-100 hover:bg-green-200 border-green-300`;

    $: buttonText = $state.isActive ? "Desactivar" : "Activar";

    const handleToggleActive = () => {
        const action = $state.isActive ? "deactivate" : "activate";
        state[action]($state.id);
    };

    onDestroy(() => state.reset());
</script>

<Modal
    isOpen={$state.isOpen}
    on:close={() => state.close()}
    title="Información del producto"
    className="w-full max-w-md"
    size="xl"
>
    <div class="flex flex-col items-start p-6 space-y-4">
        {#if $state.isLoading}
            <Spinner text={$state.processMessage} />
        {:else}
            <div class="w-full bg-white rounded-lg border border-gray-200 p-6">
                <div
                    class="flex items-center justify-between border-b pb-4 mb-4"
                >
                    <h2 class="text-xl font-semibold text-gray-900">
                        {$state.name}
                    </h2>
                    <span
                        class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                        #{$state.id}
                    </span>
                </div>

                <div class="prose max-w-none mb-6">
                    <p class="text-gray-600">
                        {$state.description}
                    </p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <p class="text-lg font-medium text-gray-900">
                            {$state.price}€
                        </p>
                        <span
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                            SKU: {$state.code || "N/A"}
                        </span>
                    </div>

                    <button
                        class={activeButtonClasses}
                        on:click={handleToggleActive}
                    >
                        {#if $state.isActive}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        {/if}
                        {buttonText}
                    </button>
                </div>
            </div>
        {/if}
    </div>
</Modal>
