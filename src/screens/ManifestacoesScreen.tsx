import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiSearch, HiPlus } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockManifestacoes, mockTimeline } from '../data/mockData';

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Resolvido: { bg: '#DCFCE7', text: '#16A34A', dot: '#22C55E' },
  'Em análise': { bg: '#FEF3C7', text: '#D97706', dot: '#F59E0B' },
  Recebido: { bg: '#DBEAFE', text: '#1D4ED8', dot: '#3B82F6' },
};

const tabs = ['Todas', 'Recebido', 'Em análise', 'Resolvido'];

export default function ManifestacoesScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Todas');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = tab === 'Todas' ? mockManifestacoes : mockManifestacoes.filter((m) => m.status === tab);
  const detail = mockManifestacoes.find((m) => m.id === selected);

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 overflow-hidden">
      <div style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)' }}>
        <StatusBar light />
        <div className="flex items-center justify-between px-5 pb-5 pt-1">
          <div className="flex items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <HiArrowLeft className="text-white" size={20} />
            </motion.button>
            <div>
              <h1 className="text-white font-bold text-lg">Minhas Demandas</h1>
              <p className="text-blue-200 text-xs">{mockManifestacoes.length} manifestações</p>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/reclamacao')}
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <HiPlus className="text-white" size={20} />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-4">

          {/* Search */}
          <div className="relative mb-4">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input placeholder="Buscar por título ou protocolo..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 text-sm text-gray-700 outline-none bg-white" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((t) => (
              <motion.button key={t} whileTap={{ scale: 0.93 }}
                onClick={() => setTab(t)}
                className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all"
                style={{
                  background: tab === t ? '#1565C0' : 'white',
                  color: tab === t ? 'white' : '#6B7280',
                  border: tab === t ? 'none' : '1px solid #E5E7EB',
                }}>
                {t}
              </motion.button>
            ))}
          </div>

          {/* List */}
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => {
              const sc = statusConfig[m.status] ?? statusConfig['Recebido'];
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(m.id)}
                  className="bg-white rounded-2xl p-4 mb-3 cursor-pointer"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: sc.bg }}>
                      <span className="text-lg">
                        {m.status === 'Resolvido' ? '✅' : m.status === 'Em análise' ? '🔍' : '📨'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-800 font-semibold text-sm truncate">{m.titulo}</span>
                        <span className="text-[10px] font-bold rounded-full px-2 py-1 flex-shrink-0"
                          style={{ background: sc.bg, color: sc.text }}>
                          {m.status}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs mt-1 font-mono">{m.protocolo}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-400 text-xs">📅 {m.data}</span>
                        <span className="text-gray-400 text-xs">🏥 {m.unidade}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="h-4" />
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-end z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full px-6 py-6 max-h-[80%] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-800 font-bold text-base leading-tight flex-1 mr-2">
                  {detail.titulo}
                </h2>
                <span className="text-xs font-bold rounded-full px-3 py-1.5 flex-shrink-0"
                  style={{
                    background: (statusConfig[detail.status] ?? statusConfig['Recebido']).bg,
                    color: (statusConfig[detail.status] ?? statusConfig['Recebido']).text,
                  }}>
                  {detail.status}
                </span>
              </div>

              <div className="bg-blue-50 rounded-2xl px-4 py-3 mb-4">
                <div className="text-xs text-gray-500 mb-0.5">Protocolo</div>
                <div className="text-blue-700 font-bold font-mono text-sm">{detail.protocolo}</div>
              </div>

              <div className="text-sm text-gray-600 mb-4 leading-relaxed">{detail.descricao}</div>

              {/* Timeline */}
              <div className="mb-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Linha do Tempo
                </div>
                <div className="space-y-3">
                  {mockTimeline.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: t.concluido ? '#1565C0' : '#E5E7EB' }}>
                          {t.concluido && <span className="text-white text-[8px]">✓</span>}
                        </div>
                        {i < mockTimeline.length - 1 && (
                          <div className="w-0.5 flex-1 mt-1"
                            style={{ background: t.concluido ? '#1565C0' : '#E5E7EB', minHeight: '16px' }} />
                        )}
                      </div>
                      <div className="pb-3">
                        <div className="text-sm font-semibold" style={{ color: t.concluido ? '#1565C0' : '#9CA3AF' }}>
                          {t.status}
                        </div>
                        <div className="text-xs text-gray-400">{t.descricao}</div>
                        {t.hora !== '--' && (
                          <div className="text-[10px] text-gray-400 mt-0.5">{detail.data} às {t.hora}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setSelected(null)}
                className="w-full py-3 rounded-2xl text-gray-500 font-semibold border border-gray-200">
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
