<script>
    export let align = "center";
    export let gap = "2";
    export let className = "";
    export let justify = "between";
</script>

<div class="flex justify-{justify} items-{align} gap-{gap} {className}">
    <slot></slot>
</div>
