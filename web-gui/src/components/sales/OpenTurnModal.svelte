<script>
    import Modal from "@components/Modal.svelte";
    import { saleStore } from "@store/SaleStore";
    import { sessionStore } from "@store/SessionStore";

    let turn = {
        cashBoxId: $sessionStore.cashBoxId,
        openAmount: "",
        closeAmount: "",
    };
</script>

<Modal
    isOpen={$saleStore.turnModal.isOpen}
    title="Abrir turno"
    className="w-full max-w-md"
    isCloseButton={false}
>
    <div class="flex items-center" slot="header">
        <a href="/" class="btn">Volver</a>
    </div>

    <form
        class="flex flex-col gap-4 w-full"
        on:submit|preventDefault={() => {
            saleStore.openTurn(turn);
        }}
    >
        <div class="form-group">
            <label for="openAmount" class="form-label"
                >Cantidad de apertura</label
            >
            <input
                id="openAmount"
                class="form-input"
                type="mumber"
                name="openAmount"
                placeholder="Ingrese la cantidad"
                required
                min="0"
                bind:value={turn.openAmount}
            />
        </div>

        <div class="form-group self-end">
            <button class="btn btn-primary px-2">Abrir turno</button>
        </div>
    </form>
</Modal>
