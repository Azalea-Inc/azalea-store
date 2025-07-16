<script>
    import { settingsStore } from "@store/settingsStore";
</script>

<div class="container flex-1 overflow-y-auto">
    <header class="header">
        <h1>Ajustes del Punto de Venta</h1>
        <p class="subtitle">
            Configuraciones generales y específicas para operar el sistema POS.
        </p>
    </header>

    <!-- Sección General -->
    <form
        class="group"
        on:submit|preventDefault={() => settingsStore.saveGeneralSettings()}
    >
        <h2>General</h2>
        <div class="field">
            <label for="nombreComercio">Nombre del comercio</label>
            <input
                type="text"
                id="nombreComercio"
                bind:value={$settingsStore.storeName}
            />
        </div>

        <button type="submit" class="button">Guardar General</button>
    </form>

    <!-- Impresión -->
    <form class="group">
        <h2>Impresión</h2>
        <div class="field checkbox">
            <input type="checkbox" id="imprimirTicket" />
            <label for="imprimirTicket">Imprimir ticket automáticamente</label>
        </div>
        <button type="submit" class="button">Guardar Impresión</button>
    </form>
</div>

<style>
    .container {
        padding: 2rem;
        font-family:
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            sans-serif;
        color: #24292f;
    }

    .header h1 {
        font-size: 2rem;
        margin-bottom: 0.25rem;
    }

    .subtitle {
        color: #57606a;
        margin-bottom: 2rem;
    }

    .group {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #d0d7de;
    }

    .group h2 {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
        color: #1f2328;
    }

    .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    .field label {
        margin-bottom: 0.25rem;
        font-weight: 500;
        font-size: 0.95rem;
    }

    .field input[type="text"],
    .field input[type="number"],
    .field select {
        padding: 0.5rem;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        font-size: 1rem;
    }

    .field.checkbox {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .button {
        background-color: #0969da;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .button:hover {
        background-color: #035fc4;
    }
</style>
