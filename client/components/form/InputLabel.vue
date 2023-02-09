<script setup>
defineProps({
    labelText: String,
    labelFor: String
});
</script>
<template>
    <label :for="labelFor" class="block">{{ labelText }}</label>
</template>