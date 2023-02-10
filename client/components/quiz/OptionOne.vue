<script setup>
const props = defineProps({
    index: Number,
    options: Array,
    correctOne: String,
    showCorrect: Boolean,
});

// const allQuestions = inject('allQuestions');
const markedAnswers = provide('markedAnswers', []);

const getBackgroundCSS = (option) => {
    if (!props.showCorrect) {
        if (option == props.correctOne)
            return 'bg-green-300 hover:bg-green-400';
        else
            return 'bg-gray-300 hover:bg-gray-400'
    }
    else {
        if (option == props.correctOne)
            return 'bg-green-300';
        else
            return 'bg-gray-300'
    }
}

</script>
<template>
    <div>
        <div v-for="(option, index) in props.options">
            <div class="my-1 flex flex-row rounded-lg" :class="getBackgroundCSS(option)">
                <div class="grow"><input type="radio" :id="'type1-' + index" :value="option"
                        :checked="props.showCorrect && option == props.correctOne" class="appearance-none"
                        v-on:input="(event) => this.$emit('radioChange', event)" />
                    <label :for="'type1-' + index" class="w-full inline-block p-2 pl-5 rounded-lg rounded-r-none"
                        :class="(props.showCorrect ? 'cursor-default' : 'cursor-pointer')">{{
    option
                        }}</label>
                </div>
            </div>
        </div>
    </div>
</template>