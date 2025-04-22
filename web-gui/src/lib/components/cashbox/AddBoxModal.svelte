<script>
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
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
            const response = await fetch("http://localhost:3000/api/cashbox", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cashbox),
            });

            if (!response.ok) {
                throw new Error("Error al agregar la caja");
            }

            cashbox.name = "";
            cashbox.location = "";

            dispatch("close");
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nueva Caja">
    <form on:submit|preventDefault={createCashbox} class="flex flex-col gap-2">
        <label for="name">Nombre</label>
        <input
            id="name"
            class="input"
            type="text"
            name="name"
            placeholder="Ingrese el nombre"
            bind:value={cashbox.name}
            required
        />
        <label for="location">Ubicación</label>
        <input
            id="location"
            class="input"
            type="text"
            name="location"
            placeholder="Ingrese la ubicación"
            bind:value={cashbox.location}
            required
        />

        <button class="btn btn-primary mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
    </form>
</Modal>

<style>
    .btn {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 400;
        color: #fff;
        background-color: #666;
        border: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
        &:hover {
            background-color: #555;
            transform: translateY(-1px);
        }
    }

    .btn-primary {
        background-color: #22c55e;
        &:hover {
            background-color: #16a34a;
        }
    }
</style>
