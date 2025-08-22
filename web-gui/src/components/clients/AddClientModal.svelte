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
        phone: "",
    };
    let isSubmitting = false;

    function resetForm() {
        client.name = "";
        client.email = "";
        client.phone = "";
    }

    async function addClient() {
        if (isSubmitting) {
            return;
        }

        isSubmitting = true;

        try {
            await store.addClient(client);
            resetForm();
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
            <label for="client-name" class="form-label">Nombre</label>
            <input
                id="client-name"
                class="form-input"
                type="text"
                name="client-name"
                placeholder="Ingrese el nombre"
                bind:value={client.name}
                required
            />
        </div>

        <div class="form-group">
            <label for="phone" class="form-label">Numero telefonico</label>
            <input
                id="phone"
                class="form-input"
                type="tel"
                name="phone"
                placeholder="Ingrese el numero telefonico"
                bind:value={client.phone}
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
            />
        </div>

        <div class="flex justify-end pt-4">
            <button class="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
        </div>
    </form>
</Modal>
