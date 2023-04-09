<template>
  <v-app>
    <default-bar />
    <inspection-list-completed />
    <default-bottom-bar />
  </v-app>
</template>

<script setup>
import DefaultBar from "@/layouts\\default/AppBar.vue";
import DefaultBottomBar from "@/layouts\\default/BottomBar.vue";
import InspectionListCompleted from "@/components/InspectionListCompleted.vue";
</script>
