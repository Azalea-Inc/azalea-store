<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function handleDelete() {
        if (!confirm("¿Estás seguro que deseas borrar este usuario?")) {
            return;
        }
        dispatch("delete");
    }
    export let user;
</script>

<div
    class="user-card border border-gray-300 rounded-lg p-4 my-3 hover:border-gray-400 transition-all duration-200 bg-white shadow-sm"
>
    <div class="flex items-center mb-4">
        <div
            class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-white"
        >
            <span class="text-sm font-medium"
                >{user.name.charAt(0)}{user.name.split(" ")[1]?.charAt(0) ||
                    ""}</span
            >
        </div>
        <div>
            <h3 class="font-semibold text-base text-gray-900">{user.name}</h3>
            <p class="text-gray-600 text-sm">{user.email}</p>
        </div>
    </div>
    <div class="border-t border-gray-200 pt-3">
        <div
            class="inline-block px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full mb-3"
        >
            Administrador
        </div>
        <div class="flex space-x-2 mt-3">
            <button
                class="px-3 py-1.5 text-xs font-medium bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 text-gray-700 transition-colors flex-1 flex items-center justify-center"
                ><svg
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
                    ></path></svg
                >Editar</button
            >
            <button
                on:click={handleDelete}
                class="px-3 py-1.5 text-xs font-medium bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 text-gray-700 transition-colors flex-1 flex items-center justify-center"
                ><svg
                    class="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        fill-rule="evenodd"
                        d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"
                    ></path></svg
                >Eliminar</button
            >
        </div>
    </div>
</div>
