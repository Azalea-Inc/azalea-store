<script>
    import Modal from "../Modal.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let isOpen = false;

    let product = {
        code: "",
        name: "",
        price: 0,
    };

    async function addProduct() {
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("Error al agregar el producto");
            }

            product.code = "";
            product.name = "";
            product.price = 0;

            dispatch("close");
        } catch (error) {
            console.error(error);
        }
    }
</script>

<Modal {isOpen} on:close={() => dispatch("close")} title="Nuevo Producto">
    <form on:submit|preventDefault={addProduct} class="flex flex-col gap-2">
        <label for="code">Código</label>

        <input
            class="input"
            type="text"
            name="code"
            placeholder="Ingrese el código"
            bind:value={product.code}
        />

        <label for="name">Nombre</label>
        <input
            class="input"
            type="text"
            name="name"
            placeholder="Ingrese el nombre"
            bind:value={product.name}
        />
        <label for="price">Precio</label>
        <input
            class="input"
            type="number"
            name="price"
            placeholder="Ingrese el precio"
            bind:value={product.price}
            min="0"
        />

        <button class="btn btn-primary mt-4"> Guardar </button>
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
