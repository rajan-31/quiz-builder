<script setup>
const userName = ref('');
provide('userName', userName);

onMounted(() => {
    fetch('http://localhost:3001/api/v1/user', {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            userName.value = data.userName;
        });
});
</script>
<template>
    <slot></slot>
</template>