<template>
  <v-container class="d-flex justify-center align-center">
    <v-list action="/post" class="mx-auto" style="max-width: 100%">
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
      <v-btn
        type="button"
        class="mt-2"
        variant="elevated"
        style="font-size: 10px"
        @click="setup2FA"
      >
        Scan QR code met authenticator
      </v-btn>
      <v-img :src="qrCode"  alt="qrCode"></v-img>
      <v-btn
        type="submit"
        block
        class="mt-2"
        color="primary"
        prepend-icon="mdi-arrow-right"
        v-on:click.prevent="register"
        >Aanmelden</v-btn
      >
      <div class="mt-2">
        Heeft u al een account?
        <router-link to="/login">Log in</router-link>
      </div>
    </v-list>
  </v-container>
</template>


<script>
import { authenticator } from "@otplib/preset-default";
import CryptoJS from "crypto-js";
import base32Encode from "base32-encode";
import QRCode from "qrcode";

export default {
  data() {
    return {
      username: "",
      password: "",
      qrCode: null,
    };
  },
  methods: {
    async setup2FA() {
      // Generate a new secret key and store it in local storage;
      const randomBytes = CryptoJS.lib.WordArray.random(20);
      const buffer = Buffer.from(randomBytes.toString(CryptoJS.enc.Hex), "hex");
      const base32Secret = base32Encode(buffer, "RFC4648", { padding: false });
      const secret = base32Secret.toUpperCase();
      localStorage.setItem("twoFactorSecret", secret);

      // Display a QR code for the user to scan
      const qrCodeData = authenticator.keyuri(
        this.username,
        "Real Estate Care",
        secret
      );
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      this.qrCode = qrCodeImage;
      console.log(this.qrCode);

      this.twoFactorEnabled = true;
      alert(
        "Let op! De 2FA token in dit prototype is altijd 123456, omdat server-side verificatie in dit prototype niet mogelijk is. QR Code is ter illustratie."
      );
    },
    register() {
      if (this.username && this.password) {
        // Store the username and password in local storage
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);

        // Redirect to the login page
        this.$router.push("/login");
      } else {
        alert("Gebruikersnaam en wachtwoord zijn verplicht");
      }
    },
  },
};
</script>
