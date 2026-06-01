import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import EasterEggNotification from './EasterEggNotification';

interface Props {
  children: ReactNode;
}

export default function PhoneFrame({ children }: Props) {
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleShake = useCallback(() => {
    clearTimeout(shakeTimer.current);
    setShake(true);
    shakeTimer.current = setTimeout(() => setShake(false), 600);
  }, []);

  useEffect(() => () => clearTimeout(shakeTimer.current), []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">

      {/* Ambient glow */}
      <div className="absolute w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1351B4 0%, transparent 70%)' }} />

      {/* Phone */}
      <motion.div
        className="relative"
        style={{ width: '390px', height: '844px' }}
        animate={shake ? { x: [0, -6, 6, -5, 5, -3, 3, -1, 1, 0] } : { x: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
      >

        {/* Outer shell — silver aluminium */}
        <div className="absolute inset-0 rounded-[52px]"
          style={{
            background: 'linear-gradient(145deg, #E4E8EC 0%, #C8CDD6 50%, #B8BEC8 100%)',
            boxShadow: `
              0 0 0 1px #A8B0BC,
              0 0 0 3px #D0D5DC,
              0 40px 120px rgba(0,0,0,0.65),
              0 0 60px rgba(19, 81, 180, 0.2),
              inset 0 1px 0 rgba(255,255,255,0.7),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `,
          }}
        />

        {/* Side buttons (left) — silver */}
        <div className="absolute left-[-4px] top-[140px] w-[4px] h-[36px] rounded-l-sm"
          style={{ background: 'linear-gradient(180deg, #C0C5CE, #A8B0BC)' }} />
        <div className="absolute left-[-4px] top-[188px] w-[4px] h-[64px] rounded-l-sm"
          style={{ background: 'linear-gradient(180deg, #C0C5CE, #A8B0BC)' }} />
        <div className="absolute left-[-4px] top-[264px] w-[4px] h-[64px] rounded-l-sm"
          style={{ background: 'linear-gradient(180deg, #C0C5CE, #A8B0BC)' }} />

        {/* Power button (right) — silver */}
        <div className="absolute right-[-4px] top-[200px] w-[4px] h-[80px] rounded-r-sm"
          style={{ background: 'linear-gradient(180deg, #C0C5CE, #A8B0BC)' }} />

        {/* Screen area */}
        <div className="absolute inset-[3px] rounded-[50px] overflow-hidden bg-white">

          {/* Notch / Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[100]"
            style={{
              width: '120px',
              height: '34px',
              background: '#0a0a0a',
              borderRadius: '20px',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
            }}>
            {/* Camera */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#0d1b2e] border border-[#1565C0]/30" />
            </div>
            {/* Speaker */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              style={{ width: '40px', height: '4px', background: '#111', borderRadius: '2px' }} />
          </div>

          {/* App content */}
          <div className="absolute inset-0">
            {children}
          </div>

          {/* Easter egg */}
          <EasterEggNotification onShake={handleShake} />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-32 h-[5px] rounded-full"
          style={{ background: 'rgba(0,0,0,0.18)' }} />
      </motion.div>

      {/* Reflection effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 opacity-20 blur-2xl rounded-full pointer-events-none"
        style={{ background: '#1351B4' }} />
    </div>
  );
}

