<script>
    import AddProductModal from "@components/products/AddProductModal.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import ProductDetail from "@components/products/ProductDetail.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import Button from "@components/Button.svelte";
    $: state = productsPageStore;

    let isOpen = false;
</script>

<Container overflowHidden={true}>
    <AddProductModal {isOpen} on:close={() => (isOpen = false)} />

    <HeaderContainer>
        <HorizontalList>
            <div class="flex flex-col">
                <h1 class="text-primary">Productos</h1>
            </div>
            <div class="inline-flex gap-2 items-center">
                <div class="flex items-center gap-2 flex-1 max-w-md relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        class="w-full bg-white pl-10 pr-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

                <Button showTooltip={true} tooltipText="Cargar excel">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-label="Cargar Excel"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </Button>

                <Button
                    buttonType="primary"
                    showTooltip={true}
                    tooltipText="Agregar producto"
                    tooltipAlign="right"
                    onClick={() => {
                        isOpen = true;
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-label="Agregar producto"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </Button>
            </div>
        </HorizontalList>
    </HeaderContainer>

    <main class="flex-1 flex flex-col overflow-hidden">
        <svelte:component this={$state.currentPage} />
    </main>
</Container>

<ProductDetail></ProductDetail>
