<script>
    import Dropdown from "@components/Dropdown.svelte";
    import { bus } from "$lib/EventBus";
    import { modals } from "@components/Modals";
    import ConfirmRemoveModal from "@components/Modals/ConfirmRemoveModal.svelte";

    function handleDelete() {
        modals.push(ConfirmRemoveModal, {
            title: "Eliminar usuario",
            message: "¿Estás seguro de que deseas eliminar este usuario?",
            onConfirm: () => {
                bus.emit("user-removed", user.id);
            },
        });
    }

    export let user;

    const ROLE_PARAMS = {
        ADMIN: { label: "Administrador", style: "bg-green-100 text-green-800" },
        MANAGER: {
            label: "Supervisor",
            style: "bg-blue-100 text-blue-800",
        },
        CASHIER: { label: "Cajero", style: "bg-purple-100 text-purple-800" },
    };
</script>

<div class="card">
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
            <div
                class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-white"
            >
                <span class="text-sm font-medium"
                    >{user.name.charAt(0)}{user.name.split(" ")[1]?.charAt(0) ||
                        ""}</span
                >
            </div>
            <div>
                <h3 class="font-semibold text-base text-gray-900">
                    {user.name}
                </h3>
                <p class="text-gray-600 text-sm">{user.email}</p>
            </div>
        </div>

        <Dropdown>
            <button
                slot="trigger"
                class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                aria-label="Opciones de usuario"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                    />
                </svg>
            </button>

            <div class="w-full flex flex-col gap-2">
                <button class="btn">Editar</button>

                <button class="btn btn-danger" on:click={handleDelete}
                    >Eliminar</button
                >
            </div>
        </Dropdown>
    </div>
    <div
        class="border-t border-gray-200 pt-3 flex justify-between items-center"
    >
        <a href={`/users/${user.id}`} class="btn btn-primary">
            Ver detalles
            <svg class="ml-1.5 w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                />
            </svg>
        </a>
        <div
            class="inline-block px-2 py-0.5 text-xs font-medium {ROLE_PARAMS[
                user.role
            ].style} rounded-full"
        >
            {ROLE_PARAMS[user.role].label}
        </div>
    </div>
</div>
