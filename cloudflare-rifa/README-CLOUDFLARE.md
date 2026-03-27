# Publicar no Cloudflare Pages

## Opcao 1 (mais rapida): Drag and drop
1. Acesse o painel do Cloudflare.
2. Va em `Workers & Pages` -> `Create` -> `Pages`.
3. Escolha `Upload assets`.
4. Envie o conteudo desta pasta (`cloudflare-rifa`), incluindo o `index.html`.
5. Clique em deploy.

## Opcao 2: CLI com Wrangler
Prerequisito: Node.js instalado e conta Cloudflare.

```bash
npm i -g wrangler
wrangler login
cd cloudflare-rifa
wrangler pages project create rifa-turma-8b
wrangler pages deploy . --project-name rifa-turma-8b
```

A URL publica sera mostrada ao final do deploy.
