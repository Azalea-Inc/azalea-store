<script>
    import Modal from "@components/Modal.svelte";
    import { createEventDispatcher } from "svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";

    const state = productsPageStore;

    const API_URL = "http://localhost:3000/api/products";
    const CONTENT_TYPE_JSON = "application/json";
    const ERROR_MESSAGE = "Error al agregar el producto";

    const dispatch = createEventDispatcher();

    export let isOpen = false;

    const initialProductState = {
        code: "",
        name: "",
        price: 0,
    };

    let product = { ...initialProductState };
    let isSubmitted = false;

    function resetProduct() {
        product = { ...initialProductState };
    }

    async function saveProduct() {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": CONTENT_TYPE_JSON,
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error(ERROR_MESSAGE);
        }

        return response;
    }

    async function addProduct() {
        if (isSubmitted) return;

        isSubmitted = true;

        try {
            await saveProduct();
            resetProduct();
            dispatch("close");
            state.getProducts();
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitted = false;
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nuevo Producto">
    <form on:submit|preventDefault={addProduct} class="flex flex-col gap-4">
        <div class="form-group">
            <label for="code" class="form-label">Código</label>
            <input
                id="code"
                class="form-control"
                type="text"
                name="code"
                placeholder="Ingrese el código"
                bind:value={product.code}
                required
            />
        </div>

        <div class="form-group">
            <label for="name" class="form-label">Nombre</label>
            <input
                id="name"
                class="form-control"
                type="text"
                name="name"
                placeholder="Ingrese el nombre"
                bind:value={product.name}
                required
            />
        </div>

        <div class="form-group">
            <label for="price" class="form-label">Precio</label>
            <input
                id="price"
                class="form-control"
                type="number"
                name="price"
                placeholder="Ingrese el precio"
                bind:value={product.price}
                min="0"
                required
            />
        </div>

        <button
            type="submit"
            class="btn btn-primary my-4 self-end"
            disabled={isSubmitted}
        >
            {isSubmitted ? "Guardando..." : "Guardar"}
        </button>
    </form>
</Modal>

<style>
    .form-group {
        margin-bottom: 1rem;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #24292f;
    }

    .form-control {
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: #24292f;
        background-color: #ffffff;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        transition: border-color 0.15s ease-in-out;
    }

    .form-control:focus {
        border-color: #0969da;
        outline: none;
        box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3);
    }

    .btn {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        border: 1px solid rgba(27, 31, 36, 0.15);
        box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
        transition: all 0.2s ease;
        &:hover {
            background-color: #f3f4f6;
        }
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    .btn-primary {
        color: #ffffff;
        background-color: #2da44e;
        border-color: rgba(27, 31, 36, 0.15);
        &:hover:not(:disabled) {
            background-color: #2c974b;
        }
    }
</style>
