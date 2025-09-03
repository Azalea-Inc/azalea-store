<script>
    import { userStore } from "@store/UserStore";
    import { onMount } from "svelte";

    let user = $userStore;

    let loading = true;
    let error = null;
    let avatarError = false;

    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
</script>

<div class="user-info-container flex-1">
    <div class="header-container">
        <h1 class="text-2xl font-bold">Información del Usuario</h1>
        <div class="actions">
            <a class="btn primary" href="/profile/edit">Editar perfil</a>
            <button class="btn secondary">Cambiar contraseña</button>
        </div>
    </div>

    <div class="user-profile">
        <div class="profile-header">
            <div class="profile-picture">
                {#if !avatarError}
                    <img
                        src={user.avatar}
                        alt="Foto de perfil"
                        on:error={() => {
                            avatarError = true;
                        }}
                        on:load={() => {
                            avatarError = false;
                            console.log("Avatar cargado correctamente");
                        }}
                        on:loadstart={() => {
                            avatarError = false;
                        }}
                    />
                {:else}
                    <div class="default-avatar">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="60"
                            height="60"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                            />
                        </svg>
                    </div>
                {/if}
            </div>
            <div class="profile-name">
                <h2>{user.name}</h2>
                <p class="username">@{user.id}</p>
            </div>
        </div>

        <div class="profile-details">
            <div class="detail-item">
                <span class="label">Correo electrónico:</span>
                <span class="value">{user.email}</span>
            </div>
            <div class="detail-item">
                <span class="label">Fecha de registro:</span>
                <span class="value">{formatDate(user.createdAt)}</span>
            </div>
            <div class="detail-item">
                <span class="label">Último acceso:</span>
                <span class="value">{formatDate(user.lastLogin)}</span>
            </div>
            <div class="detail-item">
                <span class="label">Rol:</span>
                <span class="value">{user.role}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .user-info-container {
        max-width: 1012px;
        margin: 0 auto;
        padding: 24px;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            sans-serif;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .user-profile {
        background: white;
        border: 1px solid #d0d7de;
        border-radius: 10px;
        overflow: hidden;
    }

    .profile-header {
        display: flex;
        align-items: center;
        padding: 16px;
        background: #f6f8fa;
        border-bottom: 1px solid #d0d7de;
    }

    .profile-picture img {
        width: 296px;
        height: 296px;
        border-radius: 50%;
        border: 1px solid #d0d7de;
    }

    .profile-name {
        margin-left: 16px;
    }

    .profile-name h2 {
        margin: 0;
        font-size: 24px;
        line-height: 1.25;
        color: #1f2328;
    }

    .username {
        font-size: 20px;
        font-weight: 300;
        line-height: 24px;
        color: #656d76;
    }

    .profile-details {
        padding: 16px;
        border-bottom: 1px solid #d0d7de;
    }

    .detail-item {
        margin-bottom: 8px;
        display: flex;
        font-size: 14px;
    }

    .label {
        font-weight: 600;
        width: 150px;
        color: #24292f;
    }

    .value {
        color: #1f2328;
    }

    .actions {
        display: flex;
        gap: 8px;
    }

    .btn {
        padding: 5px 16px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    }

    .primary {
        background: #2da44e;
        color: white;
        border: 1px solid rgba(27, 31, 36, 0.15);
    }

    .secondary {
        background: #f6f8fa;
        color: #24292f;
        border: 1px solid rgba(27, 31, 36, 0.15);
    }

    .primary:hover {
        background: #2c974b;
    }

    .secondary:hover {
        background: #f3f4f6;
    }
</style>
