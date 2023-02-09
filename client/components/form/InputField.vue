<script setup>
defineProps({
    inputType: String,
    inputId: String,
    inputValue: String,
    inputPlaceholder: String
});
</script>
<template>
    <input :type="inputType" :id="inputId" :value="inputValue" v-on:input="(event) => this.$emit('inputChange', event)"
        :placeholder="inputPlaceholder"
        class="w-full border border-gray-300 p-2 my-2 outline-none focus:border-orange-300 focus:shadow-md rounded-md ">
</template>