import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  // clássicos solteiro carente
  "Estou solteiro e o SUS ainda não marcou minha consulta do amor 😔",
  "Meu único plano de saúde é achar alguém que me ame 😭",
  "Diagnóstico confirmado: carência afetiva em estágio avançado 💉",
  "Status: solteiro, carente e fazendo easter egg no app da faculdade",
  "Nem o SUS cura minha saudade de alguém que nem me conhece ainda",
  "Última consulta médica: 2019. Último relacionamento: nunca 💔",
  "Se amor fosse saúde pública eu já teria sido internado hoje",
  "O SUS tem prazo de resposta de 20 dias. Eu respondo em 2 segundos 🥺",
  "Minha ficha médica tem tudo. Menos um contato de emergência afetiva 💔",

  // procura-se
  "Requisito mínimo pra namorar comigo: achar esse app bonito 🥺",
  "Requisitos: estabilidade emocional ou vontade de fingir que tem",
  "Vaga aberta: namorada de desenvolvedor. Sem experiência necessária 💻",

  // flertes diretos
  "Você parece emocionalmente estável. Quer estragar isso comigo? 👀",
  "Não sei quem você é, mas já te achei interessante só por tá aqui 🫣",
  "Se você rir dessa mensagem, a gente já tem mais em comum que meu último relacionamento",
  "Você tem plano de saúde? Porque você acabou de curar minha ansiedade 💊",
  "Cientificamente comprovado: você olhando pra essa tela me faz bem 🧪",
  "Posso não ter carro nem apartamento, mas tenho WiFi e boa companhia 📶",
  "Você parece o tipo de pessoa que responde mensagem. Isso já é top 3 qualidade 🏆",

  // notificações falsas
  "ATENÇÃO: homem solteiro tentando chamar atenção na apresentação 🚨",
  "Disponível: fins de semana, feriados e qualquer dia que você quiser 🥺",
  "Aviso do sistema: usuário @augusto.px está disponível e desesperado 🔔",
  "Atualização disponível: versão 2.0 do Augusto — agora com mais carência 📲",

  // cringe confiante
  "Pode não ser o app mais bonito do mundo. Mas o dev é gato 😎",
  "Esse easter egg foi feito pra você. Sim, você aí. Oi 👋",
  "Fiz esse app todo. Até o easter egg. Tô exausto. Me adota? 🥹",
  "Dev de dia, solteiro de noite. Estou disponível nos dois turnos 🌙",
];

const SYS_FONT = '-apple-system, BlinkMacSystemFont, sans-serif';

interface Props {
  onShake: () => void;
}

const InstagramIcon = ({ badge }: { badge: number }) => (
  <div style={{ position: 'relative', flexShrink: 0 }}>
    <div style={{
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    </div>
    <div style={{
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      minWidth: '16px',
      height: '16px',
      borderRadius: '8px',
      background: '#FF3B30',
      border: '1.5px solid rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: '3px',
    }}>
      <span style={{ color: 'white', fontSize: '10px', fontWeight: 700, lineHeight: 1, fontFamily: SYS_FONT }}>
        {badge}
      </span>
    </div>
  </div>
);

export default function EasterEggNotification({ onShake }: Props) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [badge, setBadge] = useState(1);
  const visibleRef = useRef(false);
  const usedIndices = useRef<Set<number>>(new Set());
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pickMessage = useCallback(() => {
    if (usedIndices.current.size >= MESSAGES.length) usedIndices.current.clear();
    let idx: number;
    do { idx = Math.floor(Math.random() * MESSAGES.length); }
    while (usedIndices.current.has(idx));
    usedIndices.current.add(idx);
    return MESSAGES[idx];
  }, []);

  const show = useCallback(() => {
    if (visibleRef.current) return; // não interrompe notificação ativa
    setMessage(pickMessage());
    setBadge(Math.floor(Math.random() * 8) + 1);
    visibleRef.current = true;
    setVisible(true);
    onShake();
    dismissTimer.current = setTimeout(() => {
      visibleRef.current = false;
      setVisible(false);
    }, 5500);
  }, [onShake, pickMessage]);

  useEffect(() => {
    // A cada 8s sorteia 50% de chance de exibir
    const interval = setInterval(() => {
      const chance = 0.5;
      if (Math.random() < chance) show();
    }, 8000);

    let count = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a') {
        count++;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { count = 0; }, 700);
        if (count >= 3) { count = 0; show(); }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearInterval(interval);
      clearTimeout(dismissTimer.current);
      clearTimeout(resetTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -120, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          style={{
            position: 'absolute',
            top: '52px',
            left: '8px',
            right: '8px',
            zIndex: 999,
            borderRadius: '16px',
            background: 'rgba(30, 30, 32, 0.78)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
            padding: '12px 14px',
            cursor: 'pointer',
          }}
          onClick={() => {
            visibleRef.current = false;
            setVisible(false);
            clearTimeout(dismissTimer.current);
          }}
          whileTap={{ scale: 0.97 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <InstagramIcon badge={badge} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.3px', fontFamily: SYS_FONT }}>
                  augusto.px
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: SYS_FONT, flexShrink: 0, marginLeft: '8px' }}>
                  agora
                </span>
              </div>

              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: '1.35',
                fontFamily: SYS_FONT,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              } as React.CSSProperties}>
                {message}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
