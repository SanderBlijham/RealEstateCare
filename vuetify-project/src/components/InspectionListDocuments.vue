<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card class="ma-5 pa-2">
        <v-list>
          <v-list-subheader>Kennisbank</v-list-subheader>

          <v-list-item
            @click="selectInspection(index)"
            v-for="(inspection, index) in inspectionsData"
            :key="inspection.id"
            active-color="primary"
            rounded="shaped"
          >
            <template v-slot:prepend>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </template>

            <v-list-item-title>
              {{ inspection.id }} - {{ inspection.user.toUpperCase() }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ formatDate(inspection.dateAssignment) }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8">
      <v-card class="ma-5">
        <v-card-title
          >Documenten van {{ selectedInspection.user }}</v-card-title
        >
        <v-expansion-panels variant="default">
          <v-expansion-panel class="pa-2">
            <v-expansion-panel-title>Foto's</v-expansion-panel-title>
            <v-expansion-panel-text>
              <DocumentDetailPictures
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel class="pa-2">
            <v-expansion-panel-title>Bestanden</v-expansion-panel-title>
            <v-expansion-panel-text>
              <DocumentDetailPDF
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DocumentDetailPictures from "./DocumentsDetailPictures";
import DocumentDetailPDF from "./DocumentsDetailPDFs";

export default {
  name: "InspectionListDocuments",
  components: {
    DocumentDetailPictures,
    DocumentDetailPDF,
  },
  data() {
    return {
      selectedInspectionIndex: 0,
    };
  },
  methods: {
    selectInspection(index) {
      this.selectedInspectionIndex = index;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("nl-NL", options);
    },
    toggleIsCompleted() {
      this.inspectionsData[this.selectedInspectionIndex].completed =
        !this.inspectionsData[this.selectedInspectionIndex].completed;
    },
  },
  computed: {
    selectedInspection() {
      return {
        ...this.inspectionsData[this.selectedInspectionIndex],
      };
    },
    inspectionsData() {
      return this.$store.state.inspectionsData.filter((inspection) => {
        return inspection.completed === true;
      });
    },
    error() {
      return this.$store.state.errors.length > 0;
    },
    errorList() {
      return this.$store.state.errors;
    },
  },
};
</script>
