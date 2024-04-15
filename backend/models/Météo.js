class Meteo {
  constructor(id, localisation, température, conditions, prévisions, heureDeLaDernièreMiseÀJour) {
    this.id = id;
    this.localisation = localisation;
    this.température = température;
    this.conditions = conditions;
    this.prévisions = prévisions;
    this.heureDeLaDernièreMiseÀJour = heureDeLaDernièreMiseÀJour;
  }
}
module.exports = Meteo;
