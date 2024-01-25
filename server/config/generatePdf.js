const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const puppeteer = require('puppeteer');
const moment = require('moment');
const bwipjs = require('bwip-js');


const generatePdf = async (visitor, passMaker) => {
    try {
        const browser = await puppeteer.launch({ headless: 'new', ignoreHTTPSErrors: true, });
        const page = await browser.newPage();
        page.on('console', (message) => console.log('PAGE LOG:', message.text()));
        let templatePath;
        let passType;
        let additionalValues = {};
        let validOn, validUpTo, time;
        if (visitor.type === 'Case-Hearing') {
            templatePath = path.join(__dirname, '../passTemplate/pass.html');
            passType = 'Case Hearing';
            additionalValues = {
                advocateName: visitor.caseInfo[0].law1,
                croom: visitor.caseInfo[0].croom,
                caseType: visitor.caseInfo[0].casetype,
                caseYear: visitor.caseInfo[0].yr,
                caseNo: visitor.caseInfo[0].case_no,
                party1: visitor.caseInfo[0].pet,
                party2: visitor.caseInfo[0].res,
                itemNo: visitor.caseInfo[0].no,
            };
        } else if (['General-Visitor', 'Contractor', 'Vendor', 'Guest'].includes(visitor.type)) {
            templatePath = path.join(__dirname, '../passTemplate/pass2.html');
            passType = visitor.type;
            additionalValues = {};
        }

        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const template = hbs.compile(templateContent);
        // Generate vertical line barcode for passNo
        const barcodeBuffer = await bwipjs.toBuffer({
            bcid: 'code128',       // Barcode type
            text: visitor.passNo.toString(),  // PassNo as barcode content
            scale: 3,              // Scaling factor
            height: 40,            // Barcode height
            rotate: 'v',           // Rotate barcode vertically
        });

        validOn = moment(visitor.validOn).format("DD MMM YYYY, hh:mm A");
        validUpTo = moment(visitor.validUpTo).format("DD MMM YYYY");
        time = moment(visitor.validUpTo).format("hh:mm A");
        console.log("Image:", visitor.image)
        const html = template({
            passType,
            validOn,
            validUpTo,
            time,
            name: visitor.visitorName,
            image: visitor.image,
            passNo: visitor.passNo,
            fatherName: visitor.fatherName,
            address: visitor.address,
            idProofType: visitor.idProofType,
            idProofNo: visitor.idProofNo,
            passCreater: passMaker,
            ...additionalValues,
            barcode: `data:image/png;base64,${barcodeBuffer.toString('base64')}`,
        });
        await page.setContent(html);
        const pdfBuffer = await page.pdf({
            margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' },
            format: 'A4',
            printBackground: true
        });
        return pdfBuffer;

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

module.exports = generatePdf;
