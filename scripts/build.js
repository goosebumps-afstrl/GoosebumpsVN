import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const assetsRawDir = path.resolve(rootDir, 'assets');
const distAssetsDir = path.resolve(distDir, 'assets');

async function build() {
    console.log('Starting Build Process...');

    // 1. Clean and Create Dist Directory
    await fs.remove(distDir);
    await fs.ensureDir(distDir);

    // 2. Copy Code Files (HTML, JS, CSS, config)
    console.log('Copying Code files...');
    const filesToCopy = ['index.html', 'Gossebumps.html', 'js', 'css', 'scenes'];
    for (const file of filesToCopy) {
        const src = path.resolve(rootDir, file);
        const dest = path.resolve(distDir, file);
        if (await fs.pathExists(src)) {
            await fs.copy(src, dest);
        }
    }

    // 3. Update file extensions in Code (HTML, JS, CSS)
    console.log('Updating extensions in source code...');
    const codeFiles = await glob('**/*.{js,html,css}', { cwd: distDir, absolute: true });
    for (const file of codeFiles) {
        let content = await fs.readFile(file, 'utf-8');
        // Replace .jpg and .png with .webp
        content = content.replace(/\.jpg|\.png/gi, '.webp');
        // Replace .mp3 with .ogg
        content = content.replace(/\.mp3/gi, '.ogg');
        // Replace .mp4 with .webm
        content = content.replace(/\.mp4/gi, '.webm');
        
        await fs.writeFile(file, content, 'utf-8');
    }

    // 4. Process Assets
    console.log('Compressing Assets...');
    await fs.ensureDir(distAssetsDir);

    // Find all assets
    const assetFiles = await glob('**/*.*', { cwd: assetsRawDir });
    
    let processed = 0;
    const total = assetFiles.length;

    for (const relPath of assetFiles) {
        const absPath = path.resolve(assetsRawDir, relPath);
        const ext = path.extname(absPath).toLowerCase();
        const destDir = path.resolve(distAssetsDir, path.dirname(relPath));
        await fs.ensureDir(destDir);
        
        const baseName = path.basename(absPath, ext);
        processed++;
        console.log(`[${processed}/${total}] Processing ${relPath}...`);
        
        try {
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const destPath = path.resolve(destDir, `${baseName}.webp`);
                await sharp(absPath)
                    .webp({ quality: 80 })
                    .toFile(destPath);
                    
            } else if (ext === '.mp3') {
                const destPath = path.resolve(destDir, `${baseName}.ogg`);
                await new Promise((resolve, reject) => {
                    ffmpeg(absPath)
                        .audioCodec('libvorbis')
                        .audioBitrate('96k')
                        .save(destPath)
                        .on('end', resolve)
                        .on('error', reject);
                });
                
            } else if (ext === '.mp4') {
                const destPath = path.resolve(destDir, `${baseName}.webm`);
                await new Promise((resolve, reject) => {
                    ffmpeg(absPath)
                        .noAudio()          // Remove audio
                        .videoCodec('libvpx-vp9')
                        .addOption('-crf', '28') // CRF 28 for good compression
                        .addOption('-b:v', '0') // Required for VP9 CRF
                        .addOption('-cpu-used', '4') // Speed up encoding
                        .save(destPath)
                        .on('end', resolve)
                        .on('error', reject);
                });
                
            } else {
                // Copy other files untouched
                const destPath = path.resolve(destDir, path.basename(absPath));
                await fs.copy(absPath, destPath);
            }
        } catch (error) {
            console.error(`Failed to process ${relPath}:`, error.message);
        }
    }

    console.log('✅ Build Complete! Compressed game is ready in the "dist" folder.');
}

build().catch(console.error);
