const globby = require('globby');
const pretty = require('pretty');
const fs = require('fs-extra');

for (const file of globby.sync(`dist/**/*.html`)) {
  const content = fs.readFileSync(file, { encoding: 'utf-8' });
  fs.writeFileSync(file, pretty(content));
}
