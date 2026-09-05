import ghpages from 'gh-pages';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

console.log('Deploying the "dist" folder to GitHub Pages (gh-pages branch)...');

ghpages.publish(distDir, {
    branch: 'gh-pages',
    message: 'Auto-deploy compressed version',
    nojekyll: true,
}, (err) => {
    if (err) {
        console.error('❌ Deployment Failed!');
        console.error(err);
    } else {
        console.log('✅ Deployment Successful! Your compressed game is now live on GitHub Pages.');
    }
});
