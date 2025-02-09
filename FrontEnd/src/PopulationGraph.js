import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory";
import { motion } from "motion/react";

export default function PopulationGraph() {
  // Data for both datasets
  const dataSet1 = [
    { x: 2019, y: 7.53 },
    { x: 2025, y: 7.91 },
    { x: 2033, y: 8.44 },
    { x: 2041, y: 9.01 },
    { x: 2050, y: 9.7 },
  ];

  const dataSet2 = [
    { x: 2019, y: 55.0 },
    { x: 2025, y: 66.55 },
    { x: 2033, y: 85.06 },
    { x: 2041, y: 107.18 },
    { x: 2050, y: 139.0 },
  ];

  // Use state to hold the current dataset being displayed
  const [data, setData] = useState(dataSet1);
  const [animationKey, setAnimationKey] = useState(0); // Key to alternate between datasets
  const [Ylabel, setYlabel] = useState("World Population");
  useEffect(() => {
    const setStateInterval = setInterval(() => {
      const newData = animationKey === 0 ? dataSet2 : dataSet1;
      setData(newData);
      setYlabel((prev) =>
        prev === "World Population" ? "Dementia Patients" : "World Population"
      );
      setAnimationKey((prev) => (prev === 0 ? 1 : 0)); // Toggle the animation key for alternating data
    }, 4000);

    return () => clearInterval(setStateInterval); // Clean up on component unmount
  }, [animationKey]);

  // Helper function to format Y-axis labels as billion or million based on the value
  const formatYAxis = (value) => {
    if (value < 15) {
      return `${value.toFixed(1)}B`; // Values less than 10 are considered in billions
    }
    return `${value.toFixed(1)}M`; // Values greater than 10 are considered in millions
  };

  const fadein = {
    hidden: {
      opacity: 0,
      y: -40,
      transition: {
        type: "tween",
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 2,
      },
    },
  };
  return (
    <div className="p-20 flex flex-row gap-10 items-center">
      <motion.div
        className="w-3/5 h-3/5 pl-4 bg-stone-200 rounded-3xl chart-border"
        variants={fadein}
        initial="hidden"
        whileInView="show"
      >
        <VictoryChart theme={VictoryTheme.clean}>
          <VictoryAxis
            label="Year" // Label for X-axis
            style={{
              axisLabel: { padding: 30 }, // Adjust label position
              tickLabels: { fontSize: 10 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label={Ylabel} // Label for Y-axis
            tickFormat={formatYAxis} // Format Y-axis labels to alternate between Billion and Million
            style={{
              axisLabel: { padding: 45 }, // Adjust label position
              tickLabels: { fontSize: 10, padding: 0 },
            }}
          />
          <VictoryLine
            data={data}
            interpolation="natural" // Smooth transition between points
            animate={{
              duration: 750, // Duration of the animation
              onLoad: { duration: 3000 }, // No animation on initial render
            }}
          />
        </VictoryChart>
      </motion.div>
      <motion.div 
      initial={{ opacity: 0,x:-20 }}
      animate={{ opacity: 1,x:0 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        repeatDelay: 0.2,
        delay: 0,
      }}
      className="big-arrow w-72 h-48 ml-12"></motion.div>
      <div className="content-card w-1/2 h-1/2 text-4xl p-5 rounded-lg">
        {" "}
        What can we conclude from this?
        <div>

        </div>
      </div>
    </div>
  );
}
