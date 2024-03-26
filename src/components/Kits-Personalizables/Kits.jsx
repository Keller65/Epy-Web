import { useState } from 'react';
import { motion } from 'framer-motion';

const Kits = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragEnd = (event, info) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, top: 0, right: 500, bottom: 500 }} // Cambia estos valores según tus necesidades
      onDragEnd={handleDragEnd}
      style={{
        width: 100,
        height: 100,
        background: 'blue',
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    />
  );
};

export default Kits;