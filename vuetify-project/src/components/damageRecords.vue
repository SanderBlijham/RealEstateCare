<template>
  <v-list v-for="damage in inspection.damageRecords" :key="damage.id">
    <v-text-field
      v-model="damage.location"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie"
    ></v-text-field>
    <v-text-field
      v-model="damage.newDamage"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Nieuwe schade:"
    ></v-text-field>
    <v-text-field
      v-model="damage.type"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Soort schade:"
    ></v-text-field>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          label="Date"
          hint="MM/DD/YYYY format"
          persistent-hint
          prepend-icon="event"
          v-bind="attrs"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu1 = false"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="damage.immediateAction"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Acute actie vereist:"
    ></v-text-field>
    <v-text-field
      v-model="damage.description"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Omschrijving:"
    ></v-text-field>

    <v-card>
      <v-img
        v-for="image in damage.images"
        :key="image.id"
        :src="getNewDamageUrl(inspection.id, damage.id, image.id, image.img)"
        :alt="damage.id"
        class="img-fluid ma-2"
        aspect-ratio="1/1"
        width="50%"
      >
      </v-img>
      <v-card>
        <v-img
          v-for="(item, index) in images"
          :key="index"
          :src="item"
          class="img-fluid ma-2"
          aspect-ratio="1/1"
          width="50%"
        >
          <v-icon
            @click="deleteImage(index)"
            size="x-large"
            color="accent"
            icon="mdi-delete"
          ></v-icon>
        </v-img>
      </v-card>
      <v-file-input
        v-model="imageNew"
        accept="image/png, image/jpeg, image/bmp, image/jpg"
        placeholder="Kies een afbeelding"
        prepend-icon="mdi-camera"
        variant="underlined"
        class="mt-2"
        clearable
        @change="selectImage"
        @click:clear="clear()"
        label="Kies een afbeelding"
      ></v-file-input>
    </v-card>
  </v-list>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  name: "damageRecords",
  props: ["inspection"],
  data() {
    return {
      imagePreview: "",
      data: (vm) => ({
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate2(new Date().toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,
      }),
    };
  },
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
    },
    formatDate2(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async selectImage(e) {
      const file = e.target.files[0];
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.$store.commit("addImage", data);
      console.log(this.images);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
  },
  computed: {
    images() {
      return this.$store.state.images;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }}
};
</script>
