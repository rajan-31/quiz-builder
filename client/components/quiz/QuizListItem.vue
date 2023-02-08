<script setup>
defineProps({
    quizTitle: String,
    quizId: String
});

const handleDeleteQuiz = (event) => {
    const tempId = event.target.getAttribute('data-id');

    if (tempId) {
        fetch('http://localhost:3001/api/v1/quiz/' + tempId,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })
            .then(res => {
                if (res.status === 200) {
                    event.target.parentElement.remove();
                }
                else {
                    alert('Not able to delete quiz');
                }
            });
    }
}
</script>
<template>
    <div>
        <NuxtLink :to="'/quiz/' + quizId">{{ quizTitle }}</NuxtLink>
        &nbsp;<button :data-id="quizId" @click="handleDeleteQuiz">X</button>
    </div>
</template>