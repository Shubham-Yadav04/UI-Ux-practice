"use client"
import Image from 'next/image'
import { useScroll, useTransform ,motion} from 'motion/react'
import React, { useRef } from 'react'
import { HmrTarget } from 'next/dist/build/swc'
const imgs: string[] = [
    "https://examples.motion.dev/photos/amsterdam-cyclists/1.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/2.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/3.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/4.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/5.jpg",
    "https://examples.motion.dev/photos/amsterdam-cyclists/6.jpg"
]
function Page() {
    
    
  return (
    <div className='bg-[#F8F9FB] w-full h-fit flex flex-col items-center '>
        <div className=" h-[50vh]  flex justify-center items-center">
        <h1 className="  text-black text-[clamp(36px,8vw,72px)]  uppercase font-black tracking-[-0.1em] w-fit  text-center"
        style={{
            fontFamily:"sans-serif",
            
        }}>Amsterdam Cyclists</h1>
        </div>
<div className='w-full h-fit flex flex-col gap-10 py-10'>
    {imgs.map((img,index)=>
<ImgScroll key={index} src={img} />
    )    
}
</div>
    </div>
  )
}

const ImgScroll=({src}:{src:string})=>{
    const ref=useRef(null);
    const {scrollYProgress}=useScroll({
    target:ref,
    offset:["start end","end center"]
    });
    const clip= useTransform(scrollYProgress,[0,0.6,1],["inset(0% 45% 0% 45%)","inset(0% 0% 0% 0%)","inset(0% 0% 0% 0%)"])

    return (
        <motion.div className="mx-auto flex flex-col justify-center items-center h-fit " ref={ref}   style={{clipPath:clip}}  >
        <Image src={src} alt="" width={700} height={500} className=' h-auto rounded-b-lg '
        />
    
    
</motion.div>
    )
}
export default Page