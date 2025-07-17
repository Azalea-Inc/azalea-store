<script>
    import { onDestroy, onMount } from "svelte";
    import { settingsVM as vm } from "@store/SettingsVM";

    let settings = $vm.settings;

    onMount(async () => {
        await vm.onCreate();
    });

    onDestroy(() => {
        vm.onDestroy();
    });
</script>

<div class="flex-1 overflow-y-auto">
    <div class="max-w-xl mx-auto py-10">
        <svelte:component this={$vm.component} />
    </div>
</div>
