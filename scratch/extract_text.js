const fs = require('fs');
const path = 'd:/Demo_1_DATN_5525/temp_doc/word/document.xml';
const content = fs.readFileSync(path, 'utf8');
const regex = /<w:t[^>]*>(.*?)<\/w:t>/g;
let match;
const texts = [];
while ((match = regex.exec(content)) !== null) {
    texts.push(match[1]);
}
fs.writeFileSync('d:/Demo_1_DATN_5525/extracted_text.txt', texts.join(' '));
console.log('Extracted ' + texts.length + ' segments.');
