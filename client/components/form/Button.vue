<script setup>
const props = defineProps({
    btnText: String,
    btnColor: String,
    btnClick: Function
});

const tempBtnColor = 'bg-' + props.btnColor + '-300';
const tempBtnColor2 = 'hover:bg-' + props.btnColor + '-400';

</script>
<template>
    <button @click="props.btnClick" :class="[tempBtnColor, tempBtnColor2]" class="py-1.5 px-5 rounded">{{
        props.btnText
    }}</button>
</template>