<script>
    export let vm;
    const { settings } = vm;
</script>

<div class="mx-auto w-full max-w-3xl">
    <header class="header">
        <h1>Ajustes del Punto de Venta</h1>
        <p class="subtitle">
            Configuraciones generales y específicas para operar el sistema POS.
        </p>
    </header>

    <h2>General</h2>
    <!-- Sección General -->
    <form
        on:submit|preventDefault={() => vm.saveGeneralSettings()}
        class="group"
    >
        <div class="field-group">
            <div class="field">
                <label for="nombreComercio">Nombre del comercio</label>
                <input
                    type="text"
                    id="nombreComercio"
                    placeholder="Ingrese el nombre del comercio"
                    bind:value={$settings.store_name}
                    required
                />
            </div>

            <div class="field">
                <label for="email">Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Ingrese el email del comercio"
                    bind:value={$settings.email}
                />
            </div>
        </div>

        <div class="field">
            <label for="currency">Moneda</label>
            <select id="currency" bind:value={$settings.currency}>
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
                    bind:value={$settings.address}
                />
            </div>

            <div class="field">
                <label for="telefono">Teléfono</label>
                <input
                    type="text"
                    id="telefono"
                    placeholder="Ingrese el teléfono del comercio"
                    bind:value={$settings.phone}
                />
            </div>
        </div>

        <button type="submit" class="btn btn-primary self-end"
            >Guardar General</button
        >
        <div class="field mt-8">
            <div class="field readonly">
                <label>Última actualización</label>
                <span class="readonly-value">
                    {$settings?.updated_at
                        ? new Date($settings?.updated_at).toLocaleString()
                        : "No disponible"}
                </span>
            </div>
        </div>
    </form>

    <h2>Impresión</h2>
    <!-- Impresión -->
    <div class="group">
        <div class="flex items-center justify-between">
            <label for="isActivePrinter" class="field-label"
                >Impresión automática</label
            >
            <div class="switch">
                <input
                    type="checkbox"
                    id="isActivePrinter"
                    bind:checked={$settings.isActivePrinter}
                />
                <label for="isActivePrinter">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    </div>
</div>

<style>
    .header h1 {
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
    }

    .subtitle {
        color: #57606a;
        margin-bottom: 2rem;
        font-size: 1rem;
    }

    .group {
        padding: 1rem;
        border: 1px solid #e1e4e8;
        border-radius: 8px;
        background-color: #ffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
        font-size: 1rem;
        display: flex;
        flex-direction: column;
    }

    h2 {
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
        color: #1f2328;
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
