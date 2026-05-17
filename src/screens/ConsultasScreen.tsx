import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockEnquetes } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

export default function ConsultasScreen() {
  const navigate = useNavigate();
  const { votedEnquetes, addVote } = useAppStore();
  const [selectedOpcoes, setSelectedOpcoes] = useState<Record<number, number>>({});
  const [enqueteVotada, setEnqueteVotada] = useState<number | null>(null);

  const handleVotar = (enqueteId: number, opcaoIdx: number) => {
    if (votedEnquetes.includes(enqueteId)) return;
    setSelectedOpcoes((p) => ({ ...p, [enqueteId]: opcaoIdx }));
    setTimeout(() => {
      addVote(enqueteId);
      setEnqueteVotada(enqueteId);
      setTimeout(() => setEnqueteVotada(null), 2500);
    }, 800);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 overflow-hidden">
      <div style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-5 pt-1">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <HiArrowLeft className="text-white" size={20} />
          </motion.button>
          <div>
            <h1 className="text-white font-bold text-lg">Consultas Públicas</h1>
            <p className="text-green-200 text-xs">Sua opinião conta para o SUS</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-5">

          {/* Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 mb-5 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 20px rgba(5,150,105,0.3)' }}>
            <span className="text-3xl">🗳️</span>
            <div>
              <div className="text-white font-bold text-sm">Participe da democracia digital</div>
              <div className="text-green-100 text-xs mt-0.5">{mockEnquetes.filter(e => e.ativa).length} enquetes abertas agora</div>
            </div>
          </motion.div>

          {/* Enquetes */}
          {mockEnquetes.map((enquete, i) => {
            const voted = votedEnquetes.includes(enquete.id);
            const selectedOp = selectedOpcoes[enquete.id];
            const total = enquete.totalVotos + (voted ? 1 : 0);

            return (
              <motion.div
                key={enquete.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 mb-4"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <p className="text-gray-800 font-semibold text-sm leading-snug flex-1">{enquete.pergunta}</p>
                  <span className={`text-[10px] font-bold rounded-full px-2 py-1 flex-shrink-0 ${
                    enquete.ativa ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {enquete.ativa ? '● Aberta' : 'Encerrada'}
                  </span>
                </div>

                {/* Opções */}
                <div className="space-y-2.5 mb-4">
                  {enquete.opcoes.map((op, j) => {
                    const isSelected = selectedOp === j;
                    const pct = voted
                      ? Math.round(((op.votos + (isSelected ? 1 : 0)) / total) * 100)
                      : Math.round((op.votos / total) * 100);

                    return (
                      <div key={j}>
                        {!voted && enquete.ativa ? (
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleVotar(enquete.id, j)}
                            disabled={selectedOp !== undefined}
                            className="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all"
                            style={{
                              borderColor: isSelected ? op.cor : '#E5E7EB',
                              background: isSelected ? op.cor + '15' : 'white',
                              color: isSelected ? op.cor : '#374151',
                            }}
                          >
                            {isSelected ? (
                              <span className="flex items-center gap-2">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                  className="w-4 h-4 border-2 rounded-full border-t-transparent"
                                  style={{ borderColor: op.cor }} />
                                {op.texto}
                              </span>
                            ) : op.texto}
                          </motion.button>
                        ) : (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-medium">{op.texto}</span>
                              <span className="font-bold" style={{ color: op.cor }}>{pct}%</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div className="h-full rounded-full"
                                style={{ background: op.cor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.1 * j }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{total.toLocaleString('pt-BR')} votos</span>
                  <span>Encerra: {enquete.encerramento}</span>
                </div>
              </motion.div>
            );
          })}

          <div className="h-4" />
        </div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {enqueteVotada && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="absolute bottom-24 left-5 right-5 flex items-center gap-3 bg-gray-800 rounded-2xl px-4 py-3 z-50"
          >
            <HiCheckCircle className="text-green-400" size={22} />
            <div>
              <div className="text-white text-sm font-semibold">Voto registrado! +25 pontos</div>
              <div className="text-gray-400 text-xs">Obrigado por participar</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
