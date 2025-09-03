<script>
    export let overflowHidden = false;
    export let className = "";
</script>

<div
    class="flex-1 flex flex-col bg-gray-50 {overflowHidden
        ? 'overflow-hidden'
        : 'overflow-y-auto'} h-screen {className}"
>
    <slot></slot>
</div>
