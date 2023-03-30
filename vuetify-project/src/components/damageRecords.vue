<template>
  <v-list v-for="(damage, index) in inspection.damageRecords" :key="damage.id">
    <v-text-field
      v-model="damage.location"
      class="mt-2"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Locatie"
    ></v-text-field>
    <v-radio-group inline v-model="damage.newDamage" class="mt-2">
      <v-list-item-subtitle class="mt-3">Nieuwe schade:</v-list-item-subtitle>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>
    <v-select
      v-model="damage.type"
      variant="underlined"
      :items="[
        'Moedwillig',
        'Slijtage',
        'Geweld',
        'Normaal gebruik',
        'Calamiteit',
        'Anders',
      ]"
      label="Soort schade:"
    ></v-select>
    <v-text-field
      v-model="damage.date"
      class="mt-2"
      @change=damageIndex(index)
      :value="formatDate(damage.date)"
      :type="inputType"
      variant="underlined"
      clearable
      hide-details="auto"
      label="Datum:"
    ></v-text-field>
    <v-radio-group inline v-model="damage.immediateAction" class="mt-2">
      <v-list-item-subtitle class="mt-3"
        >Acute actie vereist:</v-list-item-subtitle
      >
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>
    <v-text-field
      v-model="damage.description"
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
  name: "damageRecords",
  props: ["inspection"],
  data() {
    return {
    //  inputType: "date",
    selectedDamageIndex: 0,
    };
  },
  mixins: [mixins],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
    },
    damageIndex(index) {
      this.selectedDamageIndex = index;
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
      const table = "damageRecords"
      this.$store.commit("addImage", {inspectionIndex, table, index, data});
    },
    deleteImage(indexDamageRecords, indexNewImages) {
      const inspectionIndex = this.inspectionsIndex;
      const table = "damageRecords";
      this.$store.commit("deleteImage", {
        inspectionIndex,
        table,
        indexDamageRecords,
        indexNewImages,
      });
    },
  },
  computed: {
    inspectionsIndex() {
      return this.$store.getters.getIndexById(this.inspection.id);
    },
    inputType() {
      return this.inspection.damageRecords[this.selectedDamageIndex].date === null ? "date" : "text";
    },
  },
};
</script>
