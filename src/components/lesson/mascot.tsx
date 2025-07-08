import Image from 'next/image';
import { motion } from 'framer-motion';

interface MascotProps {
  isHappy?: boolean | null;
  isSad?: boolean | null;
}

export function Mascot({ isHappy, isSad }: MascotProps) {
  let animation = {};
  if (isHappy) {
    animation = {
      y: [0, -10, 0],
      transition: { duration: 0.5, repeat: 1, ease: 'easeInOut' },
    };
  }
  if (isSad) {
    animation = {
      x: [0, -5, 5, -5, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    };
  }

  const mascotImage = isHappy ? '/images/mascot-happy.png' : isSad ? '/images/mascot-sad.png' : '/images/mascot-idle.png';

  return (
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-32 h-32 md:w-40 md:h-40"
    >
      <motion.div animate={animation}>
        <Image
          src={mascotImage}
          alt="Centsable Mascot"
          width={160}
          height={160}
          className="drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
}
