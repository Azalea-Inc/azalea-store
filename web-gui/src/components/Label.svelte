<script>
    export let type = "p";
    export let text = "";
</script>

<svelte:element this={type} class="text-{type}">
    <slot>{text}</slot>
</svelte:element>

<style>
    .text-h1 {
        /* font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
         */
        color: #0f172a;
        letter-spacing: 0.01em;
        font-size: 1.7rem;
    }

    .text-h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.8rem;
    }

    .text-h3 {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.6rem;
    }

    .text-p {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
    }

    .text-span {
        font-size: 1rem;
        display: inline;
    }

    .text-small {
        font-size: 0.8rem;
        color: #666;
    }
</style>
