<template>
  <v-row>
    <v-col cols="6" 
    md="3">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          icon
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          height="350"
          max-width="350"
          v-bind="props"
        >
          <v-card-title class="d-flex justify-center align-center mt-5">
            <v-icon 
            size="1000%"
            color="logo">mdi-calendar-month-outline</v-icon>
          </v-card-title>

          <h3
          class="d-flex justify-center align-center text-logo mt-10"
          >Scheduled</h3>
        </v-card>
      </v-hover>
    </v-col>

    <v-col cols="6" 
    md="3">
      <v-hover v-slot="{ isHovering, props }">
        <router-link to="completed" class="text-decoration-none">
        <v-card
          icon
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          height="350"
          max-width="350"
          v-bind="props"
        >
          <v-card-title class="d-flex justify-center align-center mt-5">
            <v-icon size="1000%" color="logo">mdi-check-circle</v-icon>
          </v-card-title>

          <h3
          class="d-flex justify-center align-center text-logo mt-10"
          >Completed</h3>
        </v-card>
      </router-link>
      </v-hover>
    </v-col>

    <v-col cols="6" 
    md="3">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          icon
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          height="350"
          max-width="350"
          v-bind="props"
        >
          <v-card-title class="d-flex justify-center align-center mt-5">
            <v-icon size="1000%" color="logo">mdi-dots-grid</v-icon>
          </v-card-title>

          <h3
          class="d-flex justify-center align-center text-logo mt-10"
          >Knowledge base</h3>
        </v-card>
      </v-hover>
    </v-col>

    <v-col cols="6" 
    md="3">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          icon
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          class="mx-auto"
          height="350"
          max-width="350"
          v-bind="props"
        >
          <v-card-title class="d-flex justify-center align-center mt-5">
            <v-icon size="1000%" color="logo">mdi-cog</v-icon>
          </v-card-title>

          <h3
          class="d-flex justify-center align-center text-logo mt-10"
          >Settings</h3>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>


