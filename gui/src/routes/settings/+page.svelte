<script>
    import { onDestroy, onMount } from "svelte";
    import SettingsForm from "@components/settings/SettingsForm.svelte";
    import Container from "@components/Container.svelte";
    import { SettingsVM } from "@store/SettingsVM";

    const vm = new SettingsVM();

    onMount(async () => {
        await vm.onCreate();
    });
</script>

<Container className="mx-auto p-10">
    <SettingsForm {vm} />
</Container>
