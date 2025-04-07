<script>
    import Spinner from "$lib/components/Spinner.svelte";
    import { onMount } from "svelte";

    const host = "http://localhost:3000";
    export let actions;

    export let page = 1;
    export let limit = 20;

    async function getProducts(currentPage = 1) {
        try {
            const response = await fetch(
                `${host}/api/products?page=${currentPage}&limit=${limit}`,
            );
            const { data, pagination } = await response.json();
            actions.setState("success", {
                products: data,
                ...pagination,
            });
        } catch (error) {
            console.error(error);
            actions.setState("error", { errorMessage: error.message });
        }
    }

    onMount(() => getProducts(page));
</script>

<Spinner />
