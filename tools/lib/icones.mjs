/* Ícones SVG autorais, traço de 1.5, grade 24×24 */

const traco = (d) => `<path d="${d}"/>`;

const desenhos = {
	brilho: traco('M12 3.2l1.7 4.6 4.6 1.7-4.6 1.7L12 15.8l-1.7-4.6L5.7 9.5l4.6-1.7z') + traco('M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z'),
	dente: traco('M7.6 3.6C5.4 3.6 4 5.4 4 7.8c0 2.2.7 3.6 1.2 5.4.5 1.8.6 3.4.9 5 .2 1.2.7 2 1.6 2 1.1 0 1.4-1 1.7-2.4.3-1.6.5-3.3 2.6-3.3s2.3 1.7 2.6 3.3c.3 1.4.6 2.4 1.7 2.4.9 0 1.4-.8 1.6-2 .3-1.6.4-3.2.9-5C19.3 11.4 20 10 20 7.8c0-2.4-1.4-4.2-3.6-4.2-1.6 0-2.6.8-4.4.8s-2.8-.8-4.4-.8z'),
	coracao: traco('M12 20.4C9.7 18.9 4 15 4 10.6A4.6 4.6 0 0 1 12 7.4a4.6 4.6 0 0 1 8 3.2c0 4.4-5.7 8.3-8 9.8z'),
	escudo: traco('M12 3l7.5 3v5.4c0 4.6-3.1 8.3-7.5 9.9-4.4-1.6-7.5-5.3-7.5-9.9V6z') + traco('M9.2 12.2l2 2 3.6-3.9'),
	seta: traco('M4.5 12h15') + traco('M13.2 5.8L19.5 12l-6.3 6.2'),
	estrela: traco('M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z'),
	telefone: traco('M6.2 3.8h3l1.4 3.6-1.9 1.4a11.4 11.4 0 0 0 5.5 5.5l1.4-1.9 3.6 1.4v3a2 2 0 0 1-2.2 2C11.1 18.2 5.8 12.9 4.2 6a2 2 0 0 1 2-2.2z'),
	email: traco('M3.8 6.5h16.4v11H3.8z') + traco('M3.8 7l8.2 5.6L20.2 7'),
	local: traco('M12 21c3.9-4.2 6.4-7.4 6.4-10.5A6.4 6.4 0 0 0 5.6 10.5C5.6 13.6 8.1 16.8 12 21z') + traco('M12 12.6a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z'),
	relogio: traco('M12 20.4a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8z') + traco('M12 7.6V12l3 1.9'),
	instagram: traco('M7.6 3.8h8.8a3.8 3.8 0 0 1 3.8 3.8v8.8a3.8 3.8 0 0 1-3.8 3.8H7.6a3.8 3.8 0 0 1-3.8-3.8V7.6a3.8 3.8 0 0 1 3.8-3.8z') + traco('M12 15.7a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4z') + '<circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none"/>',
	whatsapp: traco('M3.8 20.2l1.3-4.4A7.9 7.9 0 1 1 8.4 19z') + traco('M8.9 8.6c.3-.1.6 0 .8.4l.7 1.5c.1.3.1.5-.1.8l-.5.6c.7 1.3 1.6 2.2 2.9 2.9l.6-.5c.3-.2.5-.2.8-.1l1.5.7c.4.2.5.5.4.8-.2.8-1 1.4-1.9 1.4-3.2-.2-5.9-2.9-6.1-6.1 0-.9.5-1.7 1.4-1.9z'),
	formatura: traco('M12 4l9 3.6-9 3.6-9-3.6z') + traco('M6.6 9.7v4.6c0 1.7 2.4 3 5.4 3s5.4-1.3 5.4-3V9.7') + traco('M20.4 8v5'),
	sorriso: traco('M12 20.4a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8z') + traco('M8.2 13.2c.8 1.6 2.2 2.5 3.8 2.5s3-.9 3.8-2.5z') + traco('M9.2 9.4h.01') + traco('M14.8 9.4h.01'),
	aparelho: traco('M4.4 8.2h15.2') + traco('M4.4 15.8h15.2') + traco('M8.2 8.2v7.6') + traco('M12 8.2v7.6') + traco('M15.8 8.2v7.6'),
	implante: traco('M12 3.4v4') + traco('M9.4 7.4h5.2l-.7 10.4c-.1 1.6-.9 2.8-1.9 2.8s-1.8-1.2-1.9-2.8z') + traco('M9.9 11.2h4.2') + traco('M10.2 14.6h3.6'),
	bebe: traco('M12 20.4a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8z') + traco('M9.4 13.6c1.5 1.4 3.7 1.4 5.2 0') + traco('M9 9.8h.01') + traco('M15 9.8h.01'),
	bisturi: traco('M13.6 3.6l6.8 6.8-9.2 9.2H4.4v-6.8z') + traco('M9.2 8.4l6.4 6.4'),
	onda: traco('M3 12.5h3.4l2.3-6 3.4 11.2 2.5-7.4 1.6 2.2H21'),
	lua: traco('M20.2 14.4A8.4 8.4 0 0 1 9.6 3.8a8.4 8.4 0 1 0 10.6 10.6z'),
	microscopio: traco('M9.5 4.8l4.4 2.6-3 5.1-4.4-2.6z') + traco('M6.7 13.4l3.6 2.1') + traco('M5.4 20.2h13.2') + traco('M12.5 20.2a5.4 5.4 0 0 0 4.9-7.7'),
	pessoas: traco('M9.4 11.6a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z') + traco('M3.4 19.6c0-3.1 2.7-5.4 6-5.4s6 2.3 6 5.4') + traco('M16.4 5.2a3.4 3.4 0 0 1 0 6.2') + traco('M17.4 14.6c1.9.6 3.2 2.2 3.2 4.3'),
	agulha: traco('M20.4 3.6l-2.6 2.6') + traco('M18.4 8.6L15.4 5.6') + traco('M17.2 6.8L7.6 16.4l-3.2 3.2') + traco('M12.6 11.4l1.6 1.6') + traco('M10 14l1.6 1.6'),
	raio: traco('M12 20.4a8.4 8.4 0 1 0 0-16.8 8.4 8.4 0 0 0 0 16.8z') + traco('M12 8v8') + traco('M8 12h8'),
	balanca: traco('M12 4v16') + traco('M7 8h10') + traco('M7 8l-3 6h6z') + traco('M17 8l-3 6h6z'),
	folha: traco('M20 4c0 9-5 13-11 13H5c0-8 5-12 11-12') + traco('M4.5 20c1.5-4 4-6.5 7.5-8'),
	check: traco('M20 6.5L9.5 17 4 11.5'),
	relatorio: traco('M6.4 3.8h8l3.6 3.6v12.8H6.4z') + traco('M14 3.8v3.8h3.8') + traco('M9.4 12.4h5.2') + traco('M9.4 15.8h5.2')
};

export const icone = (nome, classe = '') => {
	const d = desenhos[nome] || desenhos.brilho;
	return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${classe ? ` class="${classe}"` : ''} aria-hidden="true">${d}</svg>`;
};

export const iconeCheio = (nome) => {
	const d = desenhos[nome] || desenhos.estrela;
	return `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
};

export const nomesDeIcone = Object.keys(desenhos);
