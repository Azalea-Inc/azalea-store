<script>
    import { onMount } from "svelte";
    import { settingsVM as vm } from "@store/SettingsVM";

    let settings = $vm.settings;

    onMount(async () => {
        await vm.getBoxes();
    });
</script>

<header class="header">
    <div class="flex items-center gap-4">
        <button
            class="btn mb-2"
            href="/settings"
            on:click={() => vm.goSettingsOverview()}>Volver</button
        >
        <h1>Ajustes del Punto de Venta</h1>
    </div>
    <p class="subtitle">
        Configuraciones generales y específicas para operar el sistema POS.
    </p>
</header>

<!-- Sección General -->
<form on:submit|preventDefault={() => vm.saveGeneralSettings()} class="group">
    <h2>General</h2>

    <div class="field-group">
        <div class="field">
            <label for="nombreComercio">Nombre del comercio</label>
            <input
                type="text"
                id="nombreComercio"
                placeholder="Ingrese el nombre del comercio"
                bind:value={settings.store_name}
                required
            />
        </div>

        <div class="field">
            <label for="email">Email</label>
            <input
                type="text"
                id="email"
                placeholder="Ingrese el email del comercio"
                bind:value={settings.email}
            />
        </div>
    </div>

    <div class="field">
        <label for="currency">Moneda</label>
        <select id="currency" bind:value={settings.currency}>
            <option value="">Seleccione una moneda</option>
            <option value="USD">USD - Dólar estadounidense</option>
            <option value="EUR">EUR - Euro</option>
            <option value="MXN">MXN - Peso mexicano</option>
            <option value="COP">COP - Peso colombiano</option>
        </select>
    </div>

    <div class="field-group">
        <div class="field">
            <label for="direction">Dirección</label>
            <input
                type="text"
                id="direction"
                placeholder="Ingrese la dirección del comercio"
                bind:value={settings.address}
            />
        </div>

        <div class="field">
            <label for="telefono">Teléfono</label>
            <input
                type="text"
                id="telefono"
                placeholder="Ingrese el teléfono del comercio"
                bind:value={settings.phone}
            />
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Guardar General</button>
    <div class="field mt-8">
        <div class="field readonly">
            <label>Última actualización</label>
            <span class="readonly-value">
                {settings.updated_at
                    ? new Date(settings.updated_at).toLocaleString()
                    : "No disponible"}
            </span>
        </div>
    </div>
</form>

<!-- Configuración de Cajas -->
<form class="group">
    <h2>Configuración de Cajas</h2>

    {#if $vm.currentBox}
        <span>{$vm.currentBox.id}</span>
        <span>{$vm.currentBox.name}</span>
        <a href="/cashbox/{$vm.currentBox.id}">Ver detalles</a>
    {/if}

    <div class="field">
        <label for="caja">Caja</label>
        <select name="" id="">
            <option value="">Seleccionar caja</option>
            {#each $vm.boxes as box}
                <option value={box.id}>{box.name}</option>
            {/each}
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Guardar Configuración</button>
</form>

<!-- Impresión -->
<form class="group">
    <h2>Impresión</h2>
    <div class="field checkbox">
        <input type="checkbox" id="imprimirTicket" />
        <label for="imprimirTicket">Imprimir ticket automáticamente</label>
    </div>
    <button type="submit" class="btn btn-primary">Guardar Impresión</button>
</form>

<style>
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
        flex: 1;
    }

    .field-group {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
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
        padding: 0.3rem 0.5rem;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        font-size: 1rem;
    }

    .field.checkbox {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .field.readonly {
        margin-bottom: 1rem;
    }

    .readonly-value {
        padding: 0.3rem 0.5rem;
        background-color: #f6f8fa;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        font-size: 1rem;
        color: #57606a;
    }
</style>
