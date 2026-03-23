-- Schema para Clareia - Plataforma Educacional
-- Execute este SQL no Supabase SQL Editor

-- 1. Tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  grade TEXT, -- 6º, 7º, 8º, 9º ano
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de aulas completadas
CREATE TABLE IF NOT EXISTS completed_lessons (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- 3. Tabela de tentativas de quiz
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de dias de estudo (streak)
CREATE TABLE IF NOT EXISTS study_days (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  study_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, study_date)
);

-- 5. Tabela de sessões Pomodoro
CREATE TABLE IF NOT EXISTS pomodoro_sessions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT,
  duration_minutes INTEGER DEFAULT 25,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Índices para performance
CREATE INDEX IF NOT EXISTS idx_completed_lessons_user ON completed_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_study_days_user ON study_days(user_id);
CREATE INDEX IF NOT EXISTS idx_pomodoro_sessions_user ON pomodoro_sessions(user_id);

-- 7. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE pomodoro_sessions ENABLE ROW LEVEL SECURITY;

-- 8. Políticas RLS para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem ver perfis de outros (para ranking)" ON profiles
  FOR SELECT USING (true);

-- 9. Políticas RLS para completed_lessons
CREATE POLICY "Usuários podem ver suas próprias aulas completadas" ON completed_lessons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias aulas completadas" ON completed_lessons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. Políticas RLS para quiz_attempts
CREATE POLICY "Usuários podem ver suas próprias tentativas de quiz" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias tentativas de quiz" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 11. Políticas RLS para study_days
CREATE POLICY "Usuários podem ver seus próprios dias de estudo" ON study_days
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios dias de estudo" ON study_days
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 12. Políticas RLS para pomodoro_sessions
CREATE POLICY "Usuários podem ver suas próprias sessões Pomodoro" ON pomodoro_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias sessões Pomodoro" ON pomodoro_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 13. Função para criar perfil automaticamente após registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 15. View para ranking
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  p.id,
  p.name,
  p.grade,
  p.points,
  COUNT(DISTINCT cl.lesson_id) as completed_lessons,
  COUNT(DISTINCT sd.study_date) as study_days,
  ROW_NUMBER() OVER (ORDER BY p.points DESC, COUNT(DISTINCT cl.lesson_id) DESC) as rank
FROM profiles p
LEFT JOIN completed_lessons cl ON p.id = cl.user_id
LEFT JOIN study_days sd ON p.id = sd.user_id
GROUP BY p.id, p.name, p.grade, p.points
ORDER BY p.points DESC;
