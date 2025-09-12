<script>
    import "../app.css";
    import { bus } from "$lib/EventBus";
    import Aside from "@components/Aside.svelte";
    import { MainContainer } from "@components";
    import { Toaster } from "svelte-sonner";
    import Modals from "@components/Modals/Modals.svelte";
    import Spinner from "@components/Spinner.svelte";
    import { page } from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import { sessionStore } from "@store/Session";
    let { children, data } = $props();

    onMount(() => {
        sessionStore.setSession(data.session);
    });

    onDestroy(() => {
        bus.reset();
    });

    const { session } = sessionStore;
</script>

<Modals></Modals>
<Toaster
    position="bottom-right"
    richColors
    expand
    closeButton
    duration={3000}
/>
<MainContainer menu={$session.isLogged ? Aside : null}>
    {@render children()}
</MainContainer>
