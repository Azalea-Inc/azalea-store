<script>
    let total = 0;
    const channel = new BroadcastChannel("sales-channel");

    channel.onmessage = (event) => {
        console.log(event.data);
        if (event.data.type === "sale") {
            total = event.data.total;
        }
    };
</script>

<div class="sale-total">
    <h2>Total de Venta</h2>
    <p class="amount">${total}</p>
</div>

<style>
    .sale-total {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .amount {
        font-size: 2rem;
        font-weight: bold;
        color: #2c5282;
    }
</style>
