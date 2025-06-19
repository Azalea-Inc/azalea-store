<script>
    import { CheckCircle, XCircle, History, Users } from "lucide-svelte";

    let cajas = [
        {
            id: 1,
            nombre: "Caja Principal",
            estado: "abierta",
            encargado: "Luis Méndez",
            turnoActivo: true,
            balance: 2350.75,
            transacciones: 125,
            ultimaOperacion: "14 junio 2025, 12:30 PM",
        },
        {
            id: 2,
            nombre: "Caja 2 - Farmacia",
            estado: "cerrada",
            encargado: "María Pérez",
            turnoActivo: false,
            balance: 0,
            transacciones: 89,
            ultimaOperacion: "13 junio 2025, 6:45 PM",
        },
        {
            id: 3,
            nombre: "Caja 3 - Electrodomésticos",
            estado: "abierta",
            encargado: "Carlos Romero",
            turnoActivo: true,
            balance: 1580.2,
            transacciones: 104,
            ultimaOperacion: "14 junio 2025, 13:10 PM",
        },
        {
            id: 4,
            nombre: "Caja 4 - Ropa",
            estado: "cerrada",
            encargado: "Luisa Gómez",
            turnoActivo: false,
            balance: 0,
            transacciones: 47,
            ultimaOperacion: "12 junio 2025, 20:00 PM",
        },
        {
            id: 5,
            nombre: "Caja 5 - Electrónica",
            estado: "abierta",
            encargado: "Sergio Villanueva",
            turnoActivo: true,
            balance: 3221.75,
            transacciones: 152,
            ultimaOperacion: "14 junio 2025, 13:20 PM",
        },
        {
            id: 6,
            nombre: "Caja 6 - Deportes",
            estado: "abierta",
            encargado: "Valeria Ruiz",
            turnoActivo: true,
            balance: 820.5,
            transacciones: 69,
            ultimaOperacion: "14 junio 2025, 13:05 PM",
        },
    ];

    function toggleCaja(caja) {
        caja.estado = caja.estado === "abierta" ? "cerrada" : "abierta";
        caja.turnoActivo = caja.estado === "abierta";
        caja.balance =
            caja.estado === "abierta" ? Math.random() * 1000 + 500 : 0;
        caja.ultimaOperacion = new Date().toLocaleString("es-MX");
    }

    function verHistorial(caja) {
        alert(`Mostrando historial de: ${caja.nombre}`);
    }
</script>

<div class="container">
    <header class="header">
        <h1>Gestión de Cajas</h1>
        <p class="subtitle">
            Control y monitoreo de cajas activas del sistema.
        </p>
    </header>

    <section class="grid-cajas">
        {#each cajas as caja}
            <div class="caja-card">
                <div class="caja-header">
                    <div class="info">
                        <h2>{caja.nombre}</h2>
                        <p class="encargado">
                            <Users size="14" class="icon" />
                            {caja.encargado}
                        </p>
                        <p class="turno">
                            Turno:
                            <span class:activo={caja.turnoActivo} class="tag">
                                {caja.turnoActivo ? "Activo" : "Inactivo"}
                            </span>
                        </p>
                    </div>
                    <div class="estado">
                        {#if caja.estado === "abierta"}
                            <CheckCircle class="icon success" size="20" />
                        {:else}
                            <XCircle class="icon error" size="20" />
                        {/if}
                        <span class={caja.estado}>{caja.estado}</span>
                    </div>
                </div>

                <div class="caja-datos">
                    <div>
                        <p class="dato-titulo">Balance actual</p>
                        <p class="dato-valor">${caja.balance.toFixed(2)}</p>
                    </div>
                    <div>
                        <p class="dato-titulo">Transacciones</p>
                        <p class="dato-valor">{caja.transacciones}</p>
                    </div>
                    <div>
                        <p class="dato-titulo">Última operación</p>
                        <p class="dato-valor">{caja.ultimaOperacion}</p>
                    </div>
                </div>

                <div class="acciones">
                    <button
                        on:click={() => toggleCaja(caja)}
                        class="button small"
                    >
                        {caja.estado === "abierta" ? "Cerrar" : "Abrir"} caja
                    </button>
                    <button
                        on:click={() => verHistorial(caja)}
                        class="link small"
                    >
                        <History size="14" /> Historial
                    </button>
                </div>
            </div>
        {/each}
    </section>
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
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

    .grid-cajas {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .caja-card {
        background: #fff;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .caja-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
    }

    .info h2 {
        margin: 0;
        font-size: 1.1rem;
        color: #24292f;
    }

    .encargado {
        color: #57606a;
        font-size: 0.9rem;
        margin: 0.25rem 0;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .turno {
        font-size: 0.85rem;
        color: #57606a;
    }

    .tag {
        display: inline-block;
        padding: 0.15rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        margin-left: 4px;
        background-color: #eaeef2;
        color: #57606a;
        font-weight: 500;
    }

    .tag.activo {
        background-color: #dff7df;
        color: #097f07;
    }

    .estado {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        text-transform: capitalize;
        font-weight: 600;
        font-size: 0.85rem;
    }

    .abierta {
        color: #097f07;
    }

    .cerrada {
        color: #a40e26;
    }

    .icon.success {
        color: #36b24b;
    }

    .icon.error {
        color: #cf222e;
    }

    .caja-datos {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .dato-titulo {
        font-size: 0.75rem;
        color: #57606a;
    }

    .dato-valor {
        font-size: 1rem;
        font-weight: 600;
    }

    .acciones {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    .button.small {
        background-color: #0969da;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .button.small:hover {
        background-color: #035fc4;
    }

    .link.small {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background: none;
        border: none;
        color: #0969da;
        font-size: 0.9rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        transition: background 0.2s;
    }

    .link.small:hover {
        background-color: #f0f4f8;
    }
</style>
