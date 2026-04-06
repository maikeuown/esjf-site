# Relatório de Modernização Web: Escola Secundária José Falcão (ESJF)

**Autor:** Manus AI  
**Data:** 6 de abril de 2026

## 1. Análise de Design: O Estilo "Projetos e Serviços"

Após uma análise aprofundada, as páginas de **Projetos** e **Serviços** destacam-se como as mais bem estruturadas do site atual. Elas utilizam um layout de cartões (cards) com ícones coloridos e tipografia clara que deve servir de base para a reestruturação de todo o portal.

### Pontos Fortes a Preservar:
- **Hierarquia Visual:** Uso de ícones para identificação rápida de categorias.
- **Limpeza:** Fundo branco com bordas suaves que facilitam a leitura.
- **Chamadas de Ação (CTA):** Links "Saber mais" claros e bem posicionados.

---

## 2. Propostas de Design Inovadoras

### 2.1. Visualização de Eventos: O "Event Horizon" (Próximos 2 Meses)
Em vez de uma lista linear ou um calendário tradicional, propomos uma visualização de **Linha do Tempo Circular ou Bento Dinâmico** para os eventos dos próximos 60 dias:

- **O Conceito:** Um componente de "Bento Grid" dinâmico na Home onde o tamanho do cartão indica a proximidade ou importância do evento.
- **Interatividade:** Os eventos dos próximos 2 meses aparecem em cartões de tamanhos variados. Ao passar o rato (hover), o cartão expande para mostrar detalhes.
- **Filtro de Tempo:** Um seletor deslizante (slider) que permite ao utilizador filtrar visualmente "Esta Semana", "Este Mês" e "Próximo Mês", reorganizando os cartões com animações suaves (Framer Motion).

### 2.2. Reestilização de Filtros e Pesquisa
Atualmente, os filtros de Notícias e Eventos são básicos e "misturam-se" demasiado com o fundo. A proposta é uma **Barra de Ferramentas Flutuante (Glassmorphism)**:

- **Estética:** Uma barra com efeito de vidro fosco que se destaca do conteúdo.
- **Filtros por Tags:** Em vez de dropdowns, usar "Pills" (etiquetas) clicáveis que mudam de cor quando ativas, semelhantes às usadas em apps modernas de produtividade.
- **Pesquisa Preditiva:** Uma barra de pesquisa que sugere resultados instantaneamente enquanto o utilizador digita, com miniaturas de imagens.

---

## 3. Auditoria de Funcionalidade (Teste de Botões)

| Secção | Estado | Observação |
| :--- | :--- | :--- |
| **Hero Section (Home)** | ⚠️ Crítico | Botão "Contactar" tem texto invisível. |
| **Menu Dropdown** | 🔴 Ineficiente | Redundante; redireciona para páginas que apenas repetem o menu. |
| **Filtros de Notícias** | 🟠 Pobre | Design datado; não oferece feedback visual claro de seleção. |
| **Rodapé (Footer)** | 🔴 Horrível | Falta de estrutura; links amontoados sem hierarquia. |

---

## 4. Prompt Consolidado para Qwen Code

```markdown
Por favor, executa uma refatoração completa do website da ESJF focando na modernização estética e funcionalidade avançada:

### 1. Sistema de Navegação e Rodapé
- **Menu:** Cria um menu "Mega Menu" moderno com animações suaves (Framer Motion). Deve suportar múltiplos níveis e incluir ícones representativos para cada secção.
- **Footer:** Reconstrói o rodapé do zero. Usa um layout de 4 colunas: (1) Logo e Missão, (2) Links Rápidos, (3) Contactos Diretos com ícones, (4) Redes Sociais e Newsletter.

### 2. Visualização de Eventos (Inovação)
- Substitui a lista de eventos na Home por um **Bento Grid Dinâmico**.
- Este grid deve mostrar eventos dos próximos 2 meses.
- Implementa um "Time-Slider" que filtra os eventos por proximidade.
- Usa animações de layout para que os cartões se reorganizem suavemente ao filtrar.

### 3. Filtros de Notícias e Eventos
- Redesenha a barra de pesquisa e filtros para um estilo **Glassmorphism**.
- Substitui dropdowns por **Tags/Pills** interativas.
- Adiciona feedback visual (ex: glow ou mudança de escala) quando um filtro está ativo.

### 4. Estilo Geral (Inspirado em 'Projetos' e 'Serviços')
- Aplica a estética de cartões de 'Serviços' a todo o site, mas com toques modernos: sombras suaves (box-shadow: soft), cantos arredondados (border-radius: 1.5rem) e micro-interações de hover.
- Corrige o botão "Contactar" na Hero Section (garante contraste de cor).

### 5. Tecnologias
- Frontend: Next.js + Tailwind CSS.
- Animações: Framer Motion.
- Ícones: Lucide-React.
```

---

## Referências e Benchmarking
- **Design de Calendários Modernos:** [Eleken UI Trends](https://www.eleken.co/blog-posts/calendar-ui) [5]
- **Bento Grid Patterns:** [Bento Grids Showcase](https://bentogrids.com/)
- **Framer Motion Best Practices:** [Framer Motion Documentation](https://www.framer.com/motion/)
