<script>
    let ajustes = {
        nombreComercio: "Mi Tienda",
        modoOscuro: false,
        imprimirTicket: true,
        tipoFactura: "simple",
        tiempoCierreAutomatico: 15,
        notificaciones: {
            stockBajo: true,
            cierreCaja: true,
            nuevoTurno: false,
        },
        temaVisual: "claro",
    };

    function guardar(seccion) {
        alert(`Cambios guardados para: ${seccion}`);
    }
</script>

<div class="container flex-1 overflow-y-auto">
    <header class="header">
        <h1>Ajustes del Punto de Venta</h1>
        <p class="subtitle">
            Configuraciones generales y específicas para operar el sistema POS.
        </p>
    </header>

    <!-- Sección General -->
    <form on:submit|preventDefault={() => guardar("General")} class="group">
        <h2>General</h2>
        <div class="field">
            <label for="nombreComercio">Nombre del comercio</label>
            <input
                type="text"
                id="nombreComercio"
                bind:value={ajustes.nombreComercio}
            />
        </div>
        <div class="field checkbox">
            <input
                type="checkbox"
                id="modoOscuro"
                bind:checked={ajustes.modoOscuro}
            />
            <label for="modoOscuro">Activar modo oscuro</label>
        </div>
        <button type="submit" class="button">Guardar General</button>
    </form>

    <!-- Sección Caja y Turnos -->
    <form
        on:submit|preventDefault={() => guardar("Caja y Turnos")}
        class="group"
    >
        <h2>Caja y Turnos</h2>
        <div class="field">
            <label for="tiempoCierreAutomatico"
                >Cierre automático tras inactividad (minutos)</label
            >
            <input
                type="number"
                id="tiempoCierreAutomatico"
                bind:value={ajustes.tiempoCierreAutomatico}
                min="1"
            />
        </div>
        <div class="field checkbox">
            <input
                type="checkbox"
                id="nuevoTurno"
                bind:checked={ajustes.notificaciones.nuevoTurno}
            />
            <label for="nuevoTurno">Notificar al iniciar nuevo turno</label>
        </div>
        <button type="submit" class="button">Guardar Caja y Turnos</button>
    </form>

    <!-- Facturación -->
    <form on:submit|preventDefault={() => guardar("Facturación")} class="group">
        <h2>Facturación</h2>
        <div class="field">
            <label for="tipoFactura">Tipo de factura</label>
            <select id="tipoFactura" bind:value={ajustes.tipoFactura}>
                <option value="simple">Factura simplificada</option>
                <option value="detalle">Factura con detalle</option>
                <option value="completa">Factura completa</option>
            </select>
        </div>
        <button type="submit" class="button">Guardar Facturación</button>
    </form>

    <!-- Impresión -->
    <form on:submit|preventDefault={() => guardar("Impresión")} class="group">
        <h2>Impresión</h2>
        <div class="field checkbox">
            <input
                type="checkbox"
                id="imprimirTicket"
                bind:checked={ajustes.imprimirTicket}
            />
            <label for="imprimirTicket">Imprimir ticket automáticamente</label>
        </div>
        <button type="submit" class="button">Guardar Impresión</button>
    </form>

    <!-- Visualización -->
    <form
        on:submit|preventDefault={() => guardar("Visualización")}
        class="group"
    >
        <h2>Visualización</h2>
        <div class="field">
            <label for="temaVisual">Tema visual</label>
            <select id="temaVisual" bind:value={ajustes.temaVisual}>
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
                <option value="auto">Automático</option>
            </select>
        </div>
        <button type="submit" class="button">Guardar Visualización</button>
    </form>

    <!-- Notificaciones -->
    <form
        on:submit|preventDefault={() => guardar("Notificaciones")}
        class="group"
    >
        <h2>Notificaciones</h2>
        <div class="field checkbox">
            <input
                type="checkbox"
                id="stockBajo"
                bind:checked={ajustes.notificaciones.stockBajo}
            />
            <label for="stockBajo">Avisar por stock bajo</label>
        </div>
        <div class="field checkbox">
            <input
                type="checkbox"
                id="cierreCaja"
                bind:checked={ajustes.notificaciones.cierreCaja}
            />
            <label for="cierreCaja">Notificar cierre de caja</label>
        </div>
        <button type="submit" class="button">Guardar Notificaciones</button>
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
