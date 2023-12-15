const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const puppeteer = require('puppeteer');

const generatePdf = async (visitor, url) => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        const templatePath = path.join(__dirname, `../passTemplate/pass.html`);
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const template = hbs.compile(templateContent);
        const html = template({
            name: visitor.visitorName,
            passNo: visitor.passNo,
            advocateName: visitor.advocateName,
            idProofType: visitor.idProofType,
            idProofNo: visitor.idProofNo,
        });
        await page.setContent(html);
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await page.goto(url);
        await browser.close();
        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

module.exports = generatePdf;
