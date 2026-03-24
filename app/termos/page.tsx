import Link from 'next/link';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="bg-slate-800/50 rounded-lg p-8 space-y-6 text-slate-200">
          <p className="text-sm text-slate-400">Última atualização: 24 de março de 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a plataforma Clareia, você concorda com estes Termos de Uso. 
              Se você tem menos de 18 anos, certifique-se de que seus pais ou responsáveis 
              legais leram e concordaram com estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Sobre a Plataforma</h2>
            <p>
              O Clareia é uma plataforma educacional gratuita destinada a estudantes do 6º ao 9º ano 
              do ensino fundamental. Oferecemos conteúdo educativo em vídeo, quizzes interativos e 
              um assistente de IA para tirar dúvidas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Uso do Assistente de IA</h2>
            <p className="mb-3">
              O tutor de IA (Clareia) utiliza tecnologia de terceiros (Groq API) para processar 
              suas perguntas e fornecer respostas. Ao usar este recurso, você entende que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Suas mensagens são processadas por serviços externos de inteligência artificial</li>
              <li>Existe um limite de 10 perguntas por hora por usuário</li>
              <li>As respostas são geradas automaticamente e podem conter imprecisões</li>
              <li>Não armazenamos o histórico de conversas permanentemente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Cadastro e Conta</h2>
            <p className="mb-3">Para usar recursos completos da plataforma, você precisa criar uma conta. Ao se cadastrar:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você deve fornecer informações verdadeiras e atualizadas</li>
              <li>Você é responsável por manter sua senha segura</li>
              <li>Você não deve compartilhar sua conta com outras pessoas</li>
              <li>Menores de 13 anos devem ter autorização dos pais ou responsáveis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Conduta do Usuário</h2>
            <p className="mb-3">Você concorda em NÃO:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Usar a plataforma para fins ilegais ou não autorizados</li>
              <li>Tentar hackear, sobrecarregar ou prejudicar o funcionamento da plataforma</li>
              <li>Fazer uso abusivo do assistente de IA (spam, conteúdo inadequado, etc.)</li>
              <li>Copiar ou redistribuir o conteúdo educacional sem autorização</li>
              <li>Usar scripts ou automações para burlar limites de uso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Propriedade Intelectual</h2>
            <p>
              Os vídeos educacionais são de propriedade de seus respectivos criadores no YouTube. 
              O Clareia apenas incorpora esses vídeos para fins educacionais. Todo o restante do 
              conteúdo (quizzes, interface, código) é propriedade do Clareia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Privacidade</h2>
            <p>
              O uso de seus dados pessoais está detalhado em nossa{' '}
              <Link href="/privacidade" className="text-blue-400 hover:underline">
                Política de Privacidade
              </Link>
              . Coletamos apenas os dados necessários para o funcionamento da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Limitação de Responsabilidade</h2>
            <p className="mb-3">
              O Clareia é fornecido &quot;como está&quot;. Não garantimos que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>O serviço estará sempre disponível sem interrupções</li>
              <li>Todas as respostas do tutor de IA estarão corretas</li>
              <li>O conteúdo educacional cobrirá todo o currículo escolar</li>
              <li>Seu desempenho escolar melhorará pelo uso da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Modificações</h2>
            <p>
              Podemos modificar estes Termos de Uso a qualquer momento. Mudanças significativas 
              serão notificadas na plataforma. O uso continuado após as alterações constitui 
              aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Cancelamento de Conta</h2>
            <p>
              Você pode solicitar o cancelamento de sua conta e exclusão de seus dados a qualquer 
              momento através da página de perfil ou entrando em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras, incluindo a Lei Geral de Proteção 
              de Dados (LGPD - Lei 13.709/2018) e o Estatuto da Criança e do Adolescente (ECA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através 
              do email: contato@clareia.com.br
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
