<script>
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HorizontalList from "@components/HorizontalList.svelte";
    import SalesCart from "@modules/sales/components/SalesCart.svelte";
    import SaleControl from "@modules/sales/components/SaleControl.svelte";
    import Button from "@components/Button.svelte";
    import { onMount } from "svelte";

    import { sessionStore } from "@store/SessionStore";
    import { saleStore } from "@store/SaleStore";
</script>

<svelte:component this={$saleStore.component} />
