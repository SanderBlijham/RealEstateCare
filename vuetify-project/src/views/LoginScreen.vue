<template>
    <v-app>
      <default-bar />
      <login-form />
      <default-bottom-bar />
    </v-app>
  </template> 
  
  <script setup>
    import DefaultBar from '@/layouts\\default/AppBar.vue'
    import LoginForm from '@/components/LoginForm.vue'
    import DefaultBottomBar from '@/layouts\\default/BottomBar.vue'
  </script>
  
  
  