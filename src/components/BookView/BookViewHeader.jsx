import React, { useEffect, useRef } from 'react'
import { FastAverageColor } from 'fast-average-color';
import { Books } from './../../Data';
import {motion} from 'framer-motion'
import { BookViewHeaderImgTextVariants, BookViewHeaderVariants } from './../../animations/viewBook';
export const BookViewHeader = ({id}) => {
    const fac = new FastAverageColor();
    const testBook = Books[id]
    const imgBg = useRef(0)
    useEffect(
      ()=>{
          fac.getColorAsync(testBook.BookImg)
          .then(color => {
            imgBg.current.style.backgroundColor = `${color.rgba.slice(0,-2)}0.5)`;
          })
          .catch(e => {
              console.log(e);
          })
      })
  return (
    <motion.div style={{backgroundImage:`url(${testBook.BookImg})`,backgroundPosition:'50%'}} className='flex mb-20 bg-cover'>
    <div ref={imgBg} className='w-full grid grid-cols-12 px-8 backdrop-blur-md'>
      <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show'  className='col-span-4 translate-y-10'>
      <motion.img variants={BookViewHeaderImgTextVariants} className='w-52' src={testBook.BookImg} alt="book img" />
    </motion.div>
    <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='col-span-8 flex justify-end pb-12 gap-2 flex-col text-slate-50'>
      <motion.h3 variants={BookViewHeaderImgTextVariants} className='text-5xl'>{testBook.BookName}</motion.h3>
      <motion.span variants={BookViewHeaderImgTextVariants} className='sec text-3xl'>{testBook.BookCategory}</motion.span>
      <motion.p variants={BookViewHeaderImgTextVariants} className='text-3xl'>{testBook.BookAuthor}</motion.p>
    </motion.div>
    </div>
  </motion.div>
  )
}
