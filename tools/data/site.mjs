/* Dados centrais do site — altere aqui e rode `node tools/build.mjs` */

export const site = {
	nome: 'Instituto IOIS',
	nomeLongo: 'Instituto IOIS — Odontologia Integrativa',
	dominio: 'https://iois.com.br',
	descricao:
		'Instituto de odontologia integrativa em Brasília. Todas as especialidades odontológicas, harmonização orofacial e formação continuada com a Dra. Iolanda Schroeder.',
	cidade: 'Brasília',
	uf: 'DF',
	endereco: {
		linha: 'SCN Qd. 02, Liberty Mall, Torre B, sala 401',
		bairro: 'Asa Norte',
		cidade: 'Brasília',
		uf: 'DF',
		cep: '70712-903',
		mapa: 'https://www.google.com/maps/search/?api=1&query=Liberty+Mall+Torre+B+SCN+Quadra+2+Bras%C3%ADlia+DF'
	},
	whatsapp: { numero: '5561996987275', exibicao: '(61) 99698-7275' },
	telefone: { numero: '556133269257', exibicao: '(61) 3326-9257' },
	email: 'contato@iois.com.br',
	instagram: { url: 'https://www.instagram.com/institutoiois', usuario: '@institutoiois' },
	instagramIolanda: { url: 'https://www.instagram.com/draiolandaschroeder', usuario: '@draiolandaschroeder' },
	horario: 'Segunda a sexta-feira, das 8h às 18h',
	horarioCurto: 'Seg — Sex · 8h às 18h',
	responsavel: 'Dra. Iolanda Schroeder',
	croInstituto: 'CRO-DF 3319',
	croResponsavel: 'CRO-DF 10295',
	anos: 16,
	pacientes: 2000
};

export const zapLink = (texto) =>
	`https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(texto)}`;

export const zapPadrao = zapLink(
	'Olá! Vim pelo site do Instituto IOIS e gostaria de agendar uma avaliação.'
);

export const menu = [
	{ rotulo: 'Início', href: '/', id: 'inicio' },
	{ rotulo: 'O Instituto', href: '/instituto.html', id: 'instituto' },
	{ rotulo: 'Especialidades', href: '/especialidades.html', id: 'especialidades' },
	{ rotulo: 'Dra. Iolanda', href: '/dra-iolanda.html', id: 'iolanda' },
	{ rotulo: 'Cursos', href: '/cursos.html', id: 'cursos' },
	{ rotulo: 'Contato', href: '/contato.html', id: 'contato' }
];
