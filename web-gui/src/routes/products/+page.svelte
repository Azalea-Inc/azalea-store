<script>
    import AddProductModal from "@components/products/AddProductModal.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import ProductDetail from "@components/products/ProductDetail.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import Button from "@components/Button.svelte";
    import ButtonIcon from "@components/ButtonIcon.svelte";
    import Searcher from "@components/Searcher.svelte";
    import HStack from "@components/HStack.svelte";
    $: state = productsPageStore;
</script>

<Container overflowHidden={true}>
    <HeaderContainer>
        <HStack>
            <div class="flex flex-col">
                <h1 class="text-primary">Productos</h1>
            </div>
            <div class="inline-flex gap-2 items-center">
                <Searcher></Searcher>
                <ButtonIcon tooltipText="Cargar excel">
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
                </ButtonIcon>

                <ButtonIcon
                    buttonType="primary"
                    tooltipText="Agregar producto"
                    onClick={() => state.addProductHandler()}
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
                </ButtonIcon>
            </div>
        </HStack>
    </HeaderContainer>

    <main class="flex-1 flex flex-col overflow-hidden">
        <svelte:component this={$state.currentPage} />
    </main>
</Container>

<ProductDetail></ProductDetail>
