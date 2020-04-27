export default class Equivalencia {
    /**
     * New Equivalence
     * @param id: ID
     * @param semUcEquiv: SEMESTRE DE CONCLUSÃO DA UC EQUIVALENTE
     * @param anoUcEquiv: ANO DE CONCLUSÃO DA UC EQUIVALENTE
     * @param ucEquiv: NOME DA UC EQUIVALENTE
     * @param percent: PERCENTAGEM
     * @param nota: NOTA DE 0..20 DA UC EQUIVALENTE
     * @param ects: NUMERO DE CRÉDITOS DA UC EQUIVALENTE REALIZADA
     * @param ucRealizada: NOME DA UC REALIZADA
     */
    constructor(semUcEquiv, anoUcEquiv, ucEquiv, percent, nota, ects, ucRealizada) {
        this.semUcEquiv = semUcEquiv;
        this.anoUcEquiv = anoUcEquiv;
        this.ucRealizada = ucRealizada;
        this.percent = percent;
        this.nota = nota;
        this.ects = ects;
        this.ucRealizada = ucRealizada;
    }

    /**
     * Override Object Properties
     * @returns {string}
     */
    override() {
        return `ID ${this.id}\n${this.ucRealizada}`;
    }
}