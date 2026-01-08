const { PDFDocument, rgb } = require('pdf-lib');
const fontkit = require('fontkit');
const fs = require('fs');
const path = require('path');

async function test() {
    try {
        console.log('Starting font test...');
        const doc = await PDFDocument.create();
        doc.registerFontkit(fontkit);

        const fontPath = path.join(__dirname, 'public', 'fonts', 'GreatVibes-Regular.ttf');
        console.log('Reading font from:', fontPath);

        if (!fs.existsSync(fontPath)) {
            console.error('File does not exist!');
            return;
        }

        const fontBytes = fs.readFileSync(fontPath);
        console.log('Font bytes:', fontBytes.length);

        const customFont = await doc.embedFont(fontBytes);
        console.log('Font embedded successfully');

        const page = doc.addPage();
        page.drawText('Testing Great Vibes', {
            x: 50,
            y: 350,
            size: 50,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await doc.save();
        fs.writeFileSync('test-output.pdf', pdfBytes);
        console.log('PDF saved to test-output.pdf');

    } catch (e) {
        console.error('Error:', e);
    }
}

test();
