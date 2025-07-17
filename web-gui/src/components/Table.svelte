<script>
    export let data = [];
    export let columns = [
        { key: "codigo", label: "Código" },
        { key: "nombre", label: "Nombre" },
        { key: "descripcion", label: "Descripción" },
        { key: "precioCompra", label: "Precio compra" },
        { key: "precioVenta", label: "Precio venta" },
        { key: "stock", label: "Stock" },
        { key: "estado", label: "Estado" },
    ];

    const exampleData = [
        {
            codigo: "PROD001",
            nombre: "Producto ejemplo",
            descripcion: "Descripción del producto",
            precioCompra: "$100",
            precioVenta: "$150",
            stock: "50 unidades",
            estado: "Activo",
        },
        {
            codigo: "PROD002",
            nombre: "Laptop Dell",
            descripcion: "Laptop para trabajo profesional",
            precioCompra: "$800",
            precioVenta: "$1200",
            stock: "25 unidades",
            estado: "Activo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD003",
            nombre: "Mouse inalámbrico",
            descripcion: "Mouse ergonómico con bluetooth",
            precioCompra: "$25",
            precioVenta: "$45",
            stock: "0 unidades",
            estado: "Inactivo",
        },
        {
            codigo: "PROD004",
            nombre: "Teclado mecánico",
            descripcion: "Teclado con teclas de goma",
            precioCompra: "$35",
            precioVenta: "$60",
            stock: "10 unidades",
            estado: "Activo",
        },
    ];

    $: tableData = data.length > 0 ? data : exampleData;

    function getStatusClass(estado) {
        return estado === "Activo"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    }
</script>

<div class="overflow-y-auto box-table flex-1">
    <table class="w-full text-xs text-left text-gray-700 border-collapse">
        <thead class="text-xs bg-gray-50 border-b border-black sticky top-0">
            <tr>
                {#each columns as column}
                    <th scope="col" class="px-3 py-1.5">{column.label}</th>
                {/each}
                <th scope="col" class="px-3 py-1.5"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-xs">
            {#each tableData as item}
                <tr class="hover:bg-gray-100 transition-colors">
                    <td class="px-3 py-1.5 font-mono">{item.codigo}</td>
                    <td
                        class="px-3 py-1.5 font-medium whitespace-nowrap text-gray-900"
                    >
                        {item.nombre}
                    </td>
                    <td class="px-3 py-1.5">{item.descripcion}</td>
                    <td class="px-3 py-1.5 font-medium">{item.precioCompra}</td>
                    <td class="px-3 py-1.5 font-medium">{item.precioVenta}</td>
                    <td class="px-3 py-1.5">{item.stock}</td>
                    <td class="px-3 py-1.5">
                        <span
                            class="px-1.5 py-0.5 rounded-full text-2xs font-medium {getStatusClass(
                                item.estado,
                            )}"
                        >
                            {item.estado}
                        </span>
                    </td>
                    <td class="px-3 py-1.5">
                        <button
                            class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                            aria-label="Opciones"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-5 h-5"
                            >
                                <path
                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                />
                            </svg>
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
