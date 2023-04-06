<template>
  <v-container class="d-flex justify-center align-center">
    <v-list
      action="/post"
      v-if="!loading"
      class="mx-auto"
      style="max-width: 33%"
    >
      <v-text-field
        v-model="username"
        class="mt-2"
        variant="underlined"
        hide-details="auto"
        label="Gebruikersnaam"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="password"
        class="mt-2"
        variant="underlined"
        hide-details="auto"
        label="Wachtwoord"
        type="password"
      ></v-text-field>
      <v-btn
        type="submit"
        block
        class="mt-2"
        color="primary"
        prepend-icon="mdi-arrow-right"
        v-on:click.prevent="login"
        >Inloggen</v-btn
      >
    </v-list>
    <loading-component v-if="loading"></loading-component>
  </v-container>
</template>

<script>
import LoadingComponent from "./LoadingComponent.vue";
export default {
  name: "LoginForm",
  components: { LoadingComponent },
  data() {
    return {
      loading: false,
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      // should be replaced by real login code
      // there I just did some simple validation and use a fake login
      if (this.username != "" && this.password != "") {
        // show the loading message
        this.loading = true;
        setTimeout(() => {
          this.loading = false;

          // use vuex to store user inforamtion
          this.$store.dispatch("update_user_name", this.username);

          // save login status in localstorage
          localStorage.setItem("login", true);

          // redirect to user page
          this.$router.push("/");
        }, 1000);
      }
    },
  },
};
</script>

<style>
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
</style>
