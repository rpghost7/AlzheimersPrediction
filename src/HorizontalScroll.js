import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const totalWidth = horizontal.offsetWidth - window.innerWidth + 200;
    const cardWidth = cards[0].offsetWidth;
    const spacing = 144;
    // spacing is the gap i have given between the cards
    const snapPoints = cards.map(
      (_, i) => (i * (cardWidth + spacing) + 300) / totalWidth
    );
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
        // moves 30px down
        rotation: randomRotation,
        // rotates the card
        duration: 5,
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
          const progress = self.progress * totalWidth - 300;
          cards.forEach((card, index) => {
            const cardPosition = index * (cardWidth + spacing);
            const distanceFromCenter = Math.abs(progress - cardPosition);
            // this is the distance between the card and the center of the container
            const threshold = (cardWidth + spacing/2) ;

            const scale =
              distanceFromCenter < threshold
                ? 1 + (1 - distanceFromCenter / threshold) * 0.2
                : 1;
            // this is the scale of the card 
            // const isInFocus = distanceFromCenter < threshold * 0.5;
            // this will become true when distanceFromCenter is less than threshold * 0.5
            const opacity = gsap.utils.interpolate(
              0.3,
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
      className="h-screen w-full flex items-center bg-gray-100 overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="h-[500px] flex relative gap-36 px-[calc(50vw+200px)] "
      >
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`
              min-w-[200px] h-[400px] 
              flex justify-center items-center 
              text-xl font-semibold
              rounded-lg shadow-lg
              transform origin-center
              transition-all duration-300 ease-out
              hover:shadow-xl
              ${getCardColor(index)}
            `}
          >
            Card {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const getCardColor = (index) => {
  const colors = [
    "bg-yellow-400",
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];
  return colors[index % colors.length];
};

export default HorizontalScroll;
