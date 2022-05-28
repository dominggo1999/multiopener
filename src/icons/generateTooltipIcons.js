const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const SvgFill = require('svg-fill').default;
const path = require('path');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const generateTooltipIcons = async (accent, primary, outputDir, fileName) => {
  // Create new svg  according to color
  const svgFill = new SvgFill(primary);
  fs.createReadStream('src/icons/icon.svg')
    .pipe(svgFill.fillSvgStream())
    .pipe(fs.createWriteStream('src/icons/out.svg'));

  await sleep(100);

  const SIZE = 50;
  const ICON_SIZES = 32;

  const canvas = createCanvas(50, 50);
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.fillStyle = primary;
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = accent;
  ctx.arc(SIZE / 2, SIZE / 2, (SIZE / 2) - 3, 0, Math.PI * 2);
  ctx.fill();

  loadImage('src/icons/out.svg').then((image) => {
    ctx.drawImage(image, SIZE / 2 - ICON_SIZES / 2, SIZE / 2 - ICON_SIZES / 2, ICON_SIZES, ICON_SIZES);

    const out = fs.createWriteStream(`${outputDir}/${fileName}.png`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));
  });
};

const formatColor = (c) => `rgb(${c})`;

const outputDir = path.join(process.cwd(), 'extension/chromium/tooltip-icons');
const themeList = '../theme/themes.mjs';

import(themeList).then((result) => {
  result.themes.forEach(({ name, colors }) => {
    const { accent: rawAccentColor, primary: rawPrimaryColor } = colors;
    const accent = formatColor(rawAccentColor);
    const primary = formatColor(rawPrimaryColor);

    generateTooltipIcons(accent, primary, outputDir, name);
  });
});
