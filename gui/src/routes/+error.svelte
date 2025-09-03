<script>
    let errorCode = 404;
    let errorMessage = "Página no encontrada";
    let description =
        "No pudimos encontrar la página que estás buscando. Es posible que haya sido eliminada, renombrada o nunca haya existido.";
</script>

<div class="error-wrapper flex-1">
    <div class="error-box">
        <h1 class="error-code">{errorCode}</h1>
        <h2 class="error-title">{errorMessage}</h2>
        <p class="error-description">{description}</p>

        <div class="actions">
            <button class="button" on:click={() => window.history.back()}>
                ← Regresar
            </button>
            <a class="link" href="/">Ir al inicio →</a>
        </div>
    </div>
</div>

<style>
    .error-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f6f8fa;
        padding: 2rem;
        font-family:
            system-ui,
            -apple-system,
            "Segoe UI",
            Roboto,
            sans-serif;
    }

    .error-box {
        background-color: #ffffff;
        padding: 3rem;
        border: 1px solid #d0d7de;
        border-radius: 12px;
        max-width: 480px;
        width: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        text-align: center;
    }

    .error-code {
        font-size: 5rem;
        font-weight: 700;
        color: #d32f2f;
        margin: 0 0 0.5rem 0;
    }

    .error-title {
        font-size: 1.75rem;
        margin-bottom: 1rem;
        color: #24292f;
    }

    .error-description {
        color: #57606a;
        font-size: 1rem;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .button {
        background-color: #0969da;
        color: #ffffff;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .button:hover {
        background-color: #035fc4;
    }

    .link {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        color: #0969da;
        text-decoration: none;
        border-radius: 6px;
        transition: background-color 0.2s;
    }

    .link:hover {
        background-color: #f0f4f8;
    }

    @media (max-width: 480px) {
        .error-code {
            font-size: 3.5rem;
        }

        .error-title {
            font-size: 1.5rem;
        }

        .error-box {
            padding: 2rem;
        }
    }
</style>
