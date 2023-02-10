<script setup>
const route = useRoute();
const config = useRuntimeConfig()

const quizQuestions = ref([]);
const quizTitle = ref('');

const markedAnswers = ref([]);
provide('markedAnswers', markedAnswers);
const quizScore = ref(-1);

onBeforeMount(() => {
    const quizId = route.params.id;

    fetch(config.public.apiUrl + '/quiz/' + quizId, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.text())
        .then(raw => raw ? JSON.parse(raw) : {})
        .then(data => {
            if (data.title) {
                quizQuestions.value = data.questions;
                quizTitle.value = data.title;

                // fill with empty arrays
                markedAnswers.value = quizQuestions.value.map(question => []);
            } else {
                quizScore.value = -2;
            }
        })
});

const handleSubmitQuiz = () => {
    const quizId = route.params.id;
    const tempAnswers = Object.assign({}, markedAnswers.value)

    if (confirm("Press OK to proceed.")) {
        fetch(config.public.apiUrl + '/quiz/' + quizId,
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
    <div>
        <h1 v-if="quizTitle" class="mt-5 text-center text-3xl mb-10 text-slate-700">{{ quizTitle }}</h1>
        <div v-if="quizScore > -1" class="bg-emerald-300/70 p-3 text-center font-semibold rounded-lg"> You answered {{
            quizScore
            }}/{{
            quizQuestions.length
            }} questions correctly</div>
        <div v-else>
            <div v-if="quizTitle == ''" class="text-center text-xl">
                <span v-if="quizScore == -1">Retrieving your quiz ...</span>
                <span v-if="quizScore == -2">Invalid quiz Id</span>
            </div>
            <div v-else>
                <div v-for="(question, index1) in quizQuestions" class="">
                    <div class="p-2 my-5 ">
                        <div class="">
                            <div class="bg-blue-300 p-2 rounded-md rounded-b-none mt-2 flex flex-row">
                                <div class="text-indigo-800">Q{{ index1+ 1 }}.</div>
                                <div class="pl-2">{{ question.text }}</div>
                            </div>
                            <div class="mb-1 py-1 px-10 bg-orange-400/40 font-light text-sm text-black/80 rounded-md rounded-t-none">{{
                                question.typeOfQuestion ==
                                1 ?
                                `One
                                correct answer`
                                : `One or more correct answers` }}</div>
                        </div>
                        <div v-if="question.typeOfQuestion == 1">
                            <div v-for="(option, index2) in question.options">
                                <div class="my-1 flex flex-row rounded-lg">
                                    <input type="radio" :id="'type1-' + index1 + '-' + index2" :value="option" class="appearance-none"
                                        v-model="markedAnswers[index1][0]" />
                                    <label :for="'type1-' + index1 + '-' + index2" class="w-full inline-block py-2 pl-5 rounded-lg cursor-pointer"
                                        :class="(markedAnswers[index1][0] == option ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">{{
                                        option
                                        }}</label>
                                    </div>
                                    </div>
                                    </div>
                                    <div v-else-if="question.typeOfQuestion == 2">
                                        <div v-for="(option, index2) in question.options">
                                            <div class="my-1 flex flex-row rounded-lg">
                                                <input type="checkbox" :id="'type2-' + index1 + '-' + index2" :value="option" class="appearance-none"
                                                    v-model="markedAnswers[index1]">
                                                <label :for="'type2-' + index1 + '-' + index2" class="w-full inline-block py-2 pl-5 cursor-pointer rounded-lg "
                                                    :class="(markedAnswers[index1].includes(option) ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">{{
                                                    option
                                                    }}</label>
                                                </div>
                                                </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div v-if="quizScore == -1" class="text-center mb-14">
                                        <FormButton btn-text="Submit Quiz" btn-color="green" :btn-click="handleSubmitQuiz" />
                                    </div>
            </div>
        </div>
        </div>
</template>