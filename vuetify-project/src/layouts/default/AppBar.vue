<template>
  <v-toolbar density="compact" height="100" class="gradient mb-3">
    <v-toolbar-title>
      <router-link to="/" class="text-decoration-none">
        <v-img src="@/assets/logo.png" width="200" height="200" contain></v-img>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon color="white">
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-btn icon color="white">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-btn icon color="white" v-on:click.prevent="logout">
      Log<br />
      out
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout: function () {
      // save login status in localstorage
      localStorage.removeItem("authenticated");

      // redirect to user page
      this.$router.push("/Login");
    },
  },
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(to right, #141b1f, #475e6c);
}
</style>
