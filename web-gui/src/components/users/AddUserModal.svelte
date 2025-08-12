<script>
    import { usersPageStore } from "@store/users/UsersPageStore";
    import Modal from "@components/Modal.svelte";
    import { createEventDispatcher } from "svelte";
    import { bus } from "$lib/EventBus";

    const dispatch = createEventDispatcher();
    const store = usersPageStore;
    export let isOpen = false;

    let user = {
        name: "",
        email: "",
        password: "",
        role: "",
    };
    let isSubmitting = false;

    async function addUser() {
        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        try {
            await store.addUser(user);
            user.name = "";
            user.email = "";
            user.password = "";
            user.role = "";
            bus.emit("user-added");
            dispatch("close");
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nuevo Usuario">
    <form
        on:submit|preventDefault={addUser}
        class="form-container w-md mx-auto"
    >
        <div class="form-group">
            <label for="client-name" class="form-label">Nombre</label>
            <input
                id="name"
                class="form-input"
                type="text"
                name="client-name"
                placeholder="Ingrese el nombre"
                bind:value={user.name}
                required
            />
        </div>
        <div class="form-group">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input
                id="email"
                class="form-input"
                type="email"
                name="email"
                placeholder="Ingrese el correo electrónico"
                bind:value={user.email}
                required
            />
        </div>

        <div class="form-group">
            <label for="role" class="form-label">Rol</label>
            <select
                id="role"
                class="form-input"
                name="role"
                bind:value={user.role}
                required
            >
                <option value="">Seleccione un rol</option>
                <option value="ADMIN">Administrador</option>
                <option value="MANAGER">Gerente</option>
                <option value="CASHIER">Cajero</option>
            </select>
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <input
                id="password"
                class="form-input"
                type="password"
                name="password"
                placeholder="Ingrese la contraseña"
                bind:value={user.password}
                required
                minlength="8"
                title="La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
            />
        </div>

        <div class="flex justify-end pt-4">
            <button class="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
        </div>
    </form>
</Modal>

<style>
    .form-container {
        padding: 16px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    .form-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 14px;
        color: #24292f;
    }

    .form-input {
        width: 100%;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 20px;
        color: #24292f;
        background-color: #ffffff;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        box-shadow: inset 0 1px 0 rgba(208, 215, 222, 0.2);
        transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
    }

    .form-input:focus {
        border-color: #0969da;
        outline: none;
        box-shadow: inset 0 0 0 1px #0969da;
    }
</style>
