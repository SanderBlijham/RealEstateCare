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
    <v-select
      v-model="damage.type"
      class="mt-2"
      variant="underlined"
      :items="[
        'Schilderwerk',
        'Houtrot',
        'Elektra',
        'Leidingwerk',
        'Beglazing',
      ]"
      label="Soort installatie:"
    ></v-select>
    <v-radio-group inline v-model="damage.immediateAction" class="mt-2">
      <v-list-item-subtitle class="mt-3">Acute actie vereist:</v-list-item-subtitle>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>
    <v-select
    v-model="damage.costIndication"
      variant="underlined"
      :items="[
        '0-500',
        '500-1500',
        '1500+'
      ]"
      label="Kostenindicatie:"
    ></v-select>
    <v-card variant="text">
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
  name: "overdueMaintenanceRecords",
  props: ["inspection"],
  data() {
    return {
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
      const table = 'overdueMaintenanceRecords';
      this.$store.commit("addImage", { inspectionIndex, table, index, data });
    },
    deleteImage(index, indexNewImages) {
      const inspectionIndex = this.inspectionsIndex;
      const table = 'overdueMaintenanceRecords';
      this.$store.commit("deleteImage", {
        inspectionIndex,
        table,
        index,
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
