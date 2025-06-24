import React from "react";
import DeliveryCard from "./Utilities/DeliveryCard";
import grocery from "../../assets/grocery.png";
import img from "..//../assets/arrow.png";
import Fresh from "./Utilities/Fresh";
import apple from "../../assets/apple.png";
import banana from "../../assets/banana.png";
import carrot from "../../assets/carrot.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    rotate: [0, -15, 15, 0],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut",
    },
  },
};
const flyingVariantsOpposite = {
  animate: {
    y: [0, 30, -30, 0], // reverse of [0, -30, 30, 0]
    x: [0, -20, 20, 0], // reverse of [0, 20, -20, 0]
    rotate: [0, 15, -15, 0], // reverse of [0, -15, 15, 0]
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut",
    },
  },
};
const FirstSection = () => {
  return (
    <div className="relative bg-[#efebebda]">
      <motion.img
        src={apple}
        className="absolute 
             w-10 sm:w-20 md:w-24 lg:w-36 
             top-1/2 left-1/4 
             z-10"
        variants={flyingVariants}
        animate="animate"
      />

      <motion.img
        src={banana}
        className="absolute 
             w-16 sm:w-24 md:w-32 lg:w-40 
             top-2/3 left-[75%] 
             z-10"
        variants={flyingVariants}
        animate="animate"
      />

      <motion.img
        src={carrot}
        className="absolute 
             w-16 sm:w-20 md:w-24 lg:w-40 
             bottom-10 left-1/6 
             z-10"
        variants={flyingVariantsOpposite}
        animate="animate"
      />

      <div className="flex relative justify-evenly pt-14 text-center items-center font-[Plus-Jakarta-Sans] lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-shadow-lg z-10">
        Get Products Right from <br />
        Farm with Krishi
      </div>
      <div className=" relative flex justify-center z-10">
        <div className="flex-initial ">
          <Link to="/products">
            <button className="btn rounded-full border-2 py-2 px-5 shadow-md hover:shadow-lg transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="flex-initial flex-col items-center gap-4 mt-5 z-10"
        >
          <div className="flex-initial  ">
            <img src={img} className="flex-initial" />
          </div>
          <div className="flex-initial h-20 ">
            <DeliveryCard />
          </div>
        </motion.div>
        <div className="flex items-end">
          <img
            src={grocery}
            className="max-w-full lg:max-w-lg md:max-w-md sm:max-w-sm xs:max-w-xs xs:max-h-xs"
          />
        </div>
        <motion.div
          animate="animate"
          variants={floatVariants}
          className="flex-initial z-10 "
        >
          <Fresh />
        </motion.div>
      </div>
    </div>
  );
};

export default FirstSection;
