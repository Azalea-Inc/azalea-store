<script>
    import { CircleX } from "lucide-svelte";
    export let isOpen = false;
    export let title = "Modal";
</script>

<div
    class:hidden={!isOpen}
    class="bg-[#000]/50 fixed left-0 top-0 right-0 bottom-0 z-10 flex justify-center items-center p-10 overflow-y-auto"
>
    <div class="bg-white rounded-lg p-4 self-baseline">
        <div class="flex pb-6 items-center justify-between">
            <h3 class="font-semibold text-lg">{title}</h3>
            <CircleX
                class="text-red-500 hover:text-red-600 cursor-pointer"
                on:click={() => ($isOpen = false)}
            />
        </div>

        <slot></slot>
    </div>
</div>

<style>
    .hidden {
        display: none;
    }
</style>
