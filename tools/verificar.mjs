/* Verificação estática: links internos, imagens, atributos essenciais.
   Uso: node tools/verificar.mjs */
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ignorar = new Set(['.git', 'node_modules', 'tools', 'assets', 'api', '.github']);

const listarHtml = (dir = raiz, saida = []) => {
	for (const nome of readdirSync(dir)) {
		if (ignorar.has(nome)) continue;
		const caminho = join(dir, nome);
		if (statSync(caminho).isDirectory()) listarHtml(caminho, saida);
		else if (nome.endsWith('.html')) saida.push(caminho);
	}
	return saida;
};

const problemas = [];
const arquivos = listarHtml();

for (const arquivo of arquivos) {
	const rel = arquivo.replace(raiz, '');
	const html = readFileSync(arquivo, 'utf8');

	for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
		const alvo = m[1] === '/' ? '/index.html' : m[1];
		if (!existsSync(join(raiz, alvo))) problemas.push(`${rel}: alvo inexistente ${alvo}`);
	}

	/* Todas as larguras declaradas no srcset precisam existir em disco */
	for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
		for (const item of m[1].split(',')) {
			const alvo = item.trim().split(/\s+/)[0];
			if (alvo.startsWith('/') && !existsSync(join(raiz, alvo))) {
				problemas.push(`${rel}: srcset aponta para arquivo inexistente ${alvo}`);
			}
		}
	}

	/* Marcador de modelo que não foi interpolado — acontece quando o cifrão
	   é escapado por engano na literal de template. */
	for (const m of html.matchAll(/\$\{[^}]{0,80}/g)) {
		problemas.push(`${rel}: modelo não interpolado → ${m[0].slice(0, 60)}`);
	}
	for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) problemas.push(`${rel}: <img> sem alt → ${m[0].slice(0, 70)}`);
	for (const m of html.matchAll(/<img\b(?![^>]*\bwidth=)[^>]*>/g)) problemas.push(`${rel}: <img> sem width/height → ${m[0].slice(0, 70)}`);
	if (!/<title>[^<]{10,70}<\/title>/.test(html)) problemas.push(`${rel}: título ausente ou fora de 10–70 caracteres`);
	const desc = html.match(/name="description" content="([^"]+)"/);
	if (!desc) problemas.push(`${rel}: sem meta description`);
	else if (desc[1].length > 165) problemas.push(`${rel}: description com ${desc[1].length} caracteres (máx. 165)`);
	if ((html.match(/<h1[ >]/g) || []).length !== 1) problemas.push(`${rel}: deve haver exatamente um <h1>`);
	for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
		try { JSON.parse(m[1]); } catch { problemas.push(`${rel}: JSON-LD inválido`); }
	}
	if (/target="_blank"(?![^>]*rel=)/.test(html)) problemas.push(`${rel}: target="_blank" sem rel`);
}

console.log(`${arquivos.length} páginas verificadas.`);
console.log(problemas.length ? 'PROBLEMAS:\n  ' + problemas.join('\n  ') : 'Nenhum problema encontrado.');
process.exitCode = problemas.length ? 1 : 0;
