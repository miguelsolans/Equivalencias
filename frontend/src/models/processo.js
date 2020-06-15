export default class Processo {
    constructor(processo, idAluno, nomeAluno, instProv, cursoProv) {
        this.processo = processo;
        this.idAluno = idAluno;
        this.nomeAluno = nomeAluno;
        this.instProv = instProv;
        this.cursoProv = cursoProv;
    }

    override() {
        return `ID: ${this.processo}\nAlunoId: ${this.idAluno}\nNome: ${this.nomeAluno}\nInstitProv: ${this.instProv}\nCurso: ${this.cursoProv}`;
    }
}