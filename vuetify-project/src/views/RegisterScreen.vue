<template>
    <v-app>
      <default-bar />
      <register-component />
      <default-bottom-bar />
    </v-app>
  </template> 
  
  <script setup>
    import DefaultBar from '@/layouts\\default/AppBar.vue'
    import RegisterComponent from '@/components/RegisterComponent.vue'
    import DefaultBottomBar from '@/layouts\\default/BottomBar.vue'
  </script>
  
  
  