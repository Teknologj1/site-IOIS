/* Gerador estático do site do Instituto IOIS.
   Uso: node tools/build.mjs
   Escreve os arquivos .html na raiz do repositório (que é a public_html na Hostinger). */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './data/site.mjs';
import { destaques } from './data/especialidades.mjs';
import { pagina } from './lib/layout.mjs';
import { home } from './pages/home.mjs';
import { instituto, iolanda, cursos } from './pages/institucionais.mjs';
import { indiceEspecialidades, paginaEspecialidade, schemaFaq } from './pages/especialidades.mjs';
import { contato, obrigado, erro404 } from './pages/contato.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const rodapeEspecialidades = destaques.slice(0, 5);

const escrever = (caminho, html) => {
	const destino = join(raiz, caminho.replace(/^\//, ''));
	mkdirSync(dirname(destino), { recursive: true });
	writeFileSync(destino, html, 'utf8');
	return caminho;
};

const paginas = [
	{
		caminho: '/index.html',
		ativo: 'inicio',
		titulo: `${site.nome} — Odontologia integrativa em ${site.cidade}`,
		descricao: site.descricao,
		corpo: home(),
		prioridade: '1.0'
	},
	{
		caminho: '/instituto.html',
		ativo: 'instituto',
		titulo: `O Instituto — ${site.nome}`,
		descricao: `Conheça o Instituto IOIS: odontologia integrativa em ${site.cidade}, com diagnóstico completo, biossegurança e equipe multidisciplinar planejando o mesmo caso.`,
		corpo: instituto(),
		prioridade: '0.8'
	},
	{
		caminho: '/especialidades.html',
		ativo: 'especialidades',
		titulo: `Especialidades odontológicas — ${site.nome}`,
		descricao: 'Todas as especialidades odontológicas em um só instituto: implantes, ortodontia, endodontia, periodontia, estética, harmonização orofacial, DTM e mais.',
		corpo: indiceEspecialidades(),
		prioridade: '0.9'
	},
	{
		caminho: '/dra-iolanda.html',
		ativo: 'iolanda',
		titulo: `Dra. Iolanda Schroeder — ${site.nome}`,
		descricao: 'Cirurgiã-dentista, fundadora do Instituto IOIS e professora. Trajetória, atuação clínica e formação continuada.',
		corpo: iolanda(),
		prioridade: '0.8',
		schemaExtra: {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: site.responsavel,
			jobTitle: 'Cirurgiã-dentista',
			worksFor: { '@type': 'Dentist', name: site.nome },
			url: `${site.dominio}/dra-iolanda.html`,
			image: `${site.dominio}/assets/img/iolanda-retrato.jpg`,
			sameAs: [site.instagram.url]
		}
	},
	{
		caminho: '/cursos.html',
		ativo: 'cursos',
		titulo: `Cursos e mentoria para dentistas — ${site.nome}`,
		descricao: 'Formação continuada com a Dra. Iolanda Schroeder: cursos presenciais, mentoria individual e imersões em odontologia integrativa.',
		corpo: cursos(),
		prioridade: '0.7'
	},
	{
		caminho: '/contato.html',
		ativo: 'contato',
		titulo: `Contato e agendamento — ${site.nome}`,
		descricao: `Agende sua avaliação no Instituto IOIS: ${site.endereco.linha}, ${site.endereco.cidade}/${site.endereco.uf}. WhatsApp ${site.whatsapp.exibicao}.`,
		corpo: contato(),
		prioridade: '0.8'
	},
	{
		caminho: '/obrigado.html',
		ativo: 'contato',
		titulo: `Mensagem recebida — ${site.nome}`,
		descricao: 'Recebemos sua mensagem. A equipe do Instituto IOIS responde em até um dia útil.',
		corpo: obrigado(),
		semSitemap: true
	},
	{
		caminho: '/404.html',
		titulo: `Página não encontrada — ${site.nome}`,
		descricao: 'A página que você procura não existe ou mudou de endereço.',
		corpo: erro404(),
		semSitemap: true
	}
];

for (const e of destaques) {
	paginas.push({
		caminho: `/especialidades/${e.slug}.html`,
		ativo: 'especialidades',
		titulo: `${e.nome} em ${site.cidade} — ${site.nome}`,
		descricao: e.resumo,
		corpo: paginaEspecialidade(e),
		schemaExtra: schemaFaq(e),
		prioridade: '0.7'
	});
}

const escritas = paginas.map((p) =>
	escrever(
		p.caminho,
		pagina({
			titulo: p.titulo,
			descricao: p.descricao,
			caminho: p.caminho,
			ativo: p.ativo,
			corpo: p.corpo,
			schemaExtra: p.schemaExtra,
			especialidadesRodape: rodapeEspecialidades
		})
	)
);

/* -------------------------------------------------------------- sitemap.xml */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas
	.filter((p) => !p.semSitemap)
	.map(
		(p) => `\t<url>
\t\t<loc>${site.dominio}${p.caminho === '/index.html' ? '/' : p.caminho}</loc>
\t\t<priority>${p.prioridade || '0.6'}</priority>
\t</url>`
	)
	.join('\n')}
</urlset>
`;
escrever('/sitemap.xml', sitemap);

console.log(`${escritas.length} páginas geradas:`);
escritas.forEach((c) => console.log('  ' + c));
console.log('  /sitemap.xml');
