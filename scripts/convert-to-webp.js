
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../public/images');

async function convertImages() {
    if (!fs.existsSync(imagesDir)) {
        console.error(`Directory not found: ${imagesDir}`);
        return;
    }

    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const inputPath = path.join(imagesDir, file);
            const fileName = path.parse(file).name;
            const outputPath = path.join(imagesDir, `${fileName}.webp`);

            try {
                await sharp(inputPath)
                    .webp({ quality: 80 }) // 80% quality is usually a great balance
                    .toFile(outputPath);
                console.log(`Converted: ${file} -> ${fileName}.webp`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error);
            }
        }
    }
}

convertImages();
