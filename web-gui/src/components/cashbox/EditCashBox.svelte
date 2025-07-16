<script>
    import { onMount } from "svelte";
    import { cashboxesPageStore } from "@store/cashboxes/cashboxesPageStore";
    import http from "$lib/http";
    import { toast } from "svelte-sonner";

    const store = cashboxesPageStore;
    export let id;

    let isSubmitting = false;

    let cashbox = {
        name: "",
        location: "",
    };

    async function updateCashBox() {
        isSubmitting = true;

        http.put(`/cashbox/${id}`, cashbox)
            .then(({ data }) => {
                cashbox = { ...data.data };
                toast.success("Caja actualizada");
                store.getBoxes();
            })
            .catch((error) => {
                toast.error("Error al actualizar caja");
                isSubmitting = false;
            })
            .finally(() => {
                isSubmitting = false;
            });
    }

    async function getCashBox() {
        try {
            const response = await fetch(`/api/cashbox/${id}`);
            const { data } = await response.json();
            cashbox = data;
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        await getCashBox();
    });
</script>

<form
    on:submit|preventDefault={updateCashBox}
    class="form-container w-md mx-auto"
>
    <div class="form-group">
        <label for="box-name" class="form-label">Nombre</label>
        <input
            id="box-name"
            class="form-input"
            type="text"
            name="box-name"
            placeholder="Ingrese el nombre"
            bind:value={cashbox.name}
            required
        />
    </div>
    <div class="form-group">
        <label for="location" class="form-label">Ubicación</label>
        <input
            id="location"
            class="form-input"
            type="text"
            name="location"
            placeholder="Ingrese la ubicación"
            bind:value={cashbox.location}
            required
        />
    </div>

    <div class="flex justify-end pt-4">
        <button class="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
    </div>
</form>
