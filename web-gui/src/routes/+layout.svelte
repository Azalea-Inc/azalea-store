<script>
    import Aside from "@components/Aside.svelte";
    import "../app.css";

    let { children } = $props();
</script>

<div class="flex">
    <Aside></Aside>

    {@render children()}
</div>
