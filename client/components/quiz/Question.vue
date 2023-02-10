<script setup>
import OptionMultiple from './OptionMultiple.vue';
import OptionOne from './OptionOne.vue';

const props = defineProps({
    index: Number,
    question: Object,
    deleteBtn: {
        type: Boolean,
        default: false
    },
    showCorrect: Boolean
});

const allQuestions = inject('allQuestions', {});
const markedAnswers = inject('markedAnswers', {});

const deleteQuestion = (index) => {
    allQuestions.value.splice(index, 1);
}

const handleRadiochange = (event) => {
    markedAnswers.value[props.index][0] = event.target.value;
}

const handleSelectChange = (event) => {
    markedAnswers.value[props.index] = event.target.value
}

</script>
<template>
    <div class="my-10 bg-orange-100 py-2 px-2 rounded-md">
        <div class="bg-blue-300 p-2 rounded-md mt-2 mb-1 flex flex-row">
            <div class="">Q{{ props.index + 1 }}.</div>
            <div class="pl-2">{{ question.text }}</div>
        </div>
        <div class="flex flex-row justify-between">
            <div class="p-2 font-light text-sm text-black/80 rounded-md">
                <span class="">{{question.typeOfQuestion == 1 ? `One correct answer`: `One or more correct
                    answers`
                    }}</span>
            </div>
            <div v-if="deleteBtn" class="text-right">
                <FormButton btn-text="Delete" btn-color="red" @click="deleteQuestion(props.index)" />
            </div>
        </div>
        <div v-if="question.typeOfQuestion == 1">
            <OptionOne :options="question.options" :index="props.index" :correct-one="question.correctOne"
                :show-correct="showCorrect" />
        </div>
        <div v-else-if="question.typeOfQuestion == 2">
            <OptionMultiple :options="question.options" :index="props.index"
                :correct-multiple="question.correctMultiple" :show-correct="showCorrect" />
        </div>
    </div>
</template>