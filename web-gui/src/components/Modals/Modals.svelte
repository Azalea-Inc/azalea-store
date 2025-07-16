<script>
    import { modals } from "@components/Modals/modals";
    let state = modals.state;
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

                <button
                    class="text-red-500 hover:text-red-600"
                    on:click={() => modals.close()}
                >
                    <svg
                        class="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg></button
                >
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
