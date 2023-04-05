<template>
  <v-list>
    <v-list-item-title
      class="text-h6 mb-4"
      v-if="
        hasNonEmptySubarray(this.inspection.technicalInstallationInspections)
      "
    >
      Test procedures:
    </v-list-item-title>
    <v-list-item-title v-else></v-list-item-title>
    <div
      v-for="index in inspection.technicalInstallationInspections"
      :key="index"
    >
      <div v-if="index.used === true">
        <embed
          v-for="(pdf, indexPDF) in index.pdfsNew"
          :key="indexPDF"
          :src="pdf.url"
          type="application/pdf"
          width="100%"
          height="600"
        />
      </div>
    </div>

    <v-list-item-title
      class="text-h6 mb-4 mt-4"
      v-if="hasNonEmptySubarray(this.inspection.identifyModifications)"
    >
      Bestaande en reeds gedane modifictaties:
    </v-list-item-title>
    <v-list-item-title v-else></v-list-item-title>
    <div v-for="index in inspection.identifyModifications" :key="index">
      <div v-if="index.used === true">
        <embed
          v-for="(pdf, indexPDF) in index.pdfsNew"
          :key="indexPDF"
          :src="pdf.url"
          type="application/pdf"
          width="100%"
          height="600"
        />
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "DocumentDetailPDF",
  props: ["inspection"],
  data() {
    return {};
  },
  methods: {
    hasNonEmptySubarray(table) {
      for (const array of table) {
        if (array.pdfsNew.length > 0 && array.used === true) {
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
  mounted() {
    console.log(this.inspection.identifyModifications[0].pdfsNew[0]);
  },
};
</script>

<style scope>
.div {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
