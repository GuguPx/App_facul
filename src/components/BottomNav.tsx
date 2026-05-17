import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiClipboardList, HiAcademicCap, HiUser } from 'react-icons/hi';

const navItems = [
  { path: '/home', icon: HiHome, label: 'Início' },
  { path: '/manifestacoes', icon: HiClipboardList, label: 'Demandas' },
  { path: '/aprender', icon: HiAcademicCap, label: 'Aprender' },
  { path: '/perfil', icon: HiUser, label: 'Perfil' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex-shrink-0 bg-white border-t border-gray-100 pb-5"
      style={{ boxShadow: '0 -4px 24px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center gap-1 px-4 py-1 relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{ background: '#1565C0' }}
                />
              )}
              <Icon
                size={24}
                style={{ color: active ? '#1565C0' : '#9CA3AF', transition: 'color 0.2s' }}
              />
              <span className="text-[10px] font-semibold"
                style={{ color: active ? '#1565C0' : '#9CA3AF' }}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
