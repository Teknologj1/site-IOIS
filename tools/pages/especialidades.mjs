import { site, zapPadrao } from '../data/site.mjs';
import { especialidades, grupos, porGrupo } from '../data/especialidades.mjs';
import { icone } from '../lib/icones.mjs';
import { foto } from '../lib/layout.mjs';
import { capa } from './institucionais.mjs';

/* ------------------------------------------------------------------ ÍNDICE */
export const indiceEspecialidades = () => `
${capa({
	eyebrow: 'Especialidades',
	titulo: 'Todas as especialidades odontológicas, em um só instituto.',
	lead: `São ${especialidades.length} frentes de atuação que conversam entre si. Você não precisa remontar o seu tratamento em três endereços diferentes — nem repetir a sua história para cada profissional.`,
	migalhas: [{ rotulo: 'Especialidades' }]
})}

${grupos
	.map(
		(g, gi) => `
<section class="secao${gi % 2 === 1 ? '' : ''}"${gi % 2 === 1 ? ' style="background:var(--lilas-50)"' : ''}>
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">${String(gi + 1).padStart(2, '0')} · ${g.nome}</p>
			<h2>${g.descricao}</h2>
		</div>
		<div class="grid cols-3">
			${porGrupo(g.id)
				.map((e, i) =>
					e.destaque
						? `<a class="cartao revelar" id="${e.slug}" style="--atraso:${0.04 * i}s" href="/especialidades/${e.slug}.html">
				<span class="icone">${icone(e.icone)}</span>
				<h3>${e.nome}</h3>
				<p>${e.resumo}</p>
				<span class="link-seta">Ver a especialidade ${icone('seta')}</span>
			</a>`
						: `<article class="cartao revelar" id="${e.slug}" style="--atraso:${0.04 * i}s">
				<span class="icone">${icone(e.icone)}</span>
				<h3>${e.nome}</h3>
				<p>${e.resumo}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>`
	)
	.join('\n')}

<section class="secao escuro grao">
	<div class="wrap wrap-estreito centro">
		<p class="eyebrow" style="justify-content:center">Não sabe por onde começar?</p>
		<h2 class="revelar">A avaliação existe justamente para isso.</h2>
		<p class="lead revelar mt-1">
			Você não precisa chegar com o diagnóstico pronto. Traga a queixa — nós montamos o caminho, explicamos as
			opções e você decide.
		</p>
		<p class="mt-2 revelar"><a class="btn btn-claro" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Agendar avaliação</a></p>
	</div>
</section>
`;

/* --------------------------------------------------------- PÁGINA INDIVIDUAL */
export const paginaEspecialidade = (e) => {
	const outras = especialidades.filter((o) => o.destaque && o.slug !== e.slug).slice(0, 3);
	return `
${capa({
	eyebrow: grupos.find((g) => g.id === e.grupo).nome,
	titulo: e.nome,
	lead: e.lead,
	migalhas: [{ rotulo: 'Especialidades', href: '/especialidades.html' }, { rotulo: e.nome }]
})}

${e.imagem
	? `<section class="secao-topo">
	<div class="wrap">
		<figure class="moldura-img revelar" style="max-width:56rem;margin-inline:auto">
			\${foto({ ...e.imagem, sizes: '(max-width: 62rem) 92vw, 56rem' })}
		</figure>
	</div>
</section>`
	: ''}

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:start">
		<div class="revelar">
			${e.blocos
				.map(
					(b, i) => `<div${i ? ' class="mt-3"' : ''}>
				<h2 style="font-size:var(--t-h3)">${b.titulo}</h2>
				<p class="mt-1 texto-suave">${b.texto}</p>
			</div>`
				)
				.join('\n\t\t\t')}
		</div>
		<aside class="cartao revelar" style="--atraso:.08s">
			<p class="eyebrow">Indicações mais comuns</p>
			<ul class="lista-check mt-1">
				${e.indicacoes.map((i) => `<li>${i}</li>`).join('\n\t\t\t\t')}
			</ul>
			<p class="mt-3">
				<a class="btn btn-primario" href="https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma avaliação no Instituto IOIS sobre ${e.nome}.`)}" target="_blank" rel="noopener">${icone('whatsapp')} Falar sobre ${e.nome.toLowerCase()}</a>
			</p>
		</aside>
	</div>
</section>

<section class="secao" style="background:var(--lilas-50)">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Como conduzimos</p>
			<h2>O caminho do tratamento.</h2>
		</div>
		<div class="grid cols-4">
			${e.etapas
				.map(
					(et, i) => `<article class="cartao revelar" style="--atraso:${0.05 * i}s">
				<span class="numero-ordem">0${i + 1}</span>
				<h3>${et.titulo}</h3>
				<p>${et.texto}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:start">
		<div class="revelar">
			<p class="eyebrow">Perguntas frequentes</p>
			<h2>O que os pacientes mais perguntam.</h2>
			<p class="lead mt-1">Ficou uma dúvida que não está aqui? Mande pelo WhatsApp — a resposta vem de dentista, não de robô.</p>
		</div>
		<div class="revelar" style="--atraso:.08s">
			${e.faq
				.map(
					(f) => `<details class="cartao" style="margin-bottom:.85rem">
				<summary style="cursor:pointer;font-weight:600;font-size:1.05rem;list-style:none">${f.p}</summary>
				<p class="mt-1">${f.r}</p>
			</details>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao escuro">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Continue explorando</p>
			<h2>Outras especialidades do instituto.</h2>
		</div>
		<div class="grid cols-3">
			${outras
				.map(
					(o, i) => `<a class="cartao revelar" style="--atraso:${0.05 * i}s" href="/especialidades/${o.slug}.html">
				<span class="icone">${icone(o.icone)}</span>
				<h3>${o.nome}</h3>
				<p>${o.resumo}</p>
				<span class="link-seta">Ver a especialidade ${icone('seta')}</span>
			</a>`
				)
				.join('\n\t\t\t')}
		</div>
		<p class="mt-3 revelar"><a class="btn btn-ouro" href="/especialidades.html">Ver todas as ${especialidades.length} especialidades ${icone('seta')}</a></p>
	</div>
</section>
`;
};

/* Dados estruturados de FAQ para as páginas de especialidade */
export const schemaFaq = (e) => ({
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: e.faq.map((f) => ({
		'@type': 'Question',
		name: f.p,
		acceptedAnswer: { '@type': 'Answer', text: f.r }
	}))
});
