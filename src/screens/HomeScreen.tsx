import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiSpeakerphone, HiLightBulb, HiAcademicCap, HiClipboard,
  HiBell, HiChevronRight, HiTrendingUp,
} from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockStats, mockUser, mockManifestacoes } from '../data/mockData';

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const mainCards = [
  { icon: HiSpeakerphone, label: 'Fazer Reclamação', sub: 'Relate um problema', color: '#EF4444', bg: '#FFF1F1', path: '/reclamacao' },
  { icon: HiLightBulb, label: 'Sugestões', sub: 'Proponha melhorias', color: '#F59E0B', bg: '#FFFBEB', path: '/reclamacao' },
  { icon: HiAcademicCap, label: 'Aprender', sub: 'Conteúdos do SUS', color: '#8B5CF6', bg: '#F5F3FF', path: '/aprender' },
  { icon: HiClipboard, label: 'Consultas Públicas', sub: 'Participe e vote', color: '#10B981', bg: '#ECFDF5', path: '/consultas' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 overflow-hidden">
      <div style={{ background: 'linear-gradient(160deg, #1565C0 0%, #0D47A1 100%)' }}>
        <StatusBar light />

        {/* Header */}
        <div className="px-5 pb-8 pt-2">
          <div className="flex items-center justify-between mb-5">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <p className="text-blue-200 text-sm">{saudacao},</p>
              <h1 className="text-white text-xl font-bold">{mockUser.name} 👋</h1>
              <p className="text-blue-300 text-xs mt-0.5">📍 {mockUser.cidade}</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                <span className="text-white font-bold text-base">{mockUser.avatar}</span>
              </div>
              <button
                onClick={() => navigate('/perfil')}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              >
                <HiBell size={10} className="text-white" />
              </button>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <HiTrendingUp className="text-green-300" size={16} />
              <span className="text-white text-xs font-semibold">Estatísticas do mês</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Resolvidas', value: mockStats.demandasResolvidas.toLocaleString('pt-BR') },
                { label: 'Participações', value: mockStats.participacaoCidada.toLocaleString('pt-BR') },
                { label: 'Unidades', value: mockStats.unidadesMonitoradas },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-white font-bold text-lg">{value}</div>
                  <div className="text-blue-200 text-[10px]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar -mt-5">
        {/* Card pull up */}
        <div className="bg-gray-50 rounded-t-3xl px-5 pt-5 pb-4">

          {/* Main cards grid */}
          <motion.div variants={stagger} initial="initial" animate="animate">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-bold text-base">O que você precisa?</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {mainCards.map(({ icon: Icon, label, sub, color, bg, path }) => (
                <motion.button
                  key={label}
                  variants={fadeUp}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => navigate(path)}
                  className="rounded-2xl p-4 text-left transition-all"
                  style={{ background: bg, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: color + '20' }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="text-gray-800 font-bold text-sm leading-tight">{label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                </motion.button>
              ))}
            </div>

            {/* Recent demands */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-bold text-base">Minhas demandas</span>
              <button
                onClick={() => navigate('/manifestacoes')}
                className="text-xs text-blue-600 font-semibold flex items-center gap-0.5"
              >
                Ver todas <HiChevronRight size={14} />
              </button>
            </div>

            {mockManifestacoes.slice(0, 2).map((m) => (
              <motion.div
                key={m.id}
                variants={fadeUp}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/manifestacoes')}
                className="bg-white rounded-2xl p-4 mb-3 flex items-center gap-3"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: m.status === 'Resolvido' ? '#ECFDF5' : m.status === 'Em análise' ? '#FFF7ED' : '#EFF6FF',
                  }}>
                  <span className="text-lg">
                    {m.status === 'Resolvido' ? '✅' : m.status === 'Em análise' ? '🔍' : '📨'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-800 text-sm font-semibold truncate">{m.titulo}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{m.protocolo}</div>
                </div>
                <StatusBadge status={m.status} />
              </motion.div>
            ))}

            {/* Tip banner */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-4 mt-2"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="text-white font-bold text-sm">Sabia que você pode votar?</div>
                  <div className="text-purple-200 text-xs mt-0.5">Participe das consultas públicas abertas</div>
                </div>
                <button
                  onClick={() => navigate('/consultas')}
                  className="ml-auto bg-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-bold flex-shrink-0"
                >
                  Votar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    Resolvido: { bg: '#DCFCE7', text: '#16A34A' },
    'Em análise': { bg: '#FEF3C7', text: '#D97706' },
    Recebido: { bg: '#DBEAFE', text: '#1D4ED8' },
  }[status] ?? { bg: '#F3F4F6', text: '#6B7280' };

  return (
    <span className="text-[10px] font-bold rounded-full px-2 py-1 flex-shrink-0"
      style={{ background: config.bg, color: config.text }}>
      {status}
    </span>
  );
}
