// store/index.js
import { createStore } from "vuex";
import EventService from "@/services/EventService";
import inspectionsDatamodel from "@/models/inspectionsData";


export default createStore({
  state: {
    inspectionsData: [],
    errors: []
  },
  mutations: {
   SET_INSPECTIONS(state, payload) {
    state.inspectionsData = payload
   },
   ADD_ERROR(state, payload) {
    state.errors = [...state.errors, payload]
   }
  },
  actions: {
    fetchInspection(context) {
    EventService.getPage("/inspections")
    .then((response) => {
      response.data.inspections.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
      const data = response.data.inspections
      const datamodel = data.map(data => new inspectionsDatamodel(data));
      context.commit('SET_INSPECTIONS', datamodel)
    })
    .catch((error) => {
        context.commit('ADD_ERROR', error);
        context.commit('SET_INSPECTIONS', [])
    })}
  },
});
