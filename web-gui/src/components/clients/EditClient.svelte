<script>
    import { onMount } from "svelte";
    import { clientsPageStore } from "@store/clients/ClientsPageStore";
    import { toast } from "svelte-sonner";
    import http from "$lib/http";

    let isSubmitting = false;
    export let client;
    let currentClient = { ...client };

    function saveClient() {
        isSubmitting = true;

        if (JSON.stringify(currentClient) === JSON.stringify(client)) {
            toast.info("No hay cambios para guardar");
            isSubmitting = false;
            return;
        }

        http.put(`/clients/${client.id}`, client)
            .then(({ data }) => {
                toast.success("Cliente actualizado");
                clientsPageStore.getClients();
                currentClient = { ...client };
            })
            .catch((error) => {
                toast.error("Error al actualizar el cliente");
                client = { ...currentClient };
            })
            .finally(() => {
                isSubmitting = false;
            });
    }
</script>

<form class="form-container w-md mx-auto" on:submit|preventDefault={saveClient}>
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
        <button class="btn btn-primary">
            {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
    </div>
</form>
