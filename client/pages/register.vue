<script setup>
const router = useRouter();
const config = useRuntimeConfig()


const registerFormData = ref({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
});

const userName = inject('userName');

onMounted(() => {
    if (userName && userName.value.length > 0) router.push('/');
})

const handleInputChange = (event) => {
    const value = event.target.value;
    registerFormData.value[event.target.id] = value;
}

const looksLikeMail = (str) => {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

const submitRegister = () => {
    const tempData = Object.assign({}, registerFormData.value);
    if (!looksLikeMail(tempData.email)) alert('Please enter valid email');
    else if (tempData.password.length < 6) alert('Please enter atlease 6 characters long password');
    else if (tempData.password != tempData.confirmPassword) alert('Password missmatched');
    else if (tempData.name.length === 0) alert('Please enter valid name')
    else {
        fetch(config.public.apiUrl + '/register',
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
                if (data.userName && data.userName.length !== 0) {
                    userName.value = data.userName;
                    router.push('/login');
                }
                else {
                    console.log(data)
                    alert(data.message);
                }
            });
    }
}
</script>
<template>
    <div>
        <div class="flex flex-wrap px-5 pt-5 pb-2 font-medium text-base">
            <div class="p-2 w-full sm:w-1/2">
                <FormInputLabel label-text="Email" label-for="email" />
                <FormInputField input-type="email" v-on:inputChange="handleInputChange" input-id="email"
                    :input-value="registerFormData.email" input-placeholder="Email" />
            </div>
            <div class="p-2 w-full sm:w-1/2">
                <FormInputLabel label-text="Name" label-for="name" />
                <FormInputField input-type="text" v-on:inputChange="handleInputChange" input-id="name"
                    :input-value="registerFormData.name" input-placeholder="Name" />
            </div>
    
            <div class="p-2  w-full sm:w-1/2">
                <FormInputLabel label-text="Password (atleast 6 characters)" label-for="password" />
                <FormInputField input-type="password" v-on:inputChange="handleInputChange" input-id="password"
                    :input-value="registerFormData.password" input-placeholder="Password (atleast 6 characters)" />
            </div>
            <div class="p-2  w-full sm:w-1/2">
                <FormInputLabel label-text="Confirm Password" label-for="confirmPassword" />
                <FormInputField input-type="password" v-on:inputChange="handleInputChange" input-id="confirmPassword"
                    :input-value="registerFormData.confirmPassword" input-placeholder="Password" />
            </div>
        </div>
        <div class="px-7">
            <FormButton btn-color="green" btn-text="Signup" :btn-click="submitRegister" />
    
            <div class="mt-2">Already have an account? <NuxtLink to="/login"
                    class="underline decoration-orange-600 decoration-2 hover:bg-orange-600 hover:text-white">Login
                </NuxtLink>
            </div>
        </div>
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