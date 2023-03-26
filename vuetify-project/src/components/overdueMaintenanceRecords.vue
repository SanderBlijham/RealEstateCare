<template>
  <v-list v-for="(damage, index) in inspection.overdueMaintenanceRecords" :key="damage.id">
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
      v-model="damage.immediateAction"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Acute actie vereist:"
    ></v-text-field>
    <v-text-field
      v-model="damage.costIndication"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Kostenindicatie:"
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
  name: "overdueMaintenanceRecords",
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
      this.$store.commit("addImageMaintenance", { inspectionIndex, index, data });
    },
    deleteImage(indexDamageRecords, indexNewImages) {
      const inspectionIndex = this.inspectionsIndex;
      this.$store.commit("deleteImageMaintenance", {
        inspectionIndex,
        indexDamageRecords,
        indexNewImages,
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
