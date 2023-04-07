<template>
  <div>
    <form @submit.prevent="register">
      <label>Username:</label>
      <input type="text" v-model="username" required />
      <br />
      <label>Password:</label>
      <input type="password" v-model="password" required />
      <br />
      <div>
        <button type="button" @click="setup2FA">Set up 2FA</button>
        <v-img :src="qrCode" width="10%" height="10%" alt="qrCode"></v-img>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
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
    },
    register() {
      // Store the username and password in local storage
      localStorage.setItem("username", this.username);
      localStorage.setItem("password", this.password);

      // Redirect to the login page
      this.$router.push("/login");
    },
  },
};
</script>
