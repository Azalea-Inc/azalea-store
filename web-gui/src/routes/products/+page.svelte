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
            <h1 class="text-2xl font-semibold text-gray-900">Productos</h1>
            <div class="flex gap-4">
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
