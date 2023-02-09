<script setup>
const userName = inject('userName');
const quizList = inject('quizList')

</script>
<template>
<div>
    <div class="py-2">
        <span v-if="userName">Welcome <span class="font-bold text-orange-600">{{ userName }}</span>
        </span>&nbsp;
    </div>

    <h1 class="text-center font-medium text-5xl mt-2 mb-8">Quiz Builder</h1>
    <div class="text-center">
        <NuxtLink to="/quiz/new"
            class="inline-block py-1.5 px-3 bg-violet-300/70 hover:bg-violet-300 rounded-full hover:shadow-lg">
            Create New Quiz
        </NuxtLink>
    </div>

    <div v-if="userName != ''">
        <QuizList :quiz-list="quizList" />
    </div>
</div>
</template>