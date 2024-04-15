class Preferences {
  constructor(id, utilisateurId, localisationPréférée, unitéDeMesure, notifications) {
    this.id = id;
    this.utilisateurId = utilisateurId;
    this.localisationPréférée = localisationPréférée;
    this.unitéDeMesure = unitéDeMesure;
    this.notifications = notifications;
  }
}
module.exports = Preferences;
