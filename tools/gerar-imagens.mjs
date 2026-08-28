/* Gera a imagem de compartilhamento e os ícones a partir do logo oficial.
   Uso: node tools/gerar-imagens.mjs   (requer Chromium via Playwright) */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataUri = (rel) => 'data:image/png;base64,' + readFileSync(join(raiz, rel)).toString('base64');
const fonte = (arq) => pathToFileURL(join(raiz, 'assets/fonts', arq)).href;

const LOGO_CLARO = dataUri('assets/img/letreiro-iois-claro.png');
const SIMBOLO = dataUri('assets/img/simbolo-iois.png');

const fontes = `
@font-face { font-family:'Cormorant Garamond'; src:url('${fonte('cormorant-garamond-latin.woff2')}') format('woff2'); font-weight:300 700; }
@font-face { font-family:'Inter'; src:url('${fonte('inter-latin.woff2')}') format('woff2'); font-weight:300 700; }`;

const og = `<!doctype html><meta charset="utf-8"><style>${fontes}
	*{margin:0;box-sizing:border-box}
	body{width:1200px;height:630px;background:#0b0a0f;color:#fff;font-family:Inter,sans-serif;
		display:flex;flex-direction:column;justify-content:space-between;padding:64px 80px;position:relative;overflow:hidden}
	.aura{position:absolute;border-radius:50%;filter:blur(90px)}
	.a1{width:720px;height:720px;background:radial-gradient(circle,rgba(107,46,143,.9),transparent 65%);top:-280px;left:-200px}
	.a2{width:560px;height:560px;background:radial-gradient(circle,rgba(201,166,228,.35),transparent 65%);bottom:-260px;right:-140px}
	.marca{height:66px;width:auto;position:relative}
	h1{font-family:'Cormorant Garamond',serif;font-size:76px;font-weight:400;line-height:1.05;letter-spacing:-.02em;position:relative;max-width:16ch}
	.it{font-style:italic;background:linear-gradient(100deg,#c9a6e4 20%,#e4ce97);-webkit-background-clip:text;background-clip:text;color:transparent}
	.base{display:flex;justify-content:space-between;align-items:flex-end;font-size:20px;color:rgba(255,255,255,.7);position:relative}
	.fio{position:absolute;left:80px;right:80px;bottom:140px;height:1px;background:linear-gradient(90deg,transparent,#c8a24c,transparent);opacity:.6}
</style>
<div class="aura a1"></div><div class="aura a2"></div>
<img class="marca" src="${LOGO_CLARO}" alt="">
<h1>Seu sorriso é a porta de entrada da sua <span class="it">saúde</span>.</h1>
<div class="fio"></div>
<div class="base">
	<span>Todas as especialidades odontológicas · Brasília — DF</span>
	<span style="color:#e4ce97">iois.com.br</span>
</div>`;

const icone = (lado) => `<!doctype html><meta charset="utf-8"><style>
	*{margin:0}
	body{width:${lado}px;height:${lado}px;background:#0b0a0f;display:grid;place-items:center;overflow:hidden}
	img{width:${Math.round(lado * 0.7)}px;height:auto}
</style><img src="${SIMBOLO}" alt="">`;

const navegador = await chromium.launch();
const gerar = async (html, largura, altura, destino) => {
	const p = await navegador.newPage({ viewport: { width: largura, height: altura }, deviceScaleFactor: 1 });
	await p.setContent(html, { waitUntil: 'load' });
	await p.evaluate(() => document.fonts.ready);
	await p.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? null : i.decode()))));
	await p.screenshot({ path: join(raiz, destino) });
	await p.close();
	console.log('gerado:', destino);
};

await gerar(og, 1200, 630, 'assets/img/og-iois.png');
await gerar(icone(180), 180, 180, 'assets/img/apple-touch-icon.png');
await gerar(icone(96), 96, 96, 'favicon.png');
await navegador.close();
