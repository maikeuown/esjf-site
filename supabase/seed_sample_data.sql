-- ============================================
-- ESJF - Sample Data Seed
-- Run this SQL in your Supabase SQL Editor
-- AFTER running schema.sql and avisos_table.sql
-- ============================================

-- ============================================
-- 1. SAMPLE AVISOS (Notices)
-- ============================================

INSERT INTO avisos (title, slug, content, excerpt, priority, status, published_at, expires_at, is_pinned) VALUES
  (
    'Matrículas Abertas 2025/2026',
    'matriculas-abertas-2025-2026',
    '<p>Informamos que o período de matrículas para o ano letivo 2025/2026 está aberto.</p>
     <p><strong>Quem deve efetuar matrícula:</strong></p>
     <ul>
       <li>Alunos novos na escola</li>
       <li>Alunos que mudam de curso ou de ciclo de estudos</li>
       <li>Alunos retidos no ano anterior</li>
     </ul>
     <p>O prazo para matrículas termina no dia 30 de junho de 2025.</p>',
    'Período de matrículas para o ano letivo 2025/2026 está aberto até 30 de junho.',
    'urgent',
    'published',
    NOW() - INTERVAL '3 days',
    NOW() + INTERVAL '60 days',
    true
  ),
  (
    'Alteração de Horário - Secretaria',
    'alteracao-horario-secretaria',
    '<p>Informa-se que, a partir do dia 15 de abril, o horário de atendimento ao público da Secretaria será:</p>
     <p><strong>Segunda a Sexta: 08:30 - 17:00</strong></p>
     <p>O horário de almoço mantém-se das 12:30 às 14:00.</p>',
    'Novo horário de atendimento da Secretaria entra em vigor a 15 de abril.',
    'normal',
    'published',
    NOW() - INTERVAL '5 days',
    NOW() + INTERVAL '30 days',
    false
  ),
  (
    'Encerramento Temporário da Biblioteca',
    'encerramento-temporario-biblioteca',
    '<p>A Biblioteca Escolar estará encerrada nos dias 10 e 11 de abril para reorganização do acervo.</p>
     <p>O serviço de requisição de livros será temporariamente assegurado na Sala de Estudo.</p>',
    'Biblioteca encerrada nos dias 10 e 11 de abril para reorganização.',
    'low',
    'published',
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '15 days',
    false
  );

-- ============================================
-- 2. SAMPLE NEWS
-- ============================================

INSERT INTO news (title, slug, content, excerpt, category_id, status, published_at, is_featured) VALUES
  (
    'ESJF Recebe Olimpíadas da Matemática',
    'esjf-recebe-olimpiadas-matematica',
    '<p>A Escola Secundária José Falcão acolheu, no passado dia 28 de março, a fase regional das Olimpíadas da Matemática.</p>
     <p>O evento contou com a participação de mais de 120 alunos provenientes de 15 escolas do distrito de Coimbra.</p>
     <p>Os nossos alunos obtiveram resultados notáveis, conquistando 3 medalhas de ouro, 5 de prata e 8 de bronze.</p>
     <p>Parabéns a todos os participantes e em especial aos medalhados!</p>',
    'Mais de 120 alunos participaram na fase regional das Olimpíadas da Matemática na ESJF.',
    (SELECT id FROM news_categories WHERE slug = 'academico'),
    'published',
    NOW() - INTERVAL '7 days',
    true
  ),
  (
    'Inauguração do Novo Laboratório de Ciências',
    'inauguracao-novo-laboratorio-ciencias',
    '<p>Foi inaugurado no passado dia 1 de abril o novo Laboratório de Ciências da Escola Secundária José Falcão.</p>
     <p>Este espaço moderno e equipado permite aos alunos realizar experiências práticas nas áreas de Física, Química e Biologia.</p>
     <p>O investimento de 150.000€ foi financiado pelo Programa Operacional Regional do Centro.</p>',
    'Novo Laboratório de Ciências oferece aos alunos um espaço moderno e equipado para experiências práticas.',
    (SELECT id FROM news_categories WHERE slug = 'geral'),
    'published',
    NOW() - INTERVAL '4 days',
    false
  ),
  (
    'Torneio Inter-Escolas de Futsal',
    'torneio-inter-escolas-futsal',
    '<p>A equipa de futsal da ESJF sagrou-se campeã do Torneio Inter-Escolas da Região Centro.</p>
     <p>A final realizou-se no Pavilhão Municipal de Coimbra, com uma audiência de mais de 500 pessoas.</p>
     <p>A nossa equipa venceu por 4-2 o Colégio de São Teotónio, numa final emocionante.</p>',
    'Equipa de futsal da ESJF campeã do Torneio Inter-Escolas da Região Centro.',
    (SELECT id FROM news_categories WHERE slug = 'desporto'),
    'published',
    NOW() - INTERVAL '2 days',
    true
  ),
  (
    'Projeto Erasmus+ na Polónia',
    'projeto-erasmus-mais-polonia',
    '<p>Dez alunos e dois professores da ESJF estão a participar num intercâmbio Erasmus+ na Polónia.</p>
     <p>O projeto, intitulado "Sustainable Cities of Tomorrow", reúne escolas de 6 países europeus.</p>
     <p>Os alunos estão a desenvolver projetos sobre sustentabilidade urbana e apresentarão os resultados em junho.</p>',
    'Alunos e professores da ESJF participam em intercâmbio Erasmus+ na Polónia sobre cidades sustentáveis.',
    (SELECT id FROM news_categories WHERE slug = 'projetos'),
    'published',
    NOW() - INTERVAL '1 day',
    false
  );

-- ============================================
-- 3. SAMPLE EVENTS
-- ============================================

INSERT INTO events (title, slug, description, start_date, end_date, location, is_featured, status) VALUES
  (
    'Dia Aberto - Conhece a Nossa Escola',
    'dia-aberto-conhece-escola',
    '<p>Venha conhecer a Escola Secundária José Falcão no nosso Dia Aberto anual.</p>
     <p>Atividades previstas:</p>
     <ul>
       <li>Visitas guiadas às instalações</li>
       <li>Demonstrações de projetos dos alunos</li>
       <li>Apresentação da oferta educativa</li>
       <li>Sessão de perguntas e respostas</li>
     </ul>',
    NOW() + INTERVAL '14 days',
    NOW() + INTERVAL '14 days' + INTERVAL '4 hours',
    'Escola Secundária José Falcão',
    true,
    'published'
  ),
  (
    'Conferência: Inteligência Artificial na Educação',
    'conferencia-ia-educacao',
    '<p>Conferência sobre o impacto da Inteligência Artificial no ensino e aprendizagem.</p>
     <p>Orador principal: Prof. Dr. João Costa, Universidade de Coimbra.</p>',
    NOW() + INTERVAL '21 days',
    NOW() + INTERVAL '21 days' + INTERVAL '2 hours',
    'Auditório da ESJF',
    true,
    'published'
  ),
  (
    'Festival de Primavera',
    'festival-primavera',
    '<p>O tradicional Festival de Primavera da ESJF regressa com atuações musicais, exposições de arte e gastronomia.</p>
     <p>Contamos com a participação dos alunos, professores e famílias num dia de celebração da comunidade escolar.</p>',
    NOW() + INTERVAL '35 days',
    NOW() + INTERVAL '35 days' + INTERVAL '8 hours',
    'Jardim da Escola',
    true,
    'published'
  ),
  (
    'Reunião de Pais e Encarregados de Educação',
    'reuniao-pais-encarregados',
    '<p>Reunião geral de Pais e Encarregados de Educação para balanço do segundo período e planeamento do terceiro período.</p>',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '7 days' + INTERVAL '2 hours',
    'Sala de Atos da ESJF',
    false,
    'published'
  ),
  (
    'Workshop: Técnicas de Estudo Eficazes',
    'workshop-tecnicas-estudo',
    '<p>Workshop para alunos sobre técnicas de estudo, organização e gestão do tempo.</p>
     <p>Orientado pela equipa do Serviço de Psicologia e Orientação (SPO).</p>',
    NOW() + INTERVAL '10 days',
    NOW() + INTERVAL '10 days' + INTERVAL '1.5 hours',
    'Sala 12 - ESJF',
    false,
    'published'
  );

-- ============================================
-- 4. SAMPLE HIGHLIGHTS
-- ============================================

INSERT INTO highlights (title, subtitle, description, image_url, link_url, link_text, order_index, is_active) VALUES
  (
    'Matrículas Abertas 2025/2026',
    'Inscreva-se já!',
    'O período de matrículas para o próximo ano letivo já está aberto. Não perca o prazo.',
    'https://placehold.co/1200x600/1e40af/ffffff?text=Matriculas+2025+2026',
    '/avisos/matriculas-abertas-2025-2026',
    'Saber mais',
    0,
    true
  ),
  (
    'Campeões de Futsal',
    'Torneio Inter-Escolas',
    'A nossa equipa de futsal sagrou-se campeã regional. Parabéns a todos os jogadores!',
    'https://placehold.co/1200x600/059669/ffffff?text=Campeoes+Futsal',
    '/noticias/torneio-inter-escolas-futsal',
    'Ver notícia',
    1,
    true
  ),
  (
    'Dia Aberto 2025',
    'Vem conhecer a ESJF',
    'Portas abertas à comunidade. Venha descobrir tudo o que a nossa escola tem para oferecer.',
    'https://placehold.co/1200x600/d97706/ffffff?text=Dia+Aberto+2025',
    '/eventos/dia-aberto-conhece-escola',
    'Registar',
    2,
    true
  );

-- ============================================
-- 5. SAMPLE CONTACT MESSAGES
-- ============================================

INSERT INTO contact_messages (name, email, subject, message, category, is_read) VALUES
  ('Maria Silva', 'maria.silva@email.pt', 'Informações sobre matrículas', 'Gostaria de saber quais os documentos necessários para efetuar a matrícula do meu filho no 7º ano.', 'secretaria', false),
  ('João Santos', 'joao.santos@email.pt', 'Horário de atendimento', 'Pode informar-me se a secretaria funciona ao sábado?', 'geral', true),
  ('Ana Costa', 'ana.costa@email.pt', 'Projeto Erasmus+', 'O meu filho está interessado no projeto Erasmus+. Pode dar-me mais informações?', 'direcao', false);

-- ============================================
-- END OF SEED DATA
-- ============================================
