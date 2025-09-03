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
    import { userStore } from "@store/UserStore";
    let { children, data } = $props();

    onMount(() => {
        const { session } = data;
        userStore.setSession(session);
    });

    onDestroy(() => {
        bus.reset();
    });
</script>

<Modals></Modals>
<Toaster position="top-center" richColors expand closeButton duration={1500} />
<MainContainer menu={$userStore.isLogged ? Aside : null}>
    {@render children()}
</MainContainer>
