<script>
    import { testStore, components } from "@modules/test/TestStore";
</script>

<div class="flex-1 p-10">
    <h1 class="text-2xl font-bold">Test Module</h1>
    <button class="btn" on:click={() => testStore.showList()}>Show List</button>

    <svelte:component
        this={$components.controls.component}
        {...$components.controls?.props}
    />
    <svelte:component
        this={$components.list.component}
        list={$testStore.list}
    />
</div>
