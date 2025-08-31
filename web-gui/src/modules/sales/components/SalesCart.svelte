<script>
    import { saleStore } from "@store/SaleStore";
    import { slide } from "svelte/transition";
    import { flip } from "svelte/animate";

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

    $: total = $saleStore.cart.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0,
    );
</script>

<div class="flex flex-col flex-1 box p-4">
    {#if $saleStore.cart.length === 0}
        <div class="flex flex-col items-center justify-center py-8 text-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-gray-400 mb-4"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path
                    d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
                />
            </svg>
            <h3 class="text-lg font-medium text-gray-800 mb-1">
                Tu carrito está vacío
            </h3>
            <p class="text-gray-500 mb-4">
                Agrega productos para comenzar tu compra
            </p>
            <button
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >Explorar productos</button
            >
        </div>
    {:else}
        <!-- Encabezados -->
        <div
            class="grid bg-white grid-cols-[2fr_1fr_1fr_1fr_auto] text-sm font-semibold text-gray-600 border-b pb-2 px-2"
        >
            <div>Producto</div>
            <div class="text-center">Cantidad</div>
            <div class="text-center">Precio</div>
            <div class="text-center">Total</div>
            <div></div>
        </div>

        <!-- Lista de productos -->
        <div class="scroll-area mt-2 flex-1 flex flex-col gap-1">
            {#each $saleStore.cart as item (item.id)}
                <div
                    animate:flip={{ duration: 300 }}
                    class="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-2 px-2 py-2 border-b hover:bg-gray-50"
                >
                    <!-- Nombre -->
                    <div class="text-gray-800">{item.name}</div>

                    <!-- Cantidad -->
                    <div class="flex justify-center">
                        <div
                            class="flex items-center border border-gray-200 rounded-md"
                        >
                            <button
                                class="px-2 py-1 text-gray-600 hover:bg-gray-100 border-r border-gray-200"
                                on:click={() => disminuirCantidad(item.id)}
                                >-</button
                            >
                            <span class="px-2 py-1 text-sm text-gray-700"
                                >{item.quantity}</span
                            >
                            <button
                                class="px-2 py-1 text-gray-600 hover:bg-gray-100 border-l border-gray-200"
                                on:click={() => aumentarCantidad(item.id)}
                                >+</button
                            >
                        </div>
                    </div>

                    <!-- Precio -->
                    <div class="text-center text-gray-700">
                        ${item.price.toFixed(2)}
                    </div>

                    <!-- Total producto -->
                    <div class="text-center font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <!-- Eliminar -->
                    <div class="flex justify-end">
                        <button
                            class="text-gray-400 hover:text-red-500"
                            on:click={() => saleStore.removeProduct(item.id)}
                            >🗑️</button
                        >
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .scroll-area {
        overflow-y: auto;
    }
</style>
