/* Gera as imagens de compartilhamento e o ícone do iOS a partir de HTML.
   Uso: node tools/gerar-imagens.mjs   (requer Chromium via Playwright) */

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fonte = (arq) => pathToFileURL(join(raiz, 'assets/fonts', arq)).href;

const fontes = `
@font-face { font-family:'Cormorant Garamond'; src:url('${fonte('cormorant-garamond-latin.woff2')}') format('woff2'); font-weight:300 700; }
@font-face { font-family:'Inter'; src:url('${fonte('inter-latin.woff2')}') format('woff2'); font-weight:300 700; }`;

const og = `<!doctype html><meta charset="utf-8"><style>${fontes}
	*{margin:0;box-sizing:border-box}
	body{width:1200px;height:630px;background:#0b0a0f;color:#fff;font-family:Inter,sans-serif;
		display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;position:relative;overflow:hidden}
	.aura{position:absolute;border-radius:50%;filter:blur(90px)}
	.a1{width:720px;height:720px;background:radial-gradient(circle,rgba(107,46,143,.9),transparent 65%);top:-280px;left:-200px}
	.a2{width:560px;height:560px;background:radial-gradient(circle,rgba(201,166,228,.35),transparent 65%);bottom:-260px;right:-140px}
	.topo{display:flex;align-items:center;gap:22px;position:relative}
	.marca{font-family:'Cormorant Garamond',serif;font-size:64px;letter-spacing:.02em;display:flex;align-items:center;gap:6px}
	.anel{width:52px;height:48px;border:5px solid #8b95a5;border-radius:50%;transform:rotate(-14deg);display:inline-block}
	.tag{font-size:15px;letter-spacing:.28em;text-transform:uppercase;color:#e4ce97;border-left:1px solid rgba(255,255,255,.25);padding-left:22px;line-height:1.5}
	h1{font-family:'Cormorant Garamond',serif;font-size:82px;font-weight:400;line-height:1.04;letter-spacing:-.02em;position:relative;max-width:16ch}
	.it{font-style:italic;background:linear-gradient(100deg,#c9a6e4 20%,#e4ce97);-webkit-background-clip:text;background-clip:text;color:transparent}
	.base{display:flex;justify-content:space-between;align-items:flex-end;font-size:20px;color:rgba(255,255,255,.7);position:relative}
	.fio{position:absolute;left:80px;right:80px;bottom:150px;height:1px;background:linear-gradient(90deg,transparent,#c8a24c,transparent);opacity:.6}
</style>
<div class="aura a1"></div><div class="aura a2"></div>
<div class="topo">
	<span class="marca">I<span class="anel"></span>IS</span>
	<span class="tag">Instituto IOIS<br>Odontologia Integrativa</span>
</div>
<h1>Seu sorriso é a porta de entrada da sua <span class="it">saúde</span>.</h1>
<div class="fio"></div>
<div class="base">
	<span>Todas as especialidades odontológicas · Brasília — DF</span>
	<span style="color:#e4ce97">iois.com.br</span>
</div>`;

const icone = `<!doctype html><meta charset="utf-8"><style>${fontes}
	*{margin:0}
	body{width:180px;height:180px;background:#0b0a0f;display:grid;place-items:center;font-family:'Cormorant Garamond',serif}
	.m{font-size:86px;color:#fff;display:flex;align-items:center;gap:3px;line-height:1}
	.anel{width:44px;height:40px;border:5px solid #c9a6e4;border-radius:50%;transform:rotate(-14deg);display:inline-block}
</style><div class="m">I<span class="anel"></span>IS</div>`;

const navegador = await chromium.launch();
const gerar = async (html, largura, altura, destino) => {
	const p = await navegador.newPage({ viewport: { width: largura, height: altura }, deviceScaleFactor: 1 });
	await p.setContent(html, { waitUntil: 'load' });
	await p.evaluate(() => document.fonts.ready);
	await p.screenshot({ path: join(raiz, destino) });
	await p.close();
	console.log('gerado:', destino);
};

await gerar(og, 1200, 630, 'assets/img/og-iois.png');
await gerar(icone, 180, 180, 'assets/img/apple-touch-icon.png');
await navegador.close();
