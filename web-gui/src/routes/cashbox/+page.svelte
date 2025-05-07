<script>
    import { onMount } from "svelte";
    import { cashboxesPageStore } from "@store/cashboxes/cashboxesPageStore";
    import Breadcrumb from "@components/Breadcrumb.svelte";
    import AddBoxModal from "@components/cashbox/AddBoxModal.svelte";
    import Spinner from "@components/Spinner.svelte";
    import CashboxCard from "@components/cashbox/CashboxCard.svelte";

    const store = cashboxesPageStore;
    let isOpen = false;

    onMount(async () => {
        await store.getBoxes();
    });
</script>

<AddBoxModal {isOpen} on:close={() => (isOpen = false)} />
<div class="min-h-screen bg-gray-50 flex flex-col flex-1">
    <div class="p-4 px-8">
        <Breadcrumb />

        <div class="border-b border-gray-200 pb-4 mb-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-semibold text-gray-900">
                    Cajas registradoras
                </h1>
                <button
                    class="btn btn-primary inline-flex items-center"
                    on:click={() => (isOpen = true)}
                >
                    <svg
                        class="w-4 h-4 mr-1"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                        />
                    </svg>
                    Agregar caja
                </button>
            </div>
        </div>

        {#if $store.loading}
            <Spinner />
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each $store.cashboxes as box}
                    <CashboxCard
                        {box}
                        on:delete={() => store.removeCashbox(box.id)}
                    />
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .btn {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 0.375rem;
        border: 1px solid transparent;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.2s;
        color: #fff;
        background-color: #1f2937;
        &:hover {
            background-color: #111827;
        }
    }

    .btn-primary {
        background-color: #2da44e;
        &:hover {
            background-color: #2c974b;
        }
    }
</style>
