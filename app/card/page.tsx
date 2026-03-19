"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
type CardProps = {
  title: string;
  description: string;
  className?: string;
  config: {
    x: number;
    y: number;
    rotate: number;
    zIndex: number;
  };
  skelton: React.ReactNode;
};

const cards: CardProps[] = [
  {
    skelton: <div className="w-50 h-34 rounded-2xl bg-orange-600/30" />,
    title: "Practical Demonstration",
    description: "This is a practical demonstration of the card component.",
    className: "bg-orange-400",
    config: {
      x: 20,
      y: 0,
      rotate: -12,
      zIndex: 1,
    },
  },
  {
    skelton: <div className="w-50 h-34 rounded-2xl bg-blue-600/30" />,
    title: "Responsive Design",
    description:
      "Build responsive layouts that adapt seamlessly across all device sizes and screen resolutions for optimal user experience.",
    className: "bg-blue-400",
    config: {
      x: 140,
      y: -5,
      rotate: 2,
      zIndex: 2,
    },
  },
  {
    skelton: <div className="w-50 h-34 rounded-2xl bg-red-600/20" />,
    title: "Component Library",
    description:
      "Comprehensive reusable components built with TypeScript and React to accelerate development and maintain consistency.",
    className: "bg-red-200",
    config: {
      x: 220,
      y: 18,
      rotate:-13,
      zIndex: 3,
    },
  },
  {
    title: "Performance Optimization",
    skelton: <div className="w-50 h-34 rounded-2xl bg-purple-600/70" />,
    description:
      "Optimize rendering performance using memoization, lazy loading, and efficient state management techniques.",
    className: "bg-purple-400",
    config: {
      x: 360,
      y: -15,
      rotate: -4,
      zIndex: 4,
    },
  },
  {
    title: "Type Safety",
    skelton: <div className="w-50 h-34 rounded-2xl bg-red-600/70" />,
    description:
      "Leverage TypeScript to catch errors early and ensure robust code with comprehensive type definitions and interfaces.",
    className: "bg-rose-400",
    config: {
      x: 510,
      y: 8,
      rotate: 4,
      zIndex: 5,
    },
  },
];
function Card() {

    const [active,setActive]= useState<CardProps | null>(null);
    const [isCardActive,setIsCardActive]= useState(false);
    const ref= useRef<HTMLDivElement>(null);

    const cardActive= (card:CardProps)=>{
        return active?.title=== card.title;
    }
    useEffect(()=>{
        const handleCardClick=(event:MouseEvent)=>{
            if(ref.current && !ref.current.contains(event.target as Node)){
                setActive(null);
                setIsCardActive(false);
            }
        }

        document.addEventListener("click",handleCardClick);

        return()=>{
            document.removeEventListener("click",handleCardClick);
        }
    })
  return (
    <div ref={ref} className="mx-auto max-w-4xl h-50  mt-15 w-full  relative">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={index}
            className={` absolute left-15  top-12 ${card.className} w-56 h-60 rounded-2xl py-1 overflow-hidden`}
            initial={{
                x:20,
                y:400,
                rotate:0,
                scale:0
            }}
            animate={{
              x: cardActive(card)? 250 :isCardActive?card.config.x*.3+200: card.config.x,
              y: cardActive(card)?0 :isCardActive?250 :card.config.y,
              rotate: cardActive(card)?0: isCardActive? card.config.rotate*0.2:card.config.rotate,
              scale: cardActive(card)?1.5: isCardActive?0.7:1,
              zIndex:cardActive(card)?7:card.config.zIndex
            }}
            transition={{
                type:"spring",
                stiffness:50,
                damping:10,
                duration:.5

            }}
            whileHover={{
                scale:cardActive(card)? 1.5 :isCardActive?0.7:1.05
            }}
          >
            <motion.button className=" flex flex-col items-center justify-around h-full w-full"
            onClick={()=>{
                setIsCardActive(true);
                setActive(card)}}
                layoutId={`${card.title}-${index}`}
            >
              {card.skelton}
              <div className=" w-full px-1 ">
                <h1 className="text-lg font-bold px-3 text-left text-black leading-tight">{card.title}</h1>
                <AnimatePresence>
                {cardActive(card) &&
                <motion.p className="text-[8px] text-zinc-700 px-2 text-left w-full "
                layoutId={`${card.title}-${index}`}
                initial={
                    {
                        opacity:0
                    }
                }
                animate={{opacity:1}}
                >
                    {card.description}

                </motion.p>
      }
      </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}

export default Card;
