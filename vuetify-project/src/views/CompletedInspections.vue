<template>
    <v-app>
      <default-bar />
      <inspection-list />
      <default-bottom-bar />
    </v-app>
  </template> 
  
  <script setup>
    import DefaultBar from '@/layouts\\default/AppBar.vue'
    import DefaultBottomBar from '@/layouts\\default/BottomBar.vue'
    import InspectionList from '@/components/InspectionList.vue';
  </script>
  