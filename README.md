# Elden Ring Nightreign - Seed Tracker

## 📋 Descrição

Aplicativo web para rastrear e identificar seeds dos bosses do jogo Elden Ring Nightreign. O app permite visualizar spawn points, seeds disponíveis e informações sobre os círculos de fechamento das Noites 1 e 2.

## ✨ Funcionalidades

### ✅ Implementadas

1. **Seleção de 8 Bosses**
   - Gladius ⚔️
   - Adel 🛡️
   - Gnoster 🔮
   - Maris 🌊
   - Libra ⚖️
   - Fulghor ⚡
   - Caligo 🌑
   - Heolstor 🌿

2. **Aba de Spawns & Seeds**
   - Visualização de todos os spawn points de cada boss
   - Lista de seeds disponíveis para cada spawn
   - Link direto para o mapa completo de cada seed

3. **Aba de Noites**
   - Círculos de fechamento da Noite 1
   - Círculos de fechamento da Noite 2
   - Informações específicas por boss

## 🚀 Como Usar

### Método 1: Arquivo HTML (Mais Fácil)

1. Abra o arquivo `nightreign-tracker.html` diretamente no navegador
2. Não precisa de servidor ou instalação
3. Funciona offline após o primeiro carregamento

### Método 2: Componente React

1. Use o arquivo `nightreign-seed-tracker.jsx` em seu projeto React
2. Copie o código e importe no seu projeto
3. Certifique-se de ter Tailwind CSS configurado

## 📊 Como Adicionar Mais Dados

### 1. Adicionar Seeds de um Boss Existente

Encontre o boss no objeto `bossData` e adicione as seeds no spawn point correspondente:

```javascript
'Gladius': {
    url: 'https://thefifthmatt.github.io/nightreign/gladius/',
    spawns: {
        'Far Southwest': [8, 10, 13, 14, 26], // Adicione novos números aqui
        'Novo Spawn': [40, 41, 42] // Ou adicione um novo spawn
    }
}
```

### 2. Adicionar Informações de Noites

Edite o `nightData` do boss:

```javascript
nightData: {
    night1Circles: ['Circle A', 'Circle B'], // Adicione mais círculos
    night2Circles: ['Circle C', 'Circle D']
}
```

### 3. Adicionar um Novo Boss (Além dos 8)

Se você quiser expandir para mais bosses:

```javascript
// 1. Adicione na lista de bosses:
const bosses = [
    // ... bosses existentes
    { name: 'NovoBoss', color: 'bg-pink-600', icon: '🎭' }
];

// 2. Adicione os dados do boss:
const bossData = {
    // ... outros bosses
    'NovoBoss': {
        url: 'https://thefifthmatt.github.io/nightreign/novoboss/',
        spawns: {
            'Spawn 1': [0, 1, 2],
            'Spawn 2': [3, 4, 5]
        },
        nightData: {
            night1Circles: ['Círculo X'],
            night2Circles: ['Círculo Y']
        }
    }
};
```

## 🗂️ Estrutura de Dados

### Formato de Spawn Point

```javascript
'Nome do Spawn': [seed1, seed2, seed3, ...]
```

### Formato de Night Data

```javascript
nightData: {
    night1Circles: ['Nome do Círculo 1', 'Nome do Círculo 2'],
    night2Circles: ['Nome do Círculo 3', 'Nome do Círculo 4']
}
```

## 🔗 Fontes de Dados

- **TheFifthMatt's Nightreign Patterns**: https://thefifthmatt.github.io/nightreign/
- **Planilha Oficial**: https://docs.google.com/spreadsheets/d/1qZX3MfipvtPbKwPjElyx9Rler4RXLd9CPrOv7c2XOWI

## 🎨 Personalização

### Cores dos Bosses

Edite a propriedade `color` usando classes Tailwind:

```javascript
{ name: 'Gladius', color: 'bg-red-600', icon: '⚔️' }
```

Cores disponíveis no Tailwind:
- `bg-red-600` - Vermelho
- `bg-blue-600` - Azul
- `bg-purple-600` - Roxo
- `bg-green-600` - Verde
- `bg-yellow-600` - Amarelo
- `bg-orange-600` - Laranja
- E muitas outras...

### Ícones dos Bosses

Use emojis ou altere para ícones customizados:

```javascript
{ name: 'Gladius', color: 'bg-red-600', icon: '⚔️' }
                                             // ↑ Mude o emoji aqui
```

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (Responsivo)
- ✅ Tablet
- ✅ Funciona offline (após primeiro carregamento)

## 🛠️ Tecnologias Utilizadas

- React 18
- Tailwind CSS
- JavaScript ES6+
- HTML5

## 📝 Próximas Melhorias Sugeridas

1. **Filtro de Seeds**: Adicionar busca por número de seed
2. **Favoritos**: Salvar seeds favoritas no localStorage
3. **Exportar Dados**: Exportar seeds selecionadas como PDF ou imagem
4. **Dark/Light Mode**: Toggle entre temas claro e escuro
5. **Histórico**: Rastrear seeds já utilizadas
6. **Imagens dos Mapas**: Incorporar imagens dos mapas de cada seed
7. **Boss Stats**: Adicionar informações de stats e mecânicas dos bosses
8. **Comparador de Seeds**: Comparar múltiplas seeds lado a lado

## 🤝 Contribuindo

Para adicionar dados de todos os bosses:

1. Acesse as URLs de cada boss:
   - https://thefifthmatt.github.io/nightreign/gladius/
   - https://thefifthmatt.github.io/nightreign/adel/
   - https://thefifthmatt.github.io/nightreign/gnoster/
   - https://thefifthmatt.github.io/nightreign/maris/
   - https://thefifthmatt.github.io/nightreign/libra/
   - https://thefifthmatt.github.io/nightreign/fulghor/
   - https://thefifthmatt.github.io/nightreign/caligo/
   - https://thefifthmatt.github.io/nightreign/heolstor/

2. Colete os spawn points e seeds de cada um

3. Atualize o objeto `bossData` com os dados completos

4. Acesse a planilha oficial para informações sobre Night 1 e Night 2

## 📧 Suporte

Se precisar de ajuda para adicionar mais dados ou personalizar o app, consulte:
- A planilha oficial do Google Sheets
- O repositório do TheFifthMatt
- A documentação do React e Tailwind CSS

## 📄 Licença

Este projeto usa dados públicos da comunidade de Elden Ring Nightreign.

---

**Desenvolvido para a comunidade de Elden Ring Nightreign** 🎮
