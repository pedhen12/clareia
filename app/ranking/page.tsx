'use client';

export default function RankingPage() {
  // Mock data for ranking
  const topStudents = [
    {
      id: 1,
      name: 'João Silva',
      points: 2450,
      completedLessons: 45,
      grade: '7º ano',
      avatar: '👨‍🎓',
    },
    {
      id: 2,
      name: 'Maria Santos',
      points: 2310,
      completedLessons: 42,
      grade: '8º ano',
      avatar: '👩‍🎓',
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      points: 2180,
      completedLessons: 39,
      grade: '6º ano',
      avatar: '👨‍🎓',
    },
    {
      id: 4,
      name: 'Ana Costa',
      points: 2050,
      completedLessons: 38,
      grade: '9º ano',
      avatar: '👩‍🎓',
    },
    {
      id: 5,
      name: 'Lucas Ferreira',
      points: 1920,
      completedLessons: 35,
      grade: '7º ano',
      avatar: '👨‍🎓',
    },
    {
      id: 6,
      name: 'Sophia Mendes',
      points: 1850,
      completedLessons: 33,
      grade: '6º ano',
      avatar: '👩‍🎓',
    },
    {
      id: 7,
      name: 'Gabriel Rocha',
      points: 1720,
      completedLessons: 31,
      grade: '8º ano',
      avatar: '👨‍🎓',
    },
    {
      id: 8,
      name: 'Isabella Gomes',
      points: 1580,
      completedLessons: 29,
      grade: '7º ano',
      avatar: '👩‍🎓',
    },
    {
      id: 9,
      name: 'Rafael Lima',
      points: 1450,
      completedLessons: 26,
      grade: '9º ano',
      avatar: '👨‍🎓',
    },
    {
      id: 10,
      name: 'Camila Alves',
      points: 1320,
      completedLessons: 24,
      grade: '6º ano',
      avatar: '👩‍🎓',
    },
  ];

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-slate-400';
    }
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🏆 Ranking de Estudantes
        </h1>
        <p className="text-xl text-slate-400">
          Os melhores alunos da plataforma Clareia
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topStudents.slice(0, 3).map((student, index) => (
          <div
            key={student.id}
            className={`relative ${
              index === 0 ? 'md:col-span-1 md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'
            }`}
          >
            <div
              className={`bg-gradient-to-br rounded-lg p-6 text-center border ${
                index === 0
                  ? 'from-yellow-600 to-yellow-700 border-yellow-500'
                  : index === 1
                    ? 'from-gray-600 to-gray-700 border-gray-500'
                    : 'from-amber-700 to-amber-800 border-amber-600'
              }`}
            >
              <div className={`text-6xl mb-2 ${getMedalColor(index + 1)}`}>
                {getMedalEmoji(index + 1)}
              </div>
              <div className="text-4xl mb-3">{student.avatar}</div>
              <h3 className="text-xl font-bold text-white mb-2">{student.name}</h3>
              <p className="text-yellow-50 text-sm mb-3">{student.grade}</p>
              <div className="bg-black/30 rounded p-3">
                <p className="text-2xl font-bold text-white">{student.points}</p>
                <p className="text-yellow-100 text-xs">pontos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="bg-slate-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Top 10 Ranking</h2>
        </div>

        <div className="divide-y divide-slate-700">
          {topStudents.map((student, index) => (
            <div
              key={student.id}
              className={`px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors ${
                index < 3 ? 'bg-slate-700/30' : ''
              }`}
            >
              <div className="flex items-center gap-4 flex-grow">
                <div className={`text-2xl font-bold w-8 ${getMedalColor(index + 1)}`}>
                  {getMedalEmoji(index + 1)}
                </div>
                <div className="text-3xl">{student.avatar}</div>
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">{student.name}</h3>
                  <p className="text-slate-400 text-sm">{student.grade}</p>
                </div>
              </div>

              <div className="text-right flex gap-8">
                <div>
                  <p className="text-slate-400 text-xs">Aulas</p>
                  <p className="text-white font-bold text-lg">{student.completedLessons}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Pontos</p>
                  <p className="text-blue-400 font-bold text-lg">{student.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-12 bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-3">💡 Como subir no ranking?</h3>
        <ul className="text-slate-300 space-y-2">
          <li>✅ Complete aulas e assista todos os vídeos</li>
          <li>✅ Faça quizzes e acumule pontos</li>
          <li>✅ Participe regularmente da plataforma</li>
          <li>✅ Suba de nível e desbloqueie novas disciplinas</li>
        </ul>
      </div>
    </div>
  );
}
