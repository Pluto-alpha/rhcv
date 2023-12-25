const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const puppeteer = require('puppeteer');
const moment = require('moment');

const generatePdf = async (visitor, passMaker) => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        const templatePath = path.join(__dirname, `../passTemplate/pass.html`);
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const template = hbs.compile(templateContent);
        const validOn = moment(visitor.validOn).format("DD MMM YYYY, hh:mm A");
        const validUpTo = moment(visitor.validUpTo).format("DD MMM YYYY");
        const time = moment(visitor.validUpTo).format("hh:mm A");
        const html = template({
            name: visitor.visitorName,
            passNo: visitor.passNo,
            advocateName: visitor.advocateName,
            fatherName: visitor.fatherName,
            address: visitor.address,
            idProofType: visitor.idProofType,
            idProofNo: visitor.idProofNo,
            validOn: validOn,
            validUpTo: validUpTo,
            time:time,
            passCreater:passMaker,
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
