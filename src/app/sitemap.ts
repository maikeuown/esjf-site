export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esjf.pt';

  // Static routes
  const staticRoutes = [
    '',
    '/a-escola',
    '/a-escola/historia',
    '/a-escola/missao-valores',
    '/a-escola/orgaos-gestao',
    '/a-escola/instalacoes',
    '/oferta-educativa',
    '/oferta-educativa/ensino-basico',
    '/oferta-educativa/ensino-secundario',
    '/oferta-educativa/cursos-profissionais',
    '/noticias',
    '/eventos',
    '/projetos',
    '/servicos',
    '/servicos/secretaria',
    '/plataformas',
    '/documentos',
    '/contactos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}
