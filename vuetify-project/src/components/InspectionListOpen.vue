<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card class="ma-5 pa-2">
        <v-list>
          <v-list-subheader>Toegewezen inspecties</v-list-subheader>

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
            v-if="selectedInspection.damageRecords"
            :disabled="false"
            class="pa-2"
          >
            <v-expansion-panel-title>
              <v-checkbox-btn
                v-model="selectedInspection.damageRecords[0].used"
                class="pe-2"
                @click="check($event)"
              >
              </v-checkbox-btn
              >Schade</v-expansion-panel-title
            >

            <v-expansion-panel-text>
              <damage-records
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="selectedInspection.overdueMaintenanceRecords"
            :disabled="false"
            class="pa-2"
          >
            <v-expansion-panel-title>
              <v-checkbox-btn
                v-model="selectedInspection.overdueMaintenanceRecords[0].used"
                class="pe-2"
                @click="check($event)"
              >
              </v-checkbox-btn
              >Achterstallig onderhoud</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <overdue-maintenance-records
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            v-if="selectedInspection.technicalInstallationInspections"
            :disabled="false"
            class="pa-2"
          >
            <v-expansion-panel-title>
              <v-checkbox-btn
                v-model="
                  selectedInspection.technicalInstallationInspections[0].used
                "
                class="pe-2"
                @click="check($event)"
              >
              </v-checkbox-btn
              >Technische installaties inspecteren</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <technical-installation-inspections
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel
            class="pa-2"
            v-if="selectedInspection.identifyModifications"
            :disabled="false"
          >
            <v-expansion-panel-title>
              <v-checkbox-btn
                v-model="selectedInspection.identifyModifications[0].used"
                class="pe-2"
                @click="check($event)"
              >
              </v-checkbox-btn
              >Modificaties identificeren</v-expansion-panel-title
            >
            <v-expansion-panel-text>
              <identify-modifications
                v-if="selectedInspection"
                :inspection="selectedInspection"
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <router-link to="completed" class="text-decoration-none">
        <v-btn
          type="submit"
          block
          class="mt-2"
          color="primary"
          prepend-icon="mdi-check-circle"
          v-if="selectedInspection"
          @click="toggleIsCompleted"
          >Opslaan</v-btn
        ></router-link
      >
    </v-col>
  </v-row>
</template>

<script>
import DamageRecords from "./DamageRecords";
import OverdueMaintenanceRecords from "./OverdueMaintenanceRecords";
import TechnicalInstallationInspections from "./TechnicalInstallationInspections";
import IdentifyModifications from "./IdentifyModifications";

export default {
  name: "InspectionList",
  components: {
    DamageRecords,
    OverdueMaintenanceRecords,
    TechnicalInstallationInspections,
    IdentifyModifications,
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
    check: function(e) {
      e.cancelBubble = true;
      console.log('checkbox checked')
    }
    
  },
  computed: {
    selectedInspection() {
      return {
        ...this.inspectionsData[this.selectedInspectionIndex],
      };
    },
    inspectionsData() {
      return this.$store.state.inspectionsData.filter((inspection) => {
        return inspection.completed !== true;
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
