'use client'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ToastMessage = ({
  message,
  icon,
}: {
  message: string;
  icon: React.ReactNode;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    });

  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, x: "-50%" }}
      animate={controls} // Added scale property
      exit={{ opacity: 0.2, x: "-50%" }}
      transition={{ type: "spring", bounce: 0.2, duration: 1 }}
      className="absolute sm:w-[400px] w-[80%] text-sm sm:text-base py-4 px-4 rounded-xl bg-darkgrey text-lightgrey left-[50%] right-[50%] bottom-5 sm:bottom-10 z-[9999] flex items-center justify-center gap-2"
    >
      {icon}
      <p>{message}</p>
    </motion.div>
  );
};

export default ToastMessage;
