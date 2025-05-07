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
        stock: 0,
        minStock: 0,
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
    <form
        on:submit|preventDefault={addProduct}
        class="flex flex-col gap-4 w-lg"
    >
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

        <div class="form-group">
            <label class="flex items-center gap-2">
                <input type="checkbox" bind:checked={product.hasInventory} />
                <span>Gestionar inventario</span>
            </label>
        </div>

        {#if product.hasInventory}
            <div class="form-group">
                <label for="stock" class="form-label"
                    >Cantidad en inventario</label
                >
                <input
                    id="stock"
                    class="form-control"
                    type="number"
                    name="stock"
                    placeholder="Ingrese la cantidad disponible"
                    bind:value={product.stock}
                    min="0"
                    required={product.hasInventory}
                />
            </div>

            <div class="form-group">
                <label for="minStock" class="form-label">Cantidad mínima</label>
                <input
                    id="minStock"
                    class="form-control"
                    type="number"
                    name="minStock"
                    placeholder="Ingrese la cantidad mínima"
                    bind:value={product.minStock}
                    min="0"
                    required={product.hasInventory}
                />
            </div>

            <div class="form-group">
                <label for="salePrice" class="form-label">Precio de venta</label
                >
                <input
                    id="salePrice"
                    class="form-control"
                    type="number"
                    name="salePrice"
                    placeholder="Ingrese el precio de venta"
                    bind:value={product.saleprice}
                    min="0"
                    required={product.hasInventory}
                />
            </div>
        {/if}

        <button
            type="submit"
            class="btn btn-primary self-end"
            disabled={isSubmitted}
        >
            {isSubmitted ? "Guardando..." : "Guardar"}
        </button>
    </form>
</Modal>

<style>
    .form-group {
        margin-bottom: 0.25rem;
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
</style>
