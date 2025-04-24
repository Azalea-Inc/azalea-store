<script>
    import { onDestroy } from "svelte";
    import { productsPageStore } from "@store/pages/ProductsPageStore";

    const state = productsPageStore;

    onDestroy(() => state.resetState());
</script>

<div class="error-message">
    <p>{$state.errorMessage}</p>
</div>

<style>
    .error-message {
        background-color: #fce4e4;
        border: 1px solid #fcc2c3;
        padding: 20px;
        margin: 20px 0;
        color: #cc0033;
        font-family: Helvetica, Arial, sans-serif;
        line-height: 20px;
        border-radius: 5px;
    }

    .error-message p {
        margin: 0;
        font-size: 14px;
    }
</style>
