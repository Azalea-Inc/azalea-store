<script>
    import { page } from "$app/stores";
    import Container from "@components/Container.svelte";
    import Label from "@components/Label.svelte";
    import { onMount } from "svelte";
    import http from "$lib/http";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HStack from "@components/HStack.svelte";
    import Graper from "@components/Graper.svelte";

    let client = {};

    async function getClient() {
        try {
            const { data } = await http.get(`/clients/${$page.params.id}`);
            client = data.data;
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        await getClient();
    });
</script>

<Container>
    <HeaderContainer>
        <HStack>
            <HStack align="center" gap={4}>
                <a href="/clients" aria-label="Go back" class="btn">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                </a>
                <Label type="h1" className="pt-2">{client.name}</Label>
            </HStack>
        </HStack>
    </HeaderContainer>

    <div class="flex overflow-hidden">
        <!-- Tabs -->
        <Graper className="overflow-hidden gap-4">
            <div class="flex sticky top-0 border-b border-gray-200">
                <div class="flex space-x-0" role="tablist">
                    <button
                        class="px-4 py-3 text-sm font-medium text-gray-900 border-b-2 border-blue-500 relative"
                        role="tab"
                        aria-selected="true"
                    >
                        <span class="flex items-center space-x-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                ></path>
                            </svg>
                            <span>Compras</span>
                        </span>
                    </button>
                    <button
                        class="px-4 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 transition-colors duration-150"
                        role="tab"
                        aria-selected="false"
                    >
                        <span class="flex items-center space-x-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                ></path>
                            </svg>
                            <span>Créditos</span>
                        </span>
                    </button>
                    <button
                        class="px-4 py-3 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 transition-colors duration-150"
                        role="tab"
                        aria-selected="false"
                    >
                        <span class="flex items-center space-x-2">
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                ></path>
                            </svg>
                            <span>Cupones</span>
                        </span>
                    </button>
                </div>
            </div>

            <div class="pr-6 pb-10 overflow-y-auto">
                <ul class="space-y-4">
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #001
                                </h3>
                                <p class="text-sm text-gray-500">
                                    15 de enero, 2024
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$2,450.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Laptop Dell XPS 13</span>
                                <span>$1,200.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Mouse inalámbrico Logitech</span>
                                <span>$45.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Licencia Office 365 (1 año)</span>
                                <span>$120.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Mochila para laptop</span>
                                <span>$85.00</span>
                            </div>
                        </div>
                    </li>
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #002
                                </h3>
                                <p class="text-sm text-gray-500">
                                    12 de enero, 2024
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$850.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Monitor 24" Samsung</span>
                                <span>$320.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Teclado mecánico</span>
                                <span>$150.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Webcam HD Logitech</span>
                                <span>$80.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Cables HDMI y USB</span>
                                <span>$35.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Soporte para monitor</span>
                                <span>$65.00</span>
                            </div>
                        </div>
                    </li>
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #003
                                </h3>
                                <p class="text-sm text-gray-500">
                                    8 de enero, 2024
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$1,200.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Silla ergonómica de oficina</span>
                                <span>$450.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Escritorio ajustable</span>
                                <span>$680.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Lámpara LED de escritorio</span>
                                <span>$70.00</span>
                            </div>
                        </div>
                    </li>
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #004
                                </h3>
                                <p class="text-sm text-gray-500">
                                    5 de enero, 2024
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$325.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Impresora multifunción HP</span>
                                <span>$180.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Cartuchos de tinta (pack)</span>
                                <span>$95.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Papel A4 (5 resmas)</span>
                                <span>$50.00</span>
                            </div>
                        </div>
                    </li>
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #005
                                </h3>
                                <p class="text-sm text-gray-500">
                                    2 de enero, 2024
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$590.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Router Wi-Fi 6 empresarial</span>
                                <span>$280.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Switch de red 8 puertos</span>
                                <span>$120.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Cables Ethernet Cat 6 (pack)</span>
                                <span>$45.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Access Point adicional</span>
                                <span>$145.00</span>
                            </div>
                        </div>
                    </li>
                    <li
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900">
                                    Compra #006
                                </h3>
                                <p class="text-sm text-gray-500">
                                    28 de diciembre, 2023
                                </p>
                            </div>
                            <span class="text-lg font-bold text-green-600"
                                >$750.00</span
                            >
                        </div>
                        <div class="space-y-1 text-sm text-gray-600">
                            <div class="flex justify-between">
                                <span>• Tablet Samsung Galaxy Tab S8</span>
                                <span>$550.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Funda con teclado</span>
                                <span>$120.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• S Pen adicional</span>
                                <span>$50.00</span>
                            </div>
                            <div class="flex justify-between">
                                <span>• Protector de pantalla</span>
                                <span>$30.00</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Graper>

        <!-- Profile -->
        <div class="w-96 flex self-baseline flex-col overflow-hidden mr-6">
            <div class="border-b border-gray-200">
                <div class="flex items-center space-x-3 mb-4">
                    <div
                        class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                        <span class="text-white font-semibold text-lg">
                            {client.name
                                ? client.name.charAt(0).toUpperCase()
                                : "C"}
                        </span>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">
                            {client.name}
                        </h2>
                    </div>
                </div>

                <div class="flex space-x-2 mb-4">
                    <button
                        class="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Contactar
                    </button>
                    <button
                        class="flex-1 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Editar
                    </button>
                </div>
            </div>

            <div class="pt-6 pb-10 space-y-6 overflow-y-auto">
                <div>
                    <h3 class="text-sm font-medium text-gray-700 mb-3">
                        Información General
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center text-sm">
                            <svg
                                class="w-4 h-4 mr-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                            </svg>
                            <span class="text-gray-600"
                                >{client.phone || "+1 (555) 123-4567"}</span
                            >
                        </div>
                        <div class="flex items-center text-sm">
                            <svg
                                class="w-4 h-4 mr-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                            </svg>
                            <span class="text-gray-600"
                                >{client.email || "Sin correo registrado"}</span
                            >
                        </div>

                        <div class="flex items-center text-sm">
                            <svg
                                class="w-4 h-4 mr-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                ></path>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                            </svg>
                            <span class="text-gray-600"
                                >{client.location ||
                                    "Sin dirección registrada"}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Container>
