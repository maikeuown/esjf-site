import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, GraduationCap, BookOpen } from 'lucide-react';

const managementBodies = [
  {
    icon: Users,
    title: 'Conselho Geral',
    description: 'Órgão máximo de representação da escola, composto por representantes de todos os setores da comunidade educativa.',
    members: [
      'Representantes dos professores',
      'Representantes dos pais e encarregados de educação',
      'Representantes dos alunos',
      'Representantes do pessoal não docente',
      'Personalidades da sociedade civil',
    ],
  },
  {
    icon: Briefcase,
    title: 'Direção',
    description: 'Órgão executivo responsável pela gestão pedagógica, administrativa e financeira da escola.',
    members: [
      'Diretora',
      'Diretora Adjunta',
      'Diretora Adjunta',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Conselho Pedagógico',
    description: 'Órgão de coordenação pedagógica, responsável pela orientação educativa e acompanhamento do processo de ensino-aprendizagem.',
    members: [
      'Diretor (presidente)',
      'Coordenadores de departamento',
      'Representantes dos professores',
    ],
  },
  {
    icon: BookOpen,
    title: 'Conselho Administrativo',
    description: 'Órgão responsável pela administração dos recursos financeiros e patrimoniais da escola.',
    members: [
      'Diretor (presidente)',
      'Chefe dos Serviços de Administração Escolar',
      'Representante do Conselho Geral',
    ],
  },
];

export default function ManagementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Órgãos de Gestão</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Conheça a estrutura de gestão e governação da Escola Secundária José Falcão
        </p>

        <div className="space-y-8">
          {managementBodies.map((body, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-4 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <body.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{body.title}</h2>
                    <p className="text-muted-foreground">{body.description}</p>
                  </div>
                </div>
                
                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Composição:</h3>
                  <ul className="space-y-2">
                    {body.members.map((member, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <Card className="mt-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Nota:</strong> Os nomes dos membros dos órgãos de gestão são atualizados periodicamente. 
              Para informação atualizada, contacte a secretaria da escola ou consulte o Diário da República.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
