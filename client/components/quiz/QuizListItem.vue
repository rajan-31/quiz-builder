<script setup>
import CrossSVG from '../general/CrossSVG.vue';
const config = useRuntimeConfig()

defineProps({
    quizTitle: String,
    quizId: String
});

const quizList = inject('quizList');

const handleDeleteQuiz = (event) => {
    const tempId = event.target.getAttribute('data-id');
    if (confirm('Press OK to continue'))
    if (tempId) {
        fetch(config.public.apiUrl + '/quiz/' + tempId,
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
                    quizList.value.splice(quizList.value.findIndex(item => item._id == tempId), 1);
                }
                else {
                    alert('Not able to delete quiz');
                }
            });
    }
}
</script>
<template>
    <div class="flex flex-row my-2 bg-blue-200 hover:bg-blue-300 rounded-lg">
        <NuxtLink :to="'/quiz/' + quizId" class="block grow py-2 pl-5">
            {{ quizTitle }}
        </NuxtLink>
        <button :data-id="quizId" @click="handleDeleteQuiz" class="bg-red-200 hover:bg-red-400 rounded-r-lg">
            <CrossSVG />
        </button>
    </div>
</template>