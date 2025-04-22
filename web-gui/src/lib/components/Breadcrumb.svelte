<script>
    import { page } from "$app/stores";
    import { derived } from "svelte/store";

    import { translations, LANGUAGES } from "$lib/Translations";
    const lang = LANGUAGES.es;

    const breadcrumb = derived(page, ($page) => {
        const segments = $page.url.pathname.split("/").filter(Boolean);

        return segments.map((segment, i) => {
            const href = "/" + segments.slice(0, i + 1).join("/");
            const decodedSegment = decodeURIComponent(segment).replace(
                /-/g,
                " ",
            );
            const label =
                translations[lang][decodedSegment.toLowerCase()] ||
                decodedSegment;
            return { label, href };
        });
    });
</script>

<nav class="flex items-center py-4">
    <a
        href="/"
        class="text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-200 font-medium"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
        Inicio
    </a>
    {#each $breadcrumb as item, i}
        <span class="mx-2 text-gray-400 flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-2 w-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </span>
        {#if i === $breadcrumb.length - 1}
            <span class="text-gray-500 capitalize font-semibold">
                {item.label}
            </span>
        {:else}
            <a
                href={item.href}
                class="text-blue-600 hover:text-blue-800 capitalize transition-colors duration-200 font-medium"
            >
                {item.label}
            </a>
        {/if}
    {/each}
</nav>
