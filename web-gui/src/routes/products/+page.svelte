<script>
    import AddProductModal from "@components/products/AddProductModal.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import ProductDetail from "@components/products/ProductDetail.svelte";
    $: state = productsPageStore;

    let isOpen = false;
</script>

<div
    class="flex-1 flex flex-col h-screen overflow-hidden px-6 py-5 bg-white border-b border-gray-200"
>
    <AddProductModal {isOpen} on:close={() => (isOpen = false)} />

    <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-semibold text-gray-900">Productos</h1>
        <div class="flex gap-4">
            <button
                class="btn btn-primary flex items-center gap-2"
                on:click={() => (isOpen = true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                </svg>
                Agregar
            </button>
        </div>
    </div>
    <svelte:component this={$state.currentPage} />
</div>

<ProductDetail></ProductDetail>

<style>
    .btn {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        color: #24292f;
        background-color: #f6f8fa;
        border: 1px solid rgba(27, 31, 36, 0.15);
        box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
        transition: all 0.2s ease;
        &:hover {
            background-color: #f3f4f6;
            border-color: rgba(27, 31, 36, 0.15);
        }
    }

    .btn-primary {
        color: #ffffff;
        background-color: #2da44e;
        border-color: rgba(27, 31, 36, 0.15);
        &:hover {
            background-color: #2c974b;
            border-color: rgba(27, 31, 36, 0.15);
        }
    }
</style>
