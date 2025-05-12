<script>
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import SalesCart from "@components/sales/SalesCart.svelte";
    import SaleControl from "@components/sales/SaleControl.svelte";
    import { barcodeScanner } from "$lib/scanner.js";

    let searchbar;

    let hasActiveSale = false;
    let query = "";

    function handleScan(code) {
        query = code;
        searchbar.focus();
        addProduct();
    }

    function cancelSale() {
        hasActiveSale = false;
        query = "";
    }

    function handleEnter(event) {
        if (event.key === "Enter") {
            addProduct();
        }

        if (event.key === "Escape") {
            query = "";
        }
    }

    function addProduct() {
        console.log("Add product");
    }
</script>

<Container>
    <HeaderContainer>
        <HorizontalList>
            <div class="flex flex-col gap-2">
                <h1 class="text-title">Bienvenido a Azalea</h1>
            </div>

            <HorizontalList>
                {#if !hasActiveSale}
                    <button class="btn btn-secondary"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>Continuar venta</button
                    >

                    <button
                        class="btn btn-primary"
                        on:click={() => (hasActiveSale = true)}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>Nueva venta</button
                    >
                {:else}
                    <div
                        use:barcodeScanner={{ onScan: handleScan }}
                        class="flex items-center gap-2 flex-1 max-w-md relative"
                    >
                        <input
                            bind:value={query}
                            on:keydown={handleEnter}
                            bind:this={searchbar}
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

                    <button class="btn btn-outline-danger" on:click={cancelSale}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>Cancelar venta</button
                    >
                {/if}
            </HorizontalList>
        </HorizontalList>
    </HeaderContainer>

    <main class="p-6 flex-1 flex flex-col">
        {#if !hasActiveSale}
            <div class="empty-state mb-6">
                <div
                    class="flex flex-col items-center justify-center p-8 rounded-lg text-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h2 class="text-lg font-semibold mb-2">
                        No hay venta activa
                    </h2>
                    <p class="text-gray-600 mb-4">
                        Para comenzar, crea una nueva venta o continúa una venta
                        anterior.
                    </p>
                    <div class="flex gap-4">
                        <button
                            class="btn btn-primary"
                            on:click={() => (hasActiveSale = true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Nueva venta
                        </button>
                    </div>
                </div>
            </div>
        {:else}
            <div class="flex gap-6 flex-1">
                <SalesCart></SalesCart>
                <SaleControl></SaleControl>
            </div>
        {/if}
    </main>
</Container>
