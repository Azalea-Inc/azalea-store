<script>
    let cart = [
        { id: 1, nombre: "Producto 1", cantidad: 2, precio: 24.99 },
        { id: 2, nombre: "Producto 2", cantidad: 1, precio: 18.5 },
        { id: 3, nombre: "Producto 3", cantidad: 3, precio: 36.75 },
    ];

    function removeProduct(id) {
        cart = cart.filter((item) => item.id !== id);
    }

    function aumentarCantidad(id) {
        cart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, cantidad: item.cantidad + 1 };
            }
            return item;
        });
    }

    function disminuirCantidad(id) {
        cart = cart.map((item) => {
            if (item.id === id && item.cantidad > 1) {
                return { ...item, cantidad: item.cantidad - 1 };
            }
            return item;
        });
    }
</script>

<div
    class="box flex-1 bg-white rounded-md border border-gray-200 shadow-sm p-4"
>
    <div class="mt-4 flex flex-col gap-3">
        {#if cart.length === 0}
            <div
                class="flex flex-col items-center justify-center py-8 text-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-400 mb-4"
                >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path
                        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    ></path>
                </svg>
                <h3 class="text-lg font-medium text-gray-800 mb-1">
                    Tu carrito está vacío
                </h3>
                <p class="text-gray-500 mb-4">
                    Agrega productos para comenzar tu compra
                </p>
                <button
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Explorar productos
                </button>
            </div>
        {:else}
            {#each cart as item (item.id)}
                <div
                    class="flex justify-between items-center border-b border-gray-100 pb-3 hover:bg-gray-50 px-2 py-1 rounded"
                >
                    <div class="flex gap-2 items-center">
                        <span class="text-sm font-medium text-gray-800"
                            >{item.nombre}</span
                        >
                    </div>
                    <div class="flex items-center gap-3">
                        <div
                            class="flex items-center border border-gray-200 rounded-md"
                        >
                            <button
                                class="px-2 py-1 text-gray-600 hover:bg-gray-100 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                aria-label="Disminuir cantidad"
                                on:click={() => disminuirCantidad(item.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="w-3 h-3"
                                    ><line x1="5" y1="12" x2="19" y2="12"
                                    ></line></svg
                                >
                            </button>
                            <span class="px-2 py-1 text-sm text-gray-700"
                                >{item.cantidad}</span
                            >
                            <button
                                class="px-2 py-1 text-gray-600 hover:bg-gray-100 border-l border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                aria-label="Aumentar cantidad"
                                on:click={() => aumentarCantidad(item.id)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="w-3 h-3"
                                    ><line x1="12" y1="5" x2="12" y2="19"
                                    ></line><line x1="5" y1="12" x2="19" y2="12"
                                    ></line></svg
                                >
                            </button>
                        </div>
                        <button
                            class="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            aria-label="Eliminar artículo"
                            on:click={() => removeProduct(item.id)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="w-4 h-4"
                                ><polyline points="3 6 5 6 21 6"
                                ></polyline><path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                ></path></svg
                            >
                        </button>
                        <span class="font-medium text-gray-900"
                            >${item.precio.toFixed(2)}</span
                        >
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
