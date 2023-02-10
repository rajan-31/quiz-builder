// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    runtimeConfig: {    
        public : {
            apiUrl: 'http://localhost:3001/api/v1'
        }
    }
})
