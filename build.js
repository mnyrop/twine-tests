const { exec }  = require('child_process');
const fs        = require('fs');
const glob      = require('glob');
var path        = require('path');

const format    = 'sugarcube/2.37.3';
const files     = glob.sync("src/stories/**/*.twee");
const indexHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Story Index</title>
  </head>
  <body>
    <h1>Index</h1>
    <ul>
      ${files.map(file => {
        const target = file.replace("src/stories/", "").replace(".twee", ".html");
        return `<li><a href="${target}">${target}</a></li>`;
      }).join('\n      ')}
    </ul>
  </body>
  </html>
`;


console.log(`Building stories with ${format}...\n`);
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", indexHtml); 

for (const file of files) {
  const target = file.replace("src/stories/", "dist/").replace(".twee", ".html");
  const dir    = path.dirname(target);
  
  fs.mkdirSync(dir, { recursive: true });   
  exec(`extwee -c -i ${file} -s 'lib/story-formats/${format}/format.js' -o ${target}`);
  console.log(`Built ${target}`);
}

console.log('\nBuild complete! ✅');