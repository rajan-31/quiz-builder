<script setup>
const userName = ref('');
provide('userName', userName);

const quizList = ref([]);
provide('quizList', quizList);

const config = useRuntimeConfig()

onMounted(() => {
    fetch(config.public.apiUrl + '/user', {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            userName.value = data.userName;
            if (data.userName) {
                fetch(config.public.apiUrl + '/quiz/list',
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },

                    })
                    .then(res => res.text())
                    .then(raw => raw ? JSON.parse(raw) : {})
                    .then(data => {
                        if (data.quizzes) {
                            quizList.value = data.quizzes
                        }
                    });
            }
        });
});
</script>
<template>
    <div class="h-[100%]">
        <slot />
    </div>
</template>
<style lang="postcss" scopoed>
html,
body,
#__nuxt {
    height: 100%;
    @apply bg-gray-100;
}
</style>