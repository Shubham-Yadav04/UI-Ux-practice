"use client"
import React from 'react'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'motion/react'
import { cn } from '@/lib/uitls'
import { useRef } from 'react'
import { animate } from 'motion'
import { pre } from 'motion/react-client'

type Card={
    title:string,
    image:string
}

const card: Card[] = [
        {
            title: 'Sunset Boulevard',
            image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Mountain Escape',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'City Lights',
            image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Forest Trail',
            image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Beach Vibes',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Desert Dunes',
            image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=600&q=80',
        },
    ]
function Page() {
    const sendBack=()=>{
         console.log("send back")
        setCards((prev)=>[ ...prev.slice(1),prev[0]])
    }
    const [cards,setCards]=React.useState<Card[]>(card)

    return (
        <div className='min-w-4xl mx-auto h-screen flex bg-blue-100 flex items-center'  >
        <div className='flex w-[300] h-[400] gap-4 p-4  mx-auto relative bg-red-100'>
            {cards.map((item, index) => (
                <Card key={index} title={item.title} image={item.image} index={index} total={cards.length} 
                sendBack={index===0 ? sendBack : undefined} />
            ))}
        </div> 
        </div>
    )
}

function Card({title,image,index,total,sendBack
}:{title:string,image:string,index:number,total:number,sendBack?:()=>void}) {
    const updateIndex=()=>{
        console.log("drag ended")
        if(!isTop || !sendBack) return ;
       sendBack()
        animate(x,0,{
            duration:0.5,
            type:'spring',
            stiffness:300,
            damping:20
               
        })
    }
    const isTop=index===0
    const x=useMotionValue(0);
    const rotate=useTransform(x,[-100,100],[-20,20])
  return (
    <motion.div className={cn('w-[200px] h-[300px] bg-gray-200 rounded-lg shadow-md overflow-hidden absolute top-20  left-13 cursor-pointer ')}
   style={{ 
    zIndex: total-index,
    rotate:rotate,
    x
   }}
   drag={isTop?'x':false}
   dragElastic={0.6}
   animate={{
    scale:1-index*0.03,
    y:`${-index*5}%`,
   }}
   transition={{
type:'spring',
        stiffness:380,
        damping:32
   }}
   onDragEnd={updateIndex}
   dragConstraints={{ left: -100, right: 100, top: 20, bottom: 20 }}
    > 
      <Image src={image} alt={title} width={100} height={200} className='w-full h-full object-cover'draggable={false}/>
      <div className='p-2 z-10 absolute bottom-0 left-0 w-full  bg-opacity-50 text-white'>
        <h3 className='text-lg font-bold'>{title}</h3>
      </div>
    </motion.div>
  )
}

export default Page