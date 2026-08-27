# Site do Instituto IOIS

Site institucional do **Instituto IOIS** — odontologia integrativa em Brasília/DF.
HTML, CSS e JavaScript estáticos, sem framework e **sem etapa de build no servidor**:
a Hostinger apenas faz `git pull` do repositório direto na `public_html`.

---

## Como o projeto está organizado

```
/                        páginas publicadas (index.html, instituto.html, …)
/especialidades/         uma página por especialidade em destaque
/assets/css/             style.css (design system completo) e fonts.css
/assets/js/app.js        menu, animações, contadores e envio do formulário
/assets/fonts/           Cormorant Garamond e Inter auto-hospedadas (woff2)
/assets/img/             fotos, logo, ícone e imagem de compartilhamento
/api/contato.php         recebe o formulário e envia o e-mail
/tools/                  gerador das páginas (não é publicado — veja .htaccess)
.htaccess                HTTPS, cache, compressão, 404 e proteção de arquivos
```

### As páginas HTML são geradas

Os arquivos `.html` da raiz **não devem ser editados à mão**: eles são gerados a partir
dos modelos em `tools/`. Editar direto no HTML funciona até a próxima geração — depois a
alteração é perdida.

| Para mudar | Edite |
|---|---|
| Telefone, endereço, e-mail, Instagram, horário | `tools/data/site.mjs` |
| Especialidades, textos, indicações, FAQ | `tools/data/especialidades.mjs` |
| Cabeçalho, rodapé, `<head>`, dados estruturados | `tools/lib/layout.mjs` |
| Conteúdo da home | `tools/pages/home.mjs` |
| Instituto, Dra. Iolanda, Cursos | `tools/pages/institucionais.mjs` |
| Especialidades (índice e páginas) | `tools/pages/especialidades.mjs` |
| Contato, obrigado, 404 | `tools/pages/contato.mjs` |
| Cores, tipografia, componentes | `assets/css/style.css` |

Depois de qualquer alteração em `tools/`:

```bash
node tools/build.mjs      # regenera as páginas e o sitemap.xml
node tools/verificar.mjs  # confere links, alt, títulos, JSON-LD
```

Rodar o site localmente (o formulário exige PHP):

```bash
php -S 127.0.0.1:8080 -t .    # abra http://127.0.0.1:8080
```

Scripts auxiliares:

```bash
node tools/gerar-imagens.mjs  # refaz a imagem de compartilhamento e o ícone iOS
node tools/capturar.mjs       # screenshots de verificação (desktop e mobile)
```

---

## Publicação automática na Hostinger

O site é publicado por `git pull`: **todo push no branch escolhido atualiza o site sozinho.**

1. **hPanel → Sites → (seu site) → Avançado → Git**
2. Em *Criar novo repositório*:
   - **Repositório:** `https://github.com/Teknologj1/site-IOIS`
   - **Branch:** `main` (ou o branch que você quiser publicar)
   - **Diretório:** deixe em branco para publicar na raiz da `public_html`
   > O diretório precisa estar vazio na primeira vez. Se já existe um site ali,
   > faça backup e limpe a pasta antes.
3. **Repositório privado:** a Hostinger mostra uma **chave SSH pública**. Copie e cadastre em
   GitHub → *Settings* → *Deploy keys* → *Add deploy key* (somente leitura já basta).
4. **Deploy automático:** na mesma tela da Hostinger, copie a **URL de auto deployment** e
   cadastre em GitHub → *Settings* → *Webhooks* → *Add webhook*:
   - Payload URL: a URL copiada
   - Content type: `application/json`
   - Evento: *Just the push event*
5. **hPanel → Segurança → SSL:** ative o certificado gratuito e o *Force HTTPS*.
6. **hPanel → Avançado → Configuração PHP:** use PHP 8.x (necessário para o formulário).

A partir daí: `git push` → o webhook dispara → a Hostinger atualiza a `public_html`.
Para publicar manualmente, use o botão **Deploy** na mesma tela.

---

## Formulário de contato

`api/contato.php` envia as mensagens por `mail()` do PHP — sem dependências externas.

- **Destino e remetente** ficam no topo do arquivo (`DESTINO` e `REMETENTE`).
  O remetente **precisa ser um e-mail do próprio domínio** (`contato@iois.com.br`),
  senão o e-mail cai em spam ou é recusado.
- Crie a conta de e-mail em **hPanel → E-mails** antes de publicar.
- Proteções incluídas: campo-armadilha (honeypot), tempo mínimo de preenchimento,
  limite de 5 envios por IP a cada 30 minutos e limpeza de quebras de linha
  (evita injeção de cabeçalho de e-mail).
- Sem JavaScript o formulário continua funcionando: envia normalmente e
  redireciona para `/obrigado.html`.

---

## O que ainda precisa ser substituído

As fotos atuais foram recuperadas do site anterior e do Instagram, em **baixa resolução**.
Assim que os arquivos originais chegarem, basta substituir mantendo os nomes:

| Arquivo | O que é | Ideal |
|---|---|---|
| `assets/img/iolanda-hero.jpg` | Dra. Iolanda — foto principal da home | vertical 3:4, ≥ 1200 px de largura |
| `assets/img/iolanda-retrato.jpg` | Dra. Iolanda — retrato institucional | vertical 3:4, ≥ 1200 px |
| `assets/img/iolanda-clinica.jpg` | Dra. Iolanda em atendimento | vertical, ≥ 1000 px |
| `assets/img/atendimento-detalhe.jpg` | estrutura / atendimento | horizontal 4:3, ≥ 1600 px |
| `assets/img/casos/caso-0*.jpg` | casos e conteúdos | quadrado, ≥ 1000 px |
| `assets/img/ig/post-*.jpg` | publicações do Instagram | vertical 4:5, ≥ 800 px |
| `assets/img/logo-iois.svg` | logo | arquivo vetorial oficial (SVG ou AI) |

Também precisam de confirmação:

- **CRO da responsável técnica** — hoje está `CRO-DF 0000` em `tools/data/site.mjs`.
  A exigência é do Código de Ética Odontológica para publicidade.
- Telefone, WhatsApp, e-mail, endereço completo com CEP e horário de atendimento.
- Lista de cursos e a formação da Dra. Iolanda (para as páginas *Cursos* e *Dra. Iolanda*).
- Depoimentos reais com autorização por escrito dos pacientes.

## Depois de publicar

- [ ] Apontar o domínio `iois.com.br` e ativar o SSL
- [ ] Criar `contato@iois.com.br` e testar o formulário no ar
- [ ] Cadastrar o site no Google Search Console e enviar `sitemap.xml`
- [ ] Vincular ao perfil do Google Empresas (Maps)
- [ ] Conferir o link do site na bio do Instagram
