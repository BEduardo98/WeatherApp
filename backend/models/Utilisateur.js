class Utilisateur {
  constructor(id, nom, email, mot_de_passe, localisationPréférée, préférences) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.mot_de_passe = mot_de_passe;
    this.localisationPréférée = localisationPréférée;
    this.préférences = préférences && typeof préférences === "string" ? JSON.parse(préférences) : préférences; //Stocker préf en json
  }
}
module.exports = Utilisateur;
