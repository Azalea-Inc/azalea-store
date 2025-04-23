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
    <h1 class="pb-6 text-2xl font-bold">Información del Usuario</h1>

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

        <div class="actions">
            <button class="btn primary">Editar perfil</button>
            <button class="btn secondary">Cambiar contraseña</button>
        </div>
    </div>
</div>

<style>
    .user-info-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    .user-profile {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .profile-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: #f5f5f5;
    }

    .profile-picture img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .profile-name {
        margin-left: 20px;
    }

    .profile-name h2 {
        margin: 0;
        color: #333;
    }

    .username {
        color: #666;
        margin: 5px 0 0;
    }

    .profile-details {
        padding: 20px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    .detail-item {
        margin-bottom: 15px;
        display: flex;
    }

    .label {
        font-weight: bold;
        width: 150px;
        color: #555;
    }

    .value {
        color: #333;
    }

    .actions {
        padding: 20px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }

    .btn {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.3s;
    }

    .primary {
        background: #4caf50;
        color: white;
    }

    .secondary {
        background: #f5f5f5;
        color: #333;
        border: 1px solid #ddd;
    }

    .primary:hover {
        background: #43a047;
    }

    .secondary:hover {
        background: #e0e0e0;
    }
</style>
