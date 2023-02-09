<script setup>
defineProps({
    quizList: Array
});

</script>
<template>
    <div class="text-2xl font-bold mt-10 text-orange-600">Your Quizzes</div>
    <hr>
    <div v-if="quizList.length !== 0" class="mt-5">
        <QuizListItem v-for="(quiz, index) in quizList" :quiz-title="quiz.title" :quiz-id="quiz._id" />
    </div>
    <div v-else class="mt-5">No quizzes available</div>
</template>