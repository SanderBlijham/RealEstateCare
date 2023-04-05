// store/index.js
import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";
import EventService from "@/services/EventService";
import inspectionsDatamodel from "@/models/inspectionsData";

export default createStore({
  state: {
    inspectionsData: [],
    errors: [],
    username: ''
  },
  mutations: {
    SET_INSPECTIONS(state, payload) {
      state.inspectionsData = payload;
    },
    ADD_ERROR(state, payload) {
      state.errors = [...state.errors, payload];
    },
    addImage(state, { inspectionIndex, table, index, data }) {
      state.inspectionsData[inspectionIndex][table][index].imagesNew.push(data);
    },
    deleteImage(
      state,
      { inspectionIndex, table, index, indexNewImages }
    ) {
      state.inspectionsData[inspectionIndex][table][
        index
      ].imagesNew.splice(indexNewImages, 1);
    },
    addPDF(state, { inspectionIndex, table, index, name, url }) {
      state.inspectionsData[inspectionIndex][table][index].pdfsNew.push({name, url});
    },
    deletePDF(state, { inspectionIndex, table, index, indexNewPDF }) {
      state.inspectionsData[inspectionIndex][table][index].pdfsNew.splice(indexNewPDF, 1);
    },
    username (state,name) {
      state.username = name;
    }
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
    update_user_name(store,name)
    {
      store.commit('username',name);
    }  
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
