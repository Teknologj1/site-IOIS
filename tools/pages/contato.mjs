import { site, zapPadrao } from '../data/site.mjs';
import { especialidades } from '../data/especialidades.mjs';
import { icone } from '../lib/icones.mjs';
import { capa } from './institucionais.mjs';

export const contato = () => `
${capa({
	eyebrow: 'Contato',
	titulo: 'Vamos conversar sobre o seu caso.',
	lead: 'Agende sua avaliação pelo WhatsApp ou envie uma mensagem. Respondemos em até um dia útil.',
	migalhas: [{ rotulo: 'Contato' }]
})}

<section class="secao">
	<div class="wrap grid cols-2" style="align-items:start">
		<div class="revelar">
			<p class="eyebrow">Onde estamos</p>
			<h2>Instituto IOIS</h2>
			<ul class="lista-linhas mt-2">
				<li><span class="rotulo">Endereço</span> <a href="${site.endereco.mapa}" target="_blank" rel="noopener">${site.endereco.linha}<br>${site.endereco.bairro} · ${site.endereco.cidade}/${site.endereco.uf}</a></li>
				<li><span class="rotulo">WhatsApp</span> <a href="https://wa.me/${site.whatsapp.numero}" target="_blank" rel="noopener">${site.whatsapp.exibicao}</a></li>
				<li><span class="rotulo">Telefone</span> <a href="tel:+${site.telefone.numero}">${site.telefone.exibicao}</a></li>
				<li><span class="rotulo">E-mail</span> <a href="mailto:${site.email}">${site.email}</a></li>
				<li><span class="rotulo">Horário</span> <span>${site.horario}</span></li>
				<li><span class="rotulo">Instagram</span> <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.usuario}</a></li>
			</ul>
			<div class="hero-ctas" style="margin-top:2rem">
				<a class="btn btn-primario" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Agendar pelo WhatsApp</a>
				<a class="btn btn-contorno" href="${site.endereco.mapa}" target="_blank" rel="noopener">${icone('local')} Como chegar</a>
			</div>
		</div>

		<div class="cartao revelar" style="--atraso:.08s">
			<p class="eyebrow">Formulário</p>
			<h3>Envie sua mensagem</h3>
			<form class="formulario mt-2" id="form-contato" action="/api/contato.php" method="post">
				<div class="aviso aviso-ok" role="status" tabindex="-1" hidden>Mensagem enviada. Em breve entraremos em contato — obrigado!</div>
				<div class="aviso aviso-erro" role="alert" hidden></div>

				<div class="campo-duplo">
					<div class="campo">
						<label for="nome">Nome completo</label>
						<input type="text" id="nome" name="nome" required minlength="3" maxlength="120" autocomplete="name" placeholder="Como podemos te chamar?">
					</div>
					<div class="campo">
						<label for="telefone">Telefone / WhatsApp</label>
						<input type="tel" id="telefone" name="telefone" required maxlength="30" autocomplete="tel" placeholder="(61) 90000-0000">
					</div>
				</div>

				<div class="campo">
					<label for="email">E-mail</label>
					<input type="email" id="email" name="email" maxlength="150" autocomplete="email" placeholder="seu@email.com">
				</div>

				<div class="campo">
					<label for="assunto">Assunto</label>
					<select id="assunto" name="assunto">
						<option value="Avaliação / primeira consulta">Avaliação / primeira consulta</option>
						${especialidades.map((e) => `<option value="${e.nome}">${e.nome}</option>`).join('\n\t\t\t\t\t\t')}
						<option value="Cursos e mentoria">Cursos e mentoria (sou dentista)</option>
						<option value="Outro assunto">Outro assunto</option>
					</select>
				</div>

				<div class="campo">
					<label for="mensagem">Mensagem</label>
					<textarea id="mensagem" name="mensagem" required minlength="10" maxlength="2000" placeholder="Conte brevemente o que você está sentindo ou o que gostaria de tratar."></textarea>
				</div>

				<div class="honeypot" aria-hidden="true">
					<label for="site-url">Não preencha este campo</label>
					<input type="text" id="site-url" name="site_url" tabindex="-1" autocomplete="off">
				</div>
				<input type="hidden" name="carregado_em" value="">

				<button class="btn btn-primario" type="submit">Enviar mensagem</button>
				<button class="btn btn-contorno" type="button" data-zap-form="https://wa.me/${site.whatsapp.numero}">${icone('whatsapp')} Enviar pelo WhatsApp</button>

				<p class="consentimento">
					Ao enviar, você concorda que o ${site.nome} use estes dados apenas para responder ao seu contato,
					conforme a Lei Geral de Proteção de Dados. Não compartilhamos suas informações com terceiros.
				</p>
			</form>
		</div>
	</div>
</section>

<section class="secao-topo" style="padding-bottom:var(--secao-y)">
	<div class="wrap">
		<div class="moldura-img revelar" style="width:100%;aspect-ratio:16/9">
			<iframe
				title="Mapa com a localização do ${site.nome}"
				src="https://www.google.com/maps?q=${encodeURIComponent('Liberty Mall Torre B, SCN Quadra 2, Brasília - DF')}&output=embed"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				style="width:100%;height:100%;border:0;display:block"></iframe>
		</div>
	</div>
</section>
`;

export const obrigado = () => `
${capa({
	eyebrow: 'Mensagem recebida',
	titulo: 'Obrigado pelo contato.',
	lead: 'Sua mensagem chegou até nós. A equipe do Instituto IOIS responde em até um dia útil — se preferir agilidade, fale com a gente pelo WhatsApp.',
	migalhas: [{ rotulo: 'Contato', href: '/contato.html' }, { rotulo: 'Obrigado' }]
})}

<section class="secao">
	<div class="wrap wrap-estreito centro">
		<span class="icone" style="margin-inline:auto">${icone('check')}</span>
		<h2 class="mt-1">Enquanto isso, fique à vontade.</h2>
		<p class="lead mt-1">Conheça as especialidades do instituto ou acompanhe o dia a dia no Instagram.</p>
		<div class="hero-ctas" style="justify-content:center">
			<a class="btn btn-primario" href="${zapPadrao}" target="_blank" rel="noopener">${icone('whatsapp')} Falar no WhatsApp</a>
			<a class="btn btn-contorno" href="/especialidades.html">Ver especialidades</a>
		</div>
	</div>
</section>
`;

export const erro404 = () => `
${capa({
	eyebrow: 'Erro 404',
	titulo: 'Essa página não existe mais.',
	lead: 'O endereço mudou ou o link está incorreto. Vamos te levar de volta para o caminho certo.'
})}

<section class="secao">
	<div class="wrap wrap-estreito centro">
		<div class="hero-ctas" style="justify-content:center">
			<a class="btn btn-primario" href="/">Ir para a página inicial</a>
			<a class="btn btn-contorno" href="/especialidades.html">Ver especialidades</a>
			<a class="btn btn-contorno" href="/contato.html">Falar com o instituto</a>
		</div>
	</div>
</section>
`;
