<script>
    import Modal from "@components/Modal.svelte";
    import { saleStore } from "@store/SaleStore";
</script>

<Modal
    isOpen
    title="Configuracion inicial"
    className="w-full max-w-md"
    isCloseButton={false}
>
    <p class="text-sm text-gray-500" slot="subtitle">
        Para ingresar primero necesita configurar una caja.
    </p>

    <div class="flex gap-2 items-center justify-end">
        <a href="/" class="btn underline-none">Ir al inicio</a>

        <a href="/cashbox" class="btn btn-primary">Ir a cajas</a>
    </div>
</Modal>
