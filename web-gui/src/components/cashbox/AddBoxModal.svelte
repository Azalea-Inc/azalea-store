<script>
    import { cashboxesPageStore } from "@store/cashboxes/cashboxesPageStore";
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const store = cashboxesPageStore;
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
            <label for="name" class="form-label">Nombre</label>
            <input
                id="name"
                class="form-input"
                type="text"
                name="name"
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

    .btn {
        padding: 0.5rem 16px;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        border-radius: 6px;
        border: 1px solid;
        appearance: none;
        cursor: pointer;
        transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
    }

    .btn-primary {
        color: #ffffff;
        background-color: #2da44e;
        border-color: rgba(27, 31, 36, 0.15);
    }

    .btn-primary:hover {
        background-color: #2c974b;
    }

    .btn:disabled {
        color: rgba(255, 255, 255, 0.8);
        background-color: #94d3a2;
        border-color: rgba(27, 31, 36, 0.1);
        cursor: not-allowed;
    }
</style>
