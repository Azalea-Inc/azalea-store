<script>
    export let align = "center";
    export let gap = "2";
    export let className = "";
    export let justify = "start";
</script>

<div
    class="flex flex-col justify-{justify} items-{align} gap-{gap} {className}"
>
    <slot></slot>
</div>
