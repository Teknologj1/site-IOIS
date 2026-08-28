/* Prepara uma foto para o site: recorta na proporção desejada, redimensiona e
   grava em JPEG. Usa o Chromium (canvas) — o ambiente não tem ImageMagick.

   Uso: node tools/otimizar-foto.mjs <origem> <destino> [proporção] [larguraMax] [viés]
     proporção  ex.: 3:4, 4:3, 1:1 — omita (ou "-") para manter a original
     larguraMax padrão 1600
     viés       0 = recorta pela base, 0.5 = centro, 1 = recorta pelo topo.
                Padrão 0.28: em retratos preserva a cabeça. */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const [origemArg, destinoArg, proporcaoArg = '-', larguraArg = '1600', viesArg = '0.28'] = process.argv.slice(2);

if (!origemArg || !destinoArg) {
	console.error('uso: node tools/otimizar-foto.mjs <origem> <destino> [prop] [largura] [viés]');
	process.exit(1);
}

const origem = resolve(origemArg);
const destino = join(raiz, destinoArg);
const mime = extname(origem).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
const dataUri = `data:${mime};base64,` + readFileSync(origem).toString('base64');
const proporcao = proporcaoArg === '-' ? null : proporcaoArg.split(':').map(Number);

const navegador = await chromium.launch();
const p = await navegador.newPage();
await p.setContent('<canvas>');

const saida = await p.evaluate(async ({ url, prop, larguraMax, vies }) => {
	const img = new Image();
	await new Promise((ok, e) => { img.onload = ok; img.onerror = e; img.src = url; });

	let sx = 0, sy = 0, sw = img.width, sh = img.height;
	if (prop) {
		const alvo = prop[0] / prop[1];
		const atual = sw / sh;
		if (atual > alvo) { sw = Math.round(sh * alvo); sx = Math.round((img.width - sw) / 2); }
		else if (atual < alvo) { sh = Math.round(sw / alvo); sy = Math.round((img.height - sh) * vies); }
	}

	const escala = Math.min(1, larguraMax / sw);
	const c = document.createElement('canvas');
	c.width = Math.round(sw * escala);
	c.height = Math.round(sh * escala);
	const ctx = c.getContext('2d');
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
	ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);

	return {
		jpeg: c.toDataURL('image/jpeg', 0.82),
		saida: [c.width, c.height],
		entrada: [img.width, img.height]
	};
}, { url: dataUri, prop: proporcao, larguraMax: Number(larguraArg), vies: Number(viesArg) });

writeFileSync(destino, Buffer.from(saida.jpeg.split(',')[1], 'base64'));
const kb = Math.round(statSync(destino).size / 1024);
console.log(`${destinoArg}: ${saida.entrada.join('×')} → ${saida.saida.join('×')} · ${kb} KB`);

await navegador.close();
