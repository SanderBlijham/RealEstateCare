<template>
  <v-list
    v-for="(damage, index) in inspection.technicalInstallationInspections"
    :key="damage.id"
  >
    <v-text-field
      v-model="damage.location"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie"
    ></v-text-field>
    <v-select
      v-model="damage.type"
      variant="underlined"
      :items="[
        'Koeling',
        'Verwarming',
        'Luchtverversing',
        'Elektra',
        'Beveiliging',
      ]"
      label="Soort installatie:"
    ></v-select>
    <v-text-field
      v-model="damage.reportedMalfunction"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Gemelde storingen:"
    ></v-text-field>
    <v-radio-group inline v-model="damage.approved" class="mt-2">
      <v-list-item-subtitle class="mt-3">Goedgekeurd:</v-list-item-subtitle>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>
    <v-text-field
      v-model="damage.description"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Opmerkingen:"
    ></v-text-field>
    <div class="div">
      Test procedure:
      <a :href="getPDFTests(inspection.id, damage.test)" download>
        {{ damage.test }}
      </a>
    </div>
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
      class="mt-2"
      clearable
      label="Upload PDF"
      @change="handleFileUpload($event, index)"
    ></v-file-input>
    <v-card>
      <v-img
        v-for="image in damage.images"
        :key="image.id"
        :src="getNewDamageUrl(inspection.id, damage.id, image.id, image.img)"
        class="img-fluid ma-2"
        aspect-ratio="1/1"
        width="50%"
      >
      </v-img>
      <v-card>
        <v-img
          v-for="(item, subindex) in damage.imagesNew"
          :key="subindex"
          :src="item"
          class="img-fluid ma-2"
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
      </v-card>
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
  name: "technicalInstallationInspections",
  props: ["inspection"],
  data() {
    return {
      imagePreview: "",
    };
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
      const table = "technicalInstallationInspections";
      this.$store.commit("addImage", { inspectionIndex, table, index, data });
    },
    deleteImage(index, indexNewImages) {
      const inspectionIndex = this.inspectionsIndex;
      const table = "technicalInstallationInspections";
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
        const table = "technicalInstallationInspections";
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
      const table = "technicalInstallationInspections";
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
