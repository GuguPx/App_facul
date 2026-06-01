import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/login'), 3200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1565C0 0%, #0D47A1 45%, #0a3880 100%)' }}>

      {/* Background circles */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-10"
        style={{ background: 'white' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full opacity-10"
        style={{ background: 'white' }} />
      <div className="absolute top-1/3 left-[-40px] w-32 h-32 rounded-full opacity-5"
        style={{ background: 'white' }} />

      {/* Logo container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-5"
      >
        {/* Logo image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="rounded-3xl flex items-center justify-center overflow-hidden"
          style={{
            width: '140px',
            height: '140px',
            background: 'white',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.2)',
          }}
        >
          <img
            src="/logo-conectasus.svg"
            alt="Conecta SUS"
            style={{ width: '124px', height: '124px', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-white font-bold text-4xl tracking-tight">
            Conecta<span style={{ color: '#4ADE80' }}>SUS</span>
          </div>
          <div className="text-blue-100 text-xs mt-1.5 font-semibold tracking-[0.25em] uppercase">
            Conectar para Cuidar
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-px rounded-full" style={{ background: '#22C55E', opacity: 0.7 }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
          <div className="w-10 h-px rounded-full" style={{ background: '#42A5F5', opacity: 0.7 }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-blue-100 text-center text-sm max-w-[220px] leading-relaxed opacity-80"
        >
          Sua voz transforma a saúde pública
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-3"
      >
        <div className="w-48 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'white' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.2, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-blue-200 text-xs"
        >
          Carregando...
        </motion.span>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 text-blue-200 text-[10px] opacity-60">
        Ministério da Saúde • Gov.br
      </div>
    </div>
  );
}
