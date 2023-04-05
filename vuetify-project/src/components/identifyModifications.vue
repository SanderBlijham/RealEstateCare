<template>
  <v-list
    v-for="(damage, index) in inspection.identifyModifications"
    :key="damage.id"
  >
    <v-text-field
      v-model="damage.place"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie aangetroffen modificatie:"
    ></v-text-field>
    <v-select
      v-model="damage.executed"
      class="mt-2"
      variant="underlined"
      :items="['Huurder', 'Aannemer', 'Onbekend']"
      label="Uitgevoerd door:"
    ></v-select>
    <v-text-field
      v-model="damage.descriptionModification"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Beschrijving modificatie:"
    ></v-text-field>
    <v-select
      v-model="damage.action"
      class="mt-2"
      variant="underlined"
      :items="[
        'Accepteren',
        'Laten keuren',
        'Laten verwijderen',
        'laten aanpassen en keuren',
      ]"
      label="Te ondernemen actie:"
    ></v-select>
    <v-text-field
      v-model="damage.description"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Opmerkingen:"
    ></v-text-field>
    <div v-for="(pdf, indexPDF) in damage.pdfsNew" :key="indexPDF">
      <v-btn class="mt-2" :href="pdf.url" variant="plain">{{ pdf.name }}</v-btn>
      <v-icon
        @click="deletePDF(index, indexPDF)"
        size="x-large"
        color="accent"
        icon="mdi-delete"
      ></v-icon>
    </div>
    <v-file-input
      placeholder="Upload PDF"
      variant="underlined"
      class="mt-5"
      clearable
      label="Upload PDF"
      @change="handleFileUpload($event, index)"
    ></v-file-input>
    <v-card>
        <v-img
          v-for="(item, subindex) in damage.imagesNew"
          :key="subindex"
          :src="item"
          class="img-fluid ma-2 mb-5"
          aspect-ratio="1/1"
          width="50%"
        >
          <v-icon
            @click="deleteImage(index, subindex)"
            size="x-large"
            color="accent"
            icon="mdi-delete"
          ></v-icon>
        </v-img>
      <v-file-input
        accept="image/png, image/jpeg, image/bmp, image/jpg"
        placeholder="Kies een afbeelding"
        prepend-icon="mdi-camera"
        variant="underlined"
        class="mt-2"
        clearable
        @change="selectImage($event, index)"
        label="Kies een afbeelding"
      ></v-file-input>
    </v-card>
  </v-list>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  name: "identifyModifications",
  props: ["inspection"],
  data() {
    return {};
  },
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
    },
    async selectImage(e, index) {
      const file = e.target.files[0];
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      const inspectionIndex = this.inspectionsIndex;
      const table = "identifyModifications";
      this.$store.commit("addImage", { inspectionIndex, table, index, data });
    },
    deleteImage(index, indexNewImages) {
      const inspectionIndex = this.inspectionsIndex;
      const table = "identifyModifications";
      this.$store.commit("deleteImage", {
        inspectionIndex,
        table,
        index,
        indexNewImages,
      });
    },
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const inspectionIndex = this.inspectionsIndex;
        const table = "identifyModifications";
        const url = URL.createObjectURL(file);
        this.$store.commit("addPDF", {
          inspectionIndex,
          table,
          index,
          name: file.name,
          url,
        });
      };
      reader.readAsArrayBuffer(file);
    },
    deletePDF(index, indexNewPDF) {
      const inspectionIndex = this.inspectionsIndex;
      const table = "identifyModifications";
      this.$store.commit("deletePDF", {
        inspectionIndex,
        table,
        index,
        indexNewPDF,
      });
    },
  },
  computed: {
    inspectionsIndex() {
      return this.$store.getters.getIndexById(this.inspection.id);
    },
  },
};
</script>

<style scope>
.div {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
