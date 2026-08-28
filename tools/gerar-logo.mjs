/* Prepara as variantes do logo oficial do Instituto IOIS.
   Não redesenha nada: parte do arquivo original, remove o fundo branco,
   recorta a margem vazia e gera uma variante clara para os fundos escuros
   (clareia mantendo o matiz — o roxo continua roxo, o magenta continua magenta).

   Uso: node tools/gerar-logo.mjs [arquivo-origem.png] */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const arquivo = resolve(process.argv[2] || join(raiz, 'assets/img/logo-iois-original.png'));
/* A imagem entra na página como data: URI — file:// não é legível pelo canvas. */
const origem = 'data:image/png;base64,' + readFileSync(arquivo).toString('base64');

const navegador = await chromium.launch();
const p = await navegador.newPage();
await p.setContent('<canvas>');

const resultado = await p.evaluate(async (url) => {
	const LARGURA_MAX = 1000;

	const img = new Image();
	await new Promise((ok, erro) => { img.onload = ok; img.onerror = erro; img.src = url; });

	const c = document.createElement('canvas');
	c.width = img.width; c.height = img.height;
	const ctx = c.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const dados = ctx.getImageData(0, 0, c.width, c.height);
	const px = dados.data;

	/* 1. Se a arte vier sobre fundo branco opaco, recupera o alfa:
	      a = 1 - min(r,g,b)/255, desfazendo a composição sobre o branco. */
	let opacoTotal = true;
	for (let i = 3; i < px.length; i += 4) if (px[i] !== 255) { opacoTotal = false; break; }
	if (opacoTotal) {
		for (let i = 0; i < px.length; i += 4) {
			const a = 1 - Math.min(px[i], px[i + 1], px[i + 2]) / 255;
			if (a < 0.015) { px[i + 3] = 0; continue; }
			for (let k = 0; k < 3; k++) {
				px[i + k] = Math.max(0, Math.min(255, Math.round((px[i + k] - 255 * (1 - a)) / a)));
			}
			px[i + 3] = Math.round(a * 255);
		}
	}

	/* 2. Recorte pelo menor retângulo com pixels visíveis */
	let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
	for (let y = 0; y < c.height; y++) {
		for (let x = 0; x < c.width; x++) {
			if (px[(y * c.width + x) * 4 + 3] > 10) {
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

	/* 3. Variante para fundo escuro.
	      A classificação usa a cor como ela aparece sobre o branco (antes de
	      desfazer a composição), senão o cinza das letras vira azul. A cobertura
	      de tinta vira o alfa, com reforço para o cinza médio ler bem sobre o preto. */
	const claros = ctx.createImageData(dados);
	const q = claros.data;
	const bruto = ctx.getImageData(0, 0, c.width, c.height).data;
	for (let i = 0; i < q.length; i += 4) {
		const r = bruto[i] / 255, g = bruto[i + 1] / 255, b = bruto[i + 2] / 255;
		const max = Math.max(r, g, b), min = Math.min(r, g, b);
		const cobertura = 1 - min;
		if (cobertura < 0.015) { q[i + 3] = 0; continue; }

		const d = max - min;
		let rr = 1, gg = 1, bb = 1;               // padrão: branco (letras cinza)
		if (d >= 0.14) {                           // arte colorida: preserva o matiz
			const l = (max + min) / 2;
			const s = d / (1 - Math.abs(2 * l - 1));
			let h;
			if (max === r) h = ((g - b) / d) % 6;
			else if (max === g) h = (b - r) / d + 2;
			else h = (r - g) / d + 4;
			h *= 60; if (h < 0) h += 360;
			const lNovo = 0.74, sNovo = Math.min(s, 0.6);
			const cc = (1 - Math.abs(2 * lNovo - 1)) * sNovo;
			const xx = cc * (1 - Math.abs(((h / 60) % 2) - 1));
			const m = lNovo - cc / 2;
			let t;
			if (h < 60) t = [cc, xx, 0];
			else if (h < 120) t = [xx, cc, 0];
			else if (h < 180) t = [0, cc, xx];
			else if (h < 240) t = [0, xx, cc];
			else if (h < 300) t = [xx, 0, cc];
			else t = [cc, 0, xx];
			rr = t[0] + m; gg = t[1] + m; bb = t[2] + m;
		}
		q[i] = Math.round(rr * 255);
		q[i + 1] = Math.round(gg * 255);
		q[i + 2] = Math.round(bb * 255);
		q[i + 3] = Math.round(Math.min(1, cobertura * 1.85) * 255);
	}
	const claro = exportar(claros);

	return { original, claro, larg, alt, origem: [c.width, c.height], fundoBranco: opacoTotal };
}, origem);

const gravar = (dataUrl, destino) => {
	writeFileSync(join(raiz, destino), Buffer.from(dataUrl.split(',')[1], 'base64'));
	console.log('gerado:', destino);
};

gravar(resultado.original, 'assets/img/logo-iois.png');
gravar(resultado.claro, 'assets/img/logo-iois-claro.png');
console.log(
	`origem ${resultado.origem.join('×')}${resultado.fundoBranco ? ' (fundo branco removido)' : ' (já transparente)'}`
	+ ` → arte ${resultado.larg}×${resultado.alt}`
);

await navegador.close();

/* ---------------------------------------------------------------------------
   Símbolo isolado (o dente), recortado do próprio logo — usado no favicon,
   no ícone do iOS e na imagem de compartilhamento.
   --------------------------------------------------------------------------- */
const navegador2 = await chromium.launch();
const p2 = await navegador2.newPage();
await p2.setContent('<canvas>');
const simbolo = await p2.evaluate(async (url) => {
	const img = new Image();
	await new Promise((ok, e) => { img.onload = ok; img.onerror = e; img.src = url; });
	const c = document.createElement('canvas');
	c.width = img.width; c.height = img.height;
	const ctx = c.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const px = ctx.getImageData(0, 0, c.width, c.height).data;

	/* Primeira coluna totalmente vazia depois do símbolo = fim do dente */
	const colunaVazia = (x) => {
		for (let y = 0; y < c.height; y++) if (px[(y * c.width + x) * 4 + 3] > 10) return false;
		return true;
	};
	let corte = 0;
	for (let x = Math.round(c.width * 0.1); x < c.width; x++) {
		if (colunaVazia(x)) { corte = x; break; }
	}
	if (!corte) corte = Math.round(c.width * 0.3);

	const d = document.createElement('canvas');
	d.width = corte; d.height = c.height;
	d.getContext('2d').drawImage(c, 0, 0, corte, c.height, 0, 0, corte, c.height);
	return { imagem: d.toDataURL('image/png'), corte, altura: c.height };
}, 'data:image/png;base64,' + readFileSync(join(raiz, 'assets/img/logo-iois.png')).toString('base64'));

gravar(simbolo.imagem, 'assets/img/simbolo-iois.png');
console.log(`símbolo recortado: ${simbolo.corte}×${simbolo.altura}`);
await navegador2.close();
