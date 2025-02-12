import { shuffle } from "lodash";
import { motion, useScroll, useSpring, useTime, useTransform } from "motion/react";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["Data", "Insights", "Trend", "Impact"];

export default function Introduction() {
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
   
    
  });
  const time = useTime();
  const cycleDuration = 3000;
  const loopedTime = useTransform(time, (t) => t % cycleDuration);
  const opacity = useTransform(loopedTime, [0, 1000, 1300, 2000], [0, 1, 1, 0]);
  const y = useTransform(loopedTime, [0, 1000, 2000], [-50, 0, 50]);

  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const blurOverlay = document.querySelector(".blur-overlay"); // Added ref for blur overlay
    gsap.set(titleRef.current, {
      opacity: 0,
      y: -30,
    });

    // Fade in animation
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 60%", // Starts animation when element is 40% into viewport
        end: "top 40%",
        toggleActions: "play none none reverse",
        once: false,
        // markers: true, // Uncomment for debugging
      },
    });
    // Container moves slowest (30% of scroll speed)
    gsap.to(container, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0,
      },
    });

    // Blur overlay moves faster than container but slower than scroll (60% of scroll speed)
    // Blur overlay moves upward faster than container
    gsap.to(".blur-overlay", {
      yPercent: -600, // Negative value to move upward
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0, // Slightly faster response than container
      },
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => shuffle(prevColors));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const initialColors = [
    "#FFFFFF",
    "#FAFAFA",
    "#F5F5F5",
    "#F0F0F0",
    "#EBEBEB",
    "#E6E6E6",
    "#E0E0E0",
    "#DADADA",
    "#D4D4D4",
    "#CFCFCF",
    "#C9C9C9",
    "#C2C2C2",
    "#BDBDBD",
    "#B7B7B7",
    "#AFAFAF",
    "#A8A8A8",
    "#A2A2A2",
    "#9C9C9C",
    "#969696",
    "#909090",
    "#8A8A8A",
    "#828282",
    "#7A7A7A",
    "#707070",
  ];
  const item = {
    hidden: {
      opacity: 0,
      y: -30,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 50,
        once: true,
      },
    },

    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 50,
        once: true,
      },
    },
  };

  // Shuffle array randomly
  initialColors.sort(() => Math.random() - 0.5);

  const [colors, setColors] = useState(initialColors);

  return (
    <div className="relative">
      {/* First section with background image */}
      <div className="fixed bottom-10 w-full h-4 z-30 ">
        <svg width="100%" height="20">
          <line
            x1="100" // Start of the line
            y1="0"
            x2="400" // End of the line
            y2="0"
            strokeWidth="20"
            stroke="#00E5FF"
            pathLength="1"
            className="opacity-20"
            // className="fill-none"
          ></line>
          <motion.line
            x1="100" // Start of the line
            y1="0"
            x2="400" // End of the line
            y2="0"
            strokeWidth="20"
            stroke="#00E5FF"
            // className="fill-none"
            
            style={{
              pathLength: scaleX, // Animate based on scroll progress
            }}
          />
        </svg>
      </div>
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
            background:
              "linear-gradient(to bottom, transparent, rgb(17, 24, 39))",
            backdropFilter: "blur(4px)",
            willChange: "transform",
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
                    stiffness: 50,
                    delay: 0.5,
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
          <div className="z-4 text-6xl font-oswald text-white text-center px-4">
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

        {/* <motion.div
          style={{ y, opacity }}
          className="arrow left-20 absolute bottom-80 w-32 h-32 z-10"
        ></motion.div> */}
        <motion.div
          style={{ y, opacity }}
          className="arrow right-20 absolute bottom-20 w-32 h-32 z-10"
        ></motion.div>
      </div>

      {/* Next section with higher z-index */}
      <div
        ref={sectionRef}
        className="relative z-10 min-h-[120vh] bg-gray-900 pb-20"
      >
        <div className="container mx-auto px-4 py-24">
          <h1
            ref={titleRef}
            className="text-7xl font-bold text-white mb-12 text-center"
          >
             Charles Darwin
          </h1>

          <div className="max-w-4xl mx-auto space-y-8 text-gray-200">
            {/* Introduction Paragraph */}
            
            <div className="mt-12">
              <h2 className="text-5xl font-semibold text-white mb-6">
                Our group members
              </h2>
              <motion.div
                variants={{
                  show: {
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,

                      delayChildren: 0,
                      staggerChildren: 0.1,
                      once: false,
                    },
                  },

                  hidden: {
                    opacity: 0,
                    once: false,
                  },
                }}
                initial="hidden"
                whileInView="show"
                // both of these work
                viewport={{ amount: 0.4, once: false }}


                className="space-y-4"
              >
                <motion.div variants={item} className="flex items-start gap-3 ">
                
                  <p className="text-4xl">
                    <span className="font-semibold text-white">Vedant Lashkari:</span>{" "}
                    bt23btech11025@iith.ac.in
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-3">
                  
                  <p className="text-4xl">
                    <span className="font-semibold text-white">Sinduri Mekala:</span>{" "}
                  bt23btech11022@iith.ac.in
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-3">
              
                  <p className="text-4xl">
                    <span className="font-semibold text-white">
                      Aryan Raj:
                    </span>{" "}
                   bt23btech11004@iith.ac.in
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-3">
                  
                  <p className="text-4xl">
                    <span className="font-semibold text-white">Rishabh Pillai:</span>{" "}
                  bt23btech11021@iith.ac.in
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-3">
                  
                  <p className="text-4xl">
                    <span className="font-semibold text-white">
                      Atharv Choudhary:
                    </span>{" "}
                   bt23btech11005@iith.ac.in
                  </p>
                </motion.div>

                <motion.div variants={item} className="flex items-start gap-3">
           
                  <p className="text-4xl">
                    <span className="font-semibold text-white">Alen Issac Sam:</span>{" "}
                  bt23btech11003@iith.ac.in
                  </p>
                </motion.div>
              </motion.div>
              <div className="mt-32 text-center">
                {" "}
                {/* Large top margin for separation */}
                <h2 className="text-4xl font-semibold text-white tracking-wide">
                  Now let's look at some statistics
                  <br />
                  
                </h2>
                {/* Optional: Add a downward arrow or indicator */}
                <div className="mt-8 text-3xl animate-bounce">↓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
