<script>
    import { onMount } from "svelte";
    import { getContext } from "svelte";
    // import { api } from "$lib/api";

    let items = [];
    let newItem = {
        name: "",
        quantity: 0,
        minQuantity: 0,
        description: "",
    };
    let showModal = false;

    onMount(async () => {
        try {
            // const response = await api.get("/inventory");
            // items = response.data;
        } catch (err) {
            console.error("Error fetching inventory:", err);
        }
    });

    async function addItem() {
        try {
            const response = await api.post("/inventory", newItem);
            items = [...items, response.data];
            newItem = {
                name: "",
                quantity: 0,
                minQuantity: 0,
                description: "",
            };
            showModal = false;
        } catch (err) {
            console.error("Error adding item:", err);
        }
    }

    async function deleteItem(id) {
        try {
            await api.delete(`/inventory/${id}`);
            items = items.filter((item) => item.id !== id);
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    }

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }
</script>

<div class="container flex-1 mx-auto p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-light text-gray-700">Inventory Management</h1>
        <button
            on:click={openModal}
            class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
        >
            Add New Item
        </button>
    </div>

    {#if showModal}
        <div
            class="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50"
            on:click={closeModal}
        >
            <div
                type="button"
                class="bg-white rounded-xl p-8 shadow-lg w-full max-w-lg"
                on:click|stopPropagation
            >
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-light text-gray-600">
                        Add New Item
                    </h2>
                    <button
                        on:click={closeModal}
                        class="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form
                    on:submit|preventDefault={addItem}
                    class="grid grid-cols-1 gap-5"
                >
                    <input
                        type="text"
                        placeholder="Item Name"
                        bind:value={newItem.name}
                        class="border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-300"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        bind:value={newItem.quantity}
                        class="border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-300"
                    />
                    <input
                        type="number"
                        placeholder="Minimum Quantity"
                        bind:value={newItem.minQuantity}
                        class="border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-300"
                    />
                    <textarea
                        placeholder="Description"
                        bind:value={newItem.description}
                        class="border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-300"
                    ></textarea>
                    <div class="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            on:click={closeModal}
                            class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    {/if}

    <div class="bg-white rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-light mb-6 text-gray-600">
            Current Inventory
        </h2>
        <div class="overflow-x-auto">
            <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="p-3 text-left text-gray-600 font-normal"
                            >Name</th
                        >
                        <th class="p-3 text-left text-gray-600 font-normal"
                            >Quantity</th
                        >
                        <th class="p-3 text-left text-gray-600 font-normal"
                            >Min Quantity</th
                        >
                        <th class="p-3 text-left text-gray-600 font-normal"
                            >Description</th
                        >
                        <th class="p-3 text-left text-gray-600 font-normal"
                            >Actions</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each items as item}
                        <tr class="border-b border-gray-100 hover:bg-gray-50">
                            <td class="p-3 text-gray-700">{item.name}</td>
                            <td class="p-3 text-gray-700">{item.quantity}</td>
                            <td class="p-3 text-gray-700">{item.minQuantity}</td
                            >
                            <td class="p-3 text-gray-700">{item.description}</td
                            >
                            <td class="p-3">
                                <button
                                    on:click={() => deleteItem(item.id)}
                                    class="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
