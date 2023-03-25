<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card class="ma-5 pa-2">
        <v-list>
          <v-list-subheader>Uitgevoerde inspecties</v-list-subheader>

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
          >Inspectieformulier van {{ selectedInspection.user }}</v-card-title
        >
        <v-expansion-panels variant="default">
          <v-expansion-panel
            v-if="selectedInspection.damageRecords[0].used === false"
            :disabled="true"
            class="pa-2"
            ><v-expansion-panel-title
              >Schade</v-expansion-panel-title
            ></v-expansion-panel
          >
          <v-expansion-panel v-else class="pa-2">
            <v-expansion-panel-title>Schade</v-expansion-panel-title>
            <v-expansion-panel-text>
              <damageRecords
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="
              selectedInspection.overdueMaintenanceRecords[0].used === false
            "
            :disabled="true"
            class="pa-2"
          >
            <v-expansion-panel-title
              >Achterstallig onderhoud</v-expansion-panel-title
            ></v-expansion-panel
          >
          <v-expansion-panel v-else class="pa-2">
            <v-expansion-panel-title
              >Achterstallig onderhoud</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <overdueMaintenanceRecords
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="
              selectedInspection.technicalInstallationInspections[0].used ===
              false
            "
            :disabled="true"
            class="pa-2"
          >
            <v-expansion-panel-title
              >Technische installaties inspecteren</v-expansion-panel-title
            ></v-expansion-panel
          >
          <v-expansion-panel v-else class="pa-2">
            <v-expansion-panel-title
              >Technische installaties inspecteren</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <technicalInstallationInspections
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="selectedInspection.identifyModifications[0].used === false"
            :disabled="true"
            class="pa-2"
          >
            <v-expansion-panel-title
              >Modificaties identificeren</v-expansion-panel-title
            ></v-expansion-panel
          >
          <v-expansion-panel v-else class="pa-2">
            <v-expansion-panel-title
              >Modificaties identificeren</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <identifyModifications
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
import damageRecords from "./damageRecords";
import overdueMaintenanceRecords from "./overdueMaintenanceRecords";
import technicalInstallationInspections from "./technicalInstallationInspections";
import identifyModifications from "./identifyModifications";

export default {
  name: "InspectionListCompleted",
  components: {
    damageRecords,
    overdueMaintenanceRecords,
    technicalInstallationInspections,
    identifyModifications,
  },
  data() {
    return {
      selectedInspectionIndex: 0,
    };
  },
  mounted() {
    this.$store.dispatch("fetchInspection");
    console.log(this.inspectionsData);
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