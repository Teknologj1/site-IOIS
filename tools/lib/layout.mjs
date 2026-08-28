import { site, menu, zapPadrao } from '../data/site.mjs';
import { icone } from './icones.mjs';

/* ---------------------------------------------------------------------
   Marca
   --------------------------------------------------------------------- */
export const logo = (titulo = site.nome, altura = 38) => {
	const larg = Math.round((altura * 437) / 183); /* proporção do letreiro oficial */
	return `<img class="logo-marca" src="/assets/img/letreiro-iois.png" alt="${titulo}" width="${larg}" height="${altura}">
				<img class="logo-marca logo-claro" src="/assets/img/letreiro-iois-claro.png" alt="" aria-hidden="true" width="${larg}" height="${altura}">`;
};

/* ---------------------------------------------------------------------
   Foto com srcset — as larguras extras vêm de tools/gerar-variantes.mjs
   --------------------------------------------------------------------- */
export const foto = ({
	arquivo,
	alt,
	largura,
	altura,
	sizes = '100vw',
	prioridade = false,
	classe = '',
	estilo = ''
}) => {
	const base = `/assets/img/${arquivo}`;
	const semExt = base.replace(/\.jpg$/i, '');
	const conjunto = [480, 900]
		.filter((l) => l < largura * 0.91)
		.map((l) => `${semExt}-${l}.jpg ${l}w`)
		.concat(`${base} ${largura}w`)
		.join(', ');
	return `<img src="${base}" srcset="${conjunto}" sizes="${sizes}"`
		+ ` width="${largura}" height="${altura}" alt="${alt}"`
		+ (classe ? ` class="${classe}"` : '')
		+ (estilo ? ` style="${estilo}"` : '')
		+ (prioridade ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"')
		+ '>';
};

/* ---------------------------------------------------------------------
   Cabeçalho
   --------------------------------------------------------------------- */
const cabecalho = (ativo, heroEscuro) => `
	<header class="cabecalho${heroEscuro ? ' sobre-escuro' : ''}">
		<div class="wrap cabecalho-inner">
			<a class="marca" href="/" aria-label="${site.nome} — página inicial">
				${logo()}
			</a>
			<nav class="menu" aria-label="Menu principal">
				${menu.map((i) => `<a href="${i.href}"${i.id === ativo ? ' aria-current="page"' : ''}>${i.rotulo}</a>`).join('\n\t\t\t\t')}
			</nav>
			<div class="cabecalho-acoes">
				<a class="btn btn-contorno btn-fone" href="tel:+${site.telefone.numero}">${icone('telefone')} ${site.telefone.exibicao}</a>
				<a class="btn btn-primario" href="${zapPadrao}" target="_blank" rel="noopener">Agendar avaliação</a>
				<button class="hamburguer" type="button" aria-expanded="false" aria-controls="gaveta" aria-label="Abrir menu">
					<span></span><span></span><span></span>
				</button>
			</div>
		</div>
	</header>

	<div class="gaveta" id="gaveta" aria-hidden="true">
		<nav aria-label="Menu">
			${menu.map((i) => `<a href="${i.href}">${i.rotulo}</a>`).join('\n\t\t\t')}
		</nav>
		<div class="gaveta-contato">
			<a class="btn btn-primario" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Agendar pelo WhatsApp</a>
			<p>${site.endereco.linha}<br>${site.endereco.cidade} — ${site.endereco.uf}</p>
			<p><a href="tel:+${site.telefone.numero}">${site.telefone.exibicao}</a> · <a href="mailto:${site.email}">${site.email}</a></p>
		</div>
	</div>`;

/* ---------------------------------------------------------------------
   Rodapé
   --------------------------------------------------------------------- */
const rodape = (especialidadesDestaque = []) => `
	<footer class="rodape">
		<div class="wrap">
			<div class="rodape-grid">
				<div class="rodape-sobre">
					<a class="marca" href="/" aria-label="${site.nome}">${logo(site.nome, 46)}</a>
					<p>Odontologia integrativa em ${site.cidade}: cuidamos da saúde bucal reconhecendo sua conexão com o corpo inteiro — com todas as especialidades sob o mesmo teto.</p>
					<div class="redes">
						<a href="${site.instagram.url}" target="_blank" rel="noopener" aria-label="Instagram do ${site.nome}">${icone('instagram')}</a>
						<a href="https://wa.me/${site.whatsapp.numero}" target="_blank" rel="noopener" aria-label="WhatsApp do ${site.nome}">${icone('whatsapp')}</a>
						<a href="mailto:${site.email}" aria-label="E-mail do ${site.nome}">${icone('email')}</a>
					</div>
				</div>
				<div>
					<h4>Navegação</h4>
					<ul>${menu.map((i) => `<li><a href="${i.href}">${i.rotulo}</a></li>`).join('')}</ul>
				</div>
				<div>
					<h4>Especialidades</h4>
					<ul>${especialidadesDestaque.map((e) => `<li><a href="/especialidades/${e.slug}.html">${e.nome}</a></li>`).join('')}
						<li><a href="/especialidades.html">Ver todas</a></li></ul>
				</div>
				<div>
					<h4>Atendimento</h4>
					<ul>
						<li><a href="${site.endereco.mapa}" target="_blank" rel="noopener">${site.endereco.linha}<br>${site.endereco.bairro} · ${site.endereco.cidade}/${site.endereco.uf}</a></li>
						<li><a href="tel:+${site.telefone.numero}">${site.telefone.exibicao}</a></li>
						<li><a href="https://wa.me/${site.whatsapp.numero}" target="_blank" rel="noopener">${site.whatsapp.exibicao} (WhatsApp)</a></li>
						<li><a href="mailto:${site.email}">${site.email}</a></li>
						<li>${site.horario}</li>
					</ul>
				</div>
			</div>
			<div class="rodape-base">
				<p>© <span data-ano>2026</span> ${site.nome}. Todos os direitos reservados.</p>
				<p>${site.nome} — ${site.croInstituto} · Responsável técnica: ${site.responsavel} — ${site.croResponsavel}</p>
			</div>
		</div>
	</footer>

	<a class="zap" href="${zapPadrao}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
		${icone('whatsapp')}<span>Falar no WhatsApp</span>
	</a>`;

/* ---------------------------------------------------------------------
   Dados estruturados
   --------------------------------------------------------------------- */
const dadosDaClinica = {
	'@context': 'https://schema.org',
	'@type': 'Dentist',
	name: site.nome,
	alternateName: 'IOIS',
	description: site.descricao,
	url: site.dominio,
	logo: `${site.dominio}/assets/img/logo-iois.png`,
	image: `${site.dominio}/assets/img/og-iois.png`,
	telephone: `+${site.telefone.numero}`,
	email: site.email,
	address: {
		'@type': 'PostalAddress',
		streetAddress: site.endereco.linha,
		addressLocality: site.endereco.cidade,
		addressRegion: site.endereco.uf,
		postalCode: site.endereco.cep,
		addressCountry: 'BR'
	},
	openingHoursSpecification: [
		{
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '08:00',
			closes: '18:00'
		}
	],
	sameAs: [site.instagram.url],
	priceRange: '$$',
	founder: { '@type': 'Person', name: site.responsavel, jobTitle: 'Cirurgiã-dentista' }
};

/* ---------------------------------------------------------------------
   Documento
   --------------------------------------------------------------------- */
export const pagina = ({
	titulo,
	descricao,
	caminho,
	ativo = '',
	corpo,
	heroEscuro = true,
	schemaExtra = null,
	imagem = '/assets/img/og-iois.png',
	especialidadesRodape = []
}) => {
	const url = site.dominio + (caminho === '/index.html' ? '/' : caminho);
	const schemas = [dadosDaClinica].concat(schemaExtra || []);
	return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${descricao}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${site.nome}">
<meta name="theme-color" content="#0b0a0f">

<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${site.nome}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${descricao}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}${imagem}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/favicon.png" type="image/png" sizes="96x96">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preload" href="/assets/fonts/cormorant-garamond-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/css/style.css">

<script type="application/ld+json">${JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)}</script>
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${cabecalho(ativo, heroEscuro)}

<main id="conteudo">
${corpo}
</main>

${rodape(especialidadesRodape)}
<script src="/assets/js/app.js" defer></script>
</body>
</html>
`;
};
