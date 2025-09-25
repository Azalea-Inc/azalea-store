<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import http from "$lib/http";
    import Breadcrumb from "@components/Breadcrumb.svelte";

    let user = null;
    let loading = true;
    let error = null;

    $: userId = $page.params.id;

    onMount(async () => {
        try {
            const { data } = await http.get(`/users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            user = data.data;
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

<div class="page-container flex-1 bg-gray-50 px-6">
    <!-- <div class="header">
        <nav class="breadcrumb px-6 py-2">
            <a href="/" class="breadcrumb-link">Inicio</a>
            <span class="breadcrumb-separator">/</span>
            <a href="/users" class="breadcrumb-link">Usuarios</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{user?.name || userId}</span>
        </nav>
    </div> -->

    <Breadcrumb />

    <div class="main-content pt-4">
        <div class="container">
            {#if loading}
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Cargando información del usuario...</p>
                </div>
            {:else if error}
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h2>Error al cargar usuario</h2>
                    <p>{error}</p>
                    <button
                        class="btn-secondary"
                        on:click={() => window.location.reload()}
                    >
                        Reintentar
                    </button>
                </div>
            {:else if user}
                <div class="user-profile">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <div class="avatar-circle">
                                {user.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "U"}
                            </div>
                        </div>
                        <div class="profile-info">
                            <h1 class="profile-name">
                                {user.name || "Sin nombre"}
                            </h1>
                            <p class="profile-username">
                                @{user.username || `user-${user.id}`}
                            </p>
                            <div class="profile-meta">
                                <span class="meta-item">
                                    <span class="meta-icon">📧</span>
                                    {user.email || "Email no disponible"}
                                </span>
                                <span class="meta-item">
                                    <span class="meta-icon">🕒</span>
                                    Se unió {user.createdAt
                                        ? new Date(
                                              user.createdAt,
                                          ).toLocaleDateString()
                                        : "fecha desconocida"}
                                </span>
                            </div>
                        </div>
                        <div class="profile-actions">
                            <button class="btn-primary">Editar perfil</button>
                            <button class="btn-secondary">Enviar mensaje</button
                            >
                        </div>
                    </div>

                    <div class="profile-content">
                        <div class="content-main">
                            <div class="section-card">
                                <div class="section-header">
                                    <h3>Información Personal</h3>
                                </div>
                                <div class="section-body">
                                    <div class="info-grid">
                                        <div class="info-item">
                                            <label>Email</label>
                                            <span
                                                >{user.email ||
                                                    "No disponible"}</span
                                            >
                                        </div>
                                        <div class="info-item">
                                            <label>Teléfono</label>
                                            <span
                                                >{user.phone ||
                                                    "No disponible"}</span
                                            >
                                        </div>
                                        <div class="info-item">
                                            <label>Rol</label>
                                            <span class="role-badge"
                                                >{user.role || "Usuario"}</span
                                            >
                                        </div>
                                        <div class="info-item">
                                            <label>Estado</label>
                                            <span
                                                class="status-badge"
                                                class:active={user.active}
                                                class:inactive={!user.active}
                                            >
                                                <span class="status-dot"></span>
                                                {user.active
                                                    ? "Activo"
                                                    : "Inactivo"}
                                            </span>
                                        </div>
                                        <div class="info-item">
                                            <label>Fecha de registro</label>
                                            <span
                                                >{user.createdAt
                                                    ? new Date(
                                                          user.createdAt,
                                                      ).toLocaleDateString()
                                                    : "No disponible"}</span
                                            >
                                        </div>
                                        <div class="info-item">
                                            <label>Última conexión</label>
                                            <span
                                                >{user.lastLogin
                                                    ? new Date(
                                                          user.lastLogin,
                                                      ).toLocaleString()
                                                    : "Nunca"}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {#if user.permissions && user.permissions.length > 0}
                                <div class="section-card">
                                    <div class="section-header">
                                        <h3>Permisos y Accesos</h3>
                                        <span class="permissions-count"
                                            >{user.permissions.length} permisos</span
                                        >
                                    </div>
                                    <div class="section-body">
                                        <div class="permissions-grid">
                                            {#each user.permissions as permission}
                                                <div class="permission-item">
                                                    <span
                                                        class="permission-icon"
                                                        >🔑</span
                                                    >
                                                    <span
                                                        class="permission-name"
                                                        >{permission}</span
                                                    >
                                                </div>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <div class="content-sidebar">
                            <div class="sidebar-card">
                                <div class="sidebar-header">
                                    <h4>Actividad Reciente</h4>
                                </div>
                                <div class="sidebar-body">
                                    <div class="activity-item">
                                        <div class="activity-icon">📝</div>
                                        <div class="activity-content">
                                            <p>Perfil actualizado</p>
                                            <time>Hace 2 días</time>
                                        </div>
                                    </div>
                                    <div class="activity-item">
                                        <div class="activity-icon">🔐</div>
                                        <div class="activity-content">
                                            <p>Último inicio de sesión</p>
                                            <time
                                                >{user.lastLogin
                                                    ? new Date(
                                                          user.lastLogin,
                                                      ).toLocaleDateString()
                                                    : "Nunca"}</time
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sidebar-card">
                                <div class="sidebar-header">
                                    <h4>ID de Usuario</h4>
                                </div>
                                <div class="sidebar-body">
                                    <code class="user-id-code">{user.id}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .page-container {
        min-height: 100vh;
        width: 100%;
    }

    .header {
        background: white;
        border-bottom: 1px solid #d1d9e0;
    }

    .container {
        max-width: 1280px;
        margin: 0 auto;
    }

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }

    .breadcrumb-link {
        color: #0969da;
        text-decoration: none;
    }

    .breadcrumb-link:hover {
        text-decoration: underline;
    }

    .breadcrumb-separator {
        color: #656d76;
    }

    .breadcrumb-current {
        font-weight: 600;
        color: #24292f;
    }

    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
    }

    .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid #f3f4f6;
        border-top: 3px solid #0969da;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
    }

    .error-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .error-state h2 {
        margin: 0 0 0.5rem 0;
        color: #cf222e;
    }

    .profile-header {
        background: white;
        border: 1px solid #d1d9e0;
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: flex-start;
        gap: 2rem;
    }

    .profile-avatar {
        flex-shrink: 0;
    }

    .avatar-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0969da 0%, #8250df 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        font-weight: bold;
        color: white;
    }

    .profile-info {
        flex: 1;
    }

    .profile-name {
        margin: 0 0 0.5rem 0;
        font-size: 2rem;
        font-weight: 600;
        color: #24292f;
    }

    .profile-username {
        margin: 0 0 1rem 0;
        font-size: 1.25rem;
        color: #656d76;
        font-weight: 300;
    }

    .profile-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #656d76;
    }

    .meta-icon {
        opacity: 0.8;
    }

    .profile-actions {
        display: flex;
        gap: 0.75rem;
        flex-shrink: 0;
    }

    .btn-primary,
    .btn-secondary {
        padding: 0.2rem 0.75rem;
        border-radius: 6px;
        font-weight: 500;
        font-size: 0.875rem;
        cursor: pointer;
        border: 1px solid;
        transition: all 0.2s;
    }

    .btn-primary {
        background: #238636;
        color: white;
        border-color: #238636;
    }

    .btn-primary:hover {
        background: #2ea043;
    }

    .btn-secondary {
        background: white;
        color: #24292f;
        border-color: #d1d9e0;
    }

    .btn-secondary:hover {
        background: #f3f4f6;
    }

    .profile-content {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
    }

    .content-main {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .section-card,
    .sidebar-card {
        background: white;
        border: 1px solid #d1d9e0;
        border-radius: 12px;
        overflow: hidden;
    }

    .section-header,
    .sidebar-header {
        padding: 1.5rem;
        border-bottom: 1px solid #d1d9e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .section-header h3,
    .sidebar-header h4 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #24292f;
    }

    .permissions-count {
        background: #ddf4ff;
        color: #0969da;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .section-body,
    .sidebar-body {
        padding: 1.5rem;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .info-item label {
        font-weight: 600;
        color: #656d76;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.025em;
    }

    .info-item span {
        color: #24292f;
        font-size: 1rem;
    }

    .role-badge {
        display: inline-flex;
        align-items: center;
        background: #fff8c5;
        color: #7d4e00;
        padding: 0.375rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        width: fit-content;
    }

    .status-badge {
        display: inline-flex !important;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 0.75rem;
        border-radius: 6px;
        font-size: 0.875rem;
        font-weight: 500;
        width: fit-content;
    }

    .status-badge.active {
        background: #dcfdf7;
        color: #14532d;
    }

    .status-badge.inactive {
        background: #fef2f2;
        color: #991b1b;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-badge.active .status-dot {
        background: #10b981;
    }

    .status-badge.inactive .status-dot {
        background: #ef4444;
    }

    .permissions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

    .permission-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: #f6f8fa;
        border: 1px solid #d1d9e0;
        border-radius: 8px;
    }

    .permission-icon {
        font-size: 1.25rem;
    }

    .permission-name {
        font-weight: 500;
        color: #24292f;
    }

    .content-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .activity-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid #d1d9e0;
    }

    .activity-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .activity-icon {
        width: 32px;
        height: 32px;
        background: #f6f8fa;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .activity-content p {
        margin: 0 0 0.25rem 0;
        font-weight: 500;
        color: #24292f;
    }

    .activity-content time {
        font-size: 0.875rem;
        color: #656d76;
    }

    .user-id-code {
        font-family:
            "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.875rem;
        background: #f6f8fa;
        padding: 0.75rem;
        border-radius: 6px;
        display: block;
        color: #24292f;
        border: 1px solid #d1d9e0;
    }

    @media (max-width: 1024px) {
        .profile-content {
            grid-template-columns: 1fr;
        }

        .content-sidebar {
            order: -1;
        }
    }

    @media (max-width: 768px) {
        .container {
            padding: 0 1rem;
        }

        .profile-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
        }

        .profile-actions {
            width: 100%;
            justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
            flex: 1;
        }

        .info-grid {
            grid-template-columns: 1fr;
        }

        .permissions-grid {
            grid-template-columns: 1fr;
        }

        .profile-meta {
            justify-content: center;
        }
    }
</style>
