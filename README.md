# 🗺️ Night Reign Pattern Finder

Aplicação React para encontrar padrões de spawn, círculos e bosses no Night Reign baseado na escolha do Nightlord.

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/night-reign-pattern-finder.git
cd night-reign-pattern-finder
```

2. Instale as dependências:
```bash
npm install
```

3. **⚠️ IMPORTANTE: Adicione as imagens das seeds** (veja seção abaixo)

4. Rode o projeto em modo desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:5173
```

## 📸 ONDE COLOCAR AS IMAGENS DAS SEEDS

### 🎯 **LOCALIZAÇÃO DAS IMAGENS:**

Todas as imagens devem ser colocadas na pasta:

```
public/images/
```

### 📁 **ESTRUTURA DE PASTAS E NOMES DOS ARQUIVOS:**

As imagens devem seguir esta estrutura exata:

```
public/images/
├── Gladius/
│   ├── 0.webp (ou 0.png)
│   ├── 1.webp (ou 1.png)
│   ├── 2.webp (ou 2.png)
│   ├── ...
│   └── 29.webp (ou 29.png)
│
├── Gnoster/
│   ├── 0.webp (ou 0.png)
│   └── 1.webp (ou 1.png)
│
├── Maris/
│   └── 0.webp (ou 0.png)
│
├── Libra/
│   └── 0.webp (ou 0.png)
│
├── Fulghor/
│   └── 0.webp (ou 0.png)
│
├── Caligo/
│   └── 0.webp (ou 0.png)
│
└── Heolstor/
    └── 0.webp (ou 0.png)
```

### ✅ **REGRAS IMPORTANTES:**

1. **Nome das pastas:** Deve ser EXATAMENTE como listado acima (com a primeira letra maiúscula)
2. **Nome dos arquivos:** Deve ser o número da seed (0, 1, 2, etc.) + extensão (.webp ou .png)
3. **Formato:** Prefira .webp, mas .png também funciona (o app tenta .webp primeiro, depois .png)
4. **Exemplos de caminhos corretos:**
   - `public/images/Gladius/0.webp`
   - `public/images/Gladius/15.png`
   - `public/images/Gnoster/1.webp`
   - `public/images/Maris/0.png`

### 🔍 **COMO CONSEGUIR AS IMAGENS:**

Segundo o código, as imagens originalmente vêm de:
```
https://thefifthmatt.github.io/nightreign/
```

Você pode baixá-las de lá e organizá-las na estrutura acima.

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento (geralmente em http://localhost:5173)

### Build para Produção
```bash
npm run build
```
Cria a versão otimizada para produção na pasta `dist/`

### Preview da Build
```bash
npm run preview
```
Visualiza a versão de produção localmente

## 📦 Deploy no GitHub Pages

1. Instale o gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Adicione ao `package.json`:
```json
{
  "homepage": "https://seu-usuario.github.io/night-reign-pattern-finder",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Faça o deploy:
```bash
npm run deploy
```

## 🎮 Como Usar a Aplicação

1. **Escolha o Senhor da Noite** que você selecionou no Roundtable Hold
2. **Identifique visualmente** onde você nasceu pelas miniaturas dos mapas
3. **Selecione a seed** (se houver mais de uma com aquele spawn)
4. **Veja o mapa completo** com spawn, círculos e bosses!

## 🏗️ Estrutura do Projeto

```
night-reign-pattern-finder/
├── public/
│   └── images/              ← 📸 COLOQUE AS IMAGENS AQUI!
│       ├── Gladius/
│       ├── Gnoster/
│       ├── Maris/
│       ├── Libra/
│       ├── Fulghor/
│       ├── Caligo/
│       └── Heolstor/
├── src/
│   ├── components/
│   │   └── NightReignPatternFinder.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones

## 📝 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
