<script>
    import { Arrow } from "@components/icons";
    import { fade } from "svelte/transition";
    import EditClient from "@components/clients/EditClient.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { modals } from "@components/Modals";
    import Dropdown from "@components/Dropdown.svelte";
    import ConfirmRemoveModal from "@components/Modals/ConfirmRemoveModal.svelte";
    import { bus } from "$lib/EventBus";

    function handleDelete() {
        modals.push(ConfirmRemoveModal, {
            title: "Eliminar Cliente",
            message: "¿Estás seguro de que deseas eliminar este cliente?",
            onConfirm: () => {
                bus.emit("client-removed", client.id);
            },
        });
    }

    export let client;
</script>

<div class="card flex flex-col gap-4" transition:fade={{ duration: 300 }}>
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            <div
                class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-white"
            >
                <span class="text-sm font-medium"
                    >{client.name.charAt(0)}{client.name
                        .split(" ")[1]
                        ?.charAt(0) || ""}</span
                >
            </div>
            <div>
                <h3 class="font-semibold text-base text-gray-900">
                    {client.name}
                </h3>
                <p class="text-gray-600 text-sm">{client.email}</p>
            </div>
        </div>
    </div>

    <div
        class="flex items-center justify-between border-t pt-4 border-gray-100"
    >
        <button class="btn btn-primary">Ver Detalles <Arrow /></button>
        <Dropdown>
            <button
                slot="trigger"
                class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
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

            <ul>
                <li>
                    <button
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        on:click={() =>
                            modals.push(EditClient, {
                                title: "Editar Cliente",
                                client,
                            })}
                    >
                        <svg
                            class="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
                            ></path>
                        </svg>
                        Editar
                    </button>
                </li>
                <li>
                    <button
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        on:click={handleDelete}
                    >
                        <svg
                            class="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"
                            ></path>
                        </svg>
                        Eliminar
                    </button>
                </li>
            </ul>
        </Dropdown>
    </div>
</div>
