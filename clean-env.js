const fs = require('fs');
const env = fs.readFileSync('.env');
let content = env.toString('utf16le');
if (content.indexOf('AUTH_SECRET') === -1) {
  content = env.toString('utf8');
}
const lines = content.split(/\r?\n/).filter(line => line.includes('AUTH_SECRET') || line.includes('DATABASE_URL'));
const cleanLines = lines.filter(line => !line.includes('DATABASE_URL')); // Xóa cái cũ bị lỗi
cleanLines.push('DATABASE_URL="file:./dev.db"');
fs.writeFileSync('.env', cleanLines.join('\n'), 'utf8');
console.log('Cleaned .env');
