<template>
  <v-row>
    <v-col cols="4">
      <v-card class="ma-5 pa-2">
        <v-list>
          <v-list-subheader>Uitgevoerde inspecties</v-list-subheader>

          <v-list-item
            @click="selectInspection(index)"
            v-for="(inspection, index) in inspectionsData.inspection"
            v-bind:key="inspection.id"
            active-color="primary"
            rounded="shaped"
          >
            <template v-slot:prepend>
              <v-icon>mdi-clipboard-list-outline</v-icon>
            </template>

            <v-list-item-title>
              {{ inspection.id }} - {{ inspection.user.toUpperCase() }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
      <v-col cols="8">
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
import inspectionsData from "../services/inspectionsData";
import InspectionDetail from "./InspectionDetail";

export default {
  name: "InspectionList",
  components: { InspectionDetail },
  data() {
    return {
      inspectionsData,
      selectedInspectionIndex: 0,
    };
  },
  created() {
    console.log(this.inspectionsData);
  },
  methods: {
    selectInspection(index) {
      this.selectedInspectionIndex = index;
    },
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
