<script>
    export let overflowHidden = false;
</script>

<div
    class="flex-1 flex flex-col bg-gray-50 {overflowHidden
        ? 'overflow-hidden'
        : 'overflow-y-auto'} h-screen"
>
    <slot></slot>
</div>
