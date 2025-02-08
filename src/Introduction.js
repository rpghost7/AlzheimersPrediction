import {  shuffle } from "lodash";
import { motion, useTime, useTransform } from "motion/react";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const words = ["Data", "Insights", "Trend", "Impact"];
export default function Introduction() {
  const [index, setIndex] = useState(0);
  const time = useTime();

    // Define a cycle duration (e.g., 4 seconds = 4000ms)
    const cycleDuration = 3000;

    // Use modulo to create a repeating cycle every 4000ms
    const loopedTime = useTransform(time, (t) => t % cycleDuration);
  
    // Map the looped time to cycle between [0 → 1 → 0]
    const opacity = useTransform(loopedTime, [0, 1000,1300, 2000], [0, 1,1, 0]);
  const y = useTransform(loopedTime,[0,1000,2000],[-50,0,50]);

  const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
  const [colors, setColors] = useState(initialColors);
  // gsap.to(".introduction", {
  //   y: -200, // Moves up as the user scrolls down
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".parallax-container",
  //     start: "top bottom",
  //     end: "bottom top",
  //     scrub: 3, // Makes it scroll at a slower pace
  //   },
  // });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => shuffle(prevColors));
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="introduction w-full h-screen flex flex-col justify-center items-center gap-12 mb-20">
        <div>
          <ul className="grid grid-cols-2 gap-7">
            {colors.map((background) => (
              <motion.li
                key={background}
                layout
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                }}
                style={{
                  background,
                  width: "150px",
                  height: "150px",
                  borderRadius: "20px",
                }}
              />
            ))}
          </ul>
        </div>
        <div className="text-6xl font-barlow text-white">
          Understanding Alzheimer's Disease: A Global Challenge
        </div>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-source text-white"
        >
          {words[index]}
        </motion.div>
      </div>
      <motion.div
        
        style={{ y, opacity }}
        className="arrow left-20 absolute bottom-80 w-32 h-32"
      ></motion.div>
      <motion.div
        
        style={{ y, opacity }}
        className="arrow right-20 absolute bottom-80 w-32 h-32"
      ></motion.div>
    </>
  );
}
