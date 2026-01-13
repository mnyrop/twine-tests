const { exec }  = require('child_process');
const fs        = require('fs');
const glob      = require('glob');
var path        = require('path');

const format = 'harlowe/3.3.9';
const files  = glob.sync("src/stories/**/*.twee");

console.log(`Building stories with ${format}...\n`);
fs.rmSync("dist", { recursive: true, force: true });

for (const file of files) {
  const target = file.replace("src/stories/", "dist/").replace(".twee", ".html");
  const dir    = path.dirname(target);
  
  fs.mkdirSync(dir, { recursive: true });   
  exec(`extwee -c -i ${file} -s 'lib/story-formats/${format}/format.js' -o ${target}`);
  console.log(`Built ${target}`);
}

console.log('\nBuild complete! ✅');