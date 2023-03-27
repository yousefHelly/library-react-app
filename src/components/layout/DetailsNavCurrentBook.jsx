import {motion ,AnimatePresence } from 'framer-motion';
import React from 'react'
import { Books } from './../../Data';
import { DetailsNavVariantsContainer, imgVariants, bookInfoVariants, bookInfoTextVariants, plotVariants, plotTextVariants, bookViewBtn, DetailsNavVariants } from './../../animations/detailsNav';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const DetailsNavCurrentBook = () => {
    const currentBook = useSelector((state)=>state.current.currentBook)
  return (
    <motion.div key='CurrentBook' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave' className='text-slate-50 w-full h-full flex px-10 flex-col justify-center items-center'>
    <AnimatePresence mode='wait'>
       {
        Books.map((book,i)=>{return(
            book === Books[currentBook]&&
            <motion.div variants={DetailsNavVariants} initial='init' animate='show' exit='leave' key={i} className='flex gap-4 flex-col items-center'>
                <h3 className='text-2xl mt-5'>About the book</h3>
                <motion.img variants={imgVariants} className='rounded-2xl w-32 border' src={book.BookImg} alt="img" />
                <motion.h3 variants={imgVariants} className='text-2xl'>{book.BookName}</motion.h3>
                <motion.p variants={imgVariants} className='sec -mt-5 text-lg'>{book.BookAuthor}</motion.p>
                    <motion.div variants={bookInfoVariants} className='flex w-full gap-5 justify-center items-center bg-base-100/5 backdrop-blur-sm py-5 px-2 rounded-3xl'>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.BookCategory}</span>
                            <span className='sec'>Category</span>
                        </motion.div>
                    <span className='h-7 w-[1px] bg-slate-400'></span>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.BookPublicationDate}</span>
                            <span className='sec'>Date</span>
                        </motion.div>
                    <span className='h-7 w-[1px] bg-slate-400'></span>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.BookChapters}</span>
                            <span className='sec'>Chapters</span>
                        </motion.div>
                    </motion.div>
                    <div className='flex flex-col items-start w-full overflow-y-auto max-h-20'>
                        <motion.h4 variants={plotVariants} className='text-xl'>Plot</motion.h4>
                        <motion.p variants={plotTextVariants} className='sec'>{book.BookPlot}</motion.p>
                    </div>
               <Link className='w-full' to={`/${book.BookId}`}><motion.button variants={bookViewBtn} className='w-full btn btn-primary rounded-3xl'> View</motion.button></Link>
            </motion.div>
        )})
       }
       </AnimatePresence>
    </motion.div>
  )
}
