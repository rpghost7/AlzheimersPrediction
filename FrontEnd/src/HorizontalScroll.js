import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import dementia from "./Dementia.webp";
import protein2 from "./protein.webp";
import mortality from "./Mortality.webp";
import women from "./Women.webp";
import money from "./Money.webp";
gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const cardsRef = useRef([]);
  const cardTextRef = useRef([]);
  const cardTitles = [
    "Prevalence in India",
    "Genetic Factors",
    "Mortality Rate",
    "Gender Patterns",
    "Treatment Costs",
  ];
  const images = [dementia, protein2, mortality, women, money];
  const cardNumbers = ["8.8", "40-65%", "5th", "2/3rd's", "$305 Billion"];
  const sideText = [
    "Million Indians older than 60 years live with dementia. The estimated dementia prevalence for adults ages 60+ in India is 7.4%.",
    "Is the estimate that people diagnosed with Alzheimer's have the APOE-e4 gene. APOE-e4 is one of three common forms of the APOE gene",
    "Leading cause of death in adults older than 65 years. One in 3 older Americans dies with Alzheimer's or another dementia. ",
    "",
    "is the estimated cost to treat Alzheimer patients in 2020,with the cost expected to increase to more than $1 trillion as the population ages.",
  ];
  const cardContent = [
    " Dementia is more prevalent among females than males and in rural than urban areas. By 2030, it is projected that there will be 82 lakh people with dementia in India, and by 2050, this number will soar to a staggering 1.23 crore!",
    " APOE-e4 may tend to make symptoms appear at a younger age than usual, We all inherit a copy of some form of APOE from each parent. Those who inherit one copy of APOE-e4 from either have an increased risk of developing Alzheimer's",
    " It kills more than breast cancer and prostate cancer combined. Deaths from Alzheimer's have more than doubled between 2000 and 2021, while those from heart disease — the leading cause of death — have decreased",
    "of people living with Alzheimer's are women. Women tend to live longer than men, and Alzheimer’s risk increases with age. As women age and undergo menopause, estrogen levels drop, which can contribute to the accelerated brain aging and the onset of Alzheimer’s symptoms",
    " The total lifetime cost of care for a person living with dementia is estimated at almost $400,000. 70% of these costs are borne by family caregivers in the forms of unpaid caregiving and out-of-pocket expenses",
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const cardText = cardTextRef.current;
    const totalWidth = horizontal.offsetWidth - window.innerWidth + 500;

    const cardWidth = cards[0].offsetWidth;
    const spacing = 144;
    // spacing is the gap i have given between the cards
    const snapPoints = cards.map(
      (_, i) => (i * (cardWidth + spacing) + 500) / totalWidth
    );
    // here i have added 300 because the cards are starting from 300px from the left of the center
    // snapPoints is an array of the points at which the cards will snap to,
    // and it is normalized from 0 to 1 depending on the total width of the container

    cards.forEach((card, index) => {
      const randomRotation = Math.random() * 10 - 5;
      // this controls how much the card is rotated

      gsap.set(card, {
        rotation: randomRotation,
        opacity: 0.3,
      });

      // for gsap.set (it is initial state)
      // takes similar parameters as gsap.to
      // here gsap.to takes two parameters
      // 1. the element to animate
      // 2. the properties to animate
      // very similar to framer motion
      gsap.to(card, {
        y: 60,
        // moves 60px up
        // rotation: randomRotation,
        // rotates the card
        duration: 2,
        // duration of the animation
        delay: index + 2,
        // delay the animation
        ease: "sine.inOut",
        // ease of the animation
        // gives a smooth wave like movement
        repeat: -1,
        // repeats the animation infinitely
        yoyo: true,
        // reverses the animation
      });
    });

    const scrollTween = gsap.to(horizontal, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        // triggers when container enters 'markers' help understand better
        pin: true,
        // this means it pins the container to the horizontal element
        start: "top top",
        // this means it starts when the container is at the top of the horizontal element
        end: `${totalWidth}`,
        scrub: 1,
        // this means it scrubs the animation
        // and it is the speed of the animation
        // markers: true,

        snap: {
          snapTo: snapPoints,
          duration: { min: 0.2, max: 0.3 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress * totalWidth - 500;
          // self.progress is the progress of the scroll in pixels
          cards.forEach((card, index) => {
            const cardPosition = index * (cardWidth + spacing);
            const distanceFromCenter = Math.abs(progress - cardPosition);
            // this is the distance between the card and the center of the container
            const threshold = (cardWidth + spacing) / 2;

            const scale =
              distanceFromCenter < threshold
                ? 1 + (1 - distanceFromCenter / threshold) * 0.2
                : // this increases the scale of the card by 20% when it is close to the center
                  1;
            // this is the scale of the card
            // const isInFocus = distanceFromCenter < threshold * 0.5;
            // this will become true when distanceFromCenter is less than threshold * 0.5
            const opacity = gsap.utils.interpolate(
              0.3,
              1,
              Math.max(0, 1 - distanceFromCenter / threshold)
            );
            const cardTextOpacity = gsap.utils.interpolate(
              0,
              1,
              Math.max(0, 1 - distanceFromCenter / threshold)
            );
            gsap.to(card, {
              scale: scale,
              // rotation: isInFocus ? 0 : card._gsap.rotation,
              opacity: opacity,
              duration: 0.2,
              ease: "power1.out",

              // this is the ease of the animation
              // power1.out is a power of 1 out
              // power1.in is a power of 1 in
              // power1.inOut is a power of 1 in and out
              // power1.out is a power of 1 out
              // power1.inOut is a power of 1 in and out
              // power1.inOut is a power of 1 in and out
            });
            gsap.set(cardText[index], {
              opacity: 0,
            });
            gsap.to(cardText[index], {
              opacity: cardTextOpacity,
              duration: 0.2,
              ease: "power1.out",
            });
          });
        },
      },
    });

    return () => {
      gsap.killTweensOf(cards);
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // this is a cleanup function that kills all the tweens and triggers
  }, []);
  // note that useEffect only mounts at the start of the component
  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex items-center bg-rose-500 overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="h-[600px] flex relative gap-36 px-[calc(50vw+400px)] "
      >
        {/* note that center of each card will be at 100px w so that is why we are adding 300 to the snapPoints etc */}
        {[...Array(5)].map((_, index) => (
          <>
            <div className="relative h-full">
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`
              min-w-[400px] h-[500px] 
               
               
              rounded-3xl shadow-lg
              transform origin-center
              transition-all duration-300 ease-out
              hover:shadow-xl relative
              bg-slate-700


            `}
                // ${getCardColor(index)}
              >
                <div className="text-6xl text-teal-400 absolute top-4 left-7 ">
                  {cardNumbers[index]}
                </div>
                <img
                  src={images[index]}
                  alt="dementia"
                  className="w-40 h-40 absolute left-4 top-24 rounded-3xl mr-1"
                />
                <div className="text-white text-xl absolute right-1 top-20 left-48 text-wrap">
                  {sideText[index]}
                </div>

                <div className="text-xl text-white absolute left-5 bottom-5 mr-10 ">
                  {cardContent[index]}
                </div>
              </div>
              <div
                className={`-bottom-[80px] absolute card-text text-3xl  bg-slate-700 text-teal-400 p-2 rounded-lg `}
                ref={(el) => (cardTextRef.current[index] = el)}
              >
                {" "}
                {cardTitles[index]}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

// const getCardColor = (index) => {
//   const colors = [
//     "bg-slate-700", // Dark Neutral Gray
//     "bg-blue-700", // Deep Royal Blue
//     "bg-green-700", // Rich Forest Green
//     "bg-red-700", // Strong Crimson Red
//     "bg-indigo-700", // Bold Indigo
//     "bg-amber-700", // Deep Warm Gold
//     "bg-emerald-700", // Elegant Emerald Green
//     "bg-cyan-700", // Vibrant Cyan
//     "bg-rose-700", // Intense Blush Pink
//     "bg-purple-700", // Dark Regal Purple
//   ];
//   return colors[index % colors.length];
// };
const getTextColor = (index) => {
  const colors = [
    "text-white", // Dark Neutral Gray
    "text-white", // Deep Royal Blue
    "text-white", // Rich Forest Green
    "text-white", // Strong Crimson Red
    "text-white", // Bold Indigo
    "text-gray-900", // Deep Warm Gold
    "text-white", // Elegant Emerald Green
    "text-gray-900", // Vibrant Cyan
    "text-white", // Intense Blush Pink
    "text-white", // Dark Regal Purple
  ];
  return colors[index % colors.length];
};
export default HorizontalScroll;
