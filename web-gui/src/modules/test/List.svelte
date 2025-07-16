<script>
    export let list = [];
</script>

<div class="p-4 border">
    <h2>List</h2>
    <ul>
        {#each list as item}
            <li>{item}</li>
        {/each}
    </ul>
</div>
