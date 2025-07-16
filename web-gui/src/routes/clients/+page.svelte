<script>
    import { onMount } from "svelte";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import ClientCard from "@components/clients/ClientCard.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import AddClientModal from "@components/clients/AddClientModal.svelte";
    import { clientsPageStore } from "@store/clients/ClientsPageStore";
    import { modals } from "@components/Modals/modals";
    import ExcelUploader from "@components/ExcelUploader.svelte";
    const store = clientsPageStore;

    let isOpen = false;
    let searchQuery = "";

    $: filteredClients = searchQuery
        ? $store.clients.filter(
              (client) =>
                  client.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  client.email
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
          )
        : $store.clients;

    onMount(async () => {
        await store.getClients();
    });
</script>

<AddClientModal {isOpen} on:close={() => (isOpen = false)} />
<Container>
    <HeaderContainer>
        <HorizontalList>
            <div class="flex flex-col">
                <h1 class="text-primary">Clientes</h1>
            </div>
            <HorizontalList>
                <div class="flex items-center gap-2 flex-1 max-w-md relative">
                    <input
                        bind:value={searchQuery}
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
                    class="btn btn-secondary flex items-center gap-2"
                    on:click={() => {
                        modals.push(ExcelUploader);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Cargar Excel
                </button>

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
                    Agregar Cliente
                </button>
            </HorizontalList>
        </HorizontalList>
    </HeaderContainer>

    <main class="px-6 pb-4">
        {#if $store.loading}
            <Spinner />
        {:else}
            {#if filteredClients.length == 0}
                <EmptyState
                    title="No se encontraron resultados"
                    description="No hay clientes que coincidan con los criterios de búsqueda actuales."
                >
                    <button
                        class="btn btn-primary"
                        on:click={() => (isOpen = true)}
                        ><svg
                            class="w-4 h-4 mr-1"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                        >
                            <path
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                            />
                        </svg>
                        Agregar Cliente</button
                    >
                </EmptyState>
            {/if}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each filteredClients as client (client.id)}
                    <ClientCard
                        {client}
                        on:delete={() => store.removeClient(client.id)}
                    />
                {/each}
            </div>
        {/if}
    </main>
</Container>
