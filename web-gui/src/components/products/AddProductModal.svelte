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
    <form on:submit|preventDefault={addProduct} class="flex flex-col gap-2">
        <label for="code">Código</label>
        <input
            id="code"
            class="input"
            type="text"
            name="code"
            placeholder="Ingrese el código"
            bind:value={product.code}
            required
        />

        <label for="name">Nombre</label>
        <input
            id="name"
            class="input"
            type="text"
            name="name"
            placeholder="Ingrese el nombre"
            bind:value={product.name}
            required
        />

        <label for="price">Precio</label>
        <input
            id="price"
            class="input"
            type="number"
            name="price"
            placeholder="Ingrese el precio"
            bind:value={product.price}
            min="0"
            required
        />

        <button
            type="submit"
            class="btn btn-primary mt-4"
            disabled={isSubmitted}
        >
            {isSubmitted ? "Guardando..." : "Guardar"}
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
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
    }

    .btn-primary {
        background-color: #22c55e;
        &:hover:not(:disabled) {
            background-color: #16a34a;
        }
    }
</style>
