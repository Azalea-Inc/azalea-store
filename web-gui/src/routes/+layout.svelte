<script>
    import "../app.css";
    import { Toaster } from "svelte-sonner";
    import Aside from "@components/Aside.svelte";
    import { MainContainer } from "@components";
    import Modals from "@components/Modals/Modals.svelte";

    import { page } from "$app/stores";
    let { children } = $props();

    let isLoginPage = $page && $page.route && $page.route.id === "/login";
</script>

<Modals></Modals>
<Toaster position="top-center" richColors expand closeButton duration={1500} />
<MainContainer menu={!isLoginPage ? Aside : null}>
    {@render children()}
</MainContainer>
