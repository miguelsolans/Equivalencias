export default class Equivalencia {
    /**
     * New Equivalence
     * @param semUcEquiv: SEMESTRE DE CONCLUSÃO DA UC EQUIVALENTE
     * @param ucEquiv: NOME DA UC EQUIVALENTE
     * @param anoLetivo
     * @param percent: PERCENTAGEM
     * @param nota: NOTA DE 0..20 DA UC EQUIVALENTE
     * @param ects: NUMERO DE CRÉDITOS DA UC EQUIVALENTE REALIZADA
     * @param ucRealizada: NOME DA UC REALIZADA
     */
    constructor(semUcEquiv, ucEquiv, anoLetivo, percent, nota, ects, ucRealizada) {
        this.semUcEquiv = semUcEquiv;
        // this.anoUcEquiv = anoUcEquiv;
        this.ucEquiv = ucEquiv;
        this.anoLetivo = anoLetivo;
        this.percent = percent;
        this.nota = nota;
        this.ects = ects;
        this.ucRealizada = ucRealizada;
    }

    schoolYearValidation() {
        let regEx = /^\d{4}\/\d{4}$/;

        if(this.anoLetivo.match(regEx) !== null) {
            let years = this.anoLetivo.split('/');

            return (parseInt(years[0]) + 1 === parseInt(years[1]));
        }

        return false;
    }
}