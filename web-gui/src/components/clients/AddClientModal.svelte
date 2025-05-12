<script>
    import { clientsPageStore } from "@store/clients/ClientsPageStore";
    import Modal from "@components/Modal.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const store = clientsPageStore;
    export let isOpen = false;

    let client = {
        name: "",
        email: "",
    };
    let isSubmitting = false;

    async function addClient() {
        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        try {
            await store.addClient(client);
            client.name = "";
            client.email = "";
            store.getClients();
            dispatch("close");
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nuevo Cliente">
    <form
        on:submit|preventDefault={addClient}
        class="form-container w-md mx-auto"
    >
        <div class="form-group">
            <label for="name" class="form-label">Nombre</label>
            <input
                id="name"
                class="form-input"
                type="text"
                name="name"
                placeholder="Ingrese el nombre"
                bind:value={client.name}
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
                bind:value={client.email}
                required
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
