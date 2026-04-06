import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Heart, Stethoscope, Clock, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfessionalCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Cursos Profissionais</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Formação qualificada com forte componente prática para inserção no mercado de trabalho
        </p>

        {/* Featured Course */}
        <Card className="mb-8 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <Stethoscope className="h-10 w-10 text-primary shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Técnico Auxiliar de Saúde</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  Curso profissional que forma técnicos capazes de apoiar profissionais de saúde 
                  em diversas valências, desde hospitais a centros de saúde, lares e cuidados domiciliários.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Duração</div>
                  <div className="text-xs text-muted-foreground">3 anos</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Certificação</div>
                  <div className="text-xs text-muted-foreground">Nível IV EQF</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Estágios</div>
                  <div className="text-xs text-muted-foreground">Inserção curricular</div>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6">
              <h3 className="font-bold mb-3">O que vais aprender:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Apoio direto a utentes em contextos de saúde diversos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Procedimentos técnicos de saúde básicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Higiene, segurança e conforto do utente</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>Organização e gestão do ambiente de trabalho</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Career Prospects */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Saídas Profissionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <Heart className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Hospitais e Clínicas</h4>
                <p className="text-sm text-muted-foreground">Apoio a profissionais de saúde em contextos hospitalares</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <Heart className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Lares e Residências</h4>
                <p className="text-sm text-muted-foreground">Acompanhamento e apoio a idosos e pessoas com dependência</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <Heart className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Cuidados Domiciliários</h4>
                <p className="text-sm text-muted-foreground">Prestação de cuidados no domicílio</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <Heart className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold mb-1">Centros de Saúde</h4>
                <p className="text-sm text-muted-foreground">Apoio em unidades de saúde primárias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Condições de Acesso</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Ter concluído o 9º ano de escolaridade</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Ter até 23 anos à data de início do curso</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                <span>Candidatura através da plataforma SIGA</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contactos">
            <Button>
              Contactar Secretaria
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/oferta-educativa">
            <Button variant="outline">
              Voltar à Oferta Educativa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
