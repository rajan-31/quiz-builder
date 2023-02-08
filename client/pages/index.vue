<script setup>
const userName = inject('userName');
const quizList = ref([]);

onBeforeMount(() => {
    if (userName != '') {
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
</script>
<template>
<h1>Quiz Builder</h1>

<p>Create your quizzes and share with friends!</p>
<NuxtLink to="/quiz/new">Create New Quiz</NuxtLink>

<div v-if="userName != ''">
    <QuizList :quiz-list="quizList" />
</div>
</template>