import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiBell, HiShieldCheck, HiLogout, HiChevronRight, HiMoon } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockUser } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';

const badges = [
  { icon: '🗳️', nome: 'Votante', cor: '#4CAF50' },
  { icon: '⭐', nome: 'Engajado', cor: '#FF9800' },
  { icon: '📚', nome: 'Educado', cor: '#9C27B0' },
  { icon: '🔍', nome: 'Vigilante', cor: '#2196F3' },
  { icon: '🏆', nome: 'Top 10%', cor: '#F59E0B' },
];

const nivelConfig = [
  { nivel: 'Cidadão Iniciante', cor: '#9CA3AF', min: 0 },
  { nivel: 'Cidadão Ativo', cor: '#1565C0', min: 500 },
  { nivel: 'Cidadão Engajado', cor: '#7C3AED', min: 1000 },
  { nivel: 'Cidadão Expert', cor: '#F59E0B', min: 2000 },
];

export default function PerfilScreen() {
  const navigate = useNavigate();
  const { setLoggedIn, darkMode, toggleDarkMode } = useAppStore();

  const nivel = nivelConfig.slice().reverse().find((n) => mockUser.pontos >= n.min) ?? nivelConfig[0];
  const nextNivel = nivelConfig.find((n) => n.min > mockUser.pontos);
  const pctNivel = nextNivel
    ? Math.round(((mockUser.pontos - (nivel.min)) / (nextNivel.min - nivel.min)) * 100)
    : 100;

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

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
            <h1 className="text-white font-bold text-lg">Meu Perfil</h1>
          </div>
          <button className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <HiBell className="text-white" size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-gray-50 rounded-t-3xl -mt-4 px-5 pt-5">

          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 mb-4 text-center"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #1565C0, #7C3AED)' }}>
              {mockUser.avatar}
            </div>
            <div className="text-gray-800 font-bold text-lg">{mockUser.name}</div>
            <div className="text-gray-400 text-sm">{mockUser.cpf}</div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: nivel.cor + '20', color: nivel.cor }}>
                {nivel.nivel}
              </span>
              <HiShieldCheck style={{ color: nivel.cor }} size={18} />
            </div>

            {/* Level progress */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>{mockUser.pontos.toLocaleString('pt-BR')} pts</span>
                <span>{nextNivel ? `${nextNivel.min.toLocaleString('pt-BR')} pts` : 'Nível máximo'}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${nivel.cor}, ${nivel.cor}aa)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pctNivel}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {nextNivel ? `Faltam ${(nextNivel.min - mockUser.pontos).toLocaleString('pt-BR')} pts para ${nextNivel.nivel}` : 'Parabéns!'}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Pontos', value: mockUser.pontos.toLocaleString('pt-BR'), icon: '⭐', cor: '#F59E0B' },
              { label: 'Participações', value: mockUser.participacoes, icon: '🗳️', cor: '#1565C0' },
              { label: 'Manifestações', value: mockUser.manifestacoes, icon: '📨', cor: '#7C3AED' },
            ].map(({ label, value, icon, cor }) => (
              <div key={label} className="bg-white rounded-2xl p-3 text-center"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-bold text-gray-800 text-base" style={{ color: cor }}>{value}</div>
                <div className="text-gray-400 text-[10px]">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Badges */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-4 mb-4"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="text-gray-700 font-bold text-sm mb-3">🏅 Conquistas</div>
            <div className="flex gap-3 flex-wrap">
              {badges.map((b) => (
                <div key={b.nome} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: b.cor + '20', border: `2px solid ${b.cor}30` }}>
                    {b.icon}
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium text-center" style={{ maxWidth: '48px' }}>
                    {b.nome}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <span className="text-gray-300 text-xl">+</span>
                </div>
                <span className="text-[9px] text-gray-300">Em breve</span>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl overflow-hidden mb-4"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wider px-4 py-3 border-b border-gray-100">
              Configurações
            </div>
            {[
              { icon: HiMoon, label: 'Modo escuro', action: toggleDarkMode, toggle: darkMode },
              { icon: HiBell, label: 'Notificações', action: () => {}, toggle: true },
              { icon: HiShieldCheck, label: 'Privacidade e dados', action: () => {} },
            ].map(({ icon: Icon, label, action, toggle }) => (
              <button key={label} onClick={action}
                className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <Icon size={20} className="text-gray-400" />
                <span className="text-gray-700 text-sm font-medium flex-1 text-left">{label}</span>
                {toggle !== undefined ? (
                  <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-all ${toggle ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                ) : (
                  <HiChevronRight size={16} className="text-gray-300" />
                )}
              </button>
            ))}
          </motion.div>

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 mb-2 border-2 border-red-100 bg-red-50"
          >
            <HiLogout size={20} className="text-red-500" />
            <span className="text-red-500 font-bold text-sm">Sair da conta</span>
          </motion.button>

          <div className="text-center text-[10px] text-gray-300 pb-4 mt-2">
            ConectaSUS v1.0.0 • Ministério da Saúde
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
