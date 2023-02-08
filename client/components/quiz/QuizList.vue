<script setup>
defineProps({
    quizList: Array
});

</script>
<template>
    <div>Quiz List</div>
    <div v-if="quizList">
        <QuizListItem v-for="(quiz, index) in quizList" :quiz-title="quiz.title" :quiz-id="quiz._id" />
    </div>
</template>