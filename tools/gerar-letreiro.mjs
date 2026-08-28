/* Extrai o letreiro "IOIS" do arquivo oficial da marca e aplica as cores da
   versão usada no site: I, I e S em roxo, o O em cinza. As letras são as do
   próprio arquivo original — nada é redesenhado, só recortado e colorido.

   Uso: node tools/gerar-letreiro.mjs */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = 'data:image/png;base64,'
	+ readFileSync(join(raiz, 'assets/img/logo-iois.png')).toString('base64');

const ROXO = [107, 46, 143];   /* letras I, I e S */
const CINZA = [139, 149, 165]; /* o O */
const BRANCO = [255, 255, 255];
const LILAS = [201, 166, 228];

const navegador = await chromium.launch();
const p = await navegador.newPage();
await p.setContent('<canvas>');

const saida = await p.evaluate(async ({ url, ROXO, CINZA, BRANCO, LILAS }) => {
	const img = new Image();
	await new Promise((ok, e) => { img.onload = ok; img.onerror = e; img.src = url; });
	const c = document.createElement('canvas');
	c.width = img.width; c.height = img.height;
	const ctx = c.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const dados = ctx.getImageData(0, 0, c.width, c.height);
	const px = dados.data;
	const alfa = (x, y) => px[(y * c.width + x) * 4 + 3];

	/* 1. Descarta o símbolo do dente: primeira coluna vazia depois dele */
	const colunaVazia = (x, y0 = 0, y1 = c.height - 1) => {
		for (let y = y0; y <= y1; y++) if (alfa(x, y) > 10) return false;
		return true;
	};
	let inicio = 0;
	for (let x = Math.round(c.width * 0.1); x < c.width; x++) {
		if (colunaVazia(x)) { while (colunaVazia(x) && x < c.width) x++; inicio = x; break; }
	}

	/* 2. Separa a linha do "IOIS" das duas linhas de apoio abaixo */
	const linhaVazia = (y) => {
		for (let x = inicio; x < c.width; x++) if (alfa(x, y) > 10) return false;
		return true;
	};
	let topo = 0, base = 0;
	for (let y = 0; y < c.height; y++) if (!linhaVazia(y)) { topo = y; break; }
	for (let y = topo; y < c.height; y++) if (linhaVazia(y)) { base = y - 1; break; }

	/* 3. Divide o bloco em letras pelas colunas vazias */
	const letras = [];
	let dentro = false, l0 = 0;
	for (let x = inicio; x < c.width; x++) {
		const cheia = !colunaVazia(x, topo, base);
		if (cheia && !dentro) { dentro = true; l0 = x; }
		else if (!cheia && dentro) { dentro = false; letras.push([l0, x - 1]); }
	}
	if (dentro) letras.push([l0, c.width - 1]);

	/* 4. Pinta: a segunda letra (o O) fica cinza, as demais roxas.
	      O alfa do arquivo é parcial (as letras originais são cinza médio),
	      então é normalizado para que o miolo fique sólido e só as bordas
	      continuem suaves. */
	let alfaMax = 0;
	for (let y = topo; y <= base; y++) {
		for (let x = inicio; x < c.width; x++) {
			const a = px[(y * c.width + x) * 4 + 3];
			if (a > alfaMax) alfaMax = a;
		}
	}
	const ganho = alfaMax > 0 ? 255 / alfaMax : 1;
	const pintar = (corLetra, corO) => {
		const saida = ctx.createImageData(dados);
		const q = saida.data;
		for (let y = topo; y <= base; y++) {
			for (let x = inicio; x < c.width; x++) {
				const i = (y * c.width + x) * 4;
				if (px[i + 3] === 0) continue;
				const indice = letras.findIndex(([a, b]) => x >= a && x <= b);
				const cor = indice === 1 ? corO : corLetra;
				q[i] = cor[0]; q[i + 1] = cor[1]; q[i + 2] = cor[2];
				q[i + 3] = Math.min(255, Math.round(px[i + 3] * ganho));
			}
		}
		const larg = c.width - inicio, alt = base - topo + 1;
		const d = document.createElement('canvas');
		d.width = larg; d.height = alt;
		d.getContext('2d').putImageData(saida, -inicio, -topo);
		return d.toDataURL('image/png');
	};

	return {
		escuro: pintar(ROXO, CINZA),
		claro: pintar(BRANCO, LILAS),
		letras: letras.length,
		caixa: [inicio, topo, c.width - inicio, base - topo + 1]
	};
}, { url: origem, ROXO, CINZA, BRANCO, LILAS });

const gravar = (dataUrl, destino) => {
	writeFileSync(join(raiz, destino), Buffer.from(dataUrl.split(',')[1], 'base64'));
	console.log('gerado:', destino);
};

gravar(saida.escuro, 'assets/img/letreiro-iois.png');
gravar(saida.claro, 'assets/img/letreiro-iois-claro.png');
console.log(`letras encontradas: ${saida.letras} | recorte ${saida.caixa[2]}×${saida.caixa[3]}`);

await navegador.close();
