/**
 * TESTING PURPOSES ONLY
 * Generate PDF utils
 */

"use strict";

const fs      = require('fs');
const pdf     = require('pdfmake');

const fonts = {
    Roboto: {
        normal: 'app/fonts/NewsGotT.ttf',
        bold: 'app/fonts/NewsGotT-Bold.ttf',
        italics: 'app/fonts/Arial-Italic.ttf',
        bolditalics: 'app/fonts/Arial-Bold-Italic.ttf'
    }
};
const printer = new pdf(fonts);

const buildTable = (data, columns) => {
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
        text: e.semUcEquiv,
    }, {
        text: e.ects,
        alignment: 'center'

    }, {
        text: e.nota,
        alignment: 'center'
    }]));

    return body;
};


/**
 * Returns Month String given a date
 * @param date
 * @returns {string}
 */
const month = (date) => {
    let monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    return monthNames[ date.getMonth() ];
};


/**
 * Generates data output PDF
 * @param student information with the same field names as in Data Model
 * @returns true if created, false otherwise
 */
    module.exports.makePdf = (student, author, filename) => {
    let todayDate = new Date();

    let path = `app/files/${student.processo}/${filename}.pdf`;

    const document = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        // Left, Top, Right, Bottom
        pageMargins: [ 70, 50, 70, 40 ],
        content: [
            {
                columns: [
                    { width: 100, image: 'app/public/images/EEUMLOGO.png', alignment: 'center' },
                    { width: 30, text: "" },
                    { width: '*', text: "Proposta de Creditação de Formação\n \nLicenciatura/Mestrado/Doutoramento em XXX", style: 'header' }
                ],
                style: 'header'
            },
            {
                style: 'headerTable',
                table: {
                    widths: [120, '*'],
                    body: [
                        [{text: "Ano Letivo", bold: true}, {text: "student.anoUcEquiv", bold: false}],
                        [{text: "Processo", bold: true}, {text: student.processo, bold: false}],
                        [{text: "Estudante", bold: true}, {text: student.nomeAluno, bold: false}],
                        [{text: "Instituição (Origem)", bold: true}, {text: student.instProv, bold: false}],
                        [{text: "Curso (Origem", bold: true}, {text: student.cursoProv, bold: false}]
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
                    body: buildTable(student.equivalencias, [
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
                text: `Universidade do Minho, ${todayDate.getDate()} de ${month(todayDate)} de ${todayDate.getFullYear()}
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

    const pdfDoc = printer.createPdfKitDocument(document, { /* ... */ });

    pdfDoc.pipe(fs.createWriteStream(path));

    return pdfDoc.end();
};