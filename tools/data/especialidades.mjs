/* Especialidades atendidas no Instituto IOIS.
   `destaque: true` gera uma página própria em /especialidades/<slug>.html
   As demais aparecem como cartões no índice. */

export const grupos = [
	{
		id: 'prevencao',
		nome: 'Prevenção e saúde',
		descricao: 'O ponto de partida da odontologia integrativa: entender a boca antes de intervir nela.'
	},
	{
		id: 'reabilitacao',
		nome: 'Reabilitação e estética',
		descricao: 'Devolver função, forma e conforto — do dente isolado ao sorriso inteiro.'
	},
	{
		id: 'integrativa',
		nome: 'Integrativa e avançada',
		descricao: 'Onde a odontologia encontra sono, dor, postura e a face como um todo.'
	}
];

export const especialidades = [
	/* ---------------------------------------------------------------- prevenção */
	{
		slug: 'odontologia-preventiva',
		nome: 'Odontologia preventiva',
		grupo: 'prevencao',
		icone: 'escudo',
		resumo: 'Profilaxia, aplicação de flúor e orientação individual para que o tratamento mais caro nunca precise existir.',
		destaque: false
	},
	{
		slug: 'periodontia',
		nome: 'Periodontia',
		grupo: 'prevencao',
		icone: 'folha',
		resumo: 'Cuidado da gengiva e do osso que sustentam os dentes — a base de qualquer reabilitação duradoura.',
		destaque: true,
		lead: 'A gengiva é o alicerce do sorriso e uma das portas de entrada mais estudadas entre a boca e o corpo. A periodontia trata a inflamação antes que ela comprometa o osso, os dentes e o seu bem-estar geral.',
		blocos: [
			{
				titulo: 'Por que a gengiva importa tanto',
				texto: 'A doença periodontal é silenciosa: sangramento ao escovar, mau hálito persistente e retração gengival costumam ser os primeiros sinais. A literatura médica associa a inflamação periodontal crônica ao controle de doenças sistêmicas — razão pela qual, no IOIS, nenhum tratamento estético começa sem a gengiva saudável.'
			},
			{
				titulo: 'Como tratamos',
				texto: 'Da raspagem e do alisamento radicular ao tratamento cirúrgico e à cirurgia plástica periodontal, o plano é definido a partir do exame clínico, do periograma e das imagens. A manutenção periódica é parte do tratamento, não um extra.'
			}
		],
		indicacoes: [
			'Sangramento gengival ao escovar ou usar fio dental',
			'Gengiva retraída, dentes que parecem mais longos',
			'Mau hálito que não melhora com higiene',
			'Mobilidade dentária ou mudança na mordida',
			'Preparo da gengiva antes de implantes, lentes ou ortodontia'
		],
		etapas: [
			{ titulo: 'Diagnóstico', texto: 'Exame clínico completo, sondagem periodontal e radiografias para medir a perda óssea real.' },
			{ titulo: 'Controle da inflamação', texto: 'Remoção do biofilme e do cálculo abaixo da gengiva, com anestesia e conforto.' },
			{ titulo: 'Reavaliação', texto: 'Novo periograma para confirmar a resposta do tecido antes de qualquer etapa estética ou cirúrgica.' },
			{ titulo: 'Manutenção', texto: 'Retornos programados, porque periodontia é controle contínuo, não um procedimento isolado.' }
		],
		faq: [
			{ p: 'Sangrar a gengiva ao escovar é normal?', r: 'Não. Gengiva saudável não sangra. O sangramento é o sinal clínico mais precoce de inflamação e merece avaliação.' },
			{ p: 'O tratamento dói?', r: 'O procedimento é feito sob anestesia local. O desconforto posterior costuma ser leve e controlado com orientação e medicação quando necessário.' },
			{ p: 'Posso fazer lentes de contato dental com gengiva inflamada?', r: 'Não recomendamos. Qualquer trabalho estético sobre gengiva doente tende a comprometer o resultado e a longevidade.' }
		]
	},
	{
		slug: 'odontopediatria',
		nome: 'Odontopediatria',
		grupo: 'prevencao',
		icone: 'bebe',
		resumo: 'Atendimento acolhedor para bebês, crianças e adolescentes, com foco em prevenção e em uma relação tranquila com o dentista.',
		destaque: true,
		lead: 'A primeira consulta define a relação de uma criança com o cuidado bucal para o resto da vida. Nossa odontopediatria trabalha com tempo, linguagem adequada e envolvimento da família.',
		blocos: [
			{
				titulo: 'Do primeiro dente à adolescência',
				texto: 'Acompanhamos a erupção dentária, a saúde das gengivas, os hábitos de sucção, a respiração e o desenvolvimento das arcadas. Muitos problemas ortodônticos e de sono começam a se anunciar aqui — e são muito mais simples de tratar cedo.'
			},
			{
				titulo: 'Sem trauma, sem pressa',
				texto: 'Usamos condicionamento comportamental: a criança conhece o ambiente, os instrumentos e cada passo antes de qualquer procedimento. O objetivo é que ela saia querendo voltar.'
			}
		],
		indicacoes: [
			'Primeira consulta a partir da erupção do primeiro dente',
			'Prevenção de cárie e aplicação de flúor e selantes',
			'Avaliação de respiração bucal e hábitos como chupeta e dedo',
			'Traumatismos dentários',
			'Acompanhamento do crescimento das arcadas',
			'Ortopedia funcional dos maxilares, com expansores, durante o crescimento'
		],
		etapas: [
			{ titulo: 'Acolhimento', texto: 'Conversa com a família, histórico de saúde e apresentação do consultório para a criança.' },
			{ titulo: 'Exame', texto: 'Avaliação clínica dos dentes, gengivas, mordida e respiração.' },
			{ titulo: 'Plano preventivo', texto: 'Orientação de higiene, alimentação e retornos, com procedimentos quando necessários.' }
		],
		faq: [
			{ p: 'Com que idade levar meu filho pela primeira vez?', r: 'A recomendação é a primeira consulta com a erupção do primeiro dentinho, por volta dos seis meses, ou no primeiro ano de vida.' },
			{ p: 'Dente de leite com cárie precisa ser tratado?', r: 'Sim. Ele guarda espaço para o dente permanente, participa da mastigação e da fala, e a infecção pode atingir o germe do dente definitivo.' },
			{ p: 'Meu filho respira pela boca. Isso é assunto do dentista?', r: 'É, e dos mais importantes. A respiração bucal altera o crescimento facial, a posição dos dentes e a qualidade do sono.' }
		]
	},
	{
		slug: 'frenectomia-a-laser',
		nome: 'Frenectomia a laser',
		grupo: 'prevencao',
		icone: 'brilho',
		resumo: 'Correção de língua e lábio presos com laser, em procedimento minimamente invasivo — de recém-nascidos a adultos.',
		destaque: true,
		lead: 'Língua presa não é detalhe: ela atrapalha a pega do bebê no peito, a fala da criança e o funcionamento da boca do adulto. A frenectomia a laser corrige o freio com o mínimo de trauma possível.',
		blocos: [
			{
				titulo: 'Por que o laser muda o procedimento',
				texto: 'A técnica a laser dispensa pontos na maioria dos casos, reduz sangramento e desconforto, e permite que o bebê volte a mamar logo em seguida. É a diferença entre um procedimento temido e um procedimento rápido e tranquilo.'
			},
			{
				titulo: 'Avaliar antes de indicar',
				texto: 'Nem todo freio curto precisa de cirurgia. A indicação vem da função: como o bebê mama, como a criança fala, como a língua se movimenta. Avaliamos com o protocolo adequado e, quando faz sentido, em conjunto com fonoaudiologia e consultoria de amamentação.'
			}
		],
		indicacoes: [
			'Bebê com dificuldade de pega, mamadas longas ou dor na amamentação',
			'Língua que não alcança o céu da boca ou não ultrapassa os lábios',
			'Alterações de fala associadas à mobilidade da língua',
			'Freio labial que afasta os dentes da frente',
			'Adultos com limitação de movimento da língua'
		],
		etapas: [
			{ titulo: 'Avaliação funcional', texto: 'Exame do freio, da mobilidade da língua e, em bebês, da mamada — com o protocolo indicado para a idade.' },
			{ titulo: 'Indicação', texto: 'A conduta é definida pela função, não só pela aparência do freio. Se não houver indicação, dizemos isso com clareza.' },
			{ titulo: 'Procedimento', texto: 'Liberação com laser, anestesia adequada à idade e, na maioria dos casos, sem pontos.' },
			{ titulo: 'Acompanhamento', texto: 'Exercícios orientados e retorno para conferir a cicatrização e o ganho de movimento.' }
		],
		faq: [
			{ p: 'Meu bebê pode mamar logo depois?', r: 'Sim. Na maior parte dos casos a amamentação é retomada logo após o procedimento, e isso faz parte do próprio pós-operatório.' },
			{ p: 'Precisa de pontos?', r: 'Com o laser, na maioria dos casos não. Isso depende da extensão da liberação e é conversado antes.' },
			{ p: 'Qual a melhor idade?', r: 'Quando há indicação funcional, quanto antes melhor — mas não existe idade limite: adultos também se beneficiam.' }
		]
	},
	{
		slug: 'odontogeriatria',
		nome: 'Odontogeriatria',
		grupo: 'prevencao',
		icone: 'coracao',
		resumo: 'Atendimento a pacientes idosos, considerando medicações, doenças crônicas e a mastigação como parte da nutrição.',
		destaque: false
	},
	{
		slug: 'pacientes-com-necessidades-especiais',
		nome: 'Pacientes com necessidades especiais',
		grupo: 'prevencao',
		icone: 'pessoas',
		resumo: 'Protocolos adaptados de tempo, comunicação e manejo para quem precisa de um atendimento verdadeiramente individual.',
		destaque: false
	},

	/* ------------------------------------------------------------ reabilitação */
	{
		slug: 'dentistica-e-estetica',
		imagem: { arquivo: 'esp-dentistica.jpg', alt: 'Dra. Iolanda Schroeder no consultório do Instituto IOIS', largura: 1400, altura: 1050 },
		nome: 'Dentística e estética',
		grupo: 'reabilitacao',
		icone: 'brilho',
		resumo: 'Restaurações, clareamento, facetas e lentes de contato dental com planejamento digital do sorriso.',
		destaque: true,
		lead: 'Estética que respeita a biologia. Cada lente, faceta ou clareamento parte de um diagnóstico funcional — do contrário, o resultado é bonito hoje e problemático depois.',
		blocos: [
			{
				titulo: 'Planejamento antes do desgaste',
				texto: 'Trabalhamos com fotografia, escaneamento e ensaio do sorriso, para que você veja a proposta antes de qualquer intervenção. O objetivo é o mínimo de desgaste possível: em muitos casos, clareamento e ajustes conservadores resolvem o que parecia exigir lentes.'
			},
			{
				titulo: 'Naturalidade como critério',
				texto: 'Forma, textura e translucidez são escolhidas a partir do seu rosto, do seu sorriso e da sua idade. Um sorriso premium é aquele que ninguém percebe que foi feito.'
			}
		],
		indicacoes: [
			'Dentes escurecidos, manchados ou com aspecto envelhecido',
			'Restaurações antigas com manchas ou infiltração',
			'Fraturas, desgastes e dentes lascados',
			'Diastemas (espaços entre os dentes)',
			'Assimetrias de forma e proporção do sorriso'
		],
		etapas: [
			{ titulo: 'Diagnóstico e fotografia', texto: 'Documentação do sorriso em repouso, em função e na proporção do rosto.' },
			{ titulo: 'Ensaio do sorriso', texto: 'Projeto digital e prova estética na boca, para decidir junto antes de executar.' },
			{ titulo: 'Execução', texto: 'Clareamento, restaurações em resina ou cerâmica, com ajuste de oclusão.' },
			{ titulo: 'Acompanhamento', texto: 'Controle do resultado, da mordida e da manutenção em casa.' }
		],
		faq: [
			{ p: 'Lentes de contato dental exigem desgastar o dente?', r: 'Depende do caso. Existem preparos mínimos e situações sem desgaste, e outras em que ele é necessário. Isso só se define com o planejamento em mãos.' },
			{ p: 'Quanto tempo dura o clareamento?', r: 'Varia com hábitos como café, chá, vinho e cigarro. Com manutenção orientada, o resultado se mantém por um longo período.' },
			{ p: 'Clareamento causa sensibilidade?', r: 'Pode causar sensibilidade transitória. Usamos protocolos dessensibilizantes e ajustamos a concentração ao seu caso.' }
		]
	},
	{
		slug: 'endodontia',
		nome: 'Endodontia',
		grupo: 'reabilitacao',
		icone: 'agulha',
		resumo: 'Tratamento de canal com instrumentação mecanizada e anestesia eficaz — para manter o dente natural sempre que possível.',
		destaque: true,
		lead: 'Tratar o canal é preservar o que é seu. Com magnificação, instrumentos rotatórios e localizador apical, o procedimento é preciso e, na maioria das vezes, resolvido com conforto.',
		blocos: [
			{
				titulo: 'Manter o dente é a primeira escolha',
				texto: 'Nenhum implante reproduz integralmente um dente natural. Sempre que o remanescente permite, a endodontia é o caminho para manter raiz, osso e propriocepção.'
			},
			{
				titulo: 'Dor não é parte do tratamento',
				texto: 'A dor costuma ser o motivo da consulta, não a consequência dela. O controle da infecção e a anestesia adequada são a base do protocolo.'
			}
		],
		indicacoes: [
			'Dor espontânea ou latejante, principalmente à noite',
			'Sensibilidade prolongada ao quente ou ao frio',
			'Escurecimento de um dente isolado',
			'Abscesso, fístula ou inchaço na gengiva',
			'Retratamento de canais realizados anteriormente'
		],
		etapas: [
			{ titulo: 'Diagnóstico', texto: 'Testes de sensibilidade e imagem para confirmar a condição da polpa.' },
			{ titulo: 'Tratamento', texto: 'Remoção do tecido contaminado, modelagem e desinfecção dos canais.' },
			{ titulo: 'Obturação e selamento', texto: 'Preenchimento dos canais e restauração que devolve resistência ao dente.' }
		],
		faq: [
			{ p: 'Canal dói?', r: 'O tratamento é feito sob anestesia. O desconforto costuma ser posterior, leve e controlável.' },
			{ p: 'Quantas sessões são necessárias?', r: 'Muitos casos são resolvidos em uma ou duas sessões, dependendo da anatomia e da presença de infecção.' },
			{ p: 'Dente com canal precisa de coroa?', r: 'Frequentemente sim, sobretudo em dentes posteriores, para evitar fratura do remanescente.' }
		]
	},
	{
		slug: 'implantodontia',
		imagem: { arquivo: 'esp-implantodontia.jpg', alt: 'Dra. Iolanda Schroeder com um modelo de implante dentário', largura: 1400, altura: 1050 },
		nome: 'Implantodontia',
		grupo: 'reabilitacao',
		icone: 'implante',
		resumo: 'Implantes unitários, múltiplos e protocolos com planejamento tomográfico e cirurgia guiada.',
		destaque: true,
		lead: 'Repor um dente é reorganizar mastigação, osso e face. O planejamento tomográfico define a posição ideal do implante antes de a cirurgia começar — e é isso que separa um implante que dura de um implante que apenas foi instalado.',
		blocos: [
			{
				titulo: 'Do planejamento à prótese',
				texto: 'Tomografia, análise óssea, escolha do sistema, cirurgia e prótese acontecem dentro do mesmo instituto e da mesma lógica de tratamento. Você não é encaminhado de um lugar para outro no meio do caso.'
			},
			{
				titulo: 'Implantes de zircônia',
				texto: 'Além do titânio, trabalhamos com implantes de zircônia — cerâmica branca, sem metal, com boa resposta do tecido gengival e sem risco de borda acinzentada aparecendo na gengiva com o tempo. É a escolha de quem busca reabilitação metal free ou tem sensibilidade a metais.'
			},
			{
				titulo: 'Perder osso é perder rosto',
				texto: 'A ausência de um dente leva o osso a reabsorver e altera o suporte dos tecidos da face. É por isso que tratamos a reposição como assunto funcional e estético ao mesmo tempo.'
			}
		],
		indicacoes: [
			'Perda de um ou mais dentes',
			'Próteses removíveis que incomodam ou soltam',
			'Dentes com prognóstico ruim, sem possibilidade de manutenção',
			'Reabilitações totais de arcada',
			'Casos que exigem enxerto ou levantamento de seio maxilar',
			'Preferência por reabilitação sem metal, com implantes de zircônia'
		],
		etapas: [
			{ titulo: 'Avaliação e tomografia', texto: 'Estudo do volume ósseo, das estruturas nobres e da posição protética ideal.' },
			{ titulo: 'Cirurgia', texto: 'Instalação do implante com protocolo estéril e, quando indicado, cirurgia guiada.' },
			{ titulo: 'Osseointegração', texto: 'Período de integração do implante ao osso, com acompanhamento clínico.' },
			{ titulo: 'Prótese', texto: 'Confecção e instalação da coroa ou da prótese, com ajuste fino da mordida.' }
		],
		faq: [
			{ p: 'Implante dói?', r: 'A cirurgia é feita sob anestesia local e o pós-operatório costuma ser mais tranquilo do que a maioria das pessoas imagina, com orientação e medicação adequadas.' },
			{ p: 'Quanto tempo leva o tratamento completo?', r: 'Depende da necessidade de enxerto e da resposta óssea individual. O prazo estimado é apresentado no plano de tratamento.' },
			{ p: 'Fumantes podem colocar implante?', r: 'Podem, mas o tabagismo aumenta o risco de complicações. Isso é discutido abertamente antes de decidir.' },
			{ p: 'Qual a diferença entre titânio e zircônia?', r: 'O titânio tem a maior literatura acumulada; a zircônia é branca, não tem metal e favorece a estética em região anterior. A indicação depende do seu caso, do osso disponível e da sua preferência.' }
		]
	},
	{
		slug: 'protese-dentaria',
		nome: 'Prótese dentária',
		grupo: 'reabilitacao',
		icone: 'dente',
		resumo: 'Coroas, próteses fixas, removíveis e sobre implante, com fluxo digital e ajuste fino da mordida.',
		destaque: true,
		lead: 'Prótese boa é a que some: mastiga, fala e sorri sem lembrar você de que está ali. Isso depende de oclusão bem ajustada, materiais adequados e acompanhamento.',
		blocos: [
			{
				titulo: 'Fluxo digital',
				texto: 'Escaneamento intraoral no lugar da moldagem desconfortável, comunicação precisa com o laboratório e menos ajustes na hora da instalação.'
			},
			{
				titulo: 'A mordida como critério',
				texto: 'Toda reabilitação é analisada em função: como os dentes se tocam, como a articulação responde e como a musculatura trabalha. Ignorar isso é a causa mais comum de próteses que fraturam ou incomodam.'
			}
		],
		indicacoes: [
			'Dentes muito destruídos ou tratados endodonticamente',
			'Substituição de coroas e próteses antigas',
			'Reabilitação sobre implantes',
			'Próteses totais e parciais removíveis',
			'Desgaste generalizado por bruxismo'
		],
		etapas: [
			{ titulo: 'Estudo do caso', texto: 'Análise da oclusão, fotografias, escaneamento e modelos de estudo.' },
			{ titulo: 'Prova', texto: 'Ensaio em resina ou prova estética para validar forma, cor e função.' },
			{ titulo: 'Instalação e ajuste', texto: 'Cimentação ou parafusamento, ajuste oclusal e orientação de manutenção.' }
		],
		faq: [
			{ p: 'Qual a diferença entre coroa e lente?', r: 'A coroa envolve todo o dente e devolve resistência; a lente cobre a face visível e tem finalidade principalmente estética.' },
			{ p: 'Prótese sobre implante é fixa?', r: 'Pode ser fixa ou removível, conforme o número de implantes, o osso disponível e o seu objetivo.' },
			{ p: 'Quanto tempo dura uma prótese?', r: 'Com higiene e manutenção periódica, muitos anos. O que mais reduz a longevidade é a mordida desajustada e a falta de acompanhamento.' }
		]
	},
	{
		slug: 'ortodontia',
		nome: 'Ortodontia',
		grupo: 'reabilitacao',
		icone: 'aparelho',
		resumo: 'Aparelhos fixos e alinhadores transparentes, com planejamento que considera função, respiração e face.',
		destaque: true,
		lead: 'Alinhar dentes é o resultado visível. O objetivo clínico é a oclusão: dentes que se encaixam, articulação que trabalha em equilíbrio e um sorriso que combina com o rosto.',
		blocos: [
			{
				titulo: 'Alinhadores ou aparelho fixo?',
				texto: 'Os dois funcionam — para casos diferentes. Os alinhadores oferecem discrição e higiene mais simples, e atendem crianças, adolescentes e adultos; o aparelho fixo mantém vantagens em movimentações complexas. A escolha vem do diagnóstico, não da moda.'
			},
			{
				titulo: 'Ortodontia dentro de um plano maior',
				texto: 'Quando há reabilitação, implantes ou lentes no horizonte, a ortodontia posiciona os dentes para que o restante do tratamento seja mais conservador. É a sequência que economiza estrutura dentária.'
			}
		],
		indicacoes: [
			'Dentes apinhados, girados ou com espaços',
			'Mordida cruzada, aberta ou profunda',
			'Preparo ortodôntico antes de próteses e implantes',
			'Recidiva após tratamento anterior',
			'Adultos que desejam tratamento discreto',
			'Crianças em crescimento, com ortopedia funcional e expansores'
		],
		etapas: [
			{ titulo: 'Documentação', texto: 'Radiografias, fotografias, escaneamento e análise facial completa.' },
			{ titulo: 'Plano e simulação', texto: 'Definição do movimento dentário e, nos alinhadores, simulação digital do resultado.' },
			{ titulo: 'Tratamento ativo', texto: 'Consultas de acompanhamento com ajustes periódicos.' },
			{ titulo: 'Contenção', texto: 'Fase essencial para estabilizar o resultado a longo prazo.' }
		],
		faq: [
			{ p: 'Tem idade limite para usar aparelho?', r: 'Não. O que muda é o planejamento: em adultos, avaliamos gengiva, osso e restaurações existentes com atenção redobrada.' },
			{ p: 'Quanto tempo dura o tratamento?', r: 'Varia com a complexidade do caso e a colaboração no uso, especialmente com alinhadores. A estimativa é dada após a documentação.' },
			{ p: 'Preciso usar contenção para sempre?', r: 'A recomendação atual é de uso prolongado, porque os dentes tendem a se movimentar ao longo da vida.' }
		]
	},
	{
		slug: 'cirurgia-oral',
		nome: 'Cirurgia oral e bucomaxilofacial',
		grupo: 'reabilitacao',
		icone: 'bisturi',
		resumo: 'Extrações, sisos inclusos, enxertos ósseos e procedimentos cirúrgicos com protocolo de biossegurança.',
		destaque: true,
		lead: 'Cirurgia bem indicada é cirurgia planejada: imagem, avaliação de saúde geral e um pós-operatório previsível, explicado antes e acompanhado depois.',
		blocos: [
			{
				titulo: 'Sisos e extrações',
				texto: 'A indicação de remover um terceiro molar depende de posição, espaço, risco de infecção e proximidade de estruturas nobres — avaliados por tomografia quando necessário. Nem todo siso precisa sair, e isso é dito com clareza.'
			},
			{
				titulo: 'Preparo para reabilitação',
				texto: 'Enxertos ósseos, levantamento de seio maxilar e regularizações preparam o terreno para implantes e próteses com estabilidade.'
			},
			{
				titulo: 'Cirurgias com laser',
				texto: 'Parte dos procedimentos é feita com laser, que reduz sangramento e desconforto e costuma dispensar pontos. É o caso das frenectomias, que têm página própria por serem procura frequente de mães de recém-nascidos.'
			}
		],
		indicacoes: [
			'Sisos inclusos ou com pericoronarite de repetição',
			'Extrações de dentes sem prognóstico',
			'Enxertos ósseos e levantamento de seio maxilar',
			'Frenectomias lingual e labial, com laser',
			'Remoção de lesões para biópsia'
		],
		etapas: [
			{ titulo: 'Avaliação', texto: 'Histórico de saúde, medicações em uso e exame de imagem adequado.' },
			{ titulo: 'Cirurgia', texto: 'Procedimento sob anestesia local, com protocolo estéril e técnica minimamente traumática.' },
			{ titulo: 'Pós-operatório', texto: 'Orientações por escrito, medicação prescrita e retorno para remoção de sutura e controle.' }
		],
		faq: [
			{ p: 'Vou ficar com o rosto inchado?', r: 'Algum edema é esperado nos primeiros dias, sobretudo em sisos inclusos. As orientações de gelo, repouso e medicação reduzem bastante o desconforto.' },
			{ p: 'Posso trabalhar no dia seguinte?', r: 'Em muitos casos sim, mas isso depende da extensão do procedimento e é conversado antes da cirurgia.' },
			{ p: 'Uso anticoagulante. Posso operar?', r: 'Na maioria das vezes sim, com o manejo adequado e, quando necessário, em conjunto com o seu médico.' }
		]
	},
	{
		slug: 'ortopedia-funcional-dos-maxilares',
		nome: 'Ortopedia funcional dos maxilares',
		grupo: 'reabilitacao',
		icone: 'balanca',
		resumo: 'Aproveita o crescimento na infância e adolescência para orientar o desenvolvimento das arcadas e da face.',
		destaque: false
	},
	{
		slug: 'protese-bucomaxilofacial',
		nome: 'Prótese bucomaxilofacial',
		grupo: 'reabilitacao',
		icone: 'relatorio',
		resumo: 'Reabilitação de estruturas perdidas por trauma, cirurgia ou condições congênitas, com foco em função e convívio social.',
		destaque: false
	},

	/* ------------------------------------------------------------- integrativa */
	{
		slug: 'harmonizacao-orofacial',
		imagem: { arquivo: 'esp-harmonizacao.jpg', alt: 'Aplicação de toxina botulínica no Instituto IOIS', largura: 1400, altura: 1050 },
		nome: 'Harmonização orofacial',
		grupo: 'integrativa',
		icone: 'coracao',
		resumo: 'Procedimentos faciais conduzidos por cirurgiã-dentista habilitada, integrados ao seu sorriso e à sua expressão.',
		destaque: true,
		lead: 'Harmonização orofacial não é padronizar rostos. É devolver equilíbrio entre sorriso, lábios, terço inferior e expressão — com indicação clínica, dose consciente e naturalidade como meta.',
		blocos: [
			{
				titulo: 'Quem entende de sorriso entende de face',
				texto: 'A harmonização orofacial é especialidade reconhecida da odontologia justamente porque o cirurgião-dentista domina a anatomia da região perioral, a musculatura da mastigação e a relação entre dentes, lábios e face.'
			},
			{
				titulo: 'Integrada ao tratamento odontológico',
				texto: 'Bruxismo, desgaste dentário, sorriso gengival e assimetrias raramente são só estéticos. Tratá-los junto com a odontologia é o que evita resultados que não se sustentam.'
			}
		],
		indicacoes: [
			'Sorriso gengival',
			'Assimetrias e desequilíbrios do terço inferior da face',
			'Hipertrofia do masseter associada a bruxismo',
			'Contorno e hidratação labial',
			'Marcas de expressão na região perioral'
		],
		etapas: [
			{ titulo: 'Avaliação facial', texto: 'Análise de proporções, dinâmica da expressão, sorriso e histórico de saúde.' },
			{ titulo: 'Plano individual', texto: 'Definição das áreas, das técnicas e do que não será feito — com expectativa alinhada.' },
			{ titulo: 'Procedimento', texto: 'Execução com produtos registrados e protocolo de segurança.' },
			{ titulo: 'Retorno', texto: 'Reavaliação para conferir resultado, simetria e necessidade de ajuste.' }
		],
		faq: [
			{ p: 'Cirurgião-dentista pode fazer harmonização facial?', r: 'Sim. A harmonização orofacial é especialidade reconhecida pelo Conselho Federal de Odontologia, com formação e habilitação específicas.' },
			{ p: 'O resultado fica artificial?', r: 'O objetivo aqui é o oposto: preservar a sua expressão. Volume e dose são definidos com base na sua anatomia, não em um padrão.' },
			{ p: 'Dá para fazer junto com o tratamento dentário?', r: 'Sim, e em muitos casos é o ideal — a sequência é planejada para que um resultado sustente o outro.' }
		]
	},
	{
		slug: 'dtm-e-dor-orofacial',
		nome: 'DTM e dor orofacial',
		grupo: 'integrativa',
		icone: 'onda',
		resumo: 'Dor na face, estalos na articulação, bruxismo e dores de cabeça de origem dentária — investigados a fundo.',
		destaque: true,
		lead: 'Dor de cabeça ao acordar, estalo ao abrir a boca, tensão na mandíbula e dentes desgastados costumam ser sintomas de um mesmo sistema em desequilíbrio. É aqui que a odontologia integrativa mais se distancia do atendimento convencional.',
		blocos: [
			{
				titulo: 'Investigar antes de tratar',
				texto: 'DTM tem múltiplas causas: oclusão, hábitos parafuncionais, sono, postura e fatores emocionais. O diagnóstico avalia articulação, musculatura, movimento mandibular e histórico — e não se resume a entregar uma placa.'
			},
			{
				titulo: 'Tratamento por etapas',
				texto: 'Placas oclusais planejadas, ajuste da mordida quando indicado, orientação de hábitos e, sempre que necessário, trabalho conjunto com fisioterapia, otorrino e medicina do sono.'
			}
		],
		indicacoes: [
			'Dor ou cansaço na mandíbula, principalmente ao acordar',
			'Estalos, travamentos ou dificuldade para abrir a boca',
			'Dores de cabeça e na região dos temporais',
			'Bruxismo, apertamento e desgaste dentário',
			'Zumbido e sensação de ouvido tapado sem causa otológica'
		],
		etapas: [
			{ titulo: 'Anamnese detalhada', texto: 'Histórico de dor, sono, rotina e fatores associados.' },
			{ titulo: 'Exame funcional', texto: 'Palpação muscular, avaliação da articulação e análise da oclusão.' },
			{ titulo: 'Plano terapêutico', texto: 'Placa, orientação, controle de hábitos e encaminhamentos integrados quando indicados.' },
			{ titulo: 'Reavaliação', texto: 'Acompanhamento da resposta e ajustes ao longo do tratamento.' }
		],
		faq: [
			{ p: 'Placa de bruxismo resolve?', r: 'Ela protege os dentes e costuma aliviar sintomas, mas é parte do tratamento. Sem investigar a causa, o problema tende a retornar.' },
			{ p: 'DTM tem cura?', r: 'Muitos casos são controlados de forma consistente. O foco é reduzir dor, recuperar função e evitar novos episódios.' },
			{ p: 'Minha dor de cabeça pode ser do dente?', r: 'Pode. Dor de cabeça tensional relacionada a apertamento e DTM é frequente e frequentemente não investigada.' }
		]
	},
	{
		slug: 'odontologia-miofuncional',
		nome: 'Odontologia miofuncional',
		grupo: 'integrativa',
		icone: 'onda',
		resumo: 'Respiração, mastigação, deglutição e desenvolvimento craniofacial tratados como um sistema só.',
		destaque: true,
		lead: 'A boca é musculatura em funcionamento. Quando respiração, mastigação e deglutição saem do eixo, o efeito aparece nos dentes, na face, no sono e na postura — e tratar só o dente não resolve.',
		blocos: [
			{
				titulo: 'O que a musculatura conta',
				texto: 'Respiração bucal, língua em posição inadequada, deglutição atípica e mastigação de um lado só deixam marcas: mordida aberta, arcada estreita, face alongada, ronco. Ler esses sinais cedo muda o rumo do desenvolvimento de uma criança — e explica recidivas em adultos que já fizeram ortodontia.'
			},
			{
				titulo: 'Trabalho conjunto',
				texto: 'A abordagem miofuncional conversa com ortodontia, ortopedia funcional dos maxilares, fonoaudiologia e otorrinolaringologia. No IOIS isso acontece dentro do mesmo plano de tratamento, e não em encaminhamentos soltos.'
			}
		],
		indicacoes: [
			'Respiração pela boca, roncos ou sono agitado',
			'Criança com arcada estreita ou mordida aberta',
			'Deglutição atípica e língua em posição baixa',
			'Mastigação de um lado só ou dificuldade para mastigar',
			'Recidiva ortodôntica sem causa aparente'
		],
		etapas: [
			{ titulo: 'Avaliação funcional', texto: 'Análise de respiração, postura da língua, deglutição, mastigação e desenvolvimento facial.' },
			{ titulo: 'Diagnóstico integrado', texto: 'Cruzamento com o exame odontológico, a oclusão e, quando indicado, avaliação médica.' },
			{ titulo: 'Plano terapêutico', texto: 'Aparelhos ortopédicos, exercícios e o encaminhamento certo, na ordem certa.' },
			{ titulo: 'Acompanhamento', texto: 'Reavaliações ao longo do crescimento ou do tratamento, porque função se acompanha.' }
		],
		faq: [
			{ p: 'A partir de que idade dá para avaliar?', r: 'Desde os primeiros anos. Quanto mais cedo, mais o crescimento trabalha a favor do tratamento.' },
			{ p: 'Isso substitui a ortodontia?', r: 'Não. Trabalha junto: a ortodontia posiciona os dentes, e a abordagem miofuncional cuida da função que sustenta esse resultado.' },
			{ p: 'Adulto também se beneficia?', r: 'Sim, principalmente em casos de DTM, ronco e recidiva ortodôntica.' }
		]
	},
	{
		slug: 'odontologia-do-sono',
		nome: 'Odontologia do sono',
		grupo: 'integrativa',
		icone: 'lua',
		resumo: 'Ronco e apneia obstrutiva tratados com aparelhos intraorais, em conjunto com a equipe médica.',
		destaque: false
	},
	{
		slug: 'odontologia-hospitalar',
		nome: 'Odontologia hospitalar',
		grupo: 'integrativa',
		icone: 'escudo',
		resumo: 'Cuidado bucal de pacientes internados ou em tratamento oncológico e cardiológico, integrado à equipe médica.',
		destaque: false
	}
];

export const destaques = especialidades.filter((e) => e.destaque);
export const porGrupo = (id) => especialidades.filter((e) => e.grupo === id);
