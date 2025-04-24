<script>
    import AddProductModal from "@components/products/AddProductModal.svelte";
    import Breadcrumb from "@components/Breadcrumb.svelte";

    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import ProductDetail from "@components/products/ProductDetail.svelte";
    $: state = productsPageStore;

    let isOpen = false;
</script>

<div
    class="flex-1 flex flex-col h-screen overflow-hidden px-8 py-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
>
    <Breadcrumb />
    <AddProductModal {isOpen} on:close={() => (isOpen = false)} />

    <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-bold text-gray-800">Productos</h1>
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
