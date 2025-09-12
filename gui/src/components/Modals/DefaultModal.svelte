<script>
    import { modals } from "@components/Modals";
</script>

<div class="p-6 w-md">
    <h2>Default modal</h2>

    <button
        class="btn"
        on:click={() =>
            modals.warning({
                title: "Warning",
                message: "Are you sure?",
                confirmText: "Yes",
                cancelText: "No",
            })}>Open Modal</button
    >
</div>
