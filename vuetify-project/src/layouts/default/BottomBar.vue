<template>
  <div class="bottom-space">
  <v-bottom-navigation bg-color="accent">
    <v-btn value="active task">
      <v-icon>mdi-tools</v-icon>

      Actieve taken
    </v-btn>


    <v-btn value="search">
      <v-icon>mdi-magnify</v-icon>

      Zoeken
    </v-btn>


    <v-btn value="information">
      <v-icon>mdi-information-outline</v-icon>

      Informatie
    </v-btn>
  </v-bottom-navigation>
</div>
</template>

<script></script>

<style scoped>
.bottom-space {
  padding-bottom: 70px; 
}
</style>
