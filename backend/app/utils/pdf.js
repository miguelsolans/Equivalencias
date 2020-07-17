/**
 * TESTING PURPOSES ONLY
 * Generate PDF utils
 */

"use strict";

const fs          = require('fs');
const pdfMake     = require('pdfmake');

module.exports = class Pdf {
    constructor(student, author, filename) {
        this.author = author;
        this.student = student;
        this.filename = filename;
        this.printer = new pdfMake(this.getFonts());
    }

    /**
     * Output PDF
     * @returns {*|number}
     */
    makePdf() {
        let path = `app/files/${this.student._id}/${this.filename}.pdf`;

        console.log("Building...");
        let document = this.getDocument();

        console.log(document);

        const pdfDoc = this.printer.createPdfKitDocument(document, { /* ... */ });

        pdfDoc.pipe(fs.createWriteStream(path));

        return pdfDoc.end();
    }

    /**
     * Get Document Table
     * @param data
     * @param columns
     * @returns {*}
     */
    getTable(data, columns) {
        let body = columns;

        data.forEach( e => body.push([{
            text: e.ucRealizada,
        }, {
            text: e.ects,
            alignment: 'center'
        }, {
            text: e.nota,
            alignment: 'center'
        }, {
            text: e.ucEquiv,
        }, {
            text: e.ects,
            alignment: 'center'

        }, {
            text: e.nota,
            alignment: 'center'
        }]));

        return body;
    }

    /**
     * Returns Month String given a date
     * @param date
     * @returns {string}
     */
    getMonth(date) {
        const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

        return monthNames[ date.getMonth() ];
    }

    /**
     * Get Document Fonts
     * @returns {{Roboto: {normal: string, italics: string, bold: string, bolditalics: string}}}
     */
    getFonts() {
        return {
            Roboto: {
                normal: 'app/fonts/NewsGotT.ttf',
                bold: 'app/fonts/NewsGotT-Bold.ttf',
                italics: 'app/fonts/Arial-Italic.ttf',
                bolditalics: 'app/fonts/Arial-Bold-Italic.ttf'
            }
        }
    }

    getFilename() {
        return this.filename;
    }

    getDocument() {
        let todayDate = new Date();

        return {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            // Left, Top, Right, Bottom
            pageMargins: [ 70, 50, 70, 40 ],
            content: [
                {
                    columns: [
                        { width: 100, image: 'app/public/images/EEUMLOGO.png', alignment: 'center' },
                        { width: 30, text: "" },
                        //{ width: '*', text: "Proposta de Creditação de Formação\n \nLicenciatura/Mestrado/Doutoramento em XXX", style: 'header' }
                        { width: '*', text:`Proposta de Creditação de Formação\n \n${process.env.COURSE_DEGREE} em ${process.env.COURSE_NAME}`, style: 'header'}
                    ],
                    style: 'header'
                },
                {
                    style: 'headerTable',
                    table: {
                        widths: [120, '*'],
                        body: [
                            // [{text: "Ano Letivo", bold: true}, {text: this.student.anoUcEquiv, bold: false}],
                            [{text: "Processo", bold: true}, {text: this.student.processo, bold: false}],
                            [{text: "Estudante", bold: true}, {text: this.student.nomeAluno, bold: false}],
                            [{text: "Instituição (Origem)", bold: true}, {text: this.student.instProv, bold: false}],
                            [{text: "Curso (Origem", bold: true}, {text: this.student.cursoProv, bold: false}]
                        ],
                    },
                    layout: {
                        hLineColor: i => i === 1 ? 'white' : '#fff',
                        vLineColor: i => i === 1 ? 'white' : '#fff'
                    }
                },
                {
                    style: 'body',
                    text: "Apresenta-se, na tabela seguinte, o conjunto de Unidades Curriculares a que é proposta a creditação: "
                },
                {
                    style: "tableEquiv",
                    table: {
                        headerRows: 2,
                        widths: ['*', 25, 25, '*', 25, 25],
                        body: this.getTable(this.student.equivalencias, [
                            [{text: 'UC do Curso de Origem', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {}, {text: 'UC da(o) Licenciatura/Mestrado/Doutoramento em XX', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {}, {}],
                            [
                                {text: 'Designação', style: 'tableHeader', alignment: 'center'},
                                {text: 'ECTs', style: 'tableHeader', alignment: 'center'},
                                {text: 'Nota', style: 'tableHeader', alignment: 'center'},

                                {text: 'Designação', style: 'tableHeader', alignment: 'center'},
                                {text: 'ECTs', style: 'tableHeader', alignment: 'center'},
                                {text: 'Nota', style: 'tableHeader', alignment: 'center'}
                            ]]
                        ),
                    },
                },
                {
                    style: 'body',
                    text: `Universidade do Minho, ${todayDate.getDate()} de ${this.getMonth(todayDate)} de ${todayDate.getFullYear()}
                \nA(O) Diretor(a) de Curso da(o) Licenciatura/Mestrado/Doutoramento em XXX`
                },
                {
                    style: 'signature',
                    text: 'Assinatura'
                }
            ],
            styles: {
                header: {
                    bold: true,
                    italic: false,
                    fontSize: 12,
                    alignment: "center",
                    margin: 30
                },
                body: {
                    bold: false,
                    italic: false,
                    fontSize: 10,
                    margin: 30,
                    alignment: "left"
                },
                tableEquiv: {
                    fontSize: 10
                },
                footer: {
                    bold: false,
                    italic: false,
                    fontSize: 10,
                    margin: 30
                },
                subjects: {
                    margin: [ 5, 20, 10, 20 ]
                },
                headerTable: {
                    fillColor: "#f2f2f2",
                    color: "#000",
                    fontSize: 10
                },
                tableHeader: {
                    color: '#000',
                    bold: true
                },
                signature: {
                    color: '#7F7F7F',
                    margin: 10
                }
            },
        };
    }
}