<script>
    import { onDestroy, onMount } from "svelte";
    import { settingsVM as vm } from "@store/SettingsVM";
    import Container from "@components/Container.svelte";

    let settings = $vm.settings;

    onMount(async () => {
        await vm.onCreate();
    });

    onDestroy(() => {
        vm.onDestroy();
    });
</script>

<Container className="mx-auto p-10">
    <svelte:component this={$vm.component} />
</Container>
