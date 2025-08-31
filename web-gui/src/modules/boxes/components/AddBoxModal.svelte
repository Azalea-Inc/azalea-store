<script>
    import { boxesVM } from "../viewmodel/boxesVM";
    import Modal from "@components/Modal.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const store = boxesVM;
    export let isOpen = false;
    let cashbox = {
        name: "",
        location: "",
    };
    let isSubmitting = false;

    async function createCashbox() {
        if (isSubmitting || !cashbox.name.trim() || !cashbox.location.trim()) {
            return;
        }

        isSubmitting = true;

        try {
            await store.addCashbox(cashbox);
            cashbox.name = "";
            cashbox.location = "";
            store.getBoxes();
            dispatch("close");
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nueva Caja">
    <form
        on:submit|preventDefault={createCashbox}
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
</Modal>
