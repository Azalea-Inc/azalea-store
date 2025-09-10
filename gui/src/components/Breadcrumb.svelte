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

<nav class="flex items-center py-2 pl-0 px-3">
    <div class="flex items-center bg-gray-100 rounded-md px-2 py-1">
        <a href="/" class="text-gray-600 hover:text-gray-900 text-sm">
            Inicio
        </a>
        {#each $breadcrumb as item, i}
            <span class="mx-1 text-gray-400">/</span>
            {#if i === $breadcrumb.length - 1}
                <span class="text-gray-700 capitalize text-sm">
                    {item.label}
                </span>
            {:else}
                <a
                    href={item.href}
                    class="text-gray-600 hover:text-gray-900 capitalize text-sm"
                >
                    {item.label}
                </a>
            {/if}
        {/each}
    </div>
</nav>
