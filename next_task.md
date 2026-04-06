

### 1. Correções Críticas (Bugs)
- **Erro 500 em Notícias:** Diagnostica e corrige o erro de servidor que impede o carregamento da página de notícias.
- **Filtros de Documentos:** Implementa a funcionalidade dos botões de pesquisa e filtros na página de documentos.
- **Alinhamento:** Garante que todos os títulos e descrições estejam devidamente centralizados em todo o site.

### 2. Estrutura de Navegação e Homepage
- **Menu:** Cria um menu "Mega Menu" moderno com animações suaves (Framer Motion). Renomeia "A Escola" para "Escola". Adiciona um novo item "Novidades" contendo "Eventos", "Noticias" e uma nova secção "Avisos". Devem ser criados todos os componentes necessarios para criacao de avisos por parte do backend (admin)
- **Homepage:** Substitui a hero section por um layout de 3 secções principais: "Avisos", "Notícias" e "Eventos".

### 3. Visualização de Conteúdo
- **Avisos na Home:** Cria uma secção de "Avisos" na página inicial, exibindo os mais recentes.
- **Eventos (Event Horizon):** Implementa um Bento Grid Dinâmico para eventos dos próximos 2 meses na Home, com um "Time-Slider" para filtragem.

### 4. Estilo e UI
- **Filtros (Notícias e Eventos):** Redesenha a barra de pesquisa e filtros para um estilo "Glassmorphism" com "Pills" interativas.
- **Estilo Geral:** Aplica a estética de cartões de 'Serviços' a todo o site, com sombras suaves, cantos arredondados e micro-interações.
- **Algo Novo: ** I have multiple white cards (like the three in the image: Ensino Básico, Ensino Secundário, Cursos Profissionais). Each card has a lot of white space on the left side next to the icon.
I want to add the same decorative effect to every card that has this white space:

Fill the left side with a very light shade of blue (soft, elegant, not bright).
Make it a gradient that starts stronger on the left and smoothly vanishes/fades towards the right side of the card.
When the user scrolls up or down the page, the blue color should give a smooth moving/flowing effect inside the card — like the light blue is gently sliding or shimmering across the white space.

Apply this effect to all similar cards automatically. It should look modern and subtle.
Please generate the CSS code for this. Prefer Tailwind CSS classes if possible, otherwise pure CSS with custom properties. Also include a version that works with scroll-driven animation or background-position animation triggered by scroll.
The cards have this structure:

A container div with class like "rounded border p-6" or similar
Inside: icon on top, title, description, and "Saber mais" link

Make sure the effect only affects the white space and doesn't interfere with the text or icon."

### 5. Tecnologias
- Frontend: Next.js + Tailwind CSS.
- Animações: Framer Motion.
- Ícones: Lucide-React.