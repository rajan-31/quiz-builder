<script setup>
const router = useRouter();
const userName = inject('userName');

const navItems = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' }
]

const handleLogout = () => {
    fetch('http://localhost:3001/api/v1/logout',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
        .then(res => {
            if (res.status === 200) {
                userName.value = '';
                router.push('/login');
            }
            else {
                alert('Logout Failed');
            }
        });
};
</script>
<template>
    <nav class="p-0.5 bg-sky-200 rounded-b-lg shadow-md">
        <ul class="flex flex-row justify-between w-full md:w-[750px] lg:w-[900px] mx-auto px-3">
            <li v-for="item in navItems" class="p-2">
                <NuxtLink :to="item.link" class="hover:bg-sky-300/40 inline-block py-1.5 px-4 rounded w-[84px] text-center">
                    {{ item.text }}
                </NuxtLink>
            </li>
            <ClientOnly>
                <template #fallback>
                    <li class="p-2">
                        <button class="bg-transparent py-1.5 px-4 rounded w-[84px] text-center hover:shadow-lg">&nbsp;</button>
                    </li>
                </template>
                <li v-if="userName" class="p-2">
                    <button @click="handleLogout"
                        class="hover:bg-red-300/70 py-1.5 px-4 rounded w-[84px] text-center hover:shadow-lg">Logout</button>
                </li>
                <li v-else class="p-2">
                    <NuxtLink to="/login" class="hover:bg-emerald-300/60 inline-block py-1.5 px-4 rounded w-[84px] text-center">
                        Login</NuxtLink>
                </li>
            </ClientOnly>
        </ul>
    </nav>
</template>