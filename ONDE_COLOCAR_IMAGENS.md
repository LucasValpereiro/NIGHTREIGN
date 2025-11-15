# 🎯 GUIA RÁPIDO - ONDE COLOCAR AS IMAGENS

## ⚡ ATENÇÃO: LEIA ISTO PRIMEIRO!

### 📍 LOCALIZAÇÃO DAS IMAGENS:

```
public/images/NOME_DO_NIGHTLORD/NUMERO_DA_SEED.webp
```

---

## 🗂️ EXEMPLO VISUAL:

```
📁 night-reign-pattern-finder/
  │
  ├── 📁 public/
  │   └── 📁 images/              ◄── AQUI!
  │       │
  │       ├── 📁 Gladius/         ◄── Crie esta pasta
  │       │   ├── 0.webp         ◄── Coloque estas imagens
  │       │   ├── 1.webp
  │       │   ├── 2.webp
  │       │   └── ... (até 29.webp)
  │       │
  │       ├── 📁 Gnoster/         ◄── Crie esta pasta
  │       │   ├── 0.webp         ◄── Coloque estas imagens
  │       │   └── 1.webp
  │       │
  │       ├── 📁 Maris/           ◄── Crie esta pasta
  │       │   └── 0.webp         ◄── Coloque esta imagem
  │       │
  │       ├── 📁 Libra/           ◄── Crie esta pasta
  │       │   └── 0.webp         ◄── Coloque esta imagem
  │       │
  │       ├── 📁 Fulghor/         ◄── Crie esta pasta
  │       │   └── 0.webp         ◄── Coloque esta imagem
  │       │
  │       ├── 📁 Caligo/          ◄── Crie esta pasta
  │       │   └── 0.webp         ◄── Coloque esta imagem
  │       │
  │       └── 📁 Heolstor/        ◄── Crie esta pasta
  │           └── 0.webp         ◄── Coloque esta imagem
  │
  ├── 📁 src/
  └── ... (outros arquivos)
```

---

## ✅ CHECKLIST RÁPIDO:

- [ ] Entrei na pasta `night-reign-pattern-finder`
- [ ] Abri a pasta `public`
- [ ] Abri a pasta `images`
- [ ] Vi as 7 pastas dos Nightlords (Gladius, Gnoster, Maris, etc.)
- [ ] Coloquei as imagens dentro da pasta correta do Nightlord
- [ ] As imagens têm nomes como: `0.webp`, `1.webp`, `2.webp`, etc.

---

## 🎮 QUANTAS IMAGENS POR NIGHTLORD:

| Nightlord | Quantidade | Arquivos                    |
|-----------|------------|------------------------------|
| Gladius   | 30         | 0.webp até 29.webp          |
| Gnoster   | 2          | 0.webp e 1.webp             |
| Maris     | 1          | 0.webp                      |
| Libra     | 1          | 0.webp                      |
| Fulghor   | 1          | 0.webp                      |
| Caligo    | 1          | 0.webp                      |
| Heolstor  | 1          | 0.webp                      |

**Total: 37 imagens**

---

## ⚠️ ERROS COMUNS - NÃO FAÇA ISSO:

❌ `images/gladius/0.webp` (minúscula)  
✅ `images/Gladius/0.webp` (Maiúscula)

❌ `images/Gladius/seed0.webp`  
✅ `images/Gladius/0.webp`

❌ `images/Gladius/Seed_0.webp`  
✅ `images/Gladius/0.webp`

❌ `src/images/Gladius/0.webp`  
✅ `public/images/Gladius/0.webp`

---

## 🚀 DEPOIS DE COLOCAR AS IMAGENS:

1. Abra o terminal na pasta do projeto
2. Execute: `npm install`
3. Execute: `npm run dev`
4. Abra: `http://localhost:5173`
5. Selecione um Nightlord
6. As imagens devem aparecer! 🎉

---

## 🔍 TESTAR SE ESTÁ CORRETO:

No navegador, acesse:
```
http://localhost:5173/images/Gladius/0.webp
```

Se a imagem aparecer = ✅ CORRETO!  
Se der erro 404 = ❌ Verifique a localização

---

## 📥 ONDE CONSEGUIR AS IMAGENS:

```
https://thefifthmatt.github.io/nightreign/
```

Baixe de lá e organize conforme explicado acima.

---

**💡 DICA:** As pastas já estão criadas! Você só precisa colocar as imagens dentro delas.
