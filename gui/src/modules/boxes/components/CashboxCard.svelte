<script>
    import { Arrow } from "@components/icons";
    import { Dropdown } from "@components";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { modals } from "@components/Modals";
    import EditCashBox from "./EditCashBox.svelte";

    export let box;
    function handleDelete() {
        modals.warning({
            title: "Eliminar Caja",
            message: "¿Estás seguro de que deseas eliminar esta caja?",
            onConfirm: () => {
                dispatch("delete");
            },
        });
    }
</script>

<div class="card">
    <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg
                class="w-5 h-5 mr-2 text-blue-600"
                viewBox="0 0 16 16"
                fill="currentColor"
            >
                <path
                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"
                />
            </svg>
            {box.name}
        </h2>
        <span
            class="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200"
        >
            Activa
        </span>
    </div>
    <p class="mt-2 text-sm text-gray-600 flex items-center">
        <svg
            class="w-4 h-4 mr-1.5 text-gray-500"
            viewBox="0 0 16 16"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm-1.06 1.06a3.5 3.5 0 00-4.95 0 3.5 3.5 0 000 4.95L8 12.01l2.475-2.475a3.5 3.5 0 000-4.95v-.01zM8 9a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd"
            />
        </svg>
        {box.location}
    </p>
    <div
        class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between"
    >
        <a href={`/cashbox/${box.id}`} class="btn btn-primary">
            Ver detalles
            <Arrow />
        </a>

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

            <ul class="dropdown-menu">
                <li>
                    <button
                        class="dropdown-btn"
                        on:click={() =>
                            modals.push(EditCashBox, {
                                id: box.id,
                                title: "Editar caja",
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
                    <button class="dropdown-btn danger" on:click={handleDelete}>
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
