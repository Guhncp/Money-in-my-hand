# 💰 Money in My Hand - Controle Financeiro Pessoal

Aplicação web moderna de controle financeiro pessoal com **Sistema de Temas Dinâmicos** baseados em idade e gênero, desenvolvida para alta performance e deploy imediato na **Vercel** com **Next.js (App Router)**, **React** e **Tailwind CSS**.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado ([nodejs.org](https://nodejs.org))

### Passos:
1. Abra o terminal na pasta do projeto:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse no navegador:
   `http://localhost:3000`

---

## ⚡ Como Fazer o Deploy no Vercel

1. Suba o código para o seu **GitHub** (ou GitLab/Bitbucket).
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta.
3. Clique em **"Add New..."** -> **"Project"** e selecione o repositório.
4. O Next.js será detectado automaticamente.
5. Clique em **Deploy** e pronto! Sua aplicação estará no ar com HTTPS e CDN global.

---

## 🎨 Sistema de 4 Temas Dinâmicos (UI/UX)

A interface altera toda a sua paleta visual, contraste, tipografia e formato de componentes com base no perfil:

1. **Jovem Gamer (Até 18 anos, Homem)**:
   - Visual cyberpunk/gamer dinâmico.
   - Dark mode contrastante com acentos Neon Verde (`#10b981`) e Ciano.
   - Cantos arredondados tech e efeito glow em botões e cards.

2. **Jovem Pop (Até 18 anos, Mulher)**:
   - Visual pop moderno e fluido.
   - Paleta vibrante com magenta/pink neon (`#ec4899`) e toques pastéis.
   - Curvas suaves (`rounded-3xl`) e estilo alegre.

3. **Adulto Executivo (19+ anos, Homem)**:
   - Visual minimalista sóbrio estilo dashboard de investimentos.
   - Tons de azul marinho profundo (`#0b0f19`, `#131c2e`), ardósia e acento safira (`#3b82f6`).
   - Linhas limpas e foco na objetividade financeira.

4. **Adulto Sofisticada (19+ anos, Mulher)**:
   - Estética *Quiet Luxury*.
   - Tons quentes de espresso, neutros sofisticados e toques de Rosé Gold (`#fb7185`) e champanhe.
   - Tipografia refinada e cards elegantes.

---

## 📱 Funcionalidades Principais

- **Autenticação & Onboarding**: Login simulado com persistência em `localStorage` e modal para seleção de Idade e Gênero que recalcula o tema em tempo real.
- **Aba Visão Geral (Home)**:
  - Salário / Renda Principal editável com 1 clique.
  - Total de saídas do mês e % consumida da renda.
  - Saldo em destaque: **Money in My Hand**.
- **Aba Saídas (Despesas)**:
  - Cadastro rápido de gastos (Descrição, Valor, Categoria com ícone, Data).
  - Histórico de transações com categorização e exclusão.
- **Aba Metas**:
  - Cadastro de sonhos e metas financeiras.
  - Barra de progresso visual calculada dinamicamente: `(atual / alvo) * 100`.
  - Botão de aporte rápido ("Guardar Valor") com cálculo de quanto falta para conquistar a meta.
