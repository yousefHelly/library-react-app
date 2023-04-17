import React, { useEffect, useRef } from 'react'
import {motion} from 'framer-motion'
import { BookViewHeaderImgTextVariants, BookViewHeaderVariants } from './../../animations/viewBook';
export const BookViewHeader = ({book}) => {
  return (
    <motion.div style={{backgroundImage:`url(${book.image_url})`,backgroundPosition:'50%'}} className='flex mb-20 min-h-[350px] bg-cover'>
    <div className='w-full grid grid-cols-12 px-8 backdrop-blur-md relative'>
      <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show'  className='col-span-4 absolute -bottom-10 left-10'>
      <motion.img variants={BookViewHeaderImgTextVariants} className='w-52' src={book.image_url} alt="book img" />
    </motion.div>
    <motion.div  variants={BookViewHeaderVariants} initial='init' animate='show' className='ml-60 col-span-8 flex justify-end pb-12 gap-2 flex-col text-slate-50'>
      <motion.h3 variants={BookViewHeaderImgTextVariants} className='text-5xl'>{book.bookName}</motion.h3>
      <motion.span variants={BookViewHeaderImgTextVariants} className='sec text-3xl'>{book.field}</motion.span>
      <motion.p variants={BookViewHeaderImgTextVariants} className='text-3xl'>{book.author}</motion.p>
    </motion.div>
    </div>
  </motion.div>
  )
}
