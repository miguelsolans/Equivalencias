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
 *
 * @param student information with the same field names as in Data Model
 * @returns true if created, false otherwise
 */
module.exports.makePdf = (student) => {
    let path = `app/files/${student.idAluno}.pdf`;

    let orderContent = formatEquiv(student.equivalencias);
    const document = {
        // margin: [left, top, right, bottom]
        content: [
            {
                image: 'app/public/images/EEUMLOGO.png',
                width: 110,
                height: 102,
                alignment: "center"
            },
            {
                text: "Concessão de Equivalencias",
                style: "header"
            },
            {
                style: 'body',
                text: `Analisado o requerimento do aluno ${student.nomeAluno}, ${student.idAluno}, para concessão de equivalências, sou de parecer que lhe sejam concedidas as seguintes equivalências: `
            },
            {
                ol: orderContent,
                style: "subjects"
            }
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

            }
        },
    };

    const pdfDoc = printer.createPdfKitDocument(document, { /* ... */ });

    pdfDoc.pipe(fs.createWriteStream(path));

    return pdfDoc.end();
};