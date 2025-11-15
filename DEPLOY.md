# 🚀 Guia Rápido de Deploy no GitHub Pages

## Passo a Passo Completo

### 1️⃣ Primeiro Deploy

1. **Criar repositório no GitHub:**
   - Acesse github.com
   - Clique em "New repository"
   - Nome: `night-reign-pattern-finder`
   - Marque: Public
   - Clique em "Create repository"

2. **Conectar seu projeto local ao GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/night-reign-pattern-finder.git
   git push -u origin main
   ```

3. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Adicionar ao package.json** (adicione estas linhas):
   ```json
   {
     "homepage": "https://SEU-USUARIO.github.io/night-reign-pattern-finder",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
   ⚠️ **Substitua `SEU-USUARIO` pelo seu username do GitHub!**

5. **Atualizar vite.config.js** para GitHub Pages:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/night-reign-pattern-finder/'  // ← Adicione esta linha!
   })
   ```

6. **Fazer o deploy:**
   ```bash
   npm run deploy
   ```

7. **Ativar GitHub Pages:**
   - Vá para Settings do repositório
   - Clique em "Pages" no menu lateral
   - Source: selecione "gh-pages" branch
   - Clique em "Save"
   - Aguarde alguns minutos

8. **Acessar seu app:**
   ```
   https://SEU-USUARIO.github.io/night-reign-pattern-finder
   ```

### 2️⃣ Próximos Deploys (Atualizações)

Quando fizer mudanças no código ou adicionar novas imagens:

```bash
git add .
git commit -m "Descrição da mudança"
git push
npm run deploy
```

Pronto! Em alguns minutos o site estará atualizado.

## 🔧 Troubleshooting

### Problema: Página em branco
**Solução:** Verifique se `base: '/night-reign-pattern-finder/'` está no vite.config.js

### Problema: Imagens não aparecem
**Solução:** 
1. Verifique se as imagens estão em `public/images/`
2. Verifique os nomes das pastas e arquivos
3. Rode `npm run deploy` novamente

### Problema: 404 no GitHub Pages
**Solução:** 
1. Aguarde 5-10 minutos após o deploy
2. Verifique se o branch gh-pages existe
3. Verifique as configurações em Settings > Pages

## 📝 Checklist antes do Deploy

- [ ] Todas as imagens estão na pasta `public/images/` com a estrutura correta
- [ ] `package.json` tem o "homepage" configurado
- [ ] `vite.config.js` tem o "base" configurado
- [ ] Testou localmente com `npm run dev`
- [ ] Testou a build com `npm run build` e `npm run preview`

## 🎉 Pronto!

Seu app estará acessível em:
```
https://SEU-USUARIO.github.io/night-reign-pattern-finder
```

Compartilhe com seus amigos! 🎮
