<script>
    import AddProductModal from "@components/products/AddProductModal.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import ProductDetail from "@components/products/ProductDetail.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    $: state = productsPageStore;

    let isOpen = false;
</script>

<Container>
    <AddProductModal {isOpen} on:close={() => (isOpen = false)} />

    <HeaderContainer>
        <HorizontalList>
            <div class="flex flex-col">
                <h1 class="text-2xl font-semibold text-gray-900">Productos</h1>
                <p class="text-sm text-gray-600 mt-1">
                    Administra los productos de tu plataforma.
                </p>
            </div>
            <div class="inline-flex gap-4 items-center">
                <div class="flex items-center gap-2 flex-1 max-w-md relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        class="w-full bg-white pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>

                <button
                    class="btn btn-primary"
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
        </HorizontalList>
    </HeaderContainer>

    <main class="p-6">
        <svelte:component this={$state.currentPage} />
    </main>
</Container>

<ProductDetail></ProductDetail>
