<script>
    import { testStore } from "./TestStore";
</script>

<div class="p-4 border">
    <h1 class="text-xl mb-2">Controls</h1>

    <button class="btn" on:click={() => testStore.addItem("new item")}
        >Inicio</button
    >
    <button class="btn">Configuración</button>
    <button class="btn">Salir</button>
</div>
