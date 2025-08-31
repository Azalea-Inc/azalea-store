<script>
    import "../app.css";
    import { bus } from "$lib/EventBus";
    import Aside from "@components/Aside.svelte";
    import { MainContainer } from "@components";
    import { Toaster } from "svelte-sonner";
    import Modals from "@components/Modals/Modals.svelte";
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import { userStore } from "@store/UserStore";
    let { children } = $props();

    let isLoginPage = $page && $page.route && $page.route.id === "/login";

    onMount(async () => {
        await userStore.getUserInfo();
    });

    onDestroy(() => {
        bus.reset();
    });
</script>

<Modals></Modals>
<Toaster position="top-center" richColors expand closeButton duration={1500} />
<MainContainer menu={!isLoginPage ? Aside : null}>
    {@render children()}
</MainContainer>
