<script>
    import Modal from "@components/Modal.svelte";
    import { saleStore } from "@store/SaleStore";

    let turn = {
        closeAmount: "",
    };
</script>

<Modal
    on:close={() => {
        saleStore.closeTurnModal();
    }}
    isOpen
    title="Cerrar turno"
    className="w-full max-w-md"
>
    <form
        class="flex flex-col gap-4 w-full"
        on:submit|preventDefault={() => {
            saleStore.closeTurn(closeAmount);
        }}
    >
        <div class="form-group">
            <label for="closeAmount" class="form-label"
                >Cantidad de cierre</label
            >
            <input
                id="closeAmount"
                class="form-input"
                type="number"
                name="closeAmount"
                placeholder="Ingrese la cantidad"
                required
                min="0"
                bind:value={turn.closeAmount}
            />
        </div>

        <div class="form-group self-end">
            <button class="btn btn-primary px-2">Cerrar turno</button>
        </div>
    </form>
</Modal>
