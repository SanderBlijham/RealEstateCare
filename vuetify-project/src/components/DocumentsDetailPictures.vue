<template>
  <v-list>
  <v-list-item-title class="text-h6" v-if="hasNonEmptySubarray(this.inspection.damageRecords)">
    Schade
  </v-list-item-title>
  <v-list-item-title v-else></v-list-item-title>
  <v-row class="mb-5" v-for="damage in inspection.damageRecords" :key="damage.id">
    <v-col
      v-for="(item, subindex) in damage.imagesNew"
      :key="subindex"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img v-if="damage.used === true" :src="item" aspect-ratio="1" cover class="bg-grey-lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

  <v-list-item-title class="text-h6 mt-5" v-if="hasNonEmptySubarray(this.inspection.overdueMaintenanceRecords)">
    Achterstallig onderhoud
  </v-list-item-title>
  <v-list-item-title v-else></v-list-item-title>
  <v-row
    v-for="damage in inspection.overdueMaintenanceRecords"
    :key="damage.id"
  >
    <v-col
      v-for="(item, subindex) in damage.imagesNew"
      :key="subindex"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img v-if="damage.used === true" :src="item" aspect-ratio="1" cover class="bg-grey-lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

  <v-list-item-title class="text-h6 mt-5" v-if="hasNonEmptySubarray(this.inspection.technicalInstallationInspections)">
    Technische installaties
  </v-list-item-title>
  <v-list-item-title v-else></v-list-item-title>
  <v-row
 
    v-for="damage in inspection.technicalInstallationInspections"
    :key="damage.id"
  >
    <v-col
      v-for="(item, subindex) in damage.imagesNew"
      :key="subindex"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img v-if="damage.used === true" :src="item" aspect-ratio="1" cover class="bg-grey-lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

  <v-list-item-title class="text-h6 mt-5" v-if="hasNonEmptySubarray(this.inspection.identifyModifications)">
    Modificaties
  </v-list-item-title>
  <v-list-item-title v-else></v-list-item-title>
  <v-row v-for="damage in inspection.identifyModifications" :key="damage.id">
    <v-col
      v-for="(item, subindex) in damage.imagesNew"
      :key="subindex"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img v-if="damage.used === true" :src="item" aspect-ratio="1" cover class="bg-grey-lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </v-list>
</template>

<script>
import mixins from "../mixins/mixins";

export default {
  name: "DocumentDetailPictures",
  props: ["inspection"],
  data() {
    return {
      imagePreview: "",
    };
  },
  mixins: [mixins],
  methods: {
    hasNonEmptySubarray(table) {
      for (const array of table) {
        if (array.imagesNew.length > 0 && array.used === true) {
          return true;
        }
      }
      return false;
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
