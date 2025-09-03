<script>
    import Container from "@components/Container.svelte";
    import HeaderContainer from "@components/HeaderContainer.svelte";
    import HStack from "@components/HStack.svelte";
    import Label from "@components/Label.svelte";
    import Table from "@components/Table.svelte";
    import Graper from "@components/Graper.svelte";
    import Pagination from "@components/Pagination.svelte";
</script>

<Container>
    <HeaderContainer>
        <Label type="h1">Inventario</Label>
    </HeaderContainer>

    <Graper className="pb-4 overflow-hidden">
        <Table></Table>
        <Pagination></Pagination>
    </Graper>
</Container>
