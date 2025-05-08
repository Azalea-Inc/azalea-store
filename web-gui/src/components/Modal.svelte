<script>
    import { createEventDispatcher } from "svelte";
    import { CircleX } from "lucide-svelte";
    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let title = "Modal";

    function handleClose() {
        dispatch("close");
    }
</script>

<div
    class:hidden={!isOpen}
    class="fixed h-screen inset-0 z-10 overflow-y-auto flex flex-col p-10 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
>
    <div class="w-auto mx-auto bg-white rounded-lg shadow-lg self-baseline">
        <div
            class="flex items-center justify-between px-4 py-3 border-b border-gray-200"
        >
            <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
            <CircleX
                class="w-6 h-6 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                onclick={handleClose}
            />
        </div>
        <div class="px-4 py-4">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
</style>
