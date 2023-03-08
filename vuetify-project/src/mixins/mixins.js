export default {
    methods: {
        getPDFMods(id, pdf) {
          return "../src/assets/modifications/" + id + "/" + pdf;
        },
        getPDFTests(id, pdf) {
          return "../src/assets/testProcedures/" + id + "/" + pdf;
        },
        getNewDamageUrl(inspectionID, recordDamageID, id, img) {
          return ("../src/assets/pictures/newDamage/" +
          inspectionID +
            "/" +
            recordDamageID +
            "/" +
            id +
            "/" +
            img +
            ".jpg");
        },
        getOverdueUrl(inspectionID, overdueID, id, img) {
          return ("../src/assets/pictures/overdue/" +
          inspectionID +
            "/" +
            overdueID +
            "/" +
            id +
            "/" +
            img +
            ".jpg");
        },
        getTechnicalUrl(inspectionID, technicalID, id, img) {
          return ("../src/assets/pictures/technical/" +
          inspectionID +
            "/" +
            technicalID +
            "/" +
            id +
            "/" +
            img +
            ".jpg");
        },
        getModificationUrl(inspectionID, modificationID, id, img) {
          return ("../src/assets/pictures/modification/" +
          inspectionID +
            "/" +
            modificationID +
            "/" +
            id +
            "/" +
            img +
            ".jpg");
        },
      },
}