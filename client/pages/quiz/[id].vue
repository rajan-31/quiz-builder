<script setup>
const route = useRoute();

const quizQuestions = ref([]);
const quizOwner = ref('');

const markedAnswers = ref([]);
const quizScore = ref(-1);

onBeforeMount(() => {
    const quizId = route.params.id;

    fetch('http://localhost:3001/api/v1/quiz/' + quizId, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.text())
        .then(raw => raw ? JSON.parse(raw) : {})
        .then(data => {
            if (data.owner) {
                quizQuestions.value = data.questions;
                quizOwner.value = data.owner;

                // fill with empty arrays
                markedAnswers.value = quizQuestions.value.map(question => []);
            } else {
                quizOwner.value = 'Not Found'
            }
        })
});

const handleSubmitQuiz = () => {
    const quizId = route.params.id;
    const tempAnswers = Object.assign({}, markedAnswers.value)

    if (confirm("Press OK to proceed.")) {
        fetch('http://localhost:3001/api/v1/quiz/' + quizId,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    markedAnswers: tempAnswers
                }),

            })
            .then(res => res.text())
            .then(raw => raw ? JSON.parse(raw) : {})
            .then(data => {
                if (data) {
                    quizScore.value = data.score;
                }
            });
    }
}
</script>
<template>
    <div v-if="quizScore > -1">Your scored: {{ quizScore }}/{{ quizQuestions.length }}</div>
    <div v-else>
        <div v-if="quizOwner == 'Not Found'">Invalid Quiz ID</div>
        <div v-else>
            <div v-for="(question, index1) in quizQuestions" class="question-block">
                <div><span>Q {{ index1+ 1 }})</span> {{ question.text }}</div>

                <div v-if="question.typeOfQuestion == 1">
                    <div v-for="(option, index2) in question.options">
                        <input type="radio" :id="'Q' + index1 + '-' + index2" :value="option"
                            v-model="markedAnswers[index1][0]" />
                        <label :for="'Q' + index1 + '-' + index2">{{ option }}</label>
                    </div>
                </div>
                <div v-else>
                    <div v-for="(option, index2) in question.options">
                        <input type="checkbox" :id="'Q' + index1 + '-' + index2" :value="option"
                            v-model="markedAnswers[index1]">
                        <label :for="'Q' + index1 + '-' + index2">{{ option }}</label>
                    </div>
                </div>
            </div>

            <div v-if="quizScore == -1"><button @click="handleSubmitQuiz()">Submit Quiz</button></div>
        </div>
    </div>
</template>
<style>
.question-block {
    margin: 20px 0;
}
</style>