<script>
    import { userStore } from "@store/UserStore";

    let email = "";
    let password = "";
    let rememberMe = false;
    let isLoading = false;
    let errorMessage = "";

    function handleSubmit() {
        isLoading = true;
        errorMessage = "";

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, rememberMe }),
        })
            .then((response) => response.json())
            .then((data) => {
                const sessionData = {
                    userId: data.id,
                };

                const expirationDays = rememberMe ? 30 : 1;
                const expirationDate = new Date();
                expirationDate.setDate(
                    expirationDate.getDate() + expirationDays,
                );

                document.cookie = `session=${JSON.stringify(sessionData)}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;

                userStore.logued();
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error);
                errorMessage = "Error al iniciar sesión";
                isLoading = false;
            });
    }
</script>

<div class="login-container">
    <div class="login-header">
        <h1>Iniciar sesión en Azalea</h1>
    </div>

    <div class="login-form-container">
        <form on:submit|preventDefault={handleSubmit} class="login-form">
            {#if errorMessage}
                <div class="error-message">
                    {errorMessage}
                </div>
            {/if}

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

            <div class="form-group remember-me">
                <label class="checkbox-container">
                    <input type="checkbox" bind:checked={rememberMe} />
                    <span class="checkmark"></span>
                    Mantener la sesión iniciada
                </label>
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

    .remember-me {
        display: flex;
        align-items: center;
    }

    .checkbox-container {
        position: relative;
        padding-left: 25px;
        cursor: pointer;
        font-size: 14px;
        user-select: none;
        display: flex;
        align-items: center;
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: #fff;
        border: 1px solid #e1e4e8;
        border-radius: 3px;
    }

    .checkbox-container:hover input ~ .checkmark {
        border-color: #0366d6;
    }

    .checkbox-container input:checked ~ .checkmark {
        background-color: #0366d6;
        border-color: #0366d6;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    .checkbox-container .checkmark:after {
        left: 5px;
        top: 2px;
        width: 3px;
        height: 7px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
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

    .error-message {
        background-color: #ffebe9;
        border: 1px solid rgba(255, 129, 130, 0.4);
        color: #cb2431;
        padding: 8px 12px;
        margin-bottom: 16px;
        border-radius: 6px;
        font-size: 14px;
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
