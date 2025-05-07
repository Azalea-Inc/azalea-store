<script>
    import { onMount } from "svelte";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/users/EmptyState.svelte";
    import UserCard from "@components/users/UserCard.svelte";
    import AddUserModal from "@components/users/AddUserModal.svelte";
    import { usersPageStore } from "@store/users/UsersPageStore";
    const store = usersPageStore;

    let isOpen = false;

    onMount(async () => {
        await store.getUsers();
    });
</script>

<AddUserModal {isOpen} on:close={() => (isOpen = false)} />
<div class="flex-1 p-6 bg-gray-50">
    <header class="flex flex-col border-b border-gray-200 pb-4">
        <div class="flex justify-between items-center">
            <div class="flex flex-col">
                <h1 class="text-primary">Usuarios</h1>

                <p class="text-sm text-gray-600 mt-1">
                    Administra los usuarios de tu plataforma.
                </p>
            </div>
            <button class="btn btn-primary" on:click={() => (isOpen = true)}
                >Agregar Usuario</button
            >
        </div>
    </header>

    <main class="mt-4">
        {#if $store.loading}
            <Spinner />
        {:else}
            {#if $store.users.length == 0}
                <EmptyState />
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
</div>

<style>
    .text-primary {
        color: #2a373e;
        font-weight: bold;
        font-size: 1.5rem;
    }
</style>
