<script setup>
const userName = ref('');
provide('userName', userName);

const quizList = ref([]);
provide('quizList', quizList);

onMounted(() => {
    fetch('http://localhost:3001/api/v1/user', {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            userName.value = data.userName;
            if (data.userName) {
                fetch('http://localhost:3001/api/v1/quiz/list',
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },

                    })
                    .then(res => res.text())
                    .then(raw => raw ? JSON.parse(raw) : {})
                    .then(data => {
                        if (data.quizzes) {
                            quizList.value = data.quizzes
                        }
                    });
            }
        });
});
</script>
<template>
    <div class="h-full bg-gray-100">
        <slot />
    </div>
</template>
<style>
html,
body,
#__nuxt {
    height: 100%;
}
</style>