<script>
    import { onMount } from "svelte";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import UserCard from "@components/users/UserCard.svelte";
    import AddUserModal from "@components/users/AddUserModal.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import { usersPageStore } from "@store/users/UsersPageStore";
    const store = usersPageStore;

    let isOpen = false;

    onMount(async () => {
        await store.getUsers();
    });
</script>

<AddUserModal {isOpen} on:close={() => (isOpen = false)} />
<Container>
    <HeaderContainer>
        <HorizontalList>
            <div class="flex flex-col">
                <h1 class="text-primary">Usuarios</h1>

                <p class="text-sm text-gray-600 mt-1">
                    Administra los usuarios de tu plataforma.
                </p>
            </div>

            <HorizontalList>
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
                    Agregar Usuario
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
                    Agregar Usuario
                </button>
            </HorizontalList>
        </HorizontalList>
    </HeaderContainer>

    <main class="p-6">
        {#if $store.loading}
            <Spinner />
        {:else}
            {#if $store.users.length == 0}
                <EmptyState
                    title="No se encontraron resultados"
                    description="No hay usuarios que coincidan con los criterios de búsqueda actuales."
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
                        Agregar Usuario</button
                    >
                </EmptyState>
            {/if}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each $store.users as user}
                    <UserCard
                        {user}
                        on:delete={() => store.removeUser(user.id)}
                    />
                {/each}
            </div>
        {/if}
    </main>
</Container>

<style>
    .text-primary {
        color: #2a373e;
        font-weight: bold;
        font-size: 1.5rem;
    }
</style>
