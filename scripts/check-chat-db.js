const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Verificando Chat Database\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { error } = await supabase.from('chat_messages').select('id').limit(1);
  
  if (error) {
    console.log('❌ Tabela não existe');
    console.log('\n🔧 Execute: npm run setup:chat\n');
    return;
  }

  console.log('✅ Tabela existe');
  
  const { count } = await supabase
    .from('chat_messages')
    .select('*', { count: 'exact', head: true });

  console.log(`✅ Total de mensagens: ${count || 0}`);
  console.log('\n🎉 Chat funcionando!\n');
}

check().catch(console.error);
