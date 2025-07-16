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
    <p class="text-sm text-gray-500" slot="subtitle">
        Para ingresar primero necesita abrir un turno.
    </p>

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
            <a href="/" class="btn underline-none">Volver</a>
            <button class="btn btn-primary">Abrir turno</button>
        </div>
    </form>
</Modal>
