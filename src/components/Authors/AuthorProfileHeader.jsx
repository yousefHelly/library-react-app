import React, { useEffect, useRef } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { BookViewHeaderImgTextVariants, BookViewHeaderVariants } from './../../animations/viewBook';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';
export const AuthorProfileHeader = ({auth}) => {
    const fac = new FastAverageColor();
    const imgBg = useRef(0)
    const authorImg = useRef()
    useEffect(
      ()=>{
          fac.getColorAsync(authorImg.current.src)
          .then(color => {
            imgBg.current.style.backgroundColor = `${color.rgba}`;
          })
          .catch(e => {
              console.log(e);
          })
      })
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
        <motion.h4 variants={childVariants} className='text-xl font-bold'>{auth.name} profile</motion.h4>
        <motion.div className='flex mb-20 bg-cover'>
            <div ref={imgBg} className='w-full grid grid-cols-12 px-8 backdrop-blur-md'>
                <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='col-span-4 translate-y-10'>
                    <motion.img ref={authorImg} variants={BookViewHeaderImgTextVariants} className='w-52' src={auth.img} alt="book img" />
                </motion.div>
                <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='col-span-8 flex justify-end pb-12 gap-2 flex-col text-slate-50'>
                    <motion.h3 variants={BookViewHeaderImgTextVariants} className='text-5xl'>{auth.name}</motion.h3>
                </motion.div>
            </div>
        </motion.div>
    </motion.div>
  )
}
