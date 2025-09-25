<script>
    import { createEventDispatcher } from "svelte";
    import { flip } from "svelte/animate";
    import Dropdown from "@components/Dropdown.svelte";

    const dispatch = createEventDispatcher();

    export let data = [];
    export let columns = [];
    export let sortField = "";
    export let sortDirection = "asc";
    export let actions = [];
    export let idField = "id";

    function handleSort(field) {
        dispatch("sort", { field });
    }

    function handleAction(action, item) {
        dispatch(action.event, { item, action });
    }

    function getCellValue(item, column) {
        const value = item[column.key];

        if (column.formatter) {
            return column.formatter(value, item);
        }

        return value;
    }

    function getCellClass(column) {
        return column.class || "px-3 py-1.5";
    }

    function getHeaderClass(column) {
        const baseClass = "px-3 py-1.5";
        const sortableClass = column.sortable
            ? "cursor-pointer hover:bg-gray-100"
            : "";
        return `${baseClass} ${sortableClass} ${column.headerClass || ""}`;
    }
</script>

<div class="overflow-y-auto box-table flex-1">
    <table class="w-full text-xs text-left text-gray-700 border-collapse">
        <thead class="text-xs bg-gray-50 border-b border-black sticky top-0">
            <tr>
                {#each columns as column}
                    <th
                        scope="col"
                        class={getHeaderClass(column)}
                        on:click={column.sortable
                            ? () => handleSort(column.key)
                            : null}
                    >
                        {column.label}
                        {#if column.sortable && sortField === column.key}
                            {sortDirection === "asc" ? "↑" : "↓"}
                        {/if}
                    </th>
                {/each}
                {#if actions.length > 0}
                    <th scope="col" class="px-3 py-1.5"></th>
                {/if}
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-xs">
            {#each data as item (item[idField])}
                <tr
                    class="hover:bg-gray-100 transition-colors"
                    animate:flip={{ duration: 300 }}
                >
                    {#each columns as column}
                        <td class={getCellClass(column)}>
                            {#if column.component}
                                <svelte:component
                                    this={column.component}
                                    {item}
                                    {column}
                                />
                            {:else}
                                {@html getCellValue(item, column)}
                            {/if}
                        </td>
                    {/each}
                    {#if actions.length > 0}
                        <td class="px-3 py-1.5">
                            <Dropdown>
                                <button
                                    slot="trigger"
                                    class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                                    aria-label="Opciones"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="w-5 h-5"
                                    >
                                        <path
                                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                                        />
                                    </svg>
                                </button>

                                <ul class="dropdown-menu">
                                    {#each actions as action}
                                        <li>
                                            <button
                                                class="dropdown-btn {action.class ||
                                                    ''}"
                                                on:click={() =>
                                                    handleAction(action, item)}
                                            >
                                                {#if action.icon}
                                                    <svg
                                                        class="w-4 h-4 mr-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d={action.icon} />
                                                    </svg>
                                                {/if}
                                                {action.label}
                                            </button>
                                        </li>
                                    {/each}
                                </ul>
                            </Dropdown>
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
