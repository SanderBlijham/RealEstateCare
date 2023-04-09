<template>
  <v-container class="d-flex justify-center align-center">
    <v-list
      action="/post"
      v-if="!loading"
      class="mx-auto"
      style="max-width: 100%"
    >
      <v-text-field
        v-model="username"
        class="mt-2"
        variant="underlined"
        hide-details="auto"
        label="Gebruikersnaam"
        type="text"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        class="mt-2"
        variant="underlined"
        hide-details="auto"
        label="Wachtwoord"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-if="twoFactorEnabled"
        v-model="twoFactorCode"
        class="mt-2"
        variant="underlined"
        hide-details="auto"
        label="2FA code"
        type="2FA code"
        required
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
      <div class="mt-2">
        <router-link to="/register">Account aanmaken</router-link>
      </div>
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
      username: "",
      password: "",
      twoFactorCode: "",
      twoFactorSecret: "",
      twoFactorEnabled: false,
      loading: false,
    };
  },

  methods: {
    login() {
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (!storedUsername || !storedPassword) {
        alert("Gebruikersnaam of wachtwoord onjuist");
        return;
      }

      if (this.twoFactorEnabled === false) {
        alert("2FA niet geactiveerd. Ga naar de registratiepagina en klik op scan QR code");
        return;
      }

      // Check if 2FA is enabled and verify the code if it is
      if (this.twoFactorEnabled) {
        const secret = localStorage.getItem("twoFactorSecret");
        const token = 123456;
        if (this.twoFactorSecret === secret && this.twoFactorCode == token) {
          // Check if the username and password match the stored values
          if (
            this.username === storedUsername &&
            this.password === storedPassword
          ) {
            localStorage.setItem("authenticated", true);
            // show the loading message
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.$router.push("/");
            }, 1000);
          } else {
            alert("Gebruikersnaam of wachtwoord onjuist");
          }
        } else {
          alert("Invalid 2FA code!");
          return;
        }
      }
    },
  },
  created() {
    // Check if the user has set up 2FA before
    const twoFactorSecret = localStorage.getItem("twoFactorSecret");
    if (twoFactorSecret) {
      this.twoFactorSecret = twoFactorSecret;
      this.twoFactorEnabled = true;
    }
  },
};
</script>
