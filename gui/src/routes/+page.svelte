<script>
    import { onDestroy, onMount } from "svelte";
    import Chart from "chart.js/auto";
    import Container from "@components/Container.svelte";
    import { session } from "@store/Session";

    const vm = session;

    // POS Metrics
    let totalSales = 1200;
    let dailyTransactions = 247;
    let activeProducts = 1520;
    let lowStockItems = 17;
    let avgTicket = 87.5;
    let topCategory = "Electrónicos";

    // System Status
    let turnoActivo = true;
    let ultimaVenta = "14 junio 2025, 12:35 PM";
    let ultimoIngreso = "14 junio 2025, 11:10 AM";
    let proximaTarea = "Corte de caja - 18:00 PM";
    let enMantenimiento = false;

    // Charts
    let salesChart;
    let categoriesChart;
    let salesChartCanvas;
    let categoriesChartCanvas;

    import { bus } from "$lib/EventBus";

    let events = [];

    function subscribeEvents() {
        events.push(
            bus.on("add-product", () => {
                console.log("Producto agregado");
            }),
            bus.on("new-sale", () => {
                console.log("Nueva venta registrada");
            }),
        );
    }

    onDestroy(() => {
        events.forEach((event) => event());
        if (salesChart) salesChart.destroy();
        if (categoriesChart) categoriesChart.destroy();
    });

    onMount(() => {
        subscribeEvents();

        // Sales trend chart
        salesChart = new Chart(salesChartCanvas, {
            type: "line",
            data: {
                labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                datasets: [
                    {
                        label: "Ventas diarias ($)",
                        data: [18500, 22300, 19800, 24100, 28900, 35200, 23600],
                        borderColor: "#0969da",
                        backgroundColor: "rgba(9,105,218,0.1)",
                        fill: true,
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return "$" + value.toLocaleString();
                            },
                        },
                    },
                },
            },
        });

        // Categories performance chart
        categoriesChart = new Chart(categoriesChartCanvas, {
            type: "doughnut",
            data: {
                labels: [
                    "Electrónicos",
                    "Ropa",
                    "Hogar",
                    "Deportes",
                    "Juguetes",
                    "Otros",
                ],
                datasets: [
                    {
                        label: "Ventas por categoría",
                        data: [35, 25, 15, 12, 8, 5],
                        backgroundColor: [
                            "#0969da",
                            "#1f883d",
                            "#d1242f",
                            "#fb8500",
                            "#8b5cf6",
                            "#6b7280",
                        ],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "right",
                    },
                },
            },
        });
    });
</script>

<Container className="p-8 pt-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="header sticky top-0 z-10">
        <div class="header-content">
            <div class="header-info">
                <div class="store-status">
                    <div class="status-indicator active"></div>
                    <span class="store-name">{$vm.name}</span>
                </div>
                <h1 class="dashboard-title">Panel de Control POS</h1>
                <p class="subtitle">
                    Resumen ejecutivo de ventas y operaciones en tiempo real
                </p>
            </div>

            <section class="header-actions">
                <div class="quick-stats">
                    <div class="quick-stat">
                        <span class="stat-value"
                            >${totalSales.toLocaleString()}</span
                        >
                        <span class="stat-label">Ventas hoy</span>
                    </div>
                    <div class="quick-stat">
                        <span class="stat-value">{dailyTransactions}</span>
                        <span class="stat-label">Transacciones</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-secondary">
                        <svg
                            class="btn-icon"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                                fill-rule="evenodd"
                                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                            />
                        </svg>
                        Reportes
                    </button>
                    <button
                        on:click={() => bus.emit("add-product")}
                        class="btn btn-primary"
                    >
                        <svg
                            class="btn-icon"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Nueva venta
                    </button>
                </div>
            </section>
        </div>
    </header>

    <!-- KPI Cards -->
    <section class="kpi-grid">
        <div class="kpi-card primary">
            <div class="kpi-header">
                <div class="kpi-icon sales">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend positive">+12.3%</div>
            </div>
            <div class="kpi-value">${totalSales.toLocaleString()}</div>
            <div class="kpi-label">Ventas del día</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon transactions">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend positive">+8.1%</div>
            </div>
            <div class="kpi-value">{dailyTransactions}</div>
            <div class="kpi-label">Transacciones</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon products">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend neutral">—</div>
            </div>
            <div class="kpi-value">{activeProducts}</div>
            <div class="kpi-label">Productos activos</div>
        </div>

        <div class="kpi-card warning">
            <div class="kpi-header">
                <div class="kpi-icon stock">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend negative">-2</div>
            </div>
            <div class="kpi-value">{lowStockItems}</div>
            <div class="kpi-label">Stock bajo</div>
        </div>

        <div class="kpi-card success">
            <div class="kpi-header">
                <div class="kpi-icon ticket">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend positive">+5.7%</div>
            </div>
            <div class="kpi-value">${avgTicket}</div>
            <div class="kpi-label">Ticket promedio</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-header">
                <div class="kpi-icon category">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                        />
                    </svg>
                </div>
                <div class="kpi-trend positive">↗</div>
            </div>
            <div class="kpi-value">{topCategory}</div>
            <div class="kpi-label">Top categoría</div>
        </div>
    </section>

    <!-- System Status -->
    <section class="system-status">
        <div class="status-card">
            <div class="status-header">
                <h3>Estado del Sistema</h3>
                <div
                    class="system-indicator {enMantenimiento
                        ? 'maintenance'
                        : 'operational'}"
                >
                    {enMantenimiento ? "Mantenimiento" : "Operativo"}
                </div>
            </div>
            <div class="status-grid">
                <div class="status-item">
                    <span class="status-label">Turno actual</span>
                    {#if turnoActivo}
                        <div class="status-value">
                            <div class="user-status active">
                                <div class="user-avatar">
                                    {$vm.name
                                        .split(" ")
                                        .map((word) => word.charAt(0))
                                        .join("")
                                        .substring(0, 2)}
                                </div>
                                <span>{$vm.name}</span>
                            </div>
                        </div>
                    {:else}
                        <span class="status-value inactive"
                            >Sin turno activo</span
                        >
                    {/if}
                </div>
                <div class="status-item">
                    <span class="status-label">Última transacción</span>
                    <span class="status-value">{ultimaVenta}</span>
                </div>
                <div class="status-item">
                    <span class="status-label">Último ingreso</span>
                    <span class="status-value">{ultimoIngreso}</span>
                </div>
                <div class="status-item">
                    <span class="status-label">Próxima tarea</span>
                    <span class="status-value priority">{proximaTarea}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Analytics Charts -->
    <section class="analytics-section">
        <div class="chart-container">
            <div class="chart-card primary">
                <div class="chart-header">
                    <h3>Tendencia de Ventas</h3>
                    <div class="chart-actions">
                        <button class="chart-action active">7D</button>
                        <button class="chart-action">30D</button>
                        <button class="chart-action">90D</button>
                    </div>
                </div>
                <div class="chart-content">
                    <canvas bind:this={salesChartCanvas}></canvas>
                </div>
            </div>

            <div class="chart-card secondary">
                <div class="chart-header">
                    <h3>Ventas por Categoría</h3>
                    <div class="chart-meta">
                        <span class="meta-text">Últimos 30 días</span>
                    </div>
                </div>
                <div class="chart-content">
                    <canvas bind:this={categoriesChartCanvas}></canvas>
                </div>
            </div>
        </div>
    </section>
</Container>

<style>
    /* Header Styles */
    .header {
        background: white;
        border: 1px solid #d0d7de;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
    }

    .store-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #22c55e;
    }

    .status-indicator.active {
        background: #22c55e;
        box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
    }

    .store-name {
        font-weight: 600;
        color: #1f2937;
        font-size: 0.875rem;
    }

    .dashboard-title {
        font-size: 1.875rem;
        font-weight: 700;
        color: #111827;
        margin: 0 0 0.5rem;
    }

    .subtitle {
        color: #6b7280;
        margin: 0;
        font-size: 0.875rem;
    }

    .header-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-end;
    }

    .quick-stats {
        display: flex;
        gap: 2rem;
    }

    .quick-stat {
        text-align: right;
    }

    .stat-value {
        display: block;
        font-size: 1.25rem;
        font-weight: 700;
        color: #111827;
    }

    .stat-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .action-buttons {
        display: flex;
        gap: 0.75rem;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 6px;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.15s ease;
        text-decoration: none;
    }

    .btn-icon {
        width: 1rem;
        height: 1rem;
    }

    .btn-secondary {
        background: #f8fafc;
        border-color: #e2e8f0;
        color: #475569;
    }

    .btn-secondary:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
    }

    .btn-primary {
        background: #0969da;
        color: white;
    }

    .btn-primary:hover {
        background: #0860ca;
    }

    /* KPI Cards */
    .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .kpi-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.25rem;
        transition: all 0.15s ease;
    }

    .kpi-card:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border-color: #d1d5db;
    }

    .kpi-card.primary {
        background: linear-gradient(135deg, #0969da 0%, #0860ca 100%);
        color: white;
        border-color: #0969da;
    }

    .kpi-card.warning {
        border-color: #f59e0b;
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    }

    .kpi-card.success {
        border-color: #10b981;
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    }

    .kpi-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
    }

    .kpi-icon {
        width: 2rem;
        height: 2rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.1);
    }

    .kpi-card.primary .kpi-icon {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }

    .kpi-icon svg {
        width: 1.125rem;
        height: 1.125rem;
    }

    .kpi-trend {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
    }

    .kpi-trend.positive {
        background: #dcfce7;
        color: #16a34a;
    }

    .kpi-trend.negative {
        background: #fee2e2;
        color: #dc2626;
    }

    .kpi-trend.neutral {
        background: #f3f4f6;
        color: #6b7280;
    }

    .kpi-value {
        font-size: 1.875rem;
        font-weight: 700;
        color: inherit;
        margin-bottom: 0.25rem;
    }

    .kpi-label {
        font-size: 0.875rem;
        color: inherit;
        opacity: 0.8;
    }

    /* System Status */
    .system-status {
        margin-bottom: 2rem;
    }

    .status-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.5rem;
    }

    .status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #f3f4f6;
    }

    .status-header h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
    }

    .system-indicator {
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .system-indicator.operational {
        background: #dcfce7;
        color: #16a34a;
    }

    .system-indicator.maintenance {
        background: #fee2e2;
        color: #dc2626;
    }

    .status-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .status-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .status-label {
        font-size: 0.75rem;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 500;
    }

    .status-value {
        font-size: 0.875rem;
        color: #111827;
        font-weight: 500;
    }

    .status-value.inactive {
        color: #ef4444;
    }

    .status-value.priority {
        color: #f59e0b;
    }

    .user-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .user-avatar {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #0969da;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.625rem;
        font-weight: 600;
    }

    /* Analytics Charts */
    .analytics-section {
        margin-bottom: 2rem;
    }

    .chart-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
    }

    .chart-card {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05);
    }

    .chart-header {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chart-header h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        color: #111827;
    }

    .chart-actions {
        display: flex;
        gap: 0.25rem;
    }

    .chart-action {
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 500;
        border: 1px solid #e5e7eb;
        background: white;
        color: #6b7280;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .chart-action.active {
        background: #0969da;
        color: white;
        border-color: #0969da;
    }

    .meta-text {
        font-size: 0.75rem;
        color: #6b7280;
    }

    .chart-content {
        padding: 1rem 1.5rem 1.5rem;
        height: 300px;
    }

    canvas {
        width: 100% !important;
        height: 100% !important;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            align-items: flex-start;
        }

        .header-actions {
            width: 100%;
            align-items: flex-start;
        }

        .quick-stats {
            width: 100%;
            justify-content: space-between;
        }

        .chart-container {
            grid-template-columns: 1fr;
        }

        .kpi-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
</style>
