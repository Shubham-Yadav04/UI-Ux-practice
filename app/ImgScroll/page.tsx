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
    <div className='bg-[#F8F9FB] w-full h-fit flex flex-col  items-center gap-50 py-10'>
        <h1 className="text-5xl text-black font-mono font-black tracking-[-0.08em] w-full mt-10 text-center">AMSTERDAM CYCLISTS</h1>
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
    const scale= useTransform(scrollYProgress,[0,0.6,1],[20,600,600])

    return (
        <motion.div className="mx-auto flex flex-col justify-center items-center bg-blue-200   h-fit " ref={ref}   style={{width:scale}}  >
        <Image src={src} alt="" width={700} height={500} className=' object-center w-[70vw] h-auto rounded-b-lg '
        />
    
    
</motion.div>
    )
}
export default Page