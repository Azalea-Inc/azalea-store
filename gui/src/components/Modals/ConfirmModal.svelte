<script>
    import { modals } from "@components/Modals";
    export let message;
    export let onConfirm;
    export let onCancel = null;
</script>

<div class="p-4 flex flex-col gap-6 select-none">
    <p>{message}</p>
    <div class="flex items-center gap-2 justify-end">
        <button
            class="btn"
            on:click={() => {
                if (onCancel) {
                    return onCancel();
                }

                modals.close();
            }}>Cancelar</button
        >
        <button
            class="btn"
            on:click={async () => {
                await onConfirm();
                modals.close();
            }}>Confirmar</button
        >
    </div>
</div>
