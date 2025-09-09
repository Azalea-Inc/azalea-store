<script>
    import { saleStore } from "@store/SaleStore";
    import Spinner from "@components/Spinner.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await saleStore.getBoxConfig();
    });
</script>

<div class="flex-1 w-full mx-auto">
    <Spinner></Spinner>
</div>
