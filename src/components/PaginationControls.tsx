import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => canGoBack && onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        style={{ color: '#1565C0', background: '#EFF6FF' }}
      >
        <HiChevronLeft size={16} />
        Anterior
      </motion.button>

      <div className="text-center">
        <div className="text-sm font-bold text-gray-800">
          Página {currentPage} de {totalPages}
        </div>
        <div className="text-[11px] text-gray-400">20 itens por página</div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => canGoForward && onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        style={{ color: '#1565C0', background: '#EFF6FF' }}
      >
        Próxima
        <HiChevronRight size={16} />
      </motion.button>
    </div>
  );
}
