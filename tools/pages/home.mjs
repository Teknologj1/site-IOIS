import { site, zapPadrao } from '../data/site.mjs';
import { especialidades, destaques } from '../data/especialidades.mjs';
import { icone } from '../lib/icones.mjs';

const pilares = [
	{
		icone: 'coracao',
		titulo: 'A boca conversa com o corpo',
		texto: 'Inflamação gengival, bruxismo, respiração e sono não param nos dentes. Cada plano de tratamento aqui começa por entender o que a sua boca está dizendo sobre o resto.'
	},
	{
		icone: 'brilho',
		titulo: 'Estética com função',
		texto: 'Harmonização orofacial e reabilitação estética conduzidas por quem domina a anatomia do sorriso. Naturalidade não é um estilo: é o critério clínico.'
	},
	{
		icone: 'formatura',
		titulo: 'Estudo que não para',
		texto: 'A Dra. Iolanda ensina o que pratica e atualiza o que ensina. Formação continuada é o que transforma tecnologia em segurança para quem senta na cadeira.'
	}
];

const jornada = [
	{ titulo: 'Escuta', texto: 'A primeira consulta é conversa e exame — histórico de saúde, queixas, rotina, sono e o que você espera do seu sorriso.' },
	{ titulo: 'Diagnóstico', texto: 'Documentação fotográfica, radiografias e, quando indicado, tomografia e escaneamento digital. Nada é proposto sem imagem que sustente.' },
	{ titulo: 'Plano transparente', texto: 'Você recebe as opções, o que cada uma resolve, o que custa e o que acontece se não fizer nada. A decisão é sua, com informação completa.' },
	{ titulo: 'Acompanhamento', texto: 'Tratamento executado por etapas, com retornos programados e manutenção — porque resultado que não é acompanhado não se mantém.' }
];

const posts = [1, 2, 3, 4, 5, 6, 8, 9, 10];

export const home = () => `
<section class="hero grao">
	<div class="wrap hero-grid">
		<div>
			<p class="eyebrow revelar">Instituto IOIS · ${site.cidade} — ${site.uf}</p>
			<h1 class="display revelar" style="--atraso:.05s">Seu sorriso é a porta de entrada da sua <span class="destaque">saúde</span>.</h1>
			<p class="lead revelar" style="--atraso:.12s">
				Somos um instituto de odontologia integrativa: todas as especialidades sob o mesmo teto e uma mesma
				convicção — tratar a boca reconhecendo tudo o que ela move no corpo, na face e na sua rotina.
			</p>
			<div class="hero-ctas revelar" style="--atraso:.18s">
				<a class="btn btn-claro" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Agendar avaliação</a>
				<a class="btn btn-ouro" href="/instituto.html">Conhecer o instituto</a>
			</div>
			<div class="hero-selos revelar" style="--atraso:.24s">
				<div><strong><span data-contador="${site.anos}" data-sufixo="+">${site.anos}+</span></strong>anos de clínica</div>
				<div><strong><span data-contador="${especialidades.length}">${especialidades.length}</span></strong>especialidades atendidas</div>
				<div><strong><span data-contador="${site.pacientes}" data-sufixo="+">${site.pacientes}+</span></strong>pacientes cuidados</div>
			</div>
		</div>
		<div class="retrato-moldura revelar" style="--atraso:.2s">
			<figure class="retrato">
				<img src="/assets/img/iolanda-hero.jpg" width="520" height="693" alt="Dra. Iolanda Schroeder, responsável técnica do Instituto IOIS" fetchpriority="high" decoding="async">
			</figure>
			<div class="cartao-flutuante cartao-baixo-esq">
				${icone('formatura')}
				<div>
					<strong>Dra. Iolanda</strong>
					<span>Schroeder — responsável técnica e docente</span>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="faixa mascara-lateral">
	<div class="marquee">
		${[0, 1]
			.map(
				() => `<div class="marquee-grupo">${especialidades
					.map((e) => `<span class="marquee-item">${icone('brilho')} ${e.nome}</span>`)
					.join('')}</div>`
			)
			.join('')}
	</div>
</div>

<section class="secao">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Visão integrativa</p>
			<h2>A boca não é uma ilha —<br>e tratá-la como se fosse custa caro.</h2>
			<p class="lead">
				Dente que dói, gengiva que sangra, mandíbula que trava, sono que não descansa: quase nunca são
				episódios isolados. No IOIS, o diagnóstico começa antes do dente e termina depois dele.
			</p>
		</div>
		<div class="grid cols-3">
			${pilares
				.map(
					(p, i) => `<article class="cartao revelar" style="--atraso:${0.06 * i}s">
				<span class="icone">${icone(p.icone)}</span>
				<h3>${p.titulo}</h3>
				<p>${p.texto}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao" style="background:var(--lilas-50)">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Especialidades</p>
			<h2>Todas as especialidades odontológicas, sob o mesmo teto.</h2>
			<p class="lead">
				Você não é encaminhado para fora no meio do tratamento. O caso inteiro é planejado, executado e
				acompanhado aqui — com as equipes conversando entre si.
			</p>
		</div>
		<div class="grid cols-4">
			${destaques
				.slice(0, 8)
				.map(
					(e, i) => `<a class="cartao revelar" style="--atraso:${0.04 * i}s" href="/especialidades/${e.slug}.html">
				<span class="icone">${icone(e.icone)}</span>
				<h3>${e.nome}</h3>
				<p>${e.resumo}</p>
				<span class="link-seta">Saiba mais ${icone('seta')}</span>
			</a>`
				)
				.join('\n\t\t\t')}
		</div>
		<div class="pilulas mt-3 revelar">
			${especialidades
				.filter((e) => !destaques.slice(0, 8).includes(e))
				.map(
					(e) =>
						`<a class="pilula" href="${e.destaque ? `/especialidades/${e.slug}.html` : '/especialidades.html#' + e.slug}">${icone('check')} ${e.nome}</a>`
				)
				.join('\n\t\t\t')}
		</div>
		<p class="mt-3 revelar"><a class="btn btn-primario" href="/especialidades.html">Ver todas as especialidades ${icone('seta')}</a></p>
	</div>
</section>

<section class="secao escuro grao" style="position:relative;overflow:hidden">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="retrato-moldura revelar" style="max-width:26rem">
			<figure class="retrato">
				<img src="/assets/img/iolanda-retrato.jpg" width="520" height="693" alt="Dra. Iolanda Schroeder no Instituto IOIS" loading="lazy" decoding="async">
			</figure>
		</div>
		<div class="revelar" style="--atraso:.1s">
			<p class="eyebrow">Quem conduz</p>
			<h2>Dra. Iolanda Schroeder</h2>
			<p class="lead mt-1">
				Cirurgiã-dentista, responsável técnica do Instituto IOIS e professora. Construiu o instituto sobre
				uma ideia simples e exigente: quem cuida de gente precisa estudar a vida inteira.
			</p>
			<ul class="lista-check mt-2">
				<li>Formação continuada permanente, no Brasil e fora dele</li>
				<li>Docência e mentoria para cirurgiões-dentistas</li>
				<li>Planejamento integrado de casos complexos</li>
				<li>Odontologia integrativa, do diagnóstico à manutenção</li>
			</ul>
			<p class="mt-2">
				<a class="btn btn-ouro" href="/dra-iolanda.html">Conhecer a trajetória ${icone('seta')}</a>
			</p>
		</div>
	</div>
</section>

<section class="secao">
	<div class="wrap">
		<div class="cabecalho-secao revelar">
			<p class="eyebrow">Como funciona</p>
			<h2>Da primeira consulta ao acompanhamento.</h2>
			<p class="lead">Um método claro, sem surpresas de orçamento e sem etapas que você descobre no meio do caminho.</p>
		</div>
		<div class="grid cols-4">
			${jornada
				.map(
					(e, i) => `<article class="cartao revelar" style="--atraso:${0.05 * i}s">
				<span class="numero-ordem">0${i + 1}</span>
				<h3>${e.titulo}</h3>
				<p>${e.texto}</p>
			</article>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao" style="background:var(--osso)">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">Resultados reais</p>
			<h2>Transformações que começam pela saúde.</h2>
			<p class="lead mt-1">
				Casos acompanhados no instituto e publicados com autorização dos pacientes. Nenhum sorriso é igual ao
				outro — e nenhum plano de tratamento deveria ser.
			</p>
			<span class="estrelas mt-2">${[1, 2, 3, 4, 5].map(() => icone('estrela')).join('')}</span>
			<blockquote class="citacao mt-1" style="font-size:clamp(1.25rem,1rem+1.2vw,1.75rem)">
				Nunca tinham me explicado o meu caso inteiro antes. Saí entendendo o que eu tinha, o que precisava ser
				feito e por quê.
			</blockquote>
			<p class="citacao-autor">Paciente do Instituto IOIS</p>
		</div>
		<div class="casos revelar" style="--atraso:.1s">
			${[1, 2, 3, 4]
				.map(
					(n) => `<figure class="caso"><img src="/assets/img/casos/caso-0${n}.jpg" width="420" height="420" alt="Caso clínico acompanhado no Instituto IOIS" loading="lazy" decoding="async"></figure>`
				)
				.join('\n\t\t\t')}
		</div>
	</div>
</section>

<section class="secao escuro">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">Para cirurgiões-dentistas</p>
			<h2>Cursos e mentoria com a Dra. Iolanda.</h2>
			<p class="lead mt-1">
				O instituto também é sala de aula. A Dra. Iolanda compartilha com colegas o que aplica na clínica —
				protocolo, diagnóstico e a lógica integrativa por trás das decisões.
			</p>
			<p class="mt-2"><a class="btn btn-ouro" href="/cursos.html">Ver a agenda de formação ${icone('seta')}</a></p>
		</div>
		<div class="grid revelar" style="--atraso:.08s;gap:1rem">
			<article class="cartao"><span class="icone">${icone('formatura')}</span><h3>Formação prática</h3><p>Conteúdo construído a partir de casos reais conduzidos no instituto.</p></article>
			<article class="cartao"><span class="icone">${icone('pessoas')}</span><h3>Mentoria individual</h3><p>Acompanhamento de casos e desenvolvimento clínico para quem quer evoluir com método.</p></article>
		</div>
	</div>
</section>

<section class="secao-topo">
	<div class="wrap">
		<div class="cabecalho-secao centro revelar">
			<p class="eyebrow">${site.instagram.usuario}</p>
			<h2>O dia a dia do instituto.</h2>
			<p class="lead">Bastidores, orientação de saúde bucal e casos publicados com autorização.</p>
			<p class="mt-2"><a class="btn btn-primario" href="${site.instagram.url}" target="_blank" rel="noopener">${icone('instagram')} Seguir no Instagram</a></p>
		</div>
	</div>
	<div class="mascara-lateral" style="padding-block:1rem 4rem">
		<div class="ig-trilha">
			${[0, 1]
				.map(() =>
					posts
						.map(
							(n) => `<a class="ig-item" href="${site.instagram.url}" target="_blank" rel="noopener" aria-label="Ver publicação no Instagram do Instituto IOIS">
					<img src="/assets/img/ig/post-${n}.jpg" width="292" height="365" alt="Publicação do Instituto IOIS no Instagram" loading="lazy" decoding="async">
				</a>`
						)
						.join('')
				)
				.join('')}
		</div>
	</div>
</section>

<section class="secao escuro grao">
	<div class="wrap grid cols-2" style="align-items:center">
		<div class="revelar">
			<p class="eyebrow">Vamos começar</p>
			<h2>Agende sua avaliação no Instituto IOIS.</h2>
			<p class="lead mt-1">
				Uma consulta de avaliação já entrega o mais importante: entender o seu caso por inteiro e saber quais
				são os caminhos possíveis.
			</p>
			<div class="hero-ctas">
				<a class="btn btn-claro" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Falar no WhatsApp</a>
				<a class="btn btn-ouro" href="/contato.html">Enviar mensagem</a>
			</div>
		</div>
		<ul class="lista-linhas revelar" style="--atraso:.1s">
			<li><span class="rotulo">Endereço</span> <a href="${site.endereco.mapa}" target="_blank" rel="noopener" style="text-align:right">${site.endereco.linha}<br>${site.endereco.bairro} · ${site.endereco.cidade}/${site.endereco.uf}</a></li>
			<li><span class="rotulo">Telefone</span> <a href="tel:+${site.telefone.numero}">${site.telefone.exibicao}</a></li>
			<li><span class="rotulo">WhatsApp</span> <a href="https://wa.me/${site.whatsapp.numero}" target="_blank" rel="noopener">${site.whatsapp.exibicao}</a></li>
			<li><span class="rotulo">E-mail</span> <a href="mailto:${site.email}">${site.email}</a></li>
			<li><span class="rotulo">Horário</span> <span>${site.horarioCurto}</span></li>
		</ul>
	</div>
</section>
`;
