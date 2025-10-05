"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedShapes() {
  const { scrollY } = useScroll();
  const rotate1 = useTransform(scrollY, [0, 1000], [25, 65]);
  const rotate2 = useTransform(scrollY, [0, 1000], [9.35, -25]);

  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-2 right-0 bottom-[-220px] h-[635px] w-[635px] rounded-[99px] bg-secondary-500"
        style={{ rotate: rotate1 }}
        transition={{ duration: 0.1 }}
      ></motion.div>
      <motion.div
        className="pointer-events-none absolute z-1 right-[55px] bottom-[-260px] h-[635px] w-[635px] rounded-[99px] bg-primary-500"
        style={{ rotate: rotate2 }}
        transition={{ duration: 0.1 }}
      ></motion.div>
    </>
  );
}
