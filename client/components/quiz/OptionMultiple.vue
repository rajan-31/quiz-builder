<script setup>
const props = defineProps({
    index: Number,
    options: Array,
    correctMultiple: { type: Array, default: [] },
    showCorrect: Boolean
});

// const allQuestions = inject('allQuestions', {});
// const markedAnswers = inject('markedAnswers', {});

const getBackgroundCSS = (option) => {
    if (!props.showCorrect) {
        return 'bg-gray-300 hover:bg-gray-400'
    }
    else {
        if (props.correctMultiple.includes(option))
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
                <div class="grow">
                    <input type="checkbox" :id="'type2-' + index" :value="option" class="appearance-none"
                        :checked="props.showCorrect && props.correctMultiple.includes(option)"
                        v-on:change="(event) => this.$emit('selectChange', event)">
                    <label :for="'type2-' + index"
                        class="w-full inline-block p-2 pl-5 cursor-pointer rounded-lg rounded-r-none"
                        :class="(props.showCorrect ? 'cursor-default' : 'cursor-pointer')">{{
    option
                        }}</label>
                </div>
            </div>
        </div>
    </div>
</template>