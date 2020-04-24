export default class Equivalencia {
    constructor(id, semUcEquiv, anoUcEquiv, ucEquiv, percent, nota, ects, ucRealizada) {
        this.id = id;
        this.semUcEquiv = semUcEquiv;
        this.anoUcEquiv = anoUcEquiv;
        this.ucRealizada = ucRealizada;
        this.percent = percent;
        this.nota = nota;
        this.ects = ects;
        this.ucRealizada = ucRealizada;
    }

    override() {
        return `ID ${this.id}\n${this.ucRealizada}`;
    }
}