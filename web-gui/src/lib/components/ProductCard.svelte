<script>
    export let product = {};
</script>

<div
    class="p-6 shadow-sm rounded-xl border border-gray-100 hover:border-gray-200 product-card bg-white flex flex-col gap-3"
>
    <h2 class="text-xl font-sans font-medium text-gray-800">
        {product.name}
    </h2>
    <p class="text-gray-600 font-light leading-relaxed">
        {product.description}
    </p>
    <div class="mt-2">
        <p class="text-gray-700 font-medium">
            Precio: ${product.price}
        </p>
        <p class="text-gray-600">
            Stock: {product.stock} unidades
        </p>
        <p class="text-gray-600">
            Categoría: {product.category}
        </p>
        <p class="text-gray-600">SKU: {product.code}</p>
    </div>
    <div class="mt-2 flex items-center gap-2">
        <span class="text-sm text-gray-500">Estado:</span>
        <span
            class={`px-2 py-1 rounded-full text-xs ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
            {product.status === "active" ? "Activo" : "Inactivo"}
        </span>
    </div>
    <p class="text-sm text-gray-500 mt-2">
        Última actualización: {new Date(product.updatedAt).toLocaleDateString()}
    </p>
</div>
