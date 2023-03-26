// store/index.js
import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
import EventService from "@/services/EventService";
import inspectionsDatamodel from "@/models/inspectionsData";

export default createStore({
  state: {
    inspectionsData: [],
    errors: [],
  },
  mutations: {
    SET_INSPECTIONS(state, payload) {
      state.inspectionsData = payload;
    },
    ADD_ERROR(state, payload) {
      state.errors = [...state.errors, payload];
    },
    addImageDamage(state, { inspectionIndex, index, data }) {
      state.inspectionsData[inspectionIndex].damageRecords[
        index
      ].imagesNew.push(data);
    },
    addImageMaintenance(state, { inspectionIndex, index, data }) {
      state.inspectionsData[inspectionIndex].overdueMaintenanceRecords[
        index
      ].imagesNew.push(data);
    },
    addImageTechnical(state, { inspectionIndex, index, data }) {
      state.inspectionsData[inspectionIndex].technicalInstallationInspections[
        index
      ].imagesNew.push(data);
    },
    addImageModifications(state, { inspectionIndex, index, data }) {
      state.inspectionsData[inspectionIndex].identifyModifications[
        index
      ].imagesNew.push(data);
    },
    deleteImageDamage(
      state,
      { inspectionIndex, indexDamageRecords, indexNewImages }
    ) {
      state.inspectionsData[inspectionIndex].damageRecords[
        indexDamageRecords
      ].imagesNew.splice(indexNewImages, 1);
    },
    deleteImageMaintenance(
      state,
      { inspectionIndex, indexDamageRecords, indexNewImages }
    ) {
      state.inspectionsData[inspectionIndex].overdueMaintenanceRecords[
        indexDamageRecords
      ].imagesNew.splice(indexNewImages, 1);
    },
    deleteImageTechnical(
      state,
      { inspectionIndex, indexDamageRecords, indexNewImages }
    ) {
      state.inspectionsData[inspectionIndex].technicalInstallationInspections[
        indexDamageRecords
      ].imagesNew.splice(indexNewImages, 1);
    },
    deleteImageModifications(
      state,
      { inspectionIndex, indexDamageRecords, indexNewImages }
    ) {
      state.inspectionsData[inspectionIndex].identifyModifications[
        indexDamageRecords
      ].imagesNew.splice(indexNewImages, 1);
    },
  },
  actions: {
    fetchInspection(context) {
      EventService.getPage("/inspections")
        .then((response) => {
          response.data.inspections.sort((a, b) => {
            if (a.dateAssignment < b.dateAssignment) return 1;
            if (a.dateAssignment > b.dateAssignment) return -1;
            return 0;
          });
          const data = response.data.inspections;
          const datamodel = data.map((data) => new inspectionsDatamodel(data));
          context.commit("SET_INSPECTIONS", datamodel);
        })
        .catch((error) => {
          context.commit("ADD_ERROR", error);
          context.commit("SET_INSPECTIONS", []);
        });
    },
  },
  getters: {
    getIndexById: (state) => (id) => {
      const index = state.inspectionsData.findIndex(
        (inspection) => inspection.id === id
      );
      return index;
    },
  },
  plugins: [createPersistedState()],
});
