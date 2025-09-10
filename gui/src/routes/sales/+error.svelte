<script>
    import Container from "@components/Container.svelte";
    export let error;
    export let status;

    console.log(error);
</script>

<svelte:head>
    <title>{status} - Oops!</title>
</svelte:head>

<Container>
    <main style="text-align:center; padding: 2rem;">
        <h1>{status}</h1>
        <p>{error?.message || "Algo salió mal"}</p>
        <a href="/" style="color: blue; text-decoration: underline;"
            >Volver al inicio</a
        >
    </main>
</Container>
