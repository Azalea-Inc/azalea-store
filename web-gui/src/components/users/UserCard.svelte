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
    class="user-card border border-gray-200 rounded-lg p-6 my-3 hover:shadow-md transition-all duration-300 bg-white"
>
    <div class="flex items-center mb-5">
        <div
            class="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-5 shadow-sm"
        >
            <span class="text-white text-xl font-semibold"
                >{user.name.charAt(0)}{user.name.split(" ")[1]?.charAt(0) ||
                    ""}</span
            >
        </div>
        <div>
            <h3 class="font-bold text-xl text-gray-900">{user.name}</h3>
            <p class="text-gray-600">{user.email}</p>
        </div>
    </div>
    <div class="border-t border-gray-100 pt-5">
        <div
            class="inline-block px-3 py-1.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-4 shadow-sm"
        >
            Administrador
        </div>
        <div class="flex space-x-3 mt-4">
            <button
                class="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors shadow-sm flex-1"
                >Editar</button
            >
            <button
                on:click={handleDelete}
                class="px-4 py-2 text-sm font-medium bg-white border border-red-300 rounded-lg hover:bg-red-50 text-red-600 transition-colors shadow-sm flex-1"
                >Eliminar</button
            >
        </div>
    </div>
</div>
