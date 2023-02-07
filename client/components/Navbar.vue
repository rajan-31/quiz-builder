<script setup>
const router = useRouter();
const userName = inject('userName');

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
    <nav>
        <ul>
            <li>
                <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/about">About</NuxtLink>
            </li>
            <ClientOnly fallback-tag="span" fallback="Showing User info">
                <li v-if="userName">{{ userName }}</li>
                <li v-if="userName"><button @click="handleLogout">Logout</button></li>
                <li v-else>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
            
            </ClientOnly>
        </ul>
    </nav>
</template>