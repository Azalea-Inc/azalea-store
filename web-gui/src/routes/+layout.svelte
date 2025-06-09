<script>
    import "../app.css";
    import Aside from "@components/Aside.svelte";
    import { MainContainer } from "@components";

    import { page } from "$app/stores";
    let { children } = $props();

    let isLoginPage = $page && $page.route && $page.route.id === "/login";
</script>

<MainContainer menu={!isLoginPage ? Aside : null}>
    {@render children()}
</MainContainer>
