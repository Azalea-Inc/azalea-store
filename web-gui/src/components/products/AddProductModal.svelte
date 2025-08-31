<script>
    import Modal from "@components/Modal.svelte";
    import http from "$lib/http";
    import HorizontalList from "@components/HorizontalList.svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";
    import { modals } from "@components/Modals";
    import { toast } from "svelte-sonner";

    const state = productsPageStore;

    const initialProductState = {
        code: "",
        name: "",
        costPrice: 0,
        stock: 0,
        minStock: 0,
        productType: "",
        unitOfMeasure: "",
    };

    const typeUnits = {
        unit: [{ label: "Pieza", value: "Piece" }],
        bulk: [{ label: "Kilogramo", value: "Kg" }],
    };

    let product = { ...initialProductState };
    let isSubmitted = false;

    function resetProduct() {
        product = { ...initialProductState };
    }

    async function addProduct() {
        if (isSubmitted) return;
        isSubmitted = true;

        try {
            await http.post("/products", product);
            resetProduct();
            await state.getProducts();
            modals.close();
            toast.success("Producto agregado exitosamente");
        } catch (error) {
            toast.error("Error al agregar el producto");
        } finally {
            isSubmitted = false;
        }
    }
</script>

<form
    on:submit|preventDefault={addProduct}
    class="flex flex-col gap-4 w-lg p-8"
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
        <label for="product-name" class="form-label">Nombre</label>
        <input
            id="product-name"
            class="form-control"
            type="text"
            name="product-name"
            placeholder="Ingrese el nombre"
            bind:value={product.name}
            required
        />
    </div>

    <HorizontalList>
        <div class="form-group w-full">
            <label for="productType" class="form-label">Tipo de producto</label>
            <select
                id="productType"
                class="form-control"
                name="productType"
                bind:value={product.productType}
                required
            >
                <option value="" disabled selected>Seleccione un tipo</option>
                <option value="unit">Unitario</option>
                <option value="bulk">Granel</option>
            </select>
        </div>

        <div class="form-group w-full">
            <label for="unitOfMeasure" class="form-label"
                >Unidad de medida</label
            >
            <select
                id="unitOfMeasure"
                class="form-control"
                name="unitOfMeasure"
                bind:value={product.unitOfMeasure}
                required
            >
                <option value="" disabled selected>Seleccione una unidad</option
                >

                {#each typeUnits[product.productType] as unit}
                    <option value={unit.label}>{unit.label}</option>
                {/each}
            </select>
        </div>
    </HorizontalList>

    <div class="form-group">
        <label for="price" class="form-label">Precio de Compra</label>
        <input
            id="price"
            class="form-control"
            type="number"
            name="price"
            placeholder="Ingrese el precio"
            bind:value={product.costPrice}
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
        <HorizontalList>
            <div class="form-group w-full">
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

            <div class="form-group w-full">
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
        </HorizontalList>

        <div class="form-group">
            <label for="salePrice" class="form-label">Precio de venta</label>
            <input
                id="salePrice"
                class="form-control"
                type="number"
                name="salePrice"
                placeholder="Ingrese el precio de venta"
                bind:value={product.salePrice}
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
