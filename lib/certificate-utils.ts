import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Dimensions from requirements
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 1414;

// Colors
const COLOR_BLACK = rgb(0, 0, 0);

interface CertificateData {
    studentName: string;
    universityName: string;
    verifyCode: string;
}

export async function generateCertificatePDF(data: CertificateData, baseUrl: string): Promise<Uint8Array> {
    const { studentName, universityName, verifyCode } = data;

    // 1. Load the background image
    const templatePath = path.join(process.cwd(), 'public/webImages/Certificate.jpg');
    const templateBytes = fs.readFileSync(templatePath);

    // 2. Create PDF and embed image
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([CANVAS_WIDTH, CANVAS_HEIGHT]);
    const image = await pdfDoc.embedJpg(templateBytes);

    page.drawImage(image, {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    });

    // 3. Embed Font
    // Register fontkit to support custom fonts
    const fontkit = require('fontkit');
    pdfDoc.registerFontkit(fontkit);

    // Load Great Vibes font
    const fontPath = path.join(process.cwd(), 'public/fonts/GreatVibes-Regular.ttf');
    console.log('Attempting to load font from:', fontPath);

    if (!fs.existsSync(fontPath)) {
        console.error('Font file not found at:', fontPath);
        throw new Error(`Font file not found at ${fontPath}`);
    }

    const fontBytes = fs.readFileSync(fontPath);
    console.log('Font bytes read, length:', fontBytes.length);

    let greatVibesFont;
    try {
        greatVibesFont = await pdfDoc.embedFont(fontBytes);
        console.log('Great Vibes font embedded successfully');
    } catch (e) {
        console.error('Error embedding font:', e);
        throw new Error(`Failed to embed Great Vibes font: ${e instanceof Error ? e.message : String(e)}`);
    }

    // Load Playfair Display SemiBold
    const playfairPath = path.join(process.cwd(), 'public/fonts/PlayfairDisplay-SemiBold.ttf');
    let playfairFont;
    if (fs.existsSync(playfairPath)) {
        const playfairBytes = fs.readFileSync(playfairPath);
        playfairFont = await pdfDoc.embedFont(playfairBytes);
    } else {
        // Fallback to Helvetica Bold if not found (or throw error if critical)
        console.warn('Playfair font not found, falling back');
        playfairFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 4. Draw Text
    const drawCenteredText = (text: string, yBase: number, maxWidth: number, fontSize: number, font: any) => {
        let currentFontSize = fontSize;
        let textWidth = font.widthOfTextAtSize(text, currentFontSize);

        // Auto-shrink
        while (textWidth > maxWidth && currentFontSize > 10) {
            currentFontSize -= 1;
            textWidth = font.widthOfTextAtSize(text, currentFontSize);
        }

        const x = (CANVAS_WIDTH - textWidth) / 2; // Center alignment
        // PDF coordinates: origin is bottom-left.
        // Requirement says: "Origin: top-left (0,0), y for text is baseline Y"
        const pdfY = CANVAS_HEIGHT - yBase;

        page.drawText(text, {
            x,
            y: pdfY,
            size: currentFontSize,
            font: font,
            color: COLOR_BLACK,
        });
    };

    // 1) Student Name: baselineY: 770 -> 765 (Moved up 5px). Size: 105. Font: Great Vibes.
    drawCenteredText(studentName, 750, 1400, 105, greatVibesFont);

    // 2) Designation REMOVED

    // 3) University Name: baselineY: 930. Size: 35 -> 53 (approx 50% increase). Font: Playfair Display SemiBold.
    // If universityName is empty or placeholder, we might want to ensure something prints, but basic string check handles it.
    // Label change says "In recognition of..." but that's likely the label for the field, or the text itself?
    // User said: "keep the university field but change its label to In recognition of..."
    // and "change university font to playfair display... increase its size 50% more".
    // This implies the CONTENT of the variable `universityName` is printed here.
    // The placeholder change in preview suggests the user might type "In recognition of..." OR the field concept receives that text.
    // However, usually "In recognition of..." is static text on a certificate.
    // If the user wants the INPUT to receive "In recognition of..." they type it.
    // If the LABEL is "In recognition of...", the user types the university name?
    // Wait, "In recognition of..." usually precedes the Name.
    // But here it replaces University Name field label.
    // Let's stick to printing `universityName` variable content.
    drawCenteredText(universityName || 'In recognition of...', 930, 1300, 53, playfairFont);

    // 5. Generate and Draw QR Code
    // New Requirement: 200x200.
    // Previous logic: Bottom-Right with ~30px padding.
    // Canvas Width: 2000, Height: 1414.
    // X = 2000 - 30 (pad) - 200 (width) = 1770.
    // Y in PDF coords (bottom-up): 
    //   Bottom margin = 30.
    //   Y = 30. 

    const verifyUrl = `${baseUrl}/verify/${verifyCode}`;
    const qrBase64 = await QRCode.toDataURL(verifyUrl, { margin: 0 });
    const qrImageBytes = Buffer.from(qrBase64.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    const qrSize = 200;
    // X = 1770, Y = 30

    page.drawImage(qrImage, {
        x: 1770,
        y: 30,
        width: qrSize,
        height: qrSize,
    });

    // 6. Draw Favicon in Center of QR Code
    // Load favicon
    const faviconPath = path.join(process.cwd(), 'public/webImages/favicon.png');
    if (fs.existsSync(faviconPath)) {
        const faviconBytes = fs.readFileSync(faviconPath);
        const faviconImage = await pdfDoc.embedPng(faviconBytes);

        // QR Center: X = 1770 + 100 = 1870, Y = 30 + 100 = 130
        // Icon Size: 25x25 (Increased slightly for visibility without background)
        const iconSize = 60;
        const iconX = 1870 - (iconSize / 2);
        const iconY = 130 - (iconSize / 2);

        page.drawImage(faviconImage, {
            x: iconX,
            y: iconY,
            width: iconSize,
            height: iconSize,
        });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
