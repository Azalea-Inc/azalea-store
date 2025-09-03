<div class="flex items-center justify-between py-4">
    <div class="flex items-center gap-1">
        <span class="text-xs text-gray-600">Items por página:</span>
        <select class="text-xs border border-gray-300 rounded-md px-1 py-0.5">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
    </div>

    <div class="flex gap-2">
        <button
            disabled
            class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >Anterior</button
        >
        <button
            class="px-2 py-1 bg-[#0969da] text-white border-[#0969da] border rounded-md text-xs"
            >1</button
        >
        <button
            class="px-2 py-1 border-gray-300 hover:bg-gray-50 border rounded-md text-xs"
            >2</button
        >
        <button
            class="px-2 py-1 border-gray-300 hover:bg-gray-50 border rounded-md text-xs"
            >3</button
        >
        <button
            class="px-2 py-1 border-gray-300 hover:bg-gray-50 border rounded-md text-xs"
            >4</button
        >
        <button
            class="px-2 py-1 border-gray-300 hover:bg-gray-50 border rounded-md text-xs"
            >5</button
        >
        <button
            class="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >Siguiente</button
        >
    </div>
    <span class="text-xs text-gray-600">Mostrando 1-10 de 50 resultados</span>
</div>
