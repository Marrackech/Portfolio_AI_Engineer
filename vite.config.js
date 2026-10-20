import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

// Le bouton « Télécharger mon CV » n'apparaît que si un PDF existe dans public/cv/
const cvDir = path.resolve(process.cwd(), 'public/cv');
const cvFile = fs.existsSync(cvDir)
  ? fs.readdirSync(cvDir).find((f) => f.toLowerCase().endsWith('.pdf'))
  : undefined;

/**
 * SEO : injecte canonical, og:url, og:image (URLs absolues) + sitemap.xml + robots.txt.
 * L'URL du site vient de VITE_SITE_URL, sinon de l'URL de production fournie par Vercel.
 * Sans URL connue, les balises absolues sont simplement omises (le site fonctionne quand même).
 */
function seoPlugin(siteUrl) {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      if (!siteUrl) return html.replace('%SEO_ABSOLUTE%', '');
      const tags = [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
      ].join('\n    ');
      return html.replace('%SEO_ABSOLUTE%', tags);
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' });
      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            `<?xml version="1.0" encoding="UTF-8"?>\n` +
            `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            `  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n` +
            `</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_PROJECT_PRODUCTION_URL;
  const siteUrl = (env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : '')).replace(/\/$/, '');

  return {
    plugins: [react(), seoPlugin(siteUrl)],
    define: {
      __CV_FILE__: JSON.stringify(cvFile ? `/cv/${cvFile}` : ''),
    },
    build: {
      // Cible large : Safari 12+/iOS 12+, Chrome, Firefox, Edge, Samsung Internet
      target: ['es2018', 'safari12', 'chrome70', 'firefox68', 'edge79'],
      cssTarget: ['safari12', 'chrome70', 'firefox68'],
    },
    css: {
      modules: { localsConvention: 'camelCase' },
    },
  };
});
