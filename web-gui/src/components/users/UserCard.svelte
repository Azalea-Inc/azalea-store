<script>
    export let user;
</script>

<div class="user-card bg-white rounded-lg shadow-md p-4 my-2">
    <div class="flex items-center mb-4">
        <div
            class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4"
        >
            <span class="text-gray-600 text-xl">JD</span>
        </div>
        <div>
            <h3 class="font-semibold text-lg text-primary">{user.name}</h3>
            <p class="text-gray-600">{user.email}</p>
        </div>
    </div>
    <div class="border-t pt-4">
        <p class="text-sm text-gray-500 mb-2">Rol: Administrador</p>
        <div class="flex justify-between mt-4">
            <button class="btn btn-sm btn-outline">Editar</button>
            <button class="btn btn-sm btn-outline-danger">Eliminar</button>
        </div>
    </div>
</div>
