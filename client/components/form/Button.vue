<script setup>
const props = defineProps({
    btnText: String,
    btnColor: String,
    btnClick: Function
});

const tempBtnColor = 'bg-' + props.btnColor + '-300';

</script>
<template>
    <button @click="props.btnClick" :class="tempBtnColor" class="py-1.5 px-5 rounded">{{
        props.btnText
    }}</button>
</template>