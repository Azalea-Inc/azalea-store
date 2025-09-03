<script>
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";
    import { userStore } from "@store/UserStore";
    import http from "$lib/http";

    let email = "";
    let password = "";
    let isLoading = false;

    async function loginHandler() {
        isLoading = true;
        try {
            await http.post("/login", { email, password });
            isLoading = false;
            toast.success("Inicio de sesión exitoso");
            window.location.href = "/";
        } catch (error) {
            toast.error("Error al iniciar sesión");
            console.error(error);
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="login-container">
    <div class="login-header">
        <h1>Iniciar sesión en Azalea</h1>
    </div>

    <div class="login-form-container">
        <form on:submit|preventDefault={loginHandler} class="login-form">
            <div class="form-group">
                <label for="email">Nombre de usuario o correo electrónico</label
                >
                <input type="email" id="email" bind:value={email} required />
            </div>

            <div class="form-group password-group">
                <div class="password-header">
                    <label for="password">Contraseña</label>
                    <a href="/forgot-password" class="forgot-link"
                        >¿Olvidaste tu contraseña?</a
                    >
                </div>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    autocomplete="current-password"
                    required
                />
            </div>

            <button type="submit" class="login-button" disabled={isLoading}>
                {#if isLoading}
                    <span class="spinner"></span>
                {:else}
                    Iniciar sesión
                {/if}
            </button>
        </form>
    </div>

    <div class="login-footer">
        <div class="footer-links">
            <a href="/terms">Términos</a>
            <a href="/privacy">Privacidad</a>
            <a href="/security">Seguridad</a>
            <a href="/contact">Contacto</a>
        </div>
    </div>
</div>

<style>
    .login-container {
        max-width: 340px;
        margin: 40px auto;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            sans-serif;
    }

    .login-header {
        text-align: center;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 24px;
        font-weight: 300;
        margin-bottom: 20px;
        color: #24292e;
    }

    .login-form-container {
        background-color: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 16px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    label {
        font-weight: 500;
        font-size: 14px;
        display: block;
        margin-bottom: 6px;
        color: #24292e;
    }

    input[type="email"],
    input[type="password"] {
        width: 100%;
        padding: 5px 12px;
        font-size: 14px;
        line-height: 20px;
        color: #24292e;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: right 8px center;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        outline: none;
        box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
        height: 34px;
    }

    input[type="email"]:focus,
    input[type="password"]:focus {
        border-color: #0366d6;
        box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
    }

    .password-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .forgot-link {
        font-size: 12px;
        color: #0366d6;
        text-decoration: none;
    }

    .forgot-link:hover {
        text-decoration: underline;
    }

    .login-button {
        width: 100%;
        background-color: #2ea44f;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        padding: 6px 16px;
        border: 1px solid rgba(27, 31, 35, 0.15);
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.5rem;
    }

    .login-button:hover:not(:disabled) {
        background-color: #2c974b;
    }

    .login-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .login-footer {
        text-align: center;
        font-size: 12px;
        color: #586069;
    }

    .login-footer a {
        color: #0366d6;
        text-decoration: none;
    }

    .login-footer a:hover {
        text-decoration: underline;
    }

    .footer-links {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
    }
</style>
