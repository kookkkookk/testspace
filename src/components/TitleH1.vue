<script>
export default {
    name: 'TitleH1',
}
</script>
<template>
    <h1 class="Title">
        <slot></slot>
    </h1>
</template>
<style lang="scss" scoped>
    .Title{
        color: red;
        font-size: 50px;
    }
</style>
