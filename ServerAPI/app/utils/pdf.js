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

const formatEquiv = (equiv) => {
    let ol = [];
    equiv.forEach(e => {
        ol.push(`${e.ucEquiv}, com ${e.nota} valores, por equivalência a ${e.ucRealizada};`)
    });
    return ol;
};


module.exports.makePdf = (student, courses) => {

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
                lineHeight: 3,
                text:' '
            },
            `Analisado o requerimento do aluno ${student.nomeAluno}, ${student.idAluno}, para concessão de equivalências, sou de parecer que lhe sejam concedidas as seguintes equivalências: `,
            {
                lineHeight: 3,
                text:' '
            },
            {
                ol: orderContent
            }
        ]
    };

    const options = { };

    const pdfDoc = printer.createPdfKitDocument(document, options);
    pdfDoc.pipe(fs.createWriteStream(`${student.idAluno}.pdf`));
    pdfDoc.end();

};