<script setup>
defineProps({
    options: { type: Array, default: [] },
    correctMultiple: { type: Array, default: [] },
    handleDeleteOption: Function
});
</script>
<template>
    <div>
        <div v-for="(option, index) in options" class="my-1 flex flex-row rounded-lg"
            :class="(correctMultiple.includes(option) ? 'bg-green-300 hover:bg-green-400' : 'bg-gray-300 hover:bg-gray-400')">
            <div class="grow">
                <input type="checkbox" :id="'type2-' + index" :value="option" class="appearance-none"
                    :checked="correctMultiple.includes(option)"
                    v-on:change="(event) => this.$emit('selectChange', event)">
                <label :for="'type2-' + index"
                    class="w-full inline-block p-2 pl-5 cursor-pointer rounded-lg rounded-r-none">{{
                        option
                    }}</label>
            </div>
            <button :data-text="option" @click="handleDeleteOption" class="bg-red-200 hover:bg-red-400 rounded-r-lg">
                <GeneralCrossSVG />
            </button>
        </div>
    </div>
</template>