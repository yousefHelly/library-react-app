import React, { useEffect, useRef } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { BookViewHeaderImgTextVariants, BookViewHeaderVariants } from './../../animations/viewBook';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';
import Placeholder from '../../assets/imgs/image-placeholder.jpg';
export const AuthorProfileHeader = ({authorName}) => {
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
        <motion.h4 variants={childVariants} className='text-xl font-bold'>{authorName} profile</motion.h4>
        <motion.div className='flex mb-20 bg-cover'>
            <div ref={imgBg} className='w-full grid grid-cols-12 px-8 backdrop-blur-md'>
                <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='col-span-full py-8 md:py-0 md:col-span-4 md:translate-y-10'>
                    {authorName.img?<motion.img ref={authorImg} variants={BookViewHeaderImgTextVariants} className='w-52 mx-auto' src={authorName.img} alt="book img" />:<motion.img ref={authorImg} variants={BookViewHeaderImgTextVariants} className='w-52 mx-auto' src={Placeholder} alt="book img" />}
                </motion.div>
                <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='col-span-full text-center md:text-start md:col-span-8 flex justify-end pb-12 gap-2 flex-col text-zinc-800'>
                    <motion.h3 variants={BookViewHeaderImgTextVariants} className='text-3xl md:text-5xl'>{authorName}</motion.h3>
                </motion.div>
            </div>
        </motion.div>
    </motion.div>
  )
}
