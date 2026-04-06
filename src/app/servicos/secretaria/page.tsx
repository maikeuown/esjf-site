import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Clock, Phone, MapPin, FileText } from 'lucide-react';

export default function SecretariaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Secretaria</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Serviço de administração escolar e apoio a alunos e encarregados de educação
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 card-shimmer-static">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-3">Horário de Atendimento</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">Segunda a Sexta:</strong> 08:30 - 17:00</p>
                <p><strong className="text-foreground">Feriados:</strong> Encerrado</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 card-shimmer-static">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-3">Contactos</h2>
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">Telefone:</strong> 239 487 170 / 171 / 172</p>
                <p><strong className="text-foreground">Email:</strong> secretaria@esjf.pt</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-border/50 card-shimmer-static">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-4">Serviços Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Matrículas e Renovações',
                'Certidões e Declarações',
                'Consultas de Horários',
                'Emissão de Cédulas',
                'Informações sobre Pautas',
                'Apoio a Encarregados de Educação',
                'Processos de Mudança de Escola',
                'Bolsas de Estudo (ASE)',
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Documentos Necessários para Matrícula</h2>
            <ul className="space-y-2 text-muted-foreground">
              {[
                'Ficha de matrícula preenchida',
                'Documento de identificação do aluno',
                'Cartão de Cidadão do Encarregado de Educação',
                'Comprovativo de morada',
                'Fotocópia do NIF do aluno',
                'Fotocópia do NIF do Encarregado de Educação',
                '2 Fotografias tipo passe',
                'Comprovativo de escalão de ASE (se aplicável)',
              ].map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Nota:</strong> Para informações atualizadas sobre horários da secretaria, períodos de 
              matrículas e documentos necessários, recomendamos que contacte a secretaria diretamente 
              ou consulte as circulares disponíveis na secção de Documentos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
