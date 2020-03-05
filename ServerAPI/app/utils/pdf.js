/**
 * TESTING PURPOSES ONLY
 * Generate PDF utils
 */

const pdf = require('pdfmake');

const fonts = {
    Roboto: {
        normal: 'app/fonts/Arial.ttf',
        bold: 'app/fonts/Arial-Bold.ttf',
        italics: 'app/fonts/Arial-Italic.ttf',
        bolditalics: 'app/fonts/Arial-Bold-Italic.ttf'
    }
};
const printer = new pdf(fonts);
const fs = require('fs');


module.exports.makePdf = () => {
    const docDefinition = {
        content: [
            {
                image: 'app/public/images/EEUMLOGO.png',
                width: 110,
                height: 102,
                alignment: "center"
            },
            "Analisado o requerimento do aluno Carlos Miguel Rebelo Solans, 41841, para concessão de equivalências, sou de parecer que lhe sejam concedidas as seguintes equivalências:",

            {
                ol: [
                    "Opção A4 (OpA4)(2019/2020º ano, Desenvolvimento de Aplicações Web 1º sem.), com 10 valores, por equivalência a Multimédia e Desenvolvimento Web;"
                ]
            }
        ]
    };

    const options = {
        // ...
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.end();

};