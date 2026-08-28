/* Prepara o letreiro IOIS a partir do arquivo oficial enviado pela cliente
   (assets/img/letreiro-iois-original.png). Não redesenha nada: recorta a
   margem vazia, reduz para a maior largura usada no site e gera a variante
   para fundo escuro (letras brancas, O lilás) — o roxo original teria
   contraste de ~2:1 sobre o preto.

   Uso: node tools/gerar-letreiro.mjs */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = 'data:image/png;base64,'
	+ readFileSync(join(raiz, 'assets/img/letreiro-iois-original.png')).toString('base64');

const navegador = await chromium.launch();
const p = await navegador.newPage();
await p.setContent('<canvas>');

const saida = await p.evaluate(async (url) => {
	/* O letreiro aparece no máximo a 46 px de altura (rodapé); 380 px de
	   largura cobre telas de 3× e mantém o arquivo leve — ele é carregado
	   em todas as páginas. */
	const LARGURA_MAX = 380;

	const img = new Image();
	await new Promise((ok, e) => { img.onload = ok; img.onerror = e; img.src = url; });
	const c = document.createElement('canvas');
	c.width = img.width; c.height = img.height;
	const ctx = c.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const dados = ctx.getImageData(0, 0, c.width, c.height);
	const px = dados.data;

	/* Recorte pelo menor retângulo com pixels visíveis */
	let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
	for (let y = 0; y < c.height; y++) {
		for (let x = 0; x < c.width; x++) {
			if (px[(y * c.width + x) * 4 + 3] > 12) {
				if (x < x0) x0 = x; if (x > x1) x1 = x;
				if (y < y0) y0 = y; if (y > y1) y1 = y;
			}
		}
	}
	const larg = x1 - x0 + 1, alt = y1 - y0 + 1;

	const exportar = (fonte) => {
		const corte = document.createElement('canvas');
		corte.width = larg; corte.height = alt;
		corte.getContext('2d').putImageData(fonte, -x0, -y0);
		if (larg <= LARGURA_MAX) return corte.toDataURL('image/png');
		const escala = LARGURA_MAX / larg;
		const d = document.createElement('canvas');
		d.width = Math.round(larg * escala);
		d.height = Math.round(alt * escala);
		const c2 = d.getContext('2d');
		c2.imageSmoothingEnabled = true;
		c2.imageSmoothingQuality = 'high';
		c2.drawImage(corte, 0, 0, d.width, d.height);
		return d.toDataURL('image/png');
	};

	const original = exportar(dados);

	/* Variante para fundo escuro: as letras roxas viram brancas e o O cinza
	   vira lilás. A separação é por saturação, e o alfa é preservado. */
	const claros = ctx.createImageData(dados);
	const q = claros.data;
	for (let i = 0; i < q.length; i += 4) {
		const a = px[i + 3];
		if (a === 0) { q[i + 3] = 0; continue; }
		const r = px[i], g = px[i + 1], b = px[i + 2];
		const max = Math.max(r, g, b), min = Math.min(r, g, b);
		const satur = max === 0 ? 0 : (max - min) / max;
		if (satur < 0.22) { q[i] = 201; q[i + 1] = 166; q[i + 2] = 228; }  /* o O cinza vira lilás */
		else { q[i] = 255; q[i + 1] = 255; q[i + 2] = 255; }               /* as letras roxas viram brancas */
		/* Degraus de 8 no alfa: imperceptível e deixa o PNG bem menor,
		   já que a imagem tem só duas cores. */
		q[i + 3] = a > 247 ? 255 : Math.round(a / 8) * 8;
	}
	const claro = exportar(claros);

	return { original, claro, larg, alt, origem: [c.width, c.height] };
}, origem);

const gravar = (dataUrl, destino) => {
	writeFileSync(join(raiz, destino), Buffer.from(dataUrl.split(',')[1], 'base64'));
	console.log('gerado:', destino);
};

gravar(saida.original, 'assets/img/letreiro-iois.png');
gravar(saida.claro, 'assets/img/letreiro-iois-claro.png');
console.log(`origem ${saida.origem.join('×')} → arte ${saida.larg}×${saida.alt}`);

await navegador.close();
