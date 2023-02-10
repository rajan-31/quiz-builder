<template>
    <Navbar />
    <div>
        <h1>404</h1>
        <p>Page Not Found</p>
        <NuxtLink to="/" >Go Home</NuxtLink>
    </div>
</template>
  
<script setup>
  const props = defineProps({
    error: Object
  })
  
  const handleError = () => clearError({ redirect: '/' })
</script>