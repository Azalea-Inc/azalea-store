<script>
    import { createEventDispatcher } from "svelte";
    import { CircleX } from "lucide-svelte";
    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let title = "Modal";
    export let size = "xl";

    function handleClose() {
        dispatch("close");
    }
</script>

<button
    class:hidden={!isOpen}
    on:click|self={handleClose}
    class="bg-[#000]/50 fixed left-0 top-0 right-0 bottom-0 z-10 flex justify-center items-center p-10 overflow-y-auto text-left"
>
    <div class="bg-white rounded-lg min-w-{size} p-4 self-baseline">
        <div class="flex pb-6 items-center justify-between">
            <h3 class="font-semibold text-2xl">{title}</h3>
            <CircleX
                class="text-red-500 hover:text-red-600 cursor-pointer"
                onclick={handleClose}
            />
        </div>

        <slot></slot>
    </div>
</button>

<style>
    .hidden {
        display: none;
    }
</style>
