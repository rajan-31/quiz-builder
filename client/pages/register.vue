<script setup>
const registerFormData = ref({
    email: 'user3@gmail.com',
    password: '123456',
    confirmPassword: '123456',
    name: 'user3',
});

const userName = inject('userName');

const submitRegister = () => {
    const tempData = Object.assign({}, registerFormData.value);
    if (tempData.email.length === 0) alert('Please enter valid email');
    else if (tempData.password.length < 6) alert('Please enter valid password');
    else if (tempData.password != tempData.confirmPassword) alert('Password missmatched');
    else if (tempData.name.length === 0) alert('Please enter valid name')
    else {
        fetch('http://localhost:3001/api/v1/register',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: tempData.email,
                    password: tempData.password,
                    name: tempData.name,
                }),

            })
            .then(res => res.json())
            .then(data => {
                if (data.userName && data.userName.length !== 0)
                    userName.value = data.userName;
                else {
                    console.log(data)
                    alert('Inavlid credentials');
                }
            });
    }
}
</script>
<template>
    <input type="email" v-model="registerFormData.email" placeholder="Email"><br>

    <input type="password" v-model="registerFormData.password" placeholder="Password"><br>
    <input type="password" v-model="registerFormData.confirmPassword" placeholder="Confirm Password"><br>

    <small v-if="registerFormData.password != registerFormData.confirmPassword">! Password Missmatched</small><br>

    <input type="text" v-model="registerFormData.name" placeholder="Name"><br>
    <button @click="submitRegister()">Register</button>

    <div>Already have an account? <NuxtLink to="/login">login here</NuxtLink>
    </div>
</template>
<style>
.bg-red {
    background-color: red;
}

.bg-green {
    background-color: green;
}
</style>