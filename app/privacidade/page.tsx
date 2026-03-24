import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="bg-slate-800/50 rounded-lg p-8 space-y-6 text-slate-200">
          <p className="text-sm text-slate-400">Última atualização: 24 de março de 2026</p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introdução</h2>
            <p>
              Esta Política de Privacidade explica como o Clareia coleta, usa, armazena e protege 
              seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
            </p>
            <p className="mt-3 bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <strong>⚠️ Atenção, pais e responsáveis:</strong> O Clareia é destinado a estudantes 
              de 12 a 15 anos (6º ao 9º ano). Se seu filho tem menos de 13 anos, você deve ler esta 
              política e autorizar o cadastro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Dados Coletados</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-slate-100">2.1 Dados Fornecidos por Você</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Nome:</strong> usado para personalização da experiência</li>
              <li><strong>Email:</strong> usado para login e recuperação de conta</li>
              <li><strong>Senha:</strong> armazenada de forma criptografada (nunca em texto puro)</li>
              <li><strong>Série escolar:</strong> para personalizar o conteúdo educacional</li>
              <li><strong>Escola (opcional):</strong> para estatísticas gerais</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-slate-100">2.2 Dados Coletados Automaticamente</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li><strong>Progresso de aulas:</strong> quais aulas você completou e quando</li>
              <li><strong>Resultados de quiz:</strong> suas pontuações e tentativas</li>
              <li><strong>Dias de estudo:</strong> datas em que você acessou a plataforma</li>
              <li><strong>Endereço IP:</strong> usado apenas para rate limiting e segurança (não armazenado permanentemente)</li>
              <li><strong>Dados de uso:</strong> páginas visitadas, tempo de uso (para melhorar a plataforma)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-slate-100">2.3 Dados do Assistente de IA</h3>
            <p className="mb-2">Quando você usa o tutor de IA:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Suas perguntas são enviadas para a <strong>Groq API</strong> (serviço de IA de terceiros)</li>
              <li>As conversas <strong>NÃO são armazenadas permanentemente</strong> no nosso banco de dados</li>
              <li>A Groq pode processar temporariamente suas mensagens (consulte a política deles)</li>
              <li>Registramos apenas a quantidade de perguntas para controle de limite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Como Usamos Seus Dados</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Autenticação:</strong> permitir que você faça login e acesse sua conta</li>
              <li><strong>Personalização:</strong> mostrar seu progresso, pontos e conquistas</li>
              <li><strong>Ranking:</strong> exibir sua posição no leaderboard (apenas nome e pontos são públicos)</li>
              <li><strong>Estatísticas:</strong> gerar estatísticas anônimas de uso da plataforma</li>
              <li><strong>Segurança:</strong> prevenir abuso e proteger a plataforma</li>
              <li><strong>Melhorias:</strong> entender como os estudantes usam o Clareia para melhorá-lo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Compartilhamento de Dados</h2>
            <p className="mb-3">Seus dados pessoais <strong>NÃO</strong> são vendidos a terceiros. Compartilhamos apenas com:</p>
            
            <h3 className="text-xl font-semibold mb-3 text-slate-100">4.1 Serviços Técnicos Necessários</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Supabase:</strong> hospeda nosso banco de dados (localizado na América do Norte)</li>
              <li><strong>Vercel:</strong> hospeda a plataforma web (infraestrutura global)</li>
              <li><strong>Groq:</strong> processa perguntas do tutor de IA (apenas quando você usa o tutor)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-slate-100 mt-4">4.2 Dados Públicos</h3>
            <p>No ranking público, exibimos apenas:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Seu nome (ou apelido, se configurado)</li>
              <li>Sua pontuação total</li>
              <li>Sua série escolar</li>
            </ul>
            <p className="mt-2 text-sm text-slate-400">
              Seu email, escola e outros dados pessoais <strong>NUNCA</strong> são exibidos publicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Armazenamento e Segurança</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Criptografia:</strong> senhas são armazenadas com hash bcrypt</li>
              <li><strong>HTTPS:</strong> todas as conexões são criptografadas</li>
              <li><strong>Controle de acesso:</strong> Row Level Security (RLS) no banco de dados</li>
              <li><strong>Backups:</strong> backups automáticos por 7 dias</li>
              <li><strong>Localização:</strong> dados armazenados em servidores na América do Norte e Europa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Seus Direitos (LGPD)</h2>
            <p className="mb-3">De acordo com a LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Acessar seus dados:</strong> veja tudo que temos sobre você (página de perfil)</li>
              <li><strong>Corrigir dados:</strong> atualize informações incorretas</li>
              <li><strong>Excluir sua conta:</strong> solicite a remoção completa de seus dados</li>
              <li><strong>Revogar consentimento:</strong> pare de usar a plataforma a qualquer momento</li>
              <li><strong>Portabilidade:</strong> exporte seus dados em formato JSON</li>
            </ul>
            <p className="mt-3 text-sm">
              Para exercer esses direitos, entre em contato: <strong>privacidade@clareia.com.br</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Menores de Idade</h2>
            <p className="mb-3">
              <strong>Menores de 13 anos:</strong> É necessário consentimento dos pais ou responsáveis. 
              Ao criar uma conta para seu filho, você declara ter lido e concordado com esta política.
            </p>
            <p>
              <strong>Entre 13 e 18 anos:</strong> Recomendamos que seus pais leiam esta política e 
              conversem com você sobre privacidade online.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Cookies e Armazenamento Local</h2>
            <p className="mb-3">O Clareia usa:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Cookies essenciais:</strong> para manter você logado (sessão)</li>
              <li><strong>LocalStorage:</strong> para armazenar preferências de tema e cache temporário</li>
              <li><strong>Não usamos:</strong> cookies de propaganda ou rastreamento de terceiros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Retenção de Dados</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Conta ativa:</strong> dados mantidos enquanto você usar a plataforma</li>
              <li><strong>Conta inativa:</strong> após 2 anos sem uso, podemos excluir sua conta</li>
              <li><strong>Após exclusão:</strong> dados permanentemente removidos em até 30 dias</li>
              <li><strong>Backups:</strong> cópias de backup são mantidas por 7 dias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Alterações na Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Mudanças significativas 
              serão notificadas por email ou aviso na plataforma. A data de &quot;Última atualização&quot; no 
              topo da página será sempre atualizada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Contato e Encarregado de Dados</h2>
            <p className="mb-3">
              Para questões sobre privacidade, proteção de dados ou exercício de direitos LGPD:
            </p>
            <div className="bg-slate-700/50 rounded p-4">
              <p><strong>Email:</strong> privacidade@clareia.com.br</p>
              <p><strong>Encarregado de Dados (DPO):</strong> [Nome a ser definido]</p>
              <p><strong>Tempo de resposta:</strong> até 15 dias úteis</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Legislação Aplicável</h2>
            <p>
              Esta política está em conformidade com:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</li>
              <li>Marco Civil da Internet (Lei 12.965/2014)</li>
              <li>Estatuto da Criança e do Adolescente (ECA - Lei 8.069/1990)</li>
              <li>Código de Defesa do Consumidor (Lei 8.078/1990)</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center space-x-6">
          <Link 
            href="/termos" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Ver Termos de Uso
          </Link>
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
