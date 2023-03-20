<template>
  <v-list v-for="damage in inspection.technicalInstallationInspections" :key="damage.id">
    <v-text-field
      v-model="damage.location"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie"
    ></v-text-field>
    <v-text-field
      v-model="damage.type"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Soort schade:"
    ></v-text-field>
    <v-text-field
      v-model="damage.reportedMalfunction"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Gemelde storingen:"
    ></v-text-field>
    <v-text-field
      v-model="damage.approved"
      class="mt-2"
      type="datetime-local"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Goedgekeurd:"
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
        v-model="image"
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
  name: "technicalInstallationInspections",
  props: ["inspection"],
  data() {
    return {
      imagePreview: ""
    };
  },
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
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
      this.$store.commit('addImage', data);
      console.log(this.images);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
  },
  computed: {
    images() {
      return this.$store.state.images;
    }},
};
</script>
