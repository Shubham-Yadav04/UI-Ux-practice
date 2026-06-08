"use client"
import Image from 'next/image'
import { useScroll, useTransform } from 'motion/react'
import React from 'react'
const imgs: string[] = [
    "https://examples.motion.dev/photos/amsterdam-cyclists/1.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/2.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/3.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/4.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/5.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/6.jpg"
]
function Page() {
    const {scrollYProgress} = useScroll()
    const opacity = useTransform(scrollYProgress,[0,0.5,1],[1,0.5,0])
  return (
    <div className='bg-[#F8F9FB] w-full h-full flex flex-col justify-between '>
        <h1 className="text-5xl text-black font-mono font-black tracking-tighter w-full text-center ">AMSTERDAM CYCLISTS</h1>
<div className="w-full h-full flex flex-col justify-center items-center gap-10 ">
    {
        imgs.map((img,index)=>
        <Image key={index} src={img} alt="" width={200} height={300} className='object-cover rounded-lg'/>
        )
    }
</div>
    </div>
  )
}

export default Page