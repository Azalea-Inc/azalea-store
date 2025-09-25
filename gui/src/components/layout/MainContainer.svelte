<script>
    import Container from "@components/layout/Container.svelte";
    import RowContainer from "@components/layout/RowContainer.svelte";
    import OptionsMenu from "@components/OptionsMenu.svelte";
    export let menu;
</script>

<Container className="h-screen" overflowHidden>
    <RowContainer className="flex-1" overflowHidden>
        <Container>
            <svelte:component this={menu} />
        </Container>

        <Container className="flex-1">
            <slot></slot>
        </Container>
    </RowContainer>
</Container>
