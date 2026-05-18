const fs = require('fs');
const path = require('path');

const xmlPath = path.join(__dirname, '..', 'temp_doc', 'word', 'document.xml');
if (!fs.existsSync(xmlPath)) {
    console.error('File not found:', xmlPath);
    process.exit(1);
}

const xmlContent = fs.readFileSync(xmlPath, 'utf8');

// Simple regex to extract text between <w:t> tags
const textMatches = xmlContent.match(/<w:t[^>]*>(.*?)<\/w:t>/g);

if (textMatches) {
    const cleanText = textMatches.map(m => m.replace(/<w:t[^>]*>|<\/w:t>/g, '')).join(' ');
    fs.writeFileSync(path.join(__dirname, '..', 'extracted_text.txt'), cleanText);
    console.log('Extracted text saved to extracted_text.txt');
    // Also print first 1000 chars
    console.log('Preview:', cleanText.substring(0, 1000));
} else {
    console.log('No text found');
}
