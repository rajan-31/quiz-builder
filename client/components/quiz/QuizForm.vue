<script setup>
const userName = inject('userName')

const userMessage = ref('');
const quizLink = ref('');
const newQuestion = ref({
    typeOfQuestion: '1',
    text: 'aaaaaaaaaaaa',
    tempOptionText: 'bbbbbbbbbbb',
    options: ["aa", "bb", "cc"],
    correctOne: 'aa',
    correctMultiple: [],
});

const allQuestions = ref([]);

const addOption = () => {
    // otherwise oprtions are not visisble
    if (newQuestion.value.typeOfQuestion == '') alert('Please select question type')
    else if (newQuestion.value.options.length === 5) alert('Question can have maximum 5 options')
    else newQuestion.value.options.push(newQuestion.value.tempOptionText);
}

const addQuestion = () => {
    let tempQuestion = Object.assign({}, newQuestion.value);

    if (tempQuestion.typeOfQuestion == '') alert('Please select question type')
    else if (tempQuestion.text.length === 0) alert('Please enter some text in question field')

    // necessary to make question valid
    else if (tempQuestion.options.length < 2) alert('Please add atleast 2 options')
    else if (
        (tempQuestion.typeOfQuestion == '1' && tempQuestion.correctOne === '') ||
        (tempQuestion.typeOfQuestion == '2' && tempQuestion.correctMultiple.length == 0)
    ) alert('Please choose correct answer(s)')
    else {
        delete tempQuestion['tempOptionText'];
        tempQuestion.typeOfQuestion == '1' ? delete tempQuestion.correctMultiple : delete tempQuestion['correctOne']
        allQuestions.value.push(tempQuestion);
    }
}

const submitQuiz = () => {
    if (allQuestions.value.length === 0) alert('Please add atleast 1 question');
    else {
        const tempQuestions = JSON.parse(JSON.stringify(allQuestions.value));
        tempQuestions
            .map(item => {
                if (item.typeOfQuestion == 1) {
                    item.correctOptions = [item.correctOne];
                    delete item['correctOne']
                } else {
                    item.correctOptions = [...item.correctMultiple];
                    delete item['correctMultiple']
                }
                return item
            })

        fetch('http://localhost:3001/api/v1/quiz',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions: tempQuestions
                }),

            })
            .then(res => res.json())
            .then(data => {
                if (data.newQuiz) {
                    quizLink.value = data.newQuiz;
                }
                else {
                    console.log(data)
                    alert('Quiz submit failed! Try again.');
                }
            });
    }
}
</script>
<template>
    <ClientOnly fallback-tag="span" fallback="Showing user info">
        <span v-if="userName == ''">Please <NuxtLink to="/login">login here</NuxtLink> to create your quiz</span>
        <span v-else>{{ userName }}</span>
    </ClientOnly>

    <div v-if="userName != ''">
        <h1>Add Questions</h1>

        <select v-model="newQuestion.typeOfQuestion">
            <option value="" disabled>Select question type</option>
            <option value="1">Single correct answer</option>
            <option value="2">Multiple correct answers</option>
        </select>

        <div><input type="text" v-model="newQuestion.text" placeholder="Question"></div>

        <div><input type="text" v-model="newQuestion.tempOptionText" placeholder="New Option"></div>
        <button @click="addOption()">Add Option</button>

        <div v-if="newQuestion.typeOfQuestion == '1'">
            <div v-for="(option, index) in newQuestion.options">
                <input type="radio" :id="'type1-' + index" :value="option" name="type1_selected"
                    v-model="newQuestion.correctOne" />
                <label :for="'type1-' + index">{{ option }}</label>
            </div>
        </div>
        <div v-else-if="newQuestion.typeOfQuestion == '2'">
            <div v-for="(option, index) in newQuestion.options">
                <input type="checkbox" :id="'type2-' + index" :value="option" v-model="newQuestion.correctMultiple">
                <label :for="'type2-' + index">{{ option }}</label>
            </div>
        </div>

        <button @click="addQuestion()">Add Question</button>

        <div>
            <div v-for="(question, index) in allQuestions">{{ question }}</div>
        </div>

        <button @click="submitQuiz()">Submit Quiz</button>

        <div v-if="userMessage != ''">{{ userMessage }}</div>

        <div v-if="quizLink != ''"> Your quiz is published, <NuxtLink :to="'/quiz/' + quizLink">see here</NuxtLink>
        </div>
    </div>
</template>