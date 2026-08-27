<?php
/**
 * Instituto IOIS — recebimento do formulário de contato.
 *
 * Funciona de duas formas:
 *  - via fetch (JavaScript): responde JSON  {"ok":true}
 *  - sem JavaScript: redireciona para /obrigado.html
 *
 * Requer apenas PHP 7.4+ com mail() habilitado (padrão na Hostinger).
 */

declare(strict_types=1);

const DESTINO        = 'contato@iois.com.br';   // para onde as mensagens são enviadas
const REMETENTE      = 'contato@iois.com.br';   // precisa ser um e-mail do próprio domínio
const ASSUNTO_PREFIXO = '[Site IOIS] ';
const LIMITE_ENVIOS  = 5;                        // envios por IP
const JANELA_MINUTOS = 30;                       // dentro desta janela

$querJson = (
	(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch')
	|| (isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json'))
);

/** Encerra a requisição com sucesso ou erro, no formato adequado. */
function responder(bool $ok, string $mensagem = '', int $codigo = 200): void
{
	global $querJson;
	if ($querJson) {
		http_response_code($codigo);
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'erro' => $mensagem], JSON_UNESCAPED_UNICODE);
		exit;
	}
	if ($ok) {
		header('Location: /obrigado.html', true, 303);
		exit;
	}
	http_response_code($codigo);
	header('Content-Type: text/html; charset=utf-8');
	echo '<!doctype html><meta charset="utf-8"><title>Não foi possível enviar</title>'
		. '<p style="font-family:system-ui;padding:2rem;max-width:40rem;margin:auto">'
		. htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8')
		. ' <a href="/contato.html">Voltar ao formulário</a></p>';
	exit;
}

/** Limpa a entrada e remove quebras de linha (evita injeção de cabeçalho de e-mail). */
function limpar(string $valor, int $max = 200, bool $multilinha = false): string
{
	$valor = trim($valor);
	$valor = $multilinha
		? preg_replace("/[\r\n]{3,}/", "\n\n", str_replace("\r\n", "\n", $valor))
		: preg_replace('/[\r\n]+/', ' ', $valor);
	$valor = strip_tags($valor);
	return mb_substr($valor, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	responder(false, 'Método não permitido.', 405);
}

/* ---------------------------------------------------------------- anti-spam */
if (!empty($_POST['site_url'] ?? '')) {
	responder(true); // armadilha para robôs: fingimos sucesso
}

$carregadoEm = (int) ($_POST['carregado_em'] ?? 0);
if ($carregadoEm > 0 && (time() - intdiv($carregadoEm, 1000)) < 3) {
	responder(false, 'Envio muito rápido. Tente novamente.', 429);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';
$arquivoLimite = sys_get_temp_dir() . '/iois-contato-' . sha1($ip) . '.json';
$agora = time();
$registros = [];
if (is_readable($arquivoLimite)) {
	$registros = json_decode((string) file_get_contents($arquivoLimite), true) ?: [];
}
$registros = array_values(array_filter(
	$registros,
	static fn($t) => is_int($t) && $t > $agora - (JANELA_MINUTOS * 60)
));
if (count($registros) >= LIMITE_ENVIOS) {
	responder(false, 'Você já enviou várias mensagens. Fale com a gente pelo WhatsApp.', 429);
}

/* ---------------------------------------------------------------- validação */
$nome     = limpar((string) ($_POST['nome'] ?? ''), 120);
$telefone = limpar((string) ($_POST['telefone'] ?? ''), 30);
$email    = limpar((string) ($_POST['email'] ?? ''), 150);
$assunto  = limpar((string) ($_POST['assunto'] ?? 'Contato pelo site'), 100);
$mensagem = limpar((string) ($_POST['mensagem'] ?? ''), 2000, true);

$erros = [];
if (mb_strlen($nome) < 3)                                      $erros[] = 'informe seu nome completo';
if (preg_match_all('/\d/', $telefone) < 8)                     $erros[] = 'informe um telefone válido com DDD';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = 'informe um e-mail válido';
if (mb_strlen($mensagem) < 10)                                 $erros[] = 'escreva um pouco mais na mensagem';

if ($erros) {
	responder(false, 'Confira os dados: ' . implode(', ', $erros) . '.', 422);
}

/* ------------------------------------------------------------------- envio */
$corpo = "Nova mensagem pelo site do Instituto IOIS\n"
	. str_repeat('-', 46) . "\n"
	. "Nome:      {$nome}\n"
	. "Telefone:  {$telefone}\n"
	. "E-mail:    " . ($email !== '' ? $email : 'não informado') . "\n"
	. "Assunto:   {$assunto}\n"
	. str_repeat('-', 46) . "\n\n"
	. $mensagem . "\n\n"
	. str_repeat('-', 46) . "\n"
	. 'Enviado em ' . date('d/m/Y \à\s H:i') . " (horário do servidor)\n"
	. "IP: {$ip}\n";

$cabecalhos = [
	'From: Site Instituto IOIS <' . REMETENTE . '>',
	'Reply-To: ' . ($email !== '' ? "{$nome} <{$email}>" : REMETENTE),
	'Content-Type: text/plain; charset=UTF-8',
	'X-Mailer: PHP/' . phpversion(),
];

$enviado = @mail(
	DESTINO,
	'=?UTF-8?B?' . base64_encode(ASSUNTO_PREFIXO . $assunto . ' — ' . $nome) . '?=',
	$corpo,
	implode("\r\n", $cabecalhos),
	'-f' . REMETENTE
);

if (!$enviado) {
	responder(false, 'Não conseguimos enviar sua mensagem agora. Fale com a gente pelo WhatsApp.', 502);
}

$registros[] = $agora;
@file_put_contents($arquivoLimite, json_encode($registros), LOCK_EX);

responder(true);
