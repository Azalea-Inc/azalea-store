<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Breadcrumb from "@components/Breadcrumb.svelte";

    $: id = $page.params.id;

    let product = {};
    const host = "http://localhost:3000";

    async function fetchProduct() {
        try {
            const response = await fetch(host + `/api/products/${id}`);
            const { data } = await response.json();
            product = data;
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    }

    onMount(fetchProduct);
</script>

<div class="product-page flex-1">
    <Breadcrumb />

    <h1>{product.name}</h1>

    <div class="product-details">
        <div class="image-container">
            <img src={product.image} alt={product.name} />
        </div>

        <div class="info">
            <p class="price">${product.price}</p>
            <p class="description">{product.description}</p>

            <div class="specs">
                <h3>Specifications:</h3>
                <ul>
                    {#each Object.entries(product.specs || {}) as [key, value]}
                        <li>
                            <strong>{key}:</strong>
                            {value}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    .product-page {
        max-width: 1400px;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f8f9fa;
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 2rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 3rem;
        text-align: center;
        letter-spacing: -0.5px;
    }

    .product-details {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
        background: white;
        padding: 3rem;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .image-container {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .image-container:hover {
        transform: scale(1.02);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }

    .info {
        padding: 2rem;
        background: #fff;
        border-radius: 12px;
    }

    .price {
        font-size: 2.5rem;
        font-weight: 600;
        color: #2c5282;
        margin-bottom: 2rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .description {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #2d3748;
        margin-bottom: 3rem;
        padding: 1.5rem;
        background: #f7fafc;
        border-radius: 8px;
    }

    .specs {
        margin-top: 3rem;
        padding: 2rem;
        background: #f7fafc;
        border-radius: 8px;
    }

    .specs h3 {
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 2rem;
        font-size: 1.5rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 1rem;
    }

    .specs ul {
        list-style: none;
        padding: 0;
    }

    .specs li {
        margin: 1.5rem 0;
        color: #4a5568;
        font-size: 1.1rem;
        display: flex;
        gap: 1.5rem;
        align-items: center;
        padding: 0.75rem;
        border-radius: 6px;
        transition: background-color 0.2s ease;
    }

    .specs li:hover {
        background-color: #edf2f7;
    }

    .specs li strong {
        color: #2d3748;
        font-weight: 600;
        min-width: 120px;
    }
</style>
