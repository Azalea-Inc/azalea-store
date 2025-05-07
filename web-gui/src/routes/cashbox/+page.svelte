<script>
    import { onMount } from "svelte";
    import { cashboxesPageStore } from "@store/cashboxes/cashboxesPageStore";
    import Breadcrumb from "@components/Breadcrumb.svelte";
    import AddBoxModal from "@components/cashbox/AddBoxModal.svelte";
    import Spinner from "@components/Spinner.svelte";
    import CashboxCard from "@components/cashbox/CashboxCard.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const store = cashboxesPageStore;
    let isOpen = false;
    let searchTerm = "";
    let isLoading = false;

    onMount(async () => {
        isLoading = true;
        try {
            await store.getBoxes();
            dispatch("logEvent", { type: "load", success: true });
        } catch (error) {
            console.error("Error al cargar cajas:", error);
            dispatch("logEvent", {
                type: "load",
                success: false,
                error: error.message,
            });
        } finally {
            isLoading = false;
        }
    });

    $: filteredBoxes = searchTerm
        ? $store.cashboxes.filter(
              (box) =>
                  box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  box.description
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()),
          )
        : $store.cashboxes;
</script>

<AddBoxModal {isOpen} on:close={() => (isOpen = false)} />
<Container>
    <HeaderContainer>
        <HorizontalList>
            <h1 class="text-2xl font-semibold text-gray-900">
                Cajas registradoras
            </h1>
            <HorizontalList>
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Buscar cajas..."
                        class="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        bind:value={searchTerm}
                    />
                    <svg
                        class="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5"
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
                        class="w-4 h-4 mr-1"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                        />
                    </svg>
                    Agregar caja
                </button>
            </HorizontalList>
        </HorizontalList>
    </HeaderContainer>

    <main class="p-6">
        {#if $store.loading || isLoading}
            <Spinner />
        {:else if filteredBoxes.length === 0}
            <EmptyState
                title="No se encontaron resultados"
                description="No hay registros que coincidan con los criterios de búsqueda actuales."
            >
                <button
                    class="btn btn-primary"
                    on:click={() => (isOpen = true)}
                >
                    <svg
                        class="w-4 h-4 mr-1"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                        />
                    </svg>
                    Agregar caja
                </button>
            </EmptyState>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each filteredBoxes as box (box.id)}
                    <CashboxCard
                        {box}
                        on:delete={() => store.removeCashbox(box.id)}
                    />
                {/each}
            </div>
        {/if}
    </main>
</Container>
