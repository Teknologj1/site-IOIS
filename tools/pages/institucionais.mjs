import { site, zapPadrao } from '../data/site.mjs';
import { especialidades } from '../data/especialidades.mjs';
import { icone } from '../lib/icones.mjs';
import { foto } from '../lib/layout.mjs';

const capa = ({ eyebrow, titulo, lead, migalhas = [] }) => `
<section class="hero-interno grao">
	<div class="wrap">
		${migalhas.length
			? `<nav class="migalhas" aria-label="Você está aqui">
			<a href="/">Início</a>${migalhas.map((m) => ` <span aria-hidden="true">/</span> ${m.href ? `<a href="${m.href}">${m.rotulo}</a>` : `<span>${m.rotulo}</span>`}`).join('')}
		</nav>`
			: ''}
		<p class="eyebrow">${eyebrow}</p>
		<h1>${titulo}</h1>
		<p class="lead">${lead}</p>
	</div>
</section>`;

export { capa };

/* ------------------------------------------------------------------ INSTITUTO */
const diferenciais = [
	{ icone: 'microscopio', titulo: 'Diagnóstico antes da conduta', texto: 'Fotografia clínica, radiografia digital, tomografia e escaneamento quando o caso pede. Proposta de tratamento sem exame é chute com nome bonito.' },
	{ icone: 'escudo', titulo: 'Biossegurança levada a sério', texto: 'Fluxo de esterilização com rastreabilidade, materiais de uso único e protocolos revisados — o que você não vê é o que mais importa.' },
	{ icone: 'pessoas', titulo: 'Equipe que conversa entre si', texto: 'Periodontia, ortodontia, implante e prótese planejando o mesmo caso juntas, em vez de tratamentos paralelos que se atrapalham.' },
	{ icone: 'lua', titulo: 'Sedação para quem tem medo', texto: 'Sedação inalatória com óxido nitroso, conduzida por profissional habilitada. Para quem adia o dentista há anos, é o que torna a consulta possível — desperta consciente, calmo e sem o efeito residual de um sedativo oral.' },
	{ icone: 'relogio', titulo: 'Tempo de consulta real', texto: 'Agenda organizada para que ninguém seja atendido com pressa. É o que permite escutar, explicar e decidir com você.' },
	{ icone: 'relatorio', titulo: 'Plano por escrito', texto: 'Você recebe etapas, prazos e valores de forma transparente, com as alternativas quando elas existem.' },
	{ icone: 'coracao', titulo: 'Cuidado que continua', texto: 'Manutenção programada e canal aberto após o tratamento. O acompanhamento é parte do resultado, não cortesia.' }
];

export const instituto = () => `
${capa({
	eyebrow: 'O Instituto',
	titulo: 'Odontologia integrativa, feita com tempo e método.',
	lead: 'O Instituto IOIS nasceu para tratar o paciente inteiro — e não um dente por vez. Aqui, tecnologia serve ao diagnóstico, e diagnóstico serve à decisão que é sua.',
	migalhas: [{ rotulo: 'O Instituto' }]
})}

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:start">
		<div class="revelar">
			<p class="eyebrow">Nossa filosofia</p>
			<h2>Tratar a boca reconhecendo o corpo inteiro.</h2>
		</div>
		<div class="revelar" style="--atraso:.08s">
			<p class="lead">
				A boca é uma região de fronteira: respiração, sono, mastigação, postura, autoestima e imunidade passam
				por ela. Ignorar essas conexões é o que faz um tratamento tecnicamente correto fracassar na vida real.
			</p>
			<p class="mt-2">
				Por isso, nosso protocolo começa por perguntas que muita gente estranha ouvir em um consultório
				odontológico: como você dorme, se acorda com dor de cabeça, se respira pela boca, o que mudou na sua
				rotina. As respostas mudam o plano de tratamento com frequência.
			</p>
			<p class="mt-2">
				A partir daí, cada especialidade entra no momento certo — periodontia antes da estética, ortodontia
				antes da prótese, DTM antes de reabilitar a mordida. É uma sequência que preserva estrutura dentária,
				reduz retrabalho e sustenta o resultado ao longo do tempo.
			</p>
		</div>
	</div>
</section>

<section class="secao" style="background:var(--areia-50);padding-block:clamp(3rem,6vw,5rem)">
	<div class="wrap">
		<div class="stats revelar">
			<div class="stat"><strong><span data-contador="${site.anos}" data-sufixo="+">${site.anos}+</span></strong><span>anos de prática clínica</span></div>
			<div class="stat"><strong><span data-contador="${especialidades.length}">${especialidades.length}</span></strong><span>especialidades atendidas</span></div>
			<div class="stat"><strong><span data-contador="${site.pacientes}" data-sufixo="+">${site.pacientes}+</span></strong><span>pacientes cuidados</span></div>
			<div class="stat"><strong>1</strong><span>plano de tratamento por pessoa, nunca por protocolo</span></div>
		</div>
	</div>
</section>

<section class="secao">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">O que nos diferencia</p>
			<h2>Detalhes que definem o resultado.</h2>
		</div>
		<div class="grid cols-3">
			${diferenciais
				.map(
					(d, i) => `<article class="cartao revelar" style="--atraso:${0.05 * i}s">
				<span class="icone">${icone(d.icone)}</span>
				<h3>${d.titulo}</h3>
				<p>${d.texto}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao escuro grao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">Estrutura</p>
			<h2>Um espaço pensado para baixar a guarda.</h2>
			<p class="lead mt-1">
				No Liberty Mall, em ${site.cidade}, com acesso simples, estacionamento e um ambiente que não parece
				consultório — porque medo de dentista também se trata com arquitetura, luz e acolhimento.
			</p>
			<ul class="lista-check mt-2">
				<li>Consultórios equipados para clínica, cirurgia e reabilitação</li>
				<li>Radiologia digital e fluxo de escaneamento intraoral</li>
				<li>Central de esterilização com fluxo controlado</li>
				<li>Sedação inalatória com óxido nitroso para atendimentos mais tranquilos</li>
				<li>Localização central, com fácil acesso e estacionamento</li>
			</ul>
			<p class="mt-2"><a class="btn btn-ouro" href="${site.endereco.mapa}" target="_blank" rel="noopener">${icone('local')} Ver no mapa</a></p>
		</div>
		<div class="moldura-img revelar" style="--atraso:.1s">
			${foto({ arquivo: 'atendimento-detalhe.jpg', alt: 'Equipe do Instituto IOIS durante um atendimento', largura: 1080, altura: 810, sizes: '(max-width: 62rem) 92vw, 34rem' })}
		</div>
	</div>
</section>

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="moldura-img revelar">
			${foto({ arquivo: 'equipe-iois.jpg', alt: 'Equipe do Instituto IOIS discutindo um caso clínico', largura: 1080, altura: 810, sizes: '(max-width: 62rem) 92vw, 34rem' })}
		</div>
		<div class="revelar" style="--atraso:.1s">
			<p class="eyebrow">Equipe</p>
			<h2>Especialidades que conversam entre si.</h2>
			<p class="lead mt-1">
				O caso é discutido em conjunto antes de virar plano de tratamento. Periodontia, ortodontia, implante
				e prótese decidem a sequência juntas — é isso que evita retrabalho e preserva estrutura dentária.
			</p>
		</div>
	</div>
</section>

<section class="secao" style="background:var(--areia-50)">
	<div class="wrap centro">
		<h2 class="revelar">Conheça o instituto de perto.</h2>
		<p class="lead revelar mt-1" style="max-width:38rem;margin-inline:auto">Agende uma avaliação e entenda o seu caso por inteiro, sem compromisso de fechar tratamento na hora.</p>
		<p class="mt-2 revelar"><a class="btn btn-primario" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Agendar avaliação</a></p>
	</div>
</section>
`;

/* -------------------------------------------------------------- DRA. IOLANDA */
export const iolanda = () => `
${capa({
	eyebrow: 'Responsável técnica',
	titulo: 'Dra. Iolanda Schroeder',
	lead: `Cirurgiã-dentista há 16 anos, fundadora e diretora do Instituto IOIS, professora e palestrante. ${site.croResponsavel}.`,
	migalhas: [{ rotulo: 'Dra. Iolanda' }]
})}

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="retrato-moldura revelar" style="max-width:26rem">
			<figure class="retrato">
				${foto({ arquivo: 'iolanda-pagina.jpg', alt: 'Dra. Iolanda Schroeder, responsável técnica do Instituto IOIS', largura: 1200, altura: 1500, sizes: '(max-width: 62rem) 92vw, 26rem' })}
			</figure>
		</div>
		<div class="revelar" style="--atraso:.08s">
			<p class="eyebrow">Trajetória</p>
			<h2>Quem estuda a vida inteira trata melhor.</h2>
			<p class="lead mt-1">
				São 16 anos de clínica dedicados à reabilitação oral e à saúde integrativa. A formação começou no
				detalhe técnico — especialização em Prótese Dentária, implantodontia de alta performance — e seguiu
				na direção do corpo inteiro: odontologia integrativa, extensão em Medicina Funcional Integrativa e
				educação continuada na Harvard Medical School.
			</p>
			<p class="mt-2">
				Hoje conduz o instituto, planeja casos complexos junto com as demais especialidades e ensina
				cirurgiões-dentistas. Ensinar, para ela, é a forma mais honesta de se manter atualizada: obriga a
				revisar, justificar e provar cada conduta.
			</p>
			<div class="hero-ctas" style="margin-top:2rem">
				<a class="btn btn-ouro" href="${site.instagramIolanda.url}" target="_blank" rel="noopener">${icone('instagram')} ${site.instagramIolanda.usuario}</a>
				<a class="btn btn-contorno" href="${site.instagram.url}" target="_blank" rel="noopener">${icone('instagram')} ${site.instagram.usuario}</a>
			</div>
		</div>
	</div>
</section>

<section class="secao" style="background:var(--areia-50)">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Formação e atuação</p>
			<h2>O que sustenta cada conduta.</h2>
		</div>
		<div class="grid cols-3">
			<article class="cartao revelar">
				<span class="icone">${icone('formatura')}</span>
				<h3>Formação</h3>
				<ul class="lista-check mt-1">
					<li>Especialista em Prótese Dentária</li>
					<li>Formação e atuação em Odontologia Integrativa</li>
					<li>Educação Continuada na Harvard Medical School (2019)</li>
					<li>Extensão clínica em Medicina Funcional Integrativa</li>
				</ul>
			</article>
			<article class="cartao revelar" style="--atraso:.06s">
				<span class="icone">${icone('escudo')}</span>
				<h3>Habilitações</h3>
				<ul class="lista-check mt-1">
					<li>Harmonização orofacial, toxina botulínica e preenchimento facial</li>
					<li>Laserterapia e cirurgias com laser</li>
					<li>Sedação inalatória com óxido nitroso</li>
					<li>Frenectomia lingual e labial a laser</li>
				</ul>
			</article>
			<article class="cartao revelar" style="--atraso:.12s">
				<span class="icone">${icone('coracao')}</span>
				<h3>Atuação clínica</h3>
				<ul class="lista-check mt-1">
					<li>Implantodontia com zircônia e reabilitações de alta performance</li>
					<li>Odontopediatria preventiva e ortopedia funcional dos maxilares</li>
					<li>Alinhadores invisíveis para crianças, adolescentes e adultos</li>
					<li>Odontologia miofuncional e miofacial</li>
				</ul>
			</article>
		</div>
	</div>
</section>

<section class="secao escuro grao">
	<div class="wrap wrap-estreito centro">
		<span class="aspas" aria-hidden="true">&ldquo;</span>
		<blockquote class="citacao revelar">
			Segurança não se transmite pelo discurso. Vem de estudar todos os dias e de explicar ao paciente,
			com honestidade, o que dá para fazer e o que não dá.
		</blockquote>
		<p class="citacao-autor revelar">Dra. Iolanda Schroeder — ${site.nome}</p>
	</div>
</section>

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">Ensino</p>
			<h2>Também ensina o que pratica.</h2>
			<p class="lead mt-1">
				Os cursos e mentorias da Dra. Iolanda nascem dos casos do próprio instituto: o que funcionou, o que
				não funcionou e por quê. Formação sem teoria descolada da cadeira.
			</p>
			<p class="mt-2"><a class="btn btn-primario" href="/cursos.html">Conhecer os cursos ${icone('seta')}</a></p>
		</div>
		<div class="moldura-img revelar" style="--atraso:.08s;max-width:26rem;margin-inline:auto">
			${foto({ arquivo: 'iolanda-estudio.jpg', alt: 'Dra. Iolanda Schroeder', largura: 900, altura: 1125, sizes: '(max-width: 62rem) 92vw, 26rem', estilo: 'width:100%' })}
		</div>
	</div>
</section>
`;

/* ------------------------------------------------------------------- CURSOS */
const formatos = [
	{ icone: 'formatura', titulo: 'Cursos presenciais', texto: 'Turmas reduzidas no próprio instituto, com discussão de casos e prática supervisionada.' },
	{ icone: 'pessoas', titulo: 'Mentoria individual', texto: 'Acompanhamento de casos do seu consultório, com plano de desenvolvimento clínico definido a quatro mãos.' },
	{ icone: 'onda', titulo: 'Imersões temáticas', texto: 'Encontros focados em odontologia integrativa, DTM, reabilitação e harmonização orofacial.' }
];

export const cursos = () => `
${capa({
	eyebrow: 'Para cirurgiões-dentistas',
	titulo: 'Formação continuada com a Dra. Iolanda.',
	lead: 'O instituto também é escola. Conteúdo construído a partir da clínica real — protocolo, diagnóstico e a lógica integrativa por trás de cada decisão.',
	migalhas: [{ rotulo: 'Cursos' }]
})}

<section class="secao">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Formatos</p>
			<h2>Aprender com quem está na cadeira todo dia.</h2>
			<p class="lead">
				Não é curso de palco. É a rotina de um instituto que trata casos complexos, aberta para colegas que
				querem elevar o próprio padrão clínico — conduzida por quem soma 16 anos de clínica, especialização
				em Prótese Dentária, educação continuada na Harvard Medical School e habilitações em harmonização
				orofacial, laserterapia e sedação.
			</p>
		</div>
		<div class="grid cols-3">
			${formatos
				.map(
					(f, i) => `<article class="cartao revelar" style="--atraso:${0.06 * i}s">
				<span class="icone">${icone(f.icone)}</span>
				<h3>${f.titulo}</h3>
				<p>${f.texto}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao escuro grao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">O que você leva</p>
			<h2>Método, não receita.</h2>
			<ul class="lista-check mt-2">
				<li>Raciocínio diagnóstico aplicável no dia seguinte</li>
				<li>Sequência de tratamento em casos multidisciplinares</li>
				<li>Critérios de indicação — e de contraindicação</li>
				<li>Comunicação clínica: como explicar o plano ao paciente</li>
				<li>Documentação e acompanhamento de resultados</li>
			</ul>
		</div>
		<div class="cartao revelar" style="--atraso:.1s">
			<p class="eyebrow">Próximas turmas</p>
			<h3>Quer ser avisado quando abrirem as inscrições?</h3>
			<p class="mt-1">Envie uma mensagem com o seu nome, a sua cidade e a sua área de interesse. Retornamos com o calendário assim que as datas forem confirmadas.</p>
			<p class="mt-2">
				<a class="btn btn-primario" href="https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent('Olá! Sou cirurgião-dentista e gostaria de saber sobre os cursos e mentorias da Dra. Iolanda Schroeder.')}" target="_blank" rel="noopener">${icone('whatsapp')} Falar sobre os cursos</a>
			</p>
		</div>
	</div>
</section>

<section class="secao">
	<div class="wrap centro">
		<p class="eyebrow revelar" style="justify-content:center">Conteúdo aberto</p>
		<h2 class="revelar">Acompanhe também no Instagram.</h2>
		<p class="lead revelar mt-1" style="max-width:38rem;margin-inline:auto">
			Conteúdo clínico e a rotina da Dra. Iolanda em ${site.instagramIolanda.usuario}; casos e bastidores do
			instituto em ${site.instagram.usuario}.
		</p>
		<div class="hero-ctas revelar" style="justify-content:center">
			<a class="btn btn-primario" href="${site.instagramIolanda.url}" target="_blank" rel="noopener">${icone('instagram')} ${site.instagramIolanda.usuario}</a>
			<a class="btn btn-contorno" href="${site.instagram.url}" target="_blank" rel="noopener">${icone('instagram')} ${site.instagram.usuario}</a>
		</div>
	</div>
</section>
`;
