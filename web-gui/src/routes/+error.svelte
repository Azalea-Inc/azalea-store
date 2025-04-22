<script>
    let errorCode = 404;
    let errorMessage = "Página no encontrada";
    let description =
        "Lo sentimos, la página que estás buscando no existe o ha sido movida.";
</script>

<div class="error-container flex-1">
    <div class="error-content">
        <h1 class="error-code">{errorCode}</h1>
        <h2 class="error-title">{errorMessage}</h2>
        <p class="error-description">{description}</p>
        <button class="back-button" on:click={() => window.history.back()}>
            Regresar
        </button>
        <a href="/" class="home-link">Ir al inicio</a>
    </div>
</div>

<style>
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .error-content {
        text-align: center;
        background: white;
        padding: 3rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
    }

    .error-code {
        font-size: 8rem;
        margin: 0;
        background: linear-gradient(90deg, #1e88e5, #64b5f6);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        line-height: 1;
    }

    .error-title {
        font-size: 2rem;
        margin: 1rem 0;
        color: #333;
    }

    .error-description {
        color: #666;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .back-button {
        background: linear-gradient(90deg, #1e88e5, #64b5f6);
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        font-size: 1rem;
        border-radius: 2rem;
        cursor: pointer;
        margin-right: 1rem;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .back-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(30, 136, 229, 0.4);
    }

    .home-link {
        display: inline-block;
        color: #1e88e5;
        text-decoration: none;
        font-weight: 500;
        padding: 0.8rem 0;
        transition: color 0.2s;
    }

    .home-link:hover {
        color: #64b5f6;
    }
</style>
