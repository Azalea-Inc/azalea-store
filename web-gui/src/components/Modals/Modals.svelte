<script>
    import { modals } from "@components/Modals/modals";
    let state = modals.state;
    import { CircleX } from "@components/icons";
</script>

{#if !$state.hidden}
    <div
        class="w-full h-screen fixed modals backdrop-blur-sm flex overflow-y-auto items-baseline justify-center py-10"
    >
        <div class="py-4 bg-white rounded-xl shadow-lg">
            <div
                class="flex px-4 pb-2 flex-row items-center justify-between border-b border-gray-200"
            >
                <h2 class="text-lg font-semibold">
                    {$state.current.props.title}
                </h2>

                <CircleX
                    className="w-6 h-6 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                    onclick={() => modals.close()}
                />
            </div>
            <svelte:component
                this={$state.current.component}
                {...$state.current.props}
            />
        </div>
    </div>
{/if}

<style>
    .modals {
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 30000;
    }
</style>
