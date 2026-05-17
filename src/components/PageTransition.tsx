import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function PageTransition({ children, className = '' }: Props) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute inset-0 overflow-y-auto no-scrollbar ${className}`}
    >
      {children}
    </motion.div>
  );
}
