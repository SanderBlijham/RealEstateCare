
export default class inspectionsDatamodel {
  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.dateAssignment = data.dateAssignment;
    this.completed = data.completed;
    this.damageRecords = data.damageRecords;
    this.overdueMaintenanceRecords = data.overdueMaintenanceRecords;
    this.technicalInstallationInspections = data.technicalInstallationInspections;
    this.identifyModifications = data.identifyModifications;
  }
}
 
  