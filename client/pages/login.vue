<script setup>
const router = useRouter();

const loginFormData = ref({
    email: 'user1@gmail.com',
    password: '123456'
});

const userName = inject('userName');

const submitLogin = () => {
    const tempData = Object.assign({}, loginFormData.value);
    if (tempData.email.length === 0) alert('Please enter valid email');
    else if (tempData.password.length < 6) alert('Please enter valid password');
    else {
        fetch('http://localhost:3001/api/v1/login',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: tempData.email,
                    password: tempData.password
                }),

            })
            .then(res => res.json())
            .then(data => {
                if (data.userName && data.userName.length !== 0) {
                    userName.value = data.userName;
                    router.push('/quiz/new');
                }
                else {
                    console.log(data)
                    alert('Inavlid credentials');
                }
            });
    }
}
</script>
<template>
    <input type="email" :value="loginFormData.email" placeholder="Email">
    <input type="password" :value="loginFormData.password" placeholder="Password">
    <button @click="submitLogin()">Login</button>

    <div>Don't have an account? <NuxtLink to="/register">register here</NuxtLink>
    </div>
</template>