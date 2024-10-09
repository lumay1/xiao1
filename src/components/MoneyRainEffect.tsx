import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MoneyBill {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

const MoneyRainEffect: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [bills, setBills] = useState<MoneyBill[]>([]);

  useEffect(() => {
    if (isVisible) {
      const newBills = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -100 - Math.random() * 500,
        rotation: Math.random() * 360,
      }));
      setBills(newBills);
    } else {
      setBills([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {bills.map((bill) => (
        <motion.div
          key={bill.id}
          className="absolute w-12 h-6 bg-green-500 opacity-70"
          style={{
            left: bill.x,
            top: bill.y,
            rotate: bill.rotation,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: bill.rotation + 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default MoneyRainEffect;