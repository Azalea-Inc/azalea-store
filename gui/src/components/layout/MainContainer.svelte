<script>
    export let menu;
</script>

<div class="flex overflow-hidden h-screen">
    <svelte:component this={menu} />
    <slot></slot>
</div>
