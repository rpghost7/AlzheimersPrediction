import { shuffle } from "lodash";
import { motion, useTime, useTransform } from "motion/react";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["Data", "Insights", "Trend", "Impact"];

export default function Introduction() {
  const [index, setIndex] = useState(0);
  const time = useTime();
  const cycleDuration = 3000;
  const loopedTime = useTransform(time, (t) => t % cycleDuration);
  const opacity = useTransform(loopedTime, [0, 1000, 1300, 2000], [0, 1, 1, 0]);
  const y = useTransform(loopedTime, [0, 1000, 2000], [-50, 0, 50]);

  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const blurOverlay = document.querySelector('.blur-overlay'); // Added ref for blur overlay
    
    // Container moves slowest (30% of scroll speed)
    gsap.to(container, {
      yPercent: 70,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Blur overlay moves faster than container but slower than scroll (60% of scroll speed)
  // Blur overlay moves upward faster than container
  gsap.to('.blur-overlay', {
    yPercent: -450, // Negative value to move upward
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1, // Slightly faster response than container
    }
  });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => shuffle(prevColors));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const initialColors = [
    "#FFFFFF", "#FAFAFA", "#F5F5F5", "#F0F0F0", "#EBEBEB", "#E6E6E6",
    "#E0E0E0", "#DADADA", "#D4D4D4", "#CFCFCF", "#C9C9C9", "#C2C2C2",
    "#BDBDBD", "#B7B7B7", "#AFAFAF", "#A8A8A8", "#A2A2A2", "#9C9C9C",
    "#969696", "#909090", "#8A8A8A", "#828282", "#7A7A7A", "#707070"
  ];
  
  // Shuffle array randomly
  initialColors.sort(() => Math.random() - 0.5);
  
  const [colors, setColors] = useState(initialColors);

  return (
    <div className="relative">
      {/* First section with background image */}
      <div ref={containerRef} className="relative h-screen introduction">
        {/* Background Image */}
        <div
          ref={backgroundRef}
          className="absolute top-0 left-0 w-full h-full "
        />
         {/* Blur overlay with its own scroll speed */}
         <div 
          className="blur-overlay absolute bottom-0 left-0 w-full h-[15vh] z-[5]"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgb(17, 24, 39))',
            backdropFilter: 'blur(4px)',
            willChange: 'transform',
          }}
        />
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center gap-12">
          <div>
            <ul className="grid grid-cols-8 gap-7">
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
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                />
              ))}
            </ul>
          </div>
          <div className="z-4 text-6xl font-barlow text-white text-center px-4">
            Understanding Alzheimer's Disease: A Global Challenge
          </div>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="z-4 text-5xl font-source text-white"
          >
            {words[index]}
          </motion.div>
        </div>

        <motion.div
          style={{ y, opacity }}
          className="arrow left-20 absolute bottom-80 w-32 h-32 z-10"
        ></motion.div>
        <motion.div
          style={{ y, opacity }}
          className="arrow right-20 absolute bottom-80 w-32 h-32 z-10"
        ></motion.div>
      </div>

      {/* Next section with higher z-index */}
      <div
        ref={sectionRef}
        className="relative z-10 min-h-screen bg-gray-900 pb-20"
      >
        {/* Your next section content */}
        <div className="h-screen flex items-center justify-center text-white text-4xl">
          Next Section Content
        </div>
      </div>
    </div>
  );
}
