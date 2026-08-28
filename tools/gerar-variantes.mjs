/* Gera as larguras extras das fotos para o srcset (480 e 900 px).
   Roda depois de trocar qualquer foto em assets/img/.
   Uso: node tools/gerar-variantes.mjs */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const pasta = join(raiz, 'assets/img');
const LARGURAS = [480, 900];
/* Só estas larguras contam como variante gerada — um nome como "post-1.jpg"
   não pode ser confundido com um arquivo derivado. */
const padraoVariante = new RegExp(`-(${LARGURAS.join('|')})\\.jpg$`, 'i');

/* Todas as fotos, inclusive as das subpastas (ig/, casos/).
   Logo e ícones são PNG, então ficam naturalmente de fora. */
const listar = (dir, prefixo = '') =>
	readdirSync(dir, { withFileTypes: true }).flatMap((item) =>
		item.isDirectory()
			? listar(join(dir, item.name), `${prefixo}${item.name}/`)
			: /\.jpg$/i.test(item.name) && !padraoVariante.test(item.name)
				? [`${prefixo}${item.name}`]
				: []
	);
const fotos = listar(pasta);

const navegador = await chromium.launch();
const p = await navegador.newPage();
await p.setContent('<canvas>');

for (const arquivo of fotos) {
	const origem = join(pasta, arquivo);
	const dados = 'data:image/jpeg;base64,' + readFileSync(origem).toString('base64');

	const variantes = await p.evaluate(async ({ url, larguras }) => {
		const img = new Image();
		await new Promise((ok, e) => { img.onload = ok; img.onerror = e; img.src = url; });
		const saida = {};
		for (const largura of larguras) {
			if (img.width <= largura * 1.1) continue; /* já é pequena o bastante */
			const c = document.createElement('canvas');
			c.width = largura;
			c.height = Math.round((img.height * largura) / img.width);
			const ctx = c.getContext('2d');
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			ctx.drawImage(img, 0, 0, c.width, c.height);
			saida[largura] = c.toDataURL('image/jpeg', 0.8);
		}
		return { saida, largura: img.width };
	}, { url: dados, larguras: LARGURAS });

	const geradas = Object.entries(variantes.saida).map(([largura, dataUrl]) => {
		const destino = join(pasta, arquivo.replace(/\.jpg$/i, `-${largura}.jpg`));
		writeFileSync(destino, Buffer.from(dataUrl.split(',')[1], 'base64'));
		return `${largura}px/${Math.round(statSync(destino).size / 1024)}KB`;
	});

	console.log(
		`${arquivo.padEnd(30)} ${String(variantes.largura).padStart(5)}px `
		+ (geradas.length ? `→ ${geradas.join(' · ')}` : '(já pequena)')
	);
}

await navegador.close();
