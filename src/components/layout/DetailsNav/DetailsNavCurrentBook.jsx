import {motion ,AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { DetailsNavVariantsContainer, imgVariants, bookInfoVariants, bookInfoTextVariants, plotVariants, plotTextVariants, bookViewBtn, DetailsNavVariants } from '../../../animations/detailsNav';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetAllBooks } from '../../../Redux/actions/AllActions';

export const DetailsNavCurrentBook = () => {
    const currentBook = useSelector((state)=>state.current.currentBook)
    const [Books,setBooks] = useState([])
    const currentPage = useSelector((state)=>state.booksData.currentPage)
    const dispatch =  useDispatch()
    useEffect(()=>{
        dispatch(GetAllBooks(currentPage))
    },[])
    const booksData = useSelector((state)=>state.booksData.Books)
    useEffect(()=>{
      setBooks(booksData.books)
    },[booksData])
  return (
    <motion.div key='CurrentBook' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave' className='text-slate-50 w-full h-full flex px-10 flex-col justify-center items-center'>
    <AnimatePresence mode='wait'>
       {
        Books&&
        Books.map((book,i)=>{return(
            book.book_id === currentBook&&
            <motion.div variants={DetailsNavVariants} initial='init' animate='show' exit='leave' key={i} className='flex gap-4 flex-col items-center'>
                <h3 className='text-2xl mt-5'>About the book</h3>
                <motion.img variants={imgVariants} className='rounded-2xl w-32 min-h-[13rem] object-cover border' src={book.image_url} alt="img" />
                <motion.h3 variants={imgVariants} className='text-2xl'>{book.bookName}</motion.h3>
                <motion.p variants={imgVariants} className='sec -mt-5 text-lg'>{book.author}</motion.p>
                    <motion.div variants={bookInfoVariants} className='flex w-full gap-5 justify-center items-center bg-base-100/5 backdrop-blur-sm py-5 px-2 rounded-3xl'>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.field}</span>
                            <span className='sec'>Category</span>
                        </motion.div>
                    <span className='h-7 w-[1px] bg-slate-400'></span>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.publicationDate}</span>
                            <span className='sec'>Date</span>
                        </motion.div>
                    <span className='h-7 w-[1px] bg-slate-400'></span>
                        <motion.div variants={bookInfoTextVariants} className='flex items-center flex-col gap-1 text-xs'>
                            <span className='font-bold text-sm'>{book.CountChapters}</span>
                            <span className='sec'>Chapters</span>
                        </motion.div>
                    </motion.div>
                    <div className='flex flex-col items-start w-full overflow-y-auto max-h-20'>
                        <motion.h4 variants={plotVariants} className='text-xl'>Plot</motion.h4>
                        <motion.bdi variants={plotTextVariants} className='sec w-60'>{book.bookDescription}</motion.bdi>
                    </div>
               <Link className='w-full' to={`/${book.book_id}`}><motion.button variants={bookViewBtn} className='w-full btn btn-primary rounded-3xl'> View</motion.button></Link>
            </motion.div>
        )})
       }
       </AnimatePresence>
    </motion.div>
  )
}
