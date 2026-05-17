import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiCamera, HiCheckCircle, HiChevronDown } from 'react-icons/hi';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { mockCategorias, mockUnidades } from '../data/mockData';

function generateProtocol() {
  const num = Math.floor(Math.random() * 900000) + 100000;
  return `SUS-2024-${num}`;
}

export default function ReclamacaoScreen() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [unidade, setUnidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [imageAdded, setImageAdded] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [showUnidades, setShowUnidades] = useState(false);

  const canSubmit = titulo && descricao && categoria && unidade;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    setProtocol(generateProtocol());
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)' }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-5 pb-5 pt-1">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <HiArrowLeft className="text-white" size={20} />
          </motion.button>
          <div>
            <h1 className="text-white font-bold text-lg">Nova Manifestação</h1>
            <p className="text-blue-200 text-xs">Reclamação, sugestão ou elogio</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-4">

        {/* Tipo chips */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tipo</label>
          <div className="flex gap-2 flex-wrap">
            {['Reclamação', 'Sugestão', 'Elogio', 'Dúvida'].map((t) => (
              <motion.button key={t} whileTap={{ scale: 0.92 }}
                onClick={() => setCategoria(t)}
                className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
                style={{
                  borderColor: categoria === t ? '#1565C0' : '#E5E7EB',
                  background: categoria === t ? '#EFF6FF' : 'white',
                  color: categoria === t ? '#1565C0' : '#6B7280',
                }}>
                {t === 'Reclamação' ? '⚠️' : t === 'Sugestão' ? '💡' : t === 'Elogio' ? '⭐' : '❓'} {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Descreva brevemente o assunto..."
            className="w-full px-4 py-3.5 rounded-2xl border-2 text-gray-800 text-sm outline-none transition-all"
            style={{ borderColor: titulo ? '#1565C0' : '#E5E7EB', background: titulo ? '#f0f7ff' : 'white' }}
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhe o ocorrido com data, horário e contexto..."
            rows={4}
            className="w-full px-4 py-3.5 rounded-2xl border-2 text-gray-800 text-sm outline-none transition-all resize-none"
            style={{ borderColor: descricao ? '#1565C0' : '#E5E7EB', background: descricao ? '#f0f7ff' : 'white' }}
          />
          <div className="text-right text-xs text-gray-400 mt-1">{descricao.length}/500</div>
        </div>

        {/* Categoria */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Categoria</label>
          <button
            onClick={() => { setShowCategorias(!showCategorias); setShowUnidades(false); }}
            className="w-full px-4 py-3.5 rounded-2xl border-2 flex items-center justify-between text-sm transition-all"
            style={{ borderColor: categoria ? '#1565C0' : '#E5E7EB', background: categoria ? '#f0f7ff' : 'white' }}
          >
            <span style={{ color: categoria ? '#1565C0' : '#9CA3AF' }}>{categoria || 'Selecione a categoria'}</span>
            <HiChevronDown className={`text-gray-400 transition-transform ${showCategorias ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showCategorias && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="bg-white rounded-2xl border border-gray-100 mt-1 shadow-lg overflow-hidden">
                  {mockCategorias.map((c) => (
                    <button key={c} onClick={() => { setCategoria(c); setShowCategorias(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 border-b border-gray-50 last:border-0">
                      {c}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Unidade */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Unidade de Saúde</label>
          <button
            onClick={() => { setShowUnidades(!showUnidades); setShowCategorias(false); }}
            className="w-full px-4 py-3.5 rounded-2xl border-2 flex items-center justify-between text-sm transition-all"
            style={{ borderColor: unidade ? '#1565C0' : '#E5E7EB', background: unidade ? '#f0f7ff' : 'white' }}
          >
            <span style={{ color: unidade ? '#1565C0' : '#9CA3AF' }}>{unidade || 'Selecione a unidade'}</span>
            <HiChevronDown className={`text-gray-400 transition-transform ${showUnidades ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showUnidades && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="bg-white rounded-2xl border border-gray-100 mt-1 shadow-lg max-h-48 overflow-y-auto">
                  {mockUnidades.map((u) => (
                    <button key={u} onClick={() => { setUnidade(u); setShowUnidades(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 border-b border-gray-50 last:border-0">
                      {u}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Upload image fake */}
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            Evidências (opcional)
          </label>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setImageAdded(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 transition-all"
            style={{
              borderColor: imageAdded ? '#10B981' : '#D1D5DB',
              background: imageAdded ? '#ECFDF5' : 'white',
            }}
          >
            {imageAdded ? (
              <>
                <HiCheckCircle className="text-green-500" size={20} />
                <span className="text-green-600 text-sm font-semibold">Foto adicionada</span>
              </>
            ) : (
              <>
                <HiCamera className="text-gray-400" size={20} />
                <span className="text-gray-400 text-sm">Adicionar foto ou vídeo</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 mt-2"
          style={{
            background: canSubmit ? 'linear-gradient(135deg, #1565C0, #0D47A1)' : '#D1D5DB',
            boxShadow: canSubmit ? '0 8px 24px rgba(21,101,192,0.4)' : 'none',
          }}
        >
          {loading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Enviando...
            </>
          ) : 'Enviar Manifestação'}
        </motion.button>

        <div className="h-4" />
      </div>

      {/* Success modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-end justify-center z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-3xl w-full px-6 py-8 pb-16"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <HiCheckCircle className="text-green-500" size={44} />
                </motion.div>
                <div>
                  <h2 className="text-gray-800 text-xl font-bold">Manifestação Enviada!</h2>
                  <p className="text-gray-500 text-sm mt-1">Sua manifestação foi registrada com sucesso</p>
                </div>
                <div className="bg-blue-50 rounded-2xl px-6 py-4 w-full">
                  <div className="text-xs text-gray-500 font-medium mb-1">Número de protocolo</div>
                  <div className="text-blue-700 font-bold text-lg tracking-wider">{protocol}</div>
                  <div className="text-xs text-gray-400 mt-1">Guarde este número para acompanhamento</div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Você receberá atualizações sobre sua manifestação. Prazo de resposta: até 20 dias úteis.
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setSuccess(false); navigate('/manifestacoes'); }}
                  className="w-full py-4 rounded-2xl text-white font-bold mt-2"
                  style={{ background: 'linear-gradient(135deg, #1565C0, #0D47A1)' }}
                >
                  Acompanhar Demanda
                </motion.button>
                <button onClick={() => { setSuccess(false); navigate('/home'); }}
                  className="text-sm text-gray-400">
                  Voltar ao início
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
