/* Instituto IOIS — interações do site (sem dependências externas) */
(function () {
	'use strict';

	var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------------------------------------------------------------
	   Cabeçalho: estado sólido ao rolar
	   --------------------------------------------------------------- */
	var cabecalho = document.querySelector('.cabecalho');
	if (cabecalho) {
		var aoRolar = function () {
			cabecalho.classList.toggle('fixo', window.scrollY > 40);
		};
		aoRolar();
		window.addEventListener('scroll', aoRolar, { passive: true });
	}

	/* ---------------------------------------------------------------
	   Menu mobile
	   --------------------------------------------------------------- */
	var botaoMenu = document.querySelector('.hamburguer');
	var gaveta = document.getElementById('gaveta');
	if (botaoMenu && gaveta) {
		var alternar = function (abrir) {
			botaoMenu.setAttribute('aria-expanded', String(abrir));
			gaveta.classList.toggle('aberta', abrir);
			gaveta.setAttribute('aria-hidden', String(!abrir));
			document.body.style.overflow = abrir ? 'hidden' : '';
		};
		botaoMenu.addEventListener('click', function () {
			alternar(botaoMenu.getAttribute('aria-expanded') !== 'true');
		});
		gaveta.addEventListener('click', function (e) {
			if (e.target.closest('a')) alternar(false);
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && gaveta.classList.contains('aberta')) alternar(false);
		});
	}

	/* ---------------------------------------------------------------
	   Revelação ao entrar na tela
	   --------------------------------------------------------------- */
	var reveláveis = document.querySelectorAll('.revelar');
	if (!('IntersectionObserver' in window) || reduzMovimento) {
		reveláveis.forEach(function (el) { el.classList.add('visivel'); });
	} else {
		var observador = new IntersectionObserver(function (entradas) {
			entradas.forEach(function (entrada) {
				if (entrada.isIntersecting) {
					entrada.target.classList.add('visivel');
					observador.unobserve(entrada.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
		reveláveis.forEach(function (el) { observador.observe(el); });
	}

	/* ---------------------------------------------------------------
	   Contadores (data-contador="2000" data-sufixo="+")
	   --------------------------------------------------------------- */
	var contadores = document.querySelectorAll('[data-contador]');
	var animarContador = function (el) {
		var alvo = parseFloat(el.getAttribute('data-contador'));
		var prefixo = el.getAttribute('data-prefixo') || '';
		var sufixo = el.getAttribute('data-sufixo') || '';
		if (reduzMovimento) {
			el.textContent = prefixo + alvo.toLocaleString('pt-BR') + sufixo;
			return;
		}
		var inicio = null;
		var duracao = 1600;
		var passo = function (agora) {
			if (inicio === null) inicio = agora;
			var p = Math.min((agora - inicio) / duracao, 1);
			var eased = 1 - Math.pow(1 - p, 3);
			el.textContent = prefixo + Math.round(alvo * eased).toLocaleString('pt-BR') + sufixo;
			if (p < 1) requestAnimationFrame(passo);
		};
		requestAnimationFrame(passo);
	};
	if (contadores.length) {
		if (!('IntersectionObserver' in window)) {
			contadores.forEach(animarContador);
		} else {
			var obsContador = new IntersectionObserver(function (entradas) {
				entradas.forEach(function (entrada) {
					if (entrada.isIntersecting) {
						animarContador(entrada.target);
						obsContador.unobserve(entrada.target);
					}
				});
			}, { threshold: 0.6 });
			contadores.forEach(function (el) { obsContador.observe(el); });
		}
	}

	/* ---------------------------------------------------------------
	   Formulário de contato
	   --------------------------------------------------------------- */
	var form = document.getElementById('form-contato');
	if (form) {
		/* Marca o momento em que a página carregou — o PHP recusa envios instantâneos (robôs) */
		var carregado = form.elements['carregado_em'];
		if (carregado) carregado.value = String(Date.now());

		var ok = form.querySelector('.aviso-ok');
		var erro = form.querySelector('.aviso-erro');
		var botao = form.querySelector('button[type="submit"]');
		var rotuloBotao = botao ? botao.textContent : '';

		form.addEventListener('submit', function (e) {
			e.preventDefault();
			if (!form.reportValidity()) return;

			ok.hidden = true;
			erro.hidden = true;
			if (botao) { botao.disabled = true; botao.textContent = 'Enviando…'; }

			fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { 'X-Requested-With': 'fetch' }
			})
				.then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
				.then(function (dados) {
					if (dados && dados.ok) {
						ok.hidden = false;
						ok.focus();
						form.reset();
					} else {
						erro.textContent = (dados && dados.erro) || 'Não conseguimos enviar sua mensagem. Fale com a gente pelo WhatsApp.';
						erro.hidden = false;
					}
				})
				.catch(function () {
					erro.textContent = 'Não conseguimos enviar sua mensagem. Fale com a gente pelo WhatsApp.';
					erro.hidden = false;
				})
				.finally(function () {
					if (botao) { botao.disabled = false; botao.textContent = rotuloBotao; }
				});
		});

		/* Envio alternativo pelo WhatsApp com os dados já preenchidos */
		var botaoZap = form.querySelector('[data-zap-form]');
		if (botaoZap) {
			botaoZap.addEventListener('click', function () {
				var v = function (nome) {
					var campo = form.elements[nome];
					return campo && campo.value ? campo.value.trim() : '';
				};
				var texto = 'Olá! Gostaria de agendar uma avaliação no Instituto IOIS.'
					+ (v('nome') ? '\nNome: ' + v('nome') : '')
					+ (v('telefone') ? '\nTelefone: ' + v('telefone') : '')
					+ (v('assunto') ? '\nAssunto: ' + v('assunto') : '')
					+ (v('mensagem') ? '\nMensagem: ' + v('mensagem') : '');
				window.open(botaoZap.getAttribute('data-zap-form') + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
			});
		}
	}

	/* ---------------------------------------------------------------
	   Ano corrente no rodapé
	   --------------------------------------------------------------- */
	var ano = document.querySelector('[data-ano]');
	if (ano) ano.textContent = new Date().getFullYear();
})();
