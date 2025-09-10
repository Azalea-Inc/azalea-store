<script>
    import http from "$lib/http";
    import Modal from "@components/Modal.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import { productsPageStore } from "@modules/products/viewmodel/ProductsPageStore";
    import { modals } from "@components/Modals";
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";

    const state = productsPageStore;

    export let product;

    const typeUnits = {
        unit: [{ label: "Pieza", value: "piece" }],
        bulk: [{ label: "Kilogramo", value: "kg" }],
    };

    let isSubmitted = false;

    let previousProductType = product.productType;

    $: if (product.productType !== previousProductType) {
        product.unitOfMeasure = "";
        previousProductType = product.productType;
    }

    async function saveProduct() {
        if (isSubmitted) return;
        isSubmitted = true;

        if (
            !product.code ||
            !product.name ||
            !product.salePrice ||
            !product.stock ||
            !product.minStock ||
            !product.productType ||
            !product.unitOfMeasure
        ) {
            toast.error("Por favor, complete todos los campos");
            isSubmitted = false;
            return;
        }

        try {
            await http.put(`/products/${product.id}`, product);
            await state.getProducts();
            toast.success("Producto actualizado exitosamente");
        } catch (error) {
            toast.error("Error al actualizar producto");
        } finally {
            isSubmitted = false;
        }
    }
</script>

<form
    on:submit|preventDefault={saveProduct}
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
            <div>
                <input
                    type="radio"
                    id="bulk"
                    name="productType"
                    value="bulk"
                    bind:group={product.productType}
                />
                <label for="bulk">Granel</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="unit"
                    name="productType"
                    value="unit"
                    bind:group={product.productType}
                />
                <label for="unit">Unitario</label>
            </div>
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
                    <option value={unit.value}>{unit.label}</option>
                {/each}
            </select>
        </div>
    </HorizontalList>

    <HorizontalList>
        <div class="form-group w-full">
            <label for="stock" class="form-label">Cantidad</label>
            <input
                id="stock"
                class="form-control"
                type="number"
                name="stock"
                placeholder="Ingrese la cantidad disponible"
                bind:value={product.stock}
                min="0"
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
            step="0.01"
            placeholder="Ingrese el precio de venta"
            bind:value={product.salePrice}
            min="0"
            required={product.hasInventory}
        />
    </div>

    <div class="form-group">
        <label for="isActive" class="form-label">Activo</label>
        <div class="switch">
            <input
                type="checkbox"
                id="isActive"
                bind:checked={product.isActive}
            />
            <label for="isActive">
                <span class="slider"></span>
            </label>
        </div>
    </div>

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
