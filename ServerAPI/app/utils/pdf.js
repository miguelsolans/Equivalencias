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


const formatEquiv = (equiv) => {
    let ol = [];
    equiv.forEach(e => {
        ol.push(`${e.ucEquiv}, com ${e.nota} valores, por equivalência a ${e.ucRealizada};`)
    });
    return ol;
};

/**
 * Returns Month String given a date
 * @param date
 * @returns {string}
 */
const month = (date) => {
    let monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

    return monthNames[ date.getMonth() ];
};


/**
 *
 * @param student information with the same field names as in Data Model
 * @returns true if created, false otherwise
 */
module.exports.makePdf = (student, author) => {
    let todayDate = new Date();

    let path = `app/files/${student.idAluno}.pdf`;

    let orderContent = formatEquiv(student.equivalencias);

    const document = {
        content: [
            {
                image: 'app/public/images/EEUMLOGO.png',
                width: 110,
                height: 102,
                alignment: "center"
            },
            {
                text: "Proposta de Creditação de Formação",
                style: "header"
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
                    /*body: [
                        [{ text: "UC do Curso de Origem"}, {text: "UC da(o) Licenciatura/Mestrado/Doutoramento em XX"}],
                        // designação, ECTs, Nota

                    ],*/
                    body: [
                        [{text: 'UC do Curso de Origem', style: 'tableHeader', colSpan: 3, alignment: 'center'}, {},{}, {}, {text: 'UC da(o) Licenciatura/Mestrado/Doutoramento em XX', style: 'tableHeader', colSpan: 3, alignment: 'center'}],
                        [
                            {text: 'Designação', style: 'tableHeader', alignment: 'center'},
                            {text: 'ECTs', style: 'tableHeader', alignment: 'center'},
                            {text: 'Nota', style: 'tableHeader', alignment: 'center'},
                            {text: 'Designação', style: 'tableHeader', alignment: 'center'},
                            {text: 'ECTs', style: 'tableHeader', alignment: 'center'},
                            {text: 'Nota', style: 'tableHeader', alignment: 'center'}
                        ],
                        // ['Sample value 1', 'Sample value 2', 'Sample value NOTA'],
                        // [{rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor'}, 'Sample value 2', 'Sample value 3'],
                        // ['', 'Sample value 2', 'Sample value 3'],
                        // ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                        // ['Sample value 1', {colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time'}, ''],
                        // ['Sample value 1', '', ''],
                    ]
                }
            },
            {
                style: 'footer',
                text: `Universidade do Minho, DD de MM de ${todayDate.getFullYear()}`
            }



            // {
            //     style: 'body',
            //     text: `Analisado o requerimento do aluno ${student.nomeAluno}, ${student.idAluno}, para concessão de equivalências, sou de parecer que lhe sejam concedidas as seguintes equivalências: `
            // },
            // {
            //     ol: orderContent,
            //     style: "subjects"
            // },
            // {
            //     text: `Gerado por ${author.fullName} (${author.email}) em `
            // }
        ],
        styles: {
            header: {
                bold: true,
                italic: false,
                fontSize: 13,
                alignment: "center",
                margin: [ 5, 50, 10, 50 ]

            },
            body: {
                bold: false,
                italic: false,
                fontSize: 12
            },
            subjects: {
                margin: [ 5, 20, 10, 20 ]
            },
            headerTable: {
                // margin: [0, 5, 0, 15],
                fillColor: "#f2f2f2",
                color: "#000"
            },
            tableHeader: {
                color: '#000',
                bold: true
            }
        },
    };

    const pdfDoc = printer.createPdfKitDocument(document, { /* ... */ });

    pdfDoc.pipe(fs.createWriteStream(path));

    return pdfDoc.end();
};