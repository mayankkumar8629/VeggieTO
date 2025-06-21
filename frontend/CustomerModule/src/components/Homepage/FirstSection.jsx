import React from "react";
import DeliveryCard from "./Utilities/DeliveryCard";
import grocery from "../../assets/grocery.png";
import img from "..//../assets/arrow.png";
import Fresh from "./Utilities/Fresh";
import apple from '../../assets/apple.png';
import banana from '../../assets/banana.png';
import carrot from '../../assets/carrot.png';
import { motion } from "framer-motion";

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
const flyingVariants = {
  animate: {
    y: [0, -30, 30, 0],
    x: [0, 20, -20, 0],
    rotate: [0, 15, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: 'easeInOut',
    },
  },
};
const FirstSection = () => {
  return (
    <div className="relative bg-[#efebebda]">
      <motion.img
        src={apple}
        className="absolute w-35 top-1/4 left-2/6  z-1"
        variants={flyingVariants}
        animate="animate"
      />
      <motion.img
        src={banana}
        className="absolute w-50 top-4/6 left-[75%] z-1"
        variants={flyingVariants}
        animate="animate"
      />
      <motion.img
        src={carrot}
        className="absolute w-50 bottom-10  left-1/6 z-1"
        variants={flyingVariants}
        animate="animate"
      />

      <div className="flex justify-evenly pt-14 text-center items-center font-[Plus-Jakarta-Sans] lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-shadow-lg">
        Get Products Right from <br />
        Farm with Krishi
      </div>
      <div className="flex justify-center">
        <div className="flex-initial ">
          <button className="btn rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div variants={floatVariants} animate="animate" className="flex-initial flex-col items-center gap-4 mt-5">
          <div className="flex-initial  ">
            <img src={img} className="flex-initial" />
          </div>
          <div className="flex-initial ">
            <DeliveryCard />
          </div>
        </motion.div>
        <div className="flex-initial  ">
          <img src={grocery} className="flex-initial place-content-end" />
        </div>
        <motion.div animate="animate" variants={floatVariants} className="flex-initial  ">
          <Fresh />
        </motion.div>
      </div>
    </div>
  );
};

export default FirstSection;
