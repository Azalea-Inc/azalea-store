<script>
    export let text = "Cargando...";
</script>

<div class="flex flex-col items-center justify-center p-8">
    <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"
    ></div>
    <p class="text-gray-500 text-lg text-center">{text}</p>
</div>
