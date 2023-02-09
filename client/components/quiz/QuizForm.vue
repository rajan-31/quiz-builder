<script setup>
import CrossSVG from '../general/CrossSVG.vue';

const route = useRoute();
const userName = inject('userName')

const quizId = ref('');
const quizLink = ref();

const newQuestion = ref({
    quizTitle: 'You can also use variant modifiers to target media queries like responsive breakpoints, dark mode',
    typeOfQuestion: '2',
    text: 'Prefers-reduced-motion, and more. For example, use md:text-base to apply the text-base utility at only medium?',
    options: ['Screen sizes and above', 'Prefers-reduced-motion', 'You can also use variant modifiers'],
    tempOptionText: 'And more. For example, use md',
    correctOne: '',
    correctMultiple: [],
});

const allQuestions = ref([{ "typeOfQuestion": "2", "text": "Prefers-reduced-motion, and more. For example, use md:text-base to apply the text-base utility at only medium?", "options": ["Screen sizes and above", "Prefers-reduced-motion", "You can also use variant modifiers", "And more. For example, use md"], "correctMultiple": ["Prefers-reduced-motion"] },
{ "typeOfQuestion": "2", "text": "Prefers-reduced-motion, and more. For example, use md:text-base to apply the text-base utility at only medium?", "options": ["Screen sizes and above", "Prefers-reduced-motion", "You can also use variant modifiers", "And more. For example, use md"], "correctMultiple": ["Prefers-reduced-motion", "You can also use variant modifiers"] }]);

onMounted(() => {
    quizLink.value = window.location.origin;
});

const handleInputChange = (event) => {
    const value = event.target.value;
    newQuestion.value[event.target.id] = value;
}

const handleDeleteOption = (event) => {
    const tempText = event.target.getAttribute('data-text');
    // delete from options, correctOne, correctMultiple
    newQuestion.value.options = newQuestion.value.options.filter(item => item != tempText);
    if (newQuestion.value.correctOne == tempText) newQuestion.value.correctOne = '';
    newQuestion.value.correctMultiple = newQuestion.value.correctMultiple.filter(item => item != tempText);
}

const addOption = () => {
    // otherwise oprtions are not visisble
    if (newQuestion.value.typeOfQuestion == '') alert('Please select question type')
    else if (newQuestion.value.options.includes(newQuestion.value.tempOptionText)) alert('Duplicate option not allowed')
    else if (newQuestion.value.options.length === 5) alert('Question can have maximum 5 options')
    else newQuestion.value.options.push(newQuestion.value.tempOptionText);
}

const addQuestion = () => {
    let tempQuestion = Object.assign({}, newQuestion.value);

    if (allQuestions.value.length === 10) alert('Max 10 questions allowed, delete a question to add new')
    else if (tempQuestion.typeOfQuestion == '') alert('Please select question type')
    else if (tempQuestion.text.length === 0) alert('Please enter some text in question field')

    // necessary to make question valid
    else if (tempQuestion.options.length < 2) alert('Please add atleast 2 options')
    else if (
        (tempQuestion.typeOfQuestion == '1' && tempQuestion.correctOne === '') ||
        (tempQuestion.typeOfQuestion == '2' && tempQuestion.correctMultiple.length == 0)
    ) alert('Please choose correct answer(s)')
    else {
        delete tempQuestion['quizTitle'];
        delete tempQuestion['tempOptionText'];
        tempQuestion.typeOfQuestion == '1' ? delete tempQuestion['correctMultiple'] : delete tempQuestion['correctOne']
        allQuestions.value.push(tempQuestion);
    }
}

const submitQuiz = () => {

    if (newQuestion.value.quizTitle.length === 0) alert('Please add a title to the quiz');
    else if (allQuestions.value.length === 0) alert('Please add atleast 1 question');
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
                    title: newQuestion.value.quizTitle,
                    questions: tempQuestions
                }),

            })
            .then(res => res.json())
            .then(data => {
                if (data.newQuizId) {
                    quizId.value = data.newQuizId;
                    newQuestion.value = {
                        quizTitle: '',
                        typeOfQuestion: '',
                        text: '',
                        options: [],
                        tempOptionText: '',
                        correctOne: '',
                        correctMultiple: ''
                    }
                    allQuestions.value = []

                    quizLink.value = quizLink.value + '/quiz/' + data.newQuizId
                }
                else {
                    console.log(data)
                    alert('Quiz submission failed! Try again.');
                }
            });
    }
}
</script>
<template>
    <div>
        <h1 class="text-center mt-2 mb-10 text-3xl">New Quiz</h1>

        <div class="my-5 font-semibold text-center">
            <span v-if="userName == ''">
                Please login
                <NuxtLink to="/login" class="underline decoration-2 decoration-orange-600 hover:bg-orange-600">here
                </NuxtLink>
                to create your quiz.
            </span>
        </div>

        <div v-if="userName != ''" class="px-5">
            <div class="p-2 font-medium">
                <FormInputLabel label-for="quizTitle" label-text="Quiz Title" />
                <FormInputField input-type="text" input-id="quizTitle" v-on:inputChange="handleInputChange"
                    :input-value="newQuestion.quizTitle" input-placeholder="Quiz Title" />
            </div>
            <h1 class=" px-2 mt-5 text-2xl">Add Questions</h1>
            <hr>

            <div class="mt-5 font-medium">
                <div class="p-2 w-full">
                    <FormInputLabel label-for="typeOfQuestion" label-text="Type of Question" />
                    <select v-model="newQuestion.typeOfQuestion" id="typeOfQuestion"
                        class="p-2 my-2 w-full rounded border border-gray-300 outline-none focus:border-orange-300 focus:shadow-md rounded-md">
                        <option value="" disabled>Select question type</option>
                        <option value="1">Single correct answer</option>
                        <option value="2">Multiple correct answers</option>
                    </select>
                </div>

                <div class="p-2 w-full">
                    <FormInputLabel label-for=" text" label-text="Question" />
                    <FormInputField input-type="text" input-id="text" v-on:inputChange="handleInputChange"
                        :input-value="newQuestion.text" input-placeholder="Question" />
                </div>
                <div class="p-2 w-full">
                    <FormInputLabel label-for="tempOptionText" label-text="New Option" />
                    <FormInputField input-type="text" input-id="tempOptionText" v-on:inputChange="handleInputChange"
                        :input-value="newQuestion.tempOptionText" input-placeholder="New Option" />
                </div>
                </div>
                <div class="p-2 mb-5">
                    <FormButton :btn-click="addOption" btn-color="sky" btn-text="Add Option" />
                    <span class="px-2">&nbsp;</span>
                    <FormButton :btn-click="addQuestion" btn-color="indigo" btn-text="Add Question" />
                    <div v-if="newQuestion.options.length > 0" class="italic mt-5">Options</div>
                    <div v-if="newQuestion.typeOfQuestion == '1'" class="mt-3 mb-5">
                        <div v-for="(option, index) in newQuestion.options">
                            <div class="my-1 flex flex-row rounded-lg"
                                :class="(option == newQuestion.correctOne ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">
                                <div class="grow">
                                    <input type="radio" :id="'type1-' + index" :value="option" v-model="newQuestion.correctOne"
                                        class="appearance-none" />
                                    <label :for="'type1-' + index" class="w-full inline-block p-2 pl-5 cursor-pointer rounded-lg rounded-r-none">{{
                                        option
                                        }}</label>
                                </div>
                                <button :data-text="option" @click="handleDeleteOption" class="bg-red-200 hover:bg-red-400 rounded-r-lg">
                                    <CrossSVG />
                                </button>
                            </div>
                            </div>
                            </div>
                            <div v-else-if="newQuestion.typeOfQuestion == '2'" class="mt-3 mb-5">
                                <div v-for="(option, index) in newQuestion.options" class="my-1 flex flex-row rounded-lg"
                                    :class="(newQuestion.correctMultiple.includes(option) ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">
                                    <div class="grow">
                                        <input type="checkbox" :id="'type2-' + index" :value="option" v-model="newQuestion.correctMultiple"
                                            class="appearance-none">
                                        <label :for="'type2-' + index"
                                            class="w-full inline-block p-2 pl-5 cursor-pointer rounded-lg rounded-r-none">{{
                                            option
                                            }}</label>
                                    </div>
                            <button :data-text="option" @click="handleDeleteOption" class="bg-red-200 hover:bg-red-400 rounded-r-lg">
                                <CrossSVG />
                            </button>
                        </div>
                    </div>
                    <FormButton :btn-click="submitQuiz" btn-color="orange" btn-text="Submit Quiz" />
                </div>
            <div>
                <div v-for="(question, index) in allQuestions">{{ question }}</div>
            </div>
            <div v-if="quizId != ''" class="px-2 pt-5">
                <div class="bg-fuchsia-200 p-5 rounded text-lg text-center"> Your quiz is published,
                    <NuxtLink :to="'/quiz/' + quizId" class="underline decoration-2 hover:decoration-blue-500">
                        see here
                    </NuxtLink> or copy this link <span
                        class="py-1 px-1 break-all rounded focus:outline-none select-all bg-white/50"
                        @focus="$event.target.select()">{{
                        quizLink }}</span>
                </div>
            </div>
            </div>
    </div>
</template>green