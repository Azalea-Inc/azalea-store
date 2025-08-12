<script>
    import { onDestroy, onMount } from "svelte";
    import Chart from "chart.js/auto";
    import Container from "@components/Container.svelte";

    let userName = "Joan";
    let totalItems = 1520;
    let lowStockItems = 17;
    let categories = 12;

    let turnoActivo = true;
    let encargadoTurno = "Joan Coronado";
    let ultimaVenta = "14 junio 2025, 12:35 PM";
    let ultimoIngreso = "14 junio 2025, 11:10 AM";
    let proximaTarea = "Auditoría mensual - 20 junio 2025";
    let enMantenimiento = false;

    let productosChart;
    let stockChart;

    let productosChartCanvas;
    let stockChartCanvas;

    import { bus } from "$lib/EventBus";

    let events = [];

    function subscribeEvents() {
        events.push(
            bus.on("add-product", () => {
                console.log("Producto agregado");
            }),
        );
    }

    onDestroy(() => {
        events.forEach((event) => event());
    });

    onMount(() => {
        subscribeEvents();
        productosChart = new Chart(productosChartCanvas, {
            type: "line",
            data: {
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
                datasets: [
                    {
                        label: "Productos registrados",
                        data: [1000, 1100, 1200, 1300, 1450, totalItems],
                        borderColor: "#0969da",
                        backgroundColor: "rgba(9,105,218,0.1)",
                        fill: true,
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        stockChart = new Chart(stockChartCanvas, {
            type: "bar",
            data: {
                labels: [
                    "Electrónica",
                    "Ropa",
                    "Hogar",
                    "Juguetes",
                    "Alimentos",
                    "Otros",
                ],
                datasets: [
                    {
                        label: "Stock bajo",
                        data: [4, 2, 3, 1, 5, 2],
                        backgroundColor: "#d32f2f",
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
            },
        });
    });
</script>

<Container className="p-10 pt-6">
    <header class="header flex justify-between items-start">
        <div class="flex flex-col">
            <h1>Bienvenido, {userName}</h1>
            <p class="subtitle">
                Este es tu panel general del sistema de inventario.
            </p>
        </div>

        <section class="actions flex items-center">
            <a href="/" class="btn">Ver reportes →</a>
            <button
                on:click={() => bus.emit("add-product")}
                class="btn btn-primary"
            >
                + Agregar producto
            </button>
        </section>
    </header>

    <section class="stats">
        <div class="card">
            <h2>{totalItems}</h2>
            <p>Productos registrados</p>
        </div>
        <div class="card warning">
            <h2>{lowStockItems}</h2>
            <p>Stock bajo</p>
        </div>
        <div class="card">
            <h2>{categories}</h2>
            <p>Categorías</p>
        </div>
    </section>

    <section class="info">
        <div class="info-row">
            <strong>Turno:</strong>
            {#if turnoActivo}
                <span class="turno activo">Activo ({encargadoTurno})</span>
            {:else}
                <span class="turno inactivo">Sin turno activo</span>
            {/if}
        </div>
        <div class="info-row">
            <strong>Último ingreso:</strong>
            {ultimoIngreso}
        </div>
        <div class="info-row">
            <strong>Última venta:</strong>
            {ultimaVenta}
        </div>
        <div class="info-row">
            <strong>Próxima tarea:</strong>
            {proximaTarea}
        </div>
        <div class="info-row">
            <strong>Estado del sistema:</strong>
            {#if enMantenimiento}
                <span class="estado error">Mantenimiento</span>
            {:else}
                <span class="estado ok">Operativo</span>
            {/if}
        </div>
    </section>

    <section class="charts">
        <div class="chart-card">
            <h3>Evolución productos registrados</h3>
            <canvas bind:this={productosChartCanvas}></canvas>
        </div>
        <div class="chart-card">
            <h3>Stock bajo por categoría</h3>
            <canvas bind:this={stockChartCanvas}></canvas>
        </div>
    </section>
</Container>

<style>
    .header h1 {
        font-size: 2rem;
        margin-bottom: 0.25rem;
    }

    .subtitle {
        color: #57606a;
        margin-bottom: 2rem;
    }

    .stats {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    .card {
        background: #ffffff;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 1.5rem;
        flex: 1 1 200px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
    }

    .card h2 {
        font-size: 2rem;
        margin: 0 0 0.5rem;
        color: #24292f;
    }

    .card p {
        margin: 0;
        color: #57606a;
    }

    .card.warning h2 {
        color: #d32f2f;
    }

    .info {
        background: #f6f8fa;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        padding: 1.25rem;
        margin-bottom: 2rem;
        font-size: 0.95rem;
    }

    .info-row {
        margin-bottom: 0.5rem;
    }

    .turno {
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 6px;
    }

    .turno.activo {
        background: #dff7df;
        color: #097f07;
    }

    .turno.inactivo {
        background: #fbeaec;
        color: #a40e26;
    }

    .estado.ok {
        color: #116329;
        font-weight: 600;
    }

    .estado.error {
        color: #d32f2f;
        font-weight: 600;
    }

    .charts {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    .chart-card {
        background: #fff;
        border: 1px solid #d0d7de;
        border-radius: 8px;
        padding: 1rem;
        flex: 1 1 400px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
    }

    .chart-card h3 {
        margin-bottom: 1rem;
        font-weight: 600;
        color: #24292f;
    }

    canvas {
        width: 100% !important;
        height: 250px !important;
    }

    .actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
    }
</style>
