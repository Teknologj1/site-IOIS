/* Screenshots de verificação — node tools/capturar.mjs [base] */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] || 'http://127.0.0.1:8080';
const saida = '/tmp/claude-0/-home-user-site-IOIS/2d658d9d-b08c-58f9-93cb-59d928492904/scratchpad/shots';
mkdirSync(saida, { recursive: true });

const paginas = [
	['home', '/index.html'],
	['instituto', '/instituto.html'],
	['especialidades', '/especialidades.html'],
	['implantodontia', '/especialidades/implantodontia.html'],
	['iolanda', '/dra-iolanda.html'],
	['cursos', '/cursos.html'],
	['contato', '/contato.html']
];

const navegador = await chromium.launch();
const erros = [];

for (const [nome, caminho] of paginas) {
	for (const [rot, largura, altura, inteira] of [['desktop', 1440, 900, true], ['mobile', 390, 844, true]]) {
		const p = await navegador.newPage({ viewport: { width: largura, height: altura } });
		p.on('console', (m) => { if (m.type() === 'error') erros.push(`${nome}/${rot}: ${m.text()}`); });
		p.on('pageerror', (e) => erros.push(`${nome}/${rot}: ${e.message}`));
		await p.goto(base + caminho, { waitUntil: 'networkidle' });
		await p.evaluate(() => document.fonts.ready);
		await p.evaluate(() => new Promise((r) => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 900); }));
		await p.evaluate(() => window.scrollTo(0, 0));
		await p.waitForTimeout(500);
		const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
		if (overflow) erros.push(`${nome}/${rot}: rolagem horizontal`);
		await p.screenshot({ path: `${saida}/${nome}-${rot}.png`, fullPage: inteira });
		await p.close();
	}
}

await navegador.close();
console.log(erros.length ? 'PROBLEMAS:\n' + erros.join('\n') : 'Nenhum erro de console e nenhuma rolagem horizontal.');
