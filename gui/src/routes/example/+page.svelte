<script>
    import Table from "@components/data/Table.svelte";

    let data = [
        { id: 1, name: "Mario", age: 30, email: "mario@mail.com" },
        { id: 2, name: "Luigi", age: 25, email: "luigi@mail.com" },
        { id: 3, name: "Peach", age: 22, email: "peach@mail.com" },
    ];

    let columns = [
        { key: "name", label: "Nombre", sortable: true },
        { key: "age", label: "Edad", sortable: true },
        {
            key: "email",
            label: "Correo",
            formatter: (value) =>
                `<a href="mailto:${value}" class="text-blue-600">${value}</a>`,
        },
    ];

    let actions = [
        {
            label: "Editar",
            event: "edit",
            class: "text-blue-600 hover:underline",
        },
        {
            label: "Eliminar",
            event: "delete",
            class: "text-red-600 hover:underline",
        },
    ];

    function handleSort(e) {
        const { field } = e.detail;
        console.log("Ordenar por:", field);
    }

    function handleEdit(e) {
        console.log("Editar →", e.detail.item);
    }

    function handleDelete(e) {
        console.log("Eliminar →", e.detail.item);
    }
</script>

<div class="p-6">
    <Table
        {data}
        {columns}
        {actions}
        sortField="name"
        on:sort={handleSort}
        on:edit={handleEdit}
        on:delete={handleDelete}
    />
</div>
