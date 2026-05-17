import { motion } from 'framer-motion';

export default function SkeletonCard({ height = 80 }: { height?: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="bg-gray-200 rounded-2xl mb-3"
      style={{ height }}
    />
  );
}
