import type { ReactNode } from 'react';
import BottomNav from '../components/BottomNav';

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50">
      <div className="relative flex-1" style={{ paddingBottom: '80px' }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
