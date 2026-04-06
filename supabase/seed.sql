-- ============================================
-- ESJF Website - Seed Data
-- ============================================
-- Run this after the main schema to populate with sample data
-- ============================================

-- ============================================
-- 1. SAMPLE NEWS
-- ============================================

INSERT INTO news (title, slug, content, excerpt, status, published_at, is_featured) VALUES
  (
    'ESJF Inicia Projeto de Reabilitação de 23,8 Milhões de Euros',
    'esjf-inicia-reabilitacao-23-milhoes',
    '<p>A Escola Secundária José Falcão deu início ao ambicioso projeto de reabilitação profunda que vai transformar completamente as suas instalações.</p><p>O projeto, orçado em 23,8 milhões de euros, visa modernizar todos os espaços educativos, criar novas salas de aula equipadas com tecnologia de ponta, renovar laboratórios e melhorar as condições de acessibilidade.</p><p>A intervenção inclui ainda a criação de um auditório moderno, a renovação da biblioteca e a requalificação dos espaços exteriores.</p>',
    'A ESJF iniciou o maior projeto de investimento da sua história, com uma reabilitação profunda de 23,8 milhões de euros.',
    'published',
    NOW() - INTERVAL '5 days',
    true
  ),
  (
    'Alunos Destacam-se nas Olimpíadas da Oratória',
    'alunos-destacam-se-olimpiadas-oratoria',
    '<p>Os nossos alunos brilharam mais uma vez nas Olimpíadas da Oratória, competição nacional que desafia os estudantes a demonstrar as suas capacidades de comunicação e expressão oral.</p><p>Com discursos sobre temas atuais e pertinentes, os nossos representantes demonstraram eloquência, argumentação sólida e presença de espírito.</p>',
    'Estudantes da ESJF alcançaram excelentes resultados na competição nacional de oratória.',
    'published',
    NOW() - INTERVAL '3 days',
    true
  ),
  (
    'Inscrições Abertas para o Programa Erasmus+ 2025/2026',
    'inscricoes-abertas-erasmus-plus-2025-2026',
    '<p>Estão abertas as candidaturas para o Programa Erasmus+ para o ano letivo 2025/2026.</p><p>Esta é uma oportunidade única para os alunos participarem em mobilidades internacionais, conhecerem outras culturas e desenvolverem competências globais.</p><p>As candidaturas devem ser submetidas até 30 de abril na secretaria da escola.</p>',
    'Candidaturas para mobilidades Erasmus+ já estão abertas. Candidate-se até 30 de abril!',
    'published',
    NOW() - INTERVAL '1 day',
    true
  ),
  (
    'Comunicado: Horário Especial durante Período de Matrículas',
    'comunicado-horario-especial-matriculas',
    '<p>Informa-se a comunidade educativa que, durante o período de matrículas, a secretaria da escola funcionará com horário alargado:</p><ul><li><strong>Segunda a Sexta:</strong> 9h00 - 18h00</li><li><strong>Sábados:</strong> 9h00 - 13h00 (apenas para renovações)</li></ul><p>Para mais informações, contacte a secretaria.</p>',
    'Secretaria funcionará com horário alargado durante o período de matrículas.',
    'published',
    NOW() - INTERVAL '12 hours',
    false
  );

-- ============================================
-- 2. SAMPLE EVENTS
-- ============================================

INSERT INTO events (title, slug, description, start_date, end_date, location, status, is_featured) VALUES
  (
    'Dia Aberto - Visita às Instalações',
    'dia-aberto-visita-instalacoes',
    '<p>Venha conhecer as instalações da Escola Secundária José Falcão neste dia aberto à comunidade.</p><p>Poderá visitar as salas de aula, laboratórios, biblioteca, pavilhão gimnodesportivo e conhecer o projeto de reabilitação em curso.</p>',
    NOW() + INTERVAL '30 days',
    NOW() + INTERVAL '30 days' + INTERVAL '3 hours',
    'Escola Secundária José Falcão',
    'published',
    true
  ),
  (
    'Jogos Matemáticos 2025',
    'jogos-matematicos-2025',
    '<p>Competição interna de matemática para todos os níveis de ensino.</p><p>Desafios de lógica, resolução de problemas e raciocínio matemático.</p>',
    NOW() + INTERVAL '45 days',
    NOW() + INTERVAL '45 days' + INTERVAL '2 hours',
    'Sala Polivalente',
    'published',
    true
  ),
  (
    'Reunião de Pais e Encarregados de Educação',
    'reuniao-pais-encarregados-educacao',
    '<p>Reunião geral de pais e encarregados de educação para apresentação do Plano Anual de Atividades e esclarecimento de dúvidas.</p>',
    NOW() + INTERVAL '60 days',
    NOW() + INTERVAL '60 days' + INTERVAL '2 hours',
    'Auditório da Escola',
    'published',
    true
  ),
  (
    'Exposição de Trabalhos dos Alunos',
    'exposicao-trabalhos-alunos',
    '<p>Exposição aberta à comunidade dos melhores trabalhos realizados pelos alunos ao longo do ano letivo.</p>',
    NOW() + INTERVAL '90 days',
    NOW() + INTERVAL '92 days',
    'Hall de Entrada',
    'published',
    false
  );

-- ============================================
-- 3. SAMPLE HIGHLIGHTS (Homepage Carousel)
-- ============================================

INSERT INTO highlights (title, subtitle, description, image_url, link_url, link_text, order_index, is_active) VALUES
  (
    'Bem-vindos à ESJF',
    'Escola Secundária José Falcão',
    'Um dos primeiros Liceus de Portugal, desde 1936',
    '/images/placeholder-hero.jpg',
    '/a-escola',
    'Conhecer a Escola',
    0,
    true
  ),
  (
    'Projeto de Reabilitação',
    'Investimento de 23,8 M€',
    'Modernização completa das nossas instalações',
    '/images/placeholder-renovation.jpg',
    '/a-escola/instalacoes',
    'Saber mais',
    1,
    true
  ),
  (
    'Erasmus+',
    'Mobilidades Internacionais',
    'Oportunidades únicas para os nossos alunos',
    '/images/placeholder-erasmus.jpg',
    '/projetos',
    'Descobrir',
    2,
    true
  );

-- ============================================
-- 4. SAMPLE DOCUMENTS
-- ============================================

INSERT INTO documents (title, description, category, file_url, file_name, is_published) VALUES
  (
    'Regulamento Interno da Escola',
    'Versão atualizada do regulamento interno da ESJF',
    'regulamentos',
    '/documents/regulamento-interno.pdf',
    'regulamento-interno.pdf',
    true
  ),
  (
    'Calendário Escolar 2024/2025',
    'Calendário do ano letivo 2024/2025',
    'informacoes',
    '/documents/calendario-escolar.pdf',
    'calendario-escolar-2024-2025.pdf',
    true
  ),
  (
    'Circular n.º 15/2024 - Matrículas',
    'Informações sobre o processo de matrículas para o próximo ano letivo',
    'circulares',
    '/documents/circular-15-2024.pdf',
    'circular-15-2024-matriculas.pdf',
    true
  ),
  (
    'Ementa do Refeitório - Março 2025',
    'Ementa para o mês de março de 2025',
    'ementas',
    '/documents/ementa-marco-2025.pdf',
    'ementa-marco-2025.pdf',
    true
  );

-- ============================================
-- END OF SEED DATA
-- ============================================
