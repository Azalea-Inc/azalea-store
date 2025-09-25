<script>
    import { onDestroy, onMount } from "svelte";
    import Spinner from "@components/Spinner.svelte";
    import EmptyState from "@components/EmptyState.svelte";
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import Label from "@components/Label.svelte";
    import AddUserModal from "@modules/users/components/AddUserModal.svelte";
    import UserCard from "@modules/users/components/UserCard.svelte";
    import { modals } from "@components/Modals";
    import { usersPageVM } from "@modules/users/viewmodel/UsersPageVM";
    import Button from "@components/Button.svelte";
    import Breadcrumb from "@components/Breadcrumb.svelte";
    const store = usersPageVM;

    let isOpen = false;
    let searchQuery = "";

    function addUserHandler() {
        modals.push(AddUserModal, {
            title: "Agregar usuario",
        });
    }

    $: filteredUsers = searchQuery
        ? $store.users.filter(
              (user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : $store.users;

    onMount(async () => {
        store.onMount();
        await store.getUsers();
    });

    onDestroy(() => {
        store.onDestroy();
    });
</script>

<Container overflowHidden>
    <div class="px-6">
        <Breadcrumb />
    </div>
    <HeaderContainer className="pt-0">
        <HorizontalList>
            <div class="flex flex-col">
                <Label type="h1">Usuarios</Label>
            </div>

            <HorizontalList>
                <input
                    type="text"
                    placeholder="Buscar..."
                    class="bg-white pl-2 pr-3 py-[0.3rem] text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    bind:value={searchQuery}
                />
                <button class="btn btn-primary" on:click={addUserHandler}>
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

    <main class="px-6 pb-4 overflow-y-scroll flex flex-col">
        {#if $store.loading}
            <Spinner />
        {:else}
            {#if filteredUsers.length == 0}
                <EmptyState
                    title="No se encontraron resultados"
                    description="No hay usuarios que coincidan con los criterios de búsqueda actuales."
                >
                    <button class="btn btn-primary" on:click={addUserHandler}
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
            <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each filteredUsers as user}
                    <UserCard {user} />
                {/each}
            </div> -->

            {#if filteredUsers.length > 0}
                <div class="flex flex-col overflow-hidden">
                    <div class="flex flex-wrap items-center gap-3 pb-6">
                        <!-- Filter by role -->
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-700"
                                >Rol:</span
                            >
                            <select
                                class="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Todos</option>
                                <option value="admin">Admin</option>
                                <option value="user">Usuario</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                        <!-- Filter by status -->
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-700"
                                >Estado:</span
                            >
                            <select
                                class="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Todos</option>
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                        </div>

                        <!-- Sort options -->
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-medium text-gray-700"
                                >Ordenar:</span
                            >
                            <select
                                class="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="name">Nombre</option>
                                <option value="email">Email</option>
                                <option value="role">Rol</option>
                                <option value="created"
                                    >Fecha de creación</option
                                >
                            </select>
                        </div>

                        <!-- Clear filters -->
                        <button
                            class="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md hover:bg-gray-50"
                        >
                            Limpiar filtros
                        </button>

                        <!-- Results count -->
                        <div class="ml-auto text-sm text-gray-500">
                            {filteredUsers.length} usuario{filteredUsers.length !==
                            1
                                ? "s"
                                : ""}
                        </div>
                    </div>

                    <div
                        class="flex flex-col gap-4 overflow-y-scroll pb-6 px-4"
                    >
                        {#each filteredUsers as user}
                            <a href={`/users/${user.id}`}>
                                <div
                                    class="hover:bg-gray-50 bg-white border rounded-lg border-gray-200 p-5 transition-colors duration-200 shadow-sm hover:shadow-md"
                                >
                                    <div
                                        class="flex items-start justify-between"
                                    >
                                        <div class="flex items-start">
                                            <div class="flex items-center mr-4">
                                                <div
                                                    class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-100"
                                                >
                                                    <svg
                                                        class="w-7 h-7 text-blue-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="flex flex-col min-w-0">
                                                <div
                                                    class="flex items-center gap-2 mb-1"
                                                >
                                                    <h3
                                                        class="font-semibold text-gray-900 text-lg"
                                                    >
                                                        {user.name}
                                                    </h3>
                                                    {#if user.isVerified}
                                                        <svg
                                                            class="w-4 h-4 text-blue-500"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    {/if}
                                                </div>
                                                <span
                                                    class="text-gray-600 text-sm mb-2"
                                                    >{user.email}</span
                                                >
                                                <div
                                                    class="flex flex-col gap-1 text-xs text-gray-500"
                                                >
                                                    <div
                                                        class="flex items-center gap-4"
                                                    >
                                                        <span
                                                            class="flex items-center gap-1"
                                                        >
                                                            <svg
                                                                class="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                            Creado: {user.createdAt ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    {#if user.department}
                                                        <span
                                                            class="flex items-center gap-1"
                                                        >
                                                            <svg
                                                                class="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                                                                />
                                                                <path
                                                                    d="M6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                                                />
                                                            </svg>
                                                            {user.department}
                                                        </span>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="flex flex-col items-end gap-2"
                                        >
                                            <div class="flex flex-col gap-2">
                                                <span
                                                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border"
                                                >
                                                    {user.role || "Usuario"}
                                                </span>
                                                {#if user.active}
                                                    <span
                                                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-green-700 bg-green-50 border border-green-200"
                                                    >
                                                        <span
                                                            class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"
                                                        ></span>
                                                        Activo
                                                    </span>
                                                {:else}
                                                    <span
                                                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-red-700 bg-red-50 border border-red-200"
                                                    >
                                                        <span
                                                            class="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"
                                                        ></span>
                                                        Inactivo
                                                    </span>
                                                {/if}
                                            </div>
                                            <div
                                                class="flex items-center gap-3 text-xs text-gray-500"
                                            >
                                                {#if user.projectsCount !== undefined}
                                                    <span
                                                        class="flex items-center gap-1"
                                                    >
                                                        <svg
                                                            class="w-3 h-3"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                            />
                                                        </svg>
                                                        {user.projectsCount} proyectos
                                                    </span>
                                                {/if}
                                                {#if user.permissions && user.permissions.length > 0}
                                                    <span
                                                        class="flex items-center gap-1"
                                                    >
                                                        <svg
                                                            class="w-3 h-3"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                        {user.permissions
                                                            .length} permisos
                                                    </span>
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    </main>
</Container>

<style>
    .header {
        background: white;
        border-bottom: 1px solid #d1d9e0;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }

    .breadcrumb-link {
        color: #0969da;
        text-decoration: none;
    }

    .breadcrumb-link:hover {
        text-decoration: underline;
    }

    .breadcrumb-separator {
        color: #656d76;
    }

    .breadcrumb-current {
        font-weight: 600;
        color: #24292f;
    }
</style>
