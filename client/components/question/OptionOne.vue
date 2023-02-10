<script setup>
defineProps({
    options: { type: Array, default: [] },
    correctOne: { type: String, default: '' },
    handleDeleteOption: Function
});
</script>
<template>
    <div>
        <div v-for="(option, index) in options">
            <div class="my-1 flex flex-row rounded-lg"
                :class="(option == correctOne ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">
                <div class="grow">
                    <input type="radio" :id="'type1-' + index" :value="option" :checked="option == correctOne"
                        class="appearance-none" v-on:input="(event) => this.$emit('radioChange', event)" />
                    <label :for="'type1-' + index"
                        class="w-full inline-block p-2 pl-5 cursor-pointer rounded-lg rounded-r-none">{{
                            option
                        }}</label>
                </div>
                <button :data-text="option" @click="handleDeleteOption"
                    class="bg-red-200 hover:bg-red-400 rounded-r-lg">
                    <GeneralCrossSVG />
                </button>
            </div>
        </div>
    </div>
</template>