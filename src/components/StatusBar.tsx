import { useState, useEffect } from 'react';

export default function StatusBar({ light = false }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  const textColor = light ? 'text-white' : 'text-gray-800';

  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold ${textColor} select-none z-50`}
      style={{ height: '44px' }}>
      <span className="text-sm font-bold">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <div className="flex items-end gap-[2px]">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} className={`w-[3px] rounded-sm ${i < 3 ? 'opacity-100' : 'opacity-40'}`}
              style={{ height: `${h}px`, background: light ? 'white' : '#1a1a2e' }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M7 8.5C7.828 8.5 8.5 9.172 8.5 10C8.5 10.828 7.828 11.5 7 11.5C6.172 11.5 5.5 10.828 5.5 10C5.5 9.172 6.172 8.5 7 8.5Z"
            fill={light ? 'white' : '#1a1a2e'} />
          <path d="M7 5C8.6 5 10.05 5.65 11.12 6.72L12.19 5.65C10.83 4.29 8.99 3.5 7 3.5C5.01 3.5 3.17 4.29 1.81 5.65L2.88 6.72C3.95 5.65 5.4 5 7 5Z"
            fill={light ? 'white' : '#1a1a2e'} opacity="0.7" />
          <path d="M7 1.5C9.62 1.5 11.99 2.57 13.72 4.3L14.79 3.23C12.77 1.21 10.02 0 7 0C3.98 0 1.23 1.21 -0.79 3.23L0.28 4.3C2.01 2.57 4.38 1.5 7 1.5Z"
            fill={light ? 'white' : '#1a1a2e'} opacity="0.4" />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-[1px]">
          <div className={`relative w-[22px] h-[11px] rounded-[2px] border ${light ? 'border-white' : 'border-gray-700'}`}>
            <div className={`absolute inset-[1px] rounded-[1px] ${light ? 'bg-white' : 'bg-gray-800'}`}
              style={{ width: '75%' }} />
          </div>
          <div className={`w-[2px] h-[5px] rounded-r-sm ${light ? 'bg-white' : 'bg-gray-700'}`} />
        </div>
      </div>
    </div>
  );
}
