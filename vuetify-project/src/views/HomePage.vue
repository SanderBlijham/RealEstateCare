<template>
  <v-app>
    <default-bar />
    <inspection-list />
    <default-cards />
    <default-bottom-bar />
  </v-app>
</template> 

<script setup>
  import DefaultBar from '@/layouts\\default/AppBar.vue'
  import DefaultCards from '@/components/HomeCards.vue'
  import DefaultBottomBar from '@/layouts\\default/BottomBar.vue'
  import InspectionList from '@/components/InspectionList.vue';
</script>
