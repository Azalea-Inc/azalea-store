<script>
    export let title = "Empty Files";
    export let description = "Dont Files";
</script>

<div class="empty-state">
    <svg
        class="empty-state-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 15h8"></path>
        <path d="M9 9h.01"></path>
        <path d="M15 9h.01"></path>
    </svg>
    <h3 class="empty-state-title">{title}</h3>
    <p class="empty-state-description">
        {description}
    </p>
    <slot></slot>
</div>

<style>
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 3rem;
        background-color: #f6f8fa;
        border: 1px solid #d0d7de;
        border-radius: 6px;
        margin: 1.5rem 0;
    }
    .empty-state-icon {
        width: 48px;
        height: 48px;
        color: #6e7781;
        margin-bottom: 1rem;
    }
    .empty-state-title {
        margin: 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #24292f;
    }
    .empty-state-description {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        color: #57606a;
        max-width: 400px;
        padding-bottom: 1rem;
    }
</style>
