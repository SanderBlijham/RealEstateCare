<template>
    <v-app>
      <default-bar />
      <InspectionListDocuments />
      <default-bottom-bar />
    </v-app>
  </template>
  
  <script setup>
  import DefaultBar from "@/layouts\\default/AppBar.vue";
  import DefaultBottomBar from "@/layouts\\default/BottomBar.vue";
  import InspectionListDocuments from "@/components/InspectionListDocuments.vue";
  </script>
  