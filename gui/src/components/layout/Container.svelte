<script>
    export let overflowHidden = false;
    export let className = "";
</script>

<div
    class="flex flex-col {overflowHidden
        ? 'overflow-hidden'
        : 'overflow-y-auto'} {className}"
>
    <slot></slot>
</div>
