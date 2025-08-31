<script>
    import { onMount } from "svelte";
    import { clientsPageVM } from "@modules/clients/viewmodel/ClientsPageVM";
    import { toast } from "svelte-sonner";
    import http from "$lib/http";

    let vm = clientsPageVM;
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
                vm.getClients();
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
        <button class="btn btn-primary">
            {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
    </div>
</form>
