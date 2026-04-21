const fs = require('fs');

const file = 'd:/Ewaste2/Mini-Project/frontend-integrated/src/pages/DetailsPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The file has CRLF or LF, let's just make it LF
content = content.replace(/\r\n/g, '\n');
let lines = content.split('\n');

// The lines we want to remove are 760 to 774 and 861 to 966
// Since we are removing by index, doing it from the bottom up ensures index doesn't shift
let block2Start = 861 - 1; // 0-based
let block2End = 966 - 1;

let block1Start = 760 - 1;
let block1End = 774 - 1;

lines.splice(block2Start, block2End - block2Start + 1);
lines.splice(block1Start, block1End - block1Start + 1);

fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Removed successfully.');
