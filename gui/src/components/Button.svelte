<script>
    export let buttonType;
    export let onClick;
    export let isCircular = false;
</script>

<button
    class="relative group cursor-pointer flex gap-1 items-center justify-center btn
        {buttonType ? `btn-${buttonType}` : ''}
        {isCircular ? 'circle' : ''}"
    on:click={onClick}
>
    <slot></slot>
</button>

<style>
    .circle {
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
    }
</style>
