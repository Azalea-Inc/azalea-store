<script>
    import { onMount } from "svelte";
    import { settingsVM as vm } from "@store/SettingsVM";
    import { goto } from "$app/navigation";

    let settings = {};
    let currentBox = null;

    onMount(async () => {
        await vm.getBoxes();
        settings = $vm.settings;
        currentBox = $vm.currentBox;
    });

    const displayValue = (value) => value || "No disponible";

    const goToSettingsForm = () => {
        goto("/settings"); // Ajusta la ruta según tu formulario
    };
</script>

<header class="header flex items-center justify-between">
    <div class="flex flex-col">
        <h1>Resumen de Configuraciones</h1>
        <p class="subtitle">
            Vista general de todas las configuraciones del Punto de Venta.
        </p>
    </div>

    <button on:click={() => vm.goSettingsForm()}>
        Ir al formulario de ajustes
    </button>
</header>

<section class="overview-group">
    <h2>General</h2>
    <div class="overview-field">
        <span class="label">Nombre del comercio:</span>
        <span>{displayValue(settings.store_name)}</span>
    </div>
    <div class="overview-field">
        <span class="label">Email:</span>
        <span>{displayValue(settings.email)}</span>
    </div>
    <div class="overview-field">
        <span class="label">Moneda:</span>
        <span>{displayValue(settings.currency)}</span>
    </div>
    <div class="overview-field">
        <span class="label">Dirección:</span>
        <span>{displayValue(settings.address)}</span>
    </div>
    <div class="overview-field">
        <span class="label">Teléfono:</span>
        <span>{displayValue(settings.phone)}</span>
    </div>
    <div class="overview-field">
        <span class="label">Última actualización:</span>
        <span>
            {settings.updated_at
                ? new Date(settings.updated_at).toLocaleString()
                : "No disponible"}
        </span>
    </div>
</section>

<section class="overview-group">
    <h2>Caja actual</h2>
    {#if currentBox}
        <div class="overview-field">
            <span class="label">ID:</span>
            <span>{currentBox.id}</span>
        </div>
        <div class="overview-field">
            <span class="label">Nombre:</span>
            <span>{currentBox.name}</span>
        </div>
        <div class="overview-field">
            <a href={`/cashbox/${currentBox.id}`}>Ver detalles</a>
        </div>
    {:else}
        <p>No hay caja seleccionada.</p>
    {/if}
</section>

<section class="overview-group">
    <h2>Impresión</h2>
    <div class="overview-field">
        <span class="label">Imprimir ticket automáticamente:</span>
        <span>{settings.print_ticket ? "Sí" : "No"}</span>
    </div>
</section>

<style>
    /* Estilo general tipo GitHub Enterprise */
    .header {
        border-bottom: 1px solid #e1e4e8;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
    }

    .header h1 {
        font-size: 1.75rem;
        font-weight: 600;
        color: #24292f;
        margin-bottom: 0.25rem;
    }

    .subtitle {
        color: #57606a;
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }

    .btn-go-settings {
        background-color: #0969da;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: 500;
        margin-bottom: 1.5rem;
        transition: background-color 0.2s;
    }

    .btn-go-settings:hover {
        background-color: #0056b3;
    }

    .overview-group {
        margin-bottom: 2rem;
        padding: 1rem;
        border: 1px solid #e1e4e8;
        border-radius: 8px;
        background-color: #f6f8fa;
    }

    .overview-group h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: #24292f;
        border-bottom: 1px solid #e1e4e8;
        padding-bottom: 0.25rem;
    }

    .overview-field {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background-color: white;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        font-size: 1rem;
    }

    .overview-field .label {
        font-weight: 600;
        color: #57606a;
    }

    a {
        color: #0969da;
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
