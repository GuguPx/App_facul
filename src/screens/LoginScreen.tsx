import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiEye, HiEyeOff, HiFingerPrint, HiShieldCheck } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import { useAppStore } from '../store/useAppStore';

export default function LoginScreen() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const navigate = useNavigate();
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);

  const formatCPF = (v: string) => {
    const n = v.replace(/\D/g, '').slice(0, 11);
    return n
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoggedIn(true);
    navigate('/home');
  };

  const handleBio = async () => {
    setBioLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoggedIn(true);
    navigate('/home');
  };

  const canSubmit = cpf.replace(/\D/g, '').length === 11 && senha.length >= 4;

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1565C0 0%, #0D47A1 35%, #f4f6fb 35%)' }}>

      <StatusBar light />

      {/* Top decoration */}
      <div className="relative px-6 pt-4 pb-16">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(30%, -30%)' }} />

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{
              width: '44px', height: '44px',
              background: 'white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            }}>
            <img
              src="/logo-conectasus.svg"
              alt="Conecta SUS"
              style={{ width: '38px', height: '38px', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-tight">Conecta SUS</div>
            <div className="text-blue-200 text-xs">Acesso Gov.br</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-6"
        >
          <h1 className="text-white text-2xl font-bold">Bem-vindo de volta</h1>
          <p className="text-blue-100 text-sm mt-1">Acesse com sua conta Gov.br</p>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-6 flex flex-col gap-5 overflow-y-auto no-scrollbar"
        style={{ boxShadow: '0 -4px 40px rgba(0,0,0,0.15)' }}
      >
        {/* Gov.br badge */}
        <div className="flex items-center gap-2 bg-blue-50 rounded-2xl px-4 py-3">
          <HiShieldCheck className="text-blue-600" size={20} />
          <div>
            <div className="text-xs font-bold text-blue-800">Acesso seguro via Gov.br</div>
            <div className="text-[10px] text-blue-600">Conexão criptografada e protegida</div>
          </div>
          <div className="ml-auto">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">G</span>
            </div>
          </div>
        </div>

        {/* CPF */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            CPF
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              className="w-full px-4 py-4 rounded-2xl border text-gray-800 text-base font-medium outline-none transition-all"
              style={{
                border: cpf ? '2px solid #1565C0' : '2px solid #E5E7EB',
                background: cpf ? '#f0f7ff' : '#FAFAFA',
              }}
            />
            {cpf.replace(/\D/g, '').length === 11 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Senha
          </label>
          <div className="relative">
            <input
              type={showSenha ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border text-gray-800 text-base outline-none transition-all"
              style={{
                border: senha ? '2px solid #1565C0' : '2px solid #E5E7EB',
                background: senha ? '#f0f7ff' : '#FAFAFA',
              }}
            />
            <button
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showSenha ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
          <div className="text-right mt-1">
            <button className="text-xs text-blue-600 font-medium">Esqueci minha senha</button>
          </div>
        </div>

        {/* Login button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-all"
          style={{
            background: canSubmit || loading
              ? 'linear-gradient(135deg, #1565C0, #0D47A1)'
              : '#D1D5DB',
            boxShadow: canSubmit ? '0 8px 24px rgba(21,101,192,0.4)' : 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Autenticando...</span>
              </motion.div>
            ) : (
              <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Entrar com Gov.br
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">ou</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Biometrics */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBio}
          disabled={bioLoading}
          className="w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-3 font-semibold transition-all"
          style={{ borderColor: '#1565C0', color: '#1565C0' }}
        >
          <AnimatePresence mode="wait">
            {bioLoading ? (
              <motion.div
                key="bio-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <HiFingerPrint size={22} />
                </motion.div>
                <span>Verificando biometria...</span>
              </motion.div>
            ) : (
              <motion.div key="bio-label" className="flex items-center gap-2">
                <HiFingerPrint size={22} />
                <span>Entrar com Biometria</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-400 leading-relaxed">
          Ao entrar, você concorda com os{' '}
          <span className="text-blue-600 font-medium">Termos de Uso</span> e{' '}
          <span className="text-blue-600 font-medium">Política de Privacidade</span> do Gov.br
        </p>
      </motion.div>
    </div>
  );
}
