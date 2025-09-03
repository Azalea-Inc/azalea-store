<script>
    import { modals } from "@components/Modals/modals";
    import DefaultModal from "@components/Modals/DefaultModal.svelte";
</script>

<div>
    <div class="form-group">
        <label for="excel">📄 Cargar archivo Excel</label>
        <input type="file" id="excel" accept=".xlsx, .xls" />
    </div>
    <button on:click={() => modals.push(DefaultModal)} class="btn"
        >Mas detalles</button
    >
    <table>
        <thead>
            <tr>
                <th>Columna A</th>
                <th>Columna B</th>
                <th>Columna C</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Dato 1</td>
                <td>Dato 2</td>
                <td>Dato 3</td>
            </tr>
            <tr>
                <td>Dato 4</td>
                <td>Dato 5</td>
                <td>Dato 6</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    :global(body) {
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
            sans-serif;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    label {
        font-weight: 600;
        color: #24292f;
    }

    input[type="file"] {
        border: 1px solid #d0d7de;
        padding: 0.5rem;
        border-radius: 6px;
        background-color: #f6f8fa;
        cursor: pointer;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        font-size: 14px;
    }

    th,
    td {
        border: 1px solid #d8dee4;
        padding: 0.5rem;
        text-align: left;
    }

    th {
        background-color: #f6f8fa;
        color: #1f2328;
        font-weight: 600;
    }

    td {
        color: #24292f;
    }
</style>
