class Notification {
  constructor(id, utilisateurId, message, estLue) {
    this.id = id;
    this.utilisateurId = utilisateurId;
    this.message = message;
    this.estLue = estLue;
  }
}
module.exports = Notification;
