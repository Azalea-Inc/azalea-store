<script>
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    export let products = [];
    export let cart = [];
    export let actions;

    const channel = new BroadcastChannel("sales-channel");

    let searchTerm = "";
    let total = 0;
    let weightInput = 0;
    let weighingProduct = null;

    function handleSearch() {
        const searchResults = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        });
        products = searchResults;
    }

    function startWeighing(product) {
        weighingProduct = product;
    }

    function addToCart(product) {
        const existingItem = cart.find((item) => item.id === product.id);

        if (product.isWeighed) {
            if (weightInput <= 0) return;

            if (existingItem) {
                existingItem.weight = (existingItem.weight || 0) + weightInput;
                existingItem.quantity = 1;
                cart = [...cart];
            } else {
                cart = [
                    ...cart,
                    { ...product, weight: weightInput, quantity: 1 },
                ];
            }
            weightInput = 0;
            weighingProduct = null;
        } else {
            if (existingItem) {
                existingItem.quantity += 1;
                cart = [...cart];
            } else {
                cart = [...cart, { ...product, quantity: 1 }];
            }
        }
        calculateTotal();
    }

    function removeFromCart(productId) {
        cart = cart.filter((item) => item.id !== productId);
        calculateTotal();
    }

    function updateQuantity(productId, quantity) {
        const item = cart.find((item) => item.id === productId);
        if (item) {
            if (item.isWeighed) {
                item.weight = quantity;
            } else {
                item.quantity = quantity;
            }
            cart = [...cart];
            calculateTotal();
        }
    }

    function calculateTotal() {
        total = cart
            .reduce((sum, item) => {
                if (item.isWeighed) {
                    return sum + item.price * item.weight;
                }
                return sum + item.price * item.quantity;
            }, 0)
            .toFixed(2);

        channel.postMessage({ type: "sale", total });
    }

    function handleCheckout() {
        actions.setState("checkout", { cart, total });
    }

    function getProducts() {
        fetch(`http://localhost:3000/api/products?page=1&limit=20`)
            .then((response) => response.json())
            .then((data) => {
                products = data.data;
            });
    }

    onMount(() => {
        getProducts();
    });
</script>

<div class="grid grid-cols-12 gap-4 h-[calc(100vh-2rem)] p-4">
    <!-- Productos -->
    <div class="col-span-8 bg-white rounded-2xl shadow-sm p-4 overflow-y-auto">
        <div class="flex items-center gap-2 mb-4">
            <input
                type="text"
                bind:value={searchTerm}
                placeholder="Buscar productos..."
                class="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                on:keydown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
                on:click={handleSearch}
                class="px-4 py-2 text-xs text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            >
                Buscar
            </button>
        </div>

        <div class="grid grid-cols-4 gap-4">
            {#each products as product}
                <div class="product-card flex flex-col h-full">
                    <div
                        class="aspect-square bg-gray-100 rounded-lg mb-2"
                    ></div>
                    <h3 class="font-medium">{product.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">
                        {product.description}
                    </p>
                    <div class="flex justify-between items-center">
                        <span class="font-bold"
                            >${product.price}{product.isWeighed
                                ? "/kg"
                                : ""}</span
                        >
                        <span class="text-sm text-gray-500"
                            >{product.stock}
                            {product.isWeighed ? "kg" : "unid."}</span
                        >
                    </div>
                    {#if product.isWeighed}
                        {#if weighingProduct?.id === product.id}
                            <div class="mt-2">
                                <input
                                    type="number"
                                    bind:value={weightInput}
                                    placeholder="Peso en kg"
                                    class="w-full px-2 py-1 text-xs border rounded"
                                    min="0"
                                    step="0.1"
                                />
                                <button
                                    class="w-full mt-2 px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                                    on:click={() => addToCart(product)}
                                >
                                    Confirmar peso
                                </button>
                            </div>
                        {:else}
                            <div class="mt-2">
                                <button
                                    class="w-full px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                                    on:click={() => startWeighing(product)}
                                >
                                    Pesar producto
                                </button>
                            </div>
                        {/if}
                    {:else}
                        <div class="mt-auto pt-4">
                            <button
                                class="w-full px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                                on:click={() => addToCart(product)}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <!-- Carrito -->
    <div
        class="col-span-4 bg-white rounded-2xl shadow-sm p-4 flex flex-col calc(100vh-15rem) overflow-y-scroll"
    >
        <h2 class="text-lg font-bold mb-4">Carrito de Compra</h2>

        <div class="flex-1 overflow-y-auto h-[calc(100vh-15rem)] px-4">
            {#each cart as item}
                <div class="flex items-center gap-2 p-2 border-b">
                    <div class="flex-1">
                        <h4 class="font-medium">{item.name}</h4>
                        <p class="text-sm text-gray-600">
                            ${item.price}{item.isWeighed ? "/kg" : ""}
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            class="px-2 py-1 text-xs border rounded"
                            on:click={() =>
                                updateQuantity(
                                    item.id,
                                    item.isWeighed
                                        ? Math.max(0, item.weight - 0.1)
                                        : Math.max(0, item.quantity - 1),
                                )}>-</button
                        >
                        <span class="text-sm">
                            {item.isWeighed
                                ? item.weight.toFixed(1) + "kg"
                                : item.quantity}
                        </span>
                        <button
                            class="px-2 py-1 text-xs border rounded"
                            on:click={() =>
                                updateQuantity(
                                    item.id,
                                    item.isWeighed
                                        ? item.weight + 0.1
                                        : item.quantity + 1,
                                )}>+</button
                        >
                        <button
                            class="text-red-500 text-xs"
                            on:click={() => removeFromCart(item.id)}>×</button
                        >
                    </div>
                </div>
            {/each}
        </div>

        <div class="border-t pt-4 mt-4">
            <div class="flex justify-between mb-4">
                <span class="font-bold">Total:</span>
                <span class="font-bold">${total}</span>
            </div>
            <button
                class="w-full btn btn-primary"
                on:click={handleCheckout}
                disabled={cart.length === 0}
            >
                Proceder al pago
            </button>
        </div>
    </div>
</div>

<style>
    .product-card {
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.05);
        background-color: #fff;
        transition: background-color 0.3s ease;
        cursor: pointer;
        &:hover {
            background-color: #fafafa;
        }

        font-size: 0.875rem;
        color: #3e3e3e;
        border-color: #f5f5f5;
        border-width: 1px;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
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
        background-color: #666;
        &:hover {
            background-color: #555;
        }
    }

    .btn-secondary {
        background-color: transparent;
        color: #666;
        box-shadow: none;
        &:hover {
            background-color: rgba(102, 102, 102, 0.1);
        }
    }

    th {
        font-weight: 600;
        font-size: 0.75rem;
        color: #666;
    }
</style>
