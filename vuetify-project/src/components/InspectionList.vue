<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card class="ma-5 pa-2">
        <v-list>
          <v-list-subheader>Uitgevoerde inspecties</v-list-subheader>

          <v-list-item
            @click="selectInspection(index)"
            v-for="(inspection, index) in inspectionsData.inspection"
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
              {{ formatDate(inspection.date) }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-card class="ma-5 pa-2">
        <InspectionDetail
          v-if="selectedInspection"
          :inspection="selectedInspection"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EventService from "@/services/EventService";
import InspectionDetail from "./InspectionDetail";

export default {
  name: "InspectionList",
  components: { InspectionDetail },
  data() {
    return {
      inspectionsData: { inspection: [] },
      selectedInspectionIndex: 0,
    };
  },
  created() {
    EventService.getPage("/inspection")
      .then((response) => {
        response.data.inspection.sort((a, b) => {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        });
        this.inspectionsData = response.data
        console.log(this.inspectionsData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    selectInspection(index) {
      this.selectedInspectionIndex = index;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('nl-NL', options);
    }
  },
  computed: {
    selectedInspection() {
      return {
        ...this.inspectionsData.inspection[this.selectedInspectionIndex],
      };
    },
  },
};
</script>
