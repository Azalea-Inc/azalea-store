<script>
    import "../app.css";
    import { bus } from "$lib/EventBus";
    import Aside from "@components/Aside.svelte";
    import { MainContainer } from "@components";
    import { Toaster } from "svelte-sonner";
    import Modals from "@components/Modals/Modals.svelte";

    import { page } from "$app/stores";
    import { onDestroy } from "svelte";
    let { children } = $props();

    let isLoginPage = $page && $page.route && $page.route.id === "/login";

    onDestroy(() => {
        bus.reset();
    });
</script>

<Modals></Modals>
<Toaster position="top-center" richColors expand closeButton duration={1500} />
<MainContainer menu={!isLoginPage ? Aside : null}>
    {@render children()}
</MainContainer>
