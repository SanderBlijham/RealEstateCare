<template>
  <v-app>
    <default-bar />
    <user-profile />
    <default-bottom-bar />
  </v-app>
</template>

<script setup>
import DefaultBar from "@/layouts\\default/AppBar.vue";
import DefaultBottomBar from "@/layouts\\default/BottomBar.vue";
import UserProfile from "@/components/UserProfile.vue";
</script>
