import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiPlay, HiCheckCircle, HiX } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockConteudos, mockQuiz } from '../data/mockData';

export default function AprenderScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [progresso, setProgresso] = useState<Record<number, number>>({
    1: 80, 2: 45, 3: 20, 4: 0,
  });

  const detail = mockConteudos.find((c) => c.id === selected);

  const handleAnswer = (i: number) => {
    if (quizDone) return;
    setQuizAnswer(i);
    setQuizDone(true);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 overflow-hidden">
      <div style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)' }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-5 pt-1">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <HiArrowLeft className="text-white" size={20} />
          </motion.button>
          <div>
            <h1 className="text-white font-bold text-lg">Aprender sobre o SUS</h1>
            <p className="text-blue-200 text-xs">Educação em saúde pública</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-5">

          {/* Progress summary */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 mb-5"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-gray-800 font-bold text-sm">Seu progresso</div>
                <div className="text-gray-400 text-xs">Continue aprendendo!</div>
              </div>
              <div className="text-right">
                <div className="text-blue-700 font-bold text-2xl">
                  {Math.round(Object.values(progresso).reduce((a, b) => a + b, 0) / Object.keys(progresso).length)}%
                </div>
                <div className="text-gray-400 text-xs">concluído</div>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #1565C0, #60A5FA)' }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(Object.values(progresso).reduce((a, b) => a + b, 0) / Object.keys(progresso).length)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            {mockConteudos.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(c.id)}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center p-4 gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                    style={{ background: c.cor + '20' }}>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-800 font-bold text-sm">{c.titulo}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{c.subtitulo}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full"
                          style={{ background: c.cor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progresso[c.id] || 0}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-bold" style={{ color: c.cor }}>
                        {progresso[c.id] || 0}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: c.cor + '15' }}>
                      <HiPlay size={14} style={{ color: c.cor }} />
                    </div>
                    <span className="text-[10px] text-gray-400">{c.duracao}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quiz */}
          <div className="mb-5">
            <div className="text-gray-700 font-bold text-base mb-3">📝 Quiz do dia</div>
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => setQuizVisible(true)}
              className="rounded-2xl p-4 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)', boxShadow: '0 4px 20px rgba(21,101,192,0.35)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <div>
                  <div className="text-white font-bold text-sm">Teste seus conhecimentos</div>
                  <div className="text-blue-200 text-xs mt-0.5">1 pergunta • 50 pontos</div>
                </div>
                <div className="ml-auto bg-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-bold">
                  Responder
                </div>
              </div>
            </motion.div>
          </div>

          <div className="h-4" />
        </div>
      </div>

      {/* Content detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="bg-white rounded-t-3xl w-full p-6 max-h-[85%] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: detail.cor + '20' }}>
                  {detail.icon}
                </div>
                <div>
                  <h2 className="text-gray-800 font-bold text-lg">{detail.titulo}</h2>
                  <p className="text-gray-400 text-sm">{detail.subtitulo}</p>
                </div>
              </div>

              {/* Fake video player */}
              <div className="rounded-2xl overflow-hidden mb-4 relative"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', height: '160px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <HiPlay className="text-white ml-1" size={28} />
                  </div>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${progresso[detail.id] || 5}%` }} />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/40 rounded-full px-2 py-1 text-white text-xs">
                  {detail.duracao}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{detail.descricao}</p>

              <div className="mb-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tópicos</div>
                <div className="space-y-2">
                  {detail.topicos.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: i < 2 ? detail.cor : '#E5E7EB' }}>
                        {i < 2 ? <HiCheckCircle className="text-white" size={12} /> :
                          <span className="text-gray-400 text-[10px]">{i + 1}</span>}
                      </div>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setProgresso((p) => ({ ...p, [detail.id]: Math.min(100, (p[detail.id] || 0) + 20) }));
                  setSelected(null);
                }}
                className="w-full py-4 rounded-2xl text-white font-bold"
                style={{ background: `linear-gradient(135deg, ${detail.cor}, ${detail.cor}cc)` }}
              >
                Continuar aprendendo
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz modal */}
      <AnimatePresence>
        {quizVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-end"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28 }}
              className="bg-white rounded-t-3xl w-full p-6 pb-10"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-gray-800 font-bold text-lg">Quiz do SUS</div>
                  <div className="text-gray-400 text-sm">Pergunta 1 de 1</div>
                </div>
                <button onClick={() => { setQuizVisible(false); setQuizAnswer(null); setQuizDone(false); }}>
                  <HiX size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4 mb-5">
                <p className="text-gray-800 font-semibold text-base">{mockQuiz.pergunta}</p>
              </div>

              <div className="space-y-3 mb-5">
                {mockQuiz.opcoes.map((op, i) => {
                  const isCorrect = i === mockQuiz.correta;
                  const isSelected = quizAnswer === i;
                  let bg = 'white';
                  let border = '#E5E7EB';
                  let textColor = '#374151';
                  if (quizDone) {
                    if (isCorrect) { bg = '#DCFCE7'; border = '#22C55E'; textColor = '#16A34A'; }
                    else if (isSelected && !isCorrect) { bg = '#FEE2E2'; border = '#EF4444'; textColor = '#DC2626'; }
                  } else if (isSelected) {
                    bg = '#EFF6FF'; border = '#1565C0'; textColor = '#1565C0';
                  }
                  return (
                    <motion.button key={i} whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left px-4 py-3 rounded-2xl border-2 font-medium text-sm transition-all"
                      style={{ background: bg, borderColor: border, color: textColor }}>
                      <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][i]}.</span> {op}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {quizDone && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-4 mb-4 ${quizAnswer === mockQuiz.correta ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="font-bold text-sm mb-1"
                      style={{ color: quizAnswer === mockQuiz.correta ? '#16A34A' : '#DC2626' }}>
                      {quizAnswer === mockQuiz.correta ? '🎉 Correto! +50 pontos' : '❌ Incorreto'}
                    </div>
                    <div className="text-gray-600 text-xs">{mockQuiz.explicacao}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => { setQuizVisible(false); setQuizAnswer(null); setQuizDone(false); }}
                className="w-full py-4 rounded-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)' }}>
                {quizDone ? 'Concluir' : 'Pular'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
