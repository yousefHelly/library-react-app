import React,{useEffect} from 'react'
import {motion} from 'framer-motion'
import { DetailedBook } from './../components/home/DetailedBook';
import img1 from '../assets/imgs/book-1.jpg'
import img2 from '../assets/imgs/book-2.jpg'
import { BookGridView } from '../components/home/BookGridView';
import { childVariants, ContainerVariants, cardChildVariants } from './../animations/home';
import { Books } from './../Data';

export const Home = () => {
  useEffect(()=>{document.title = 'Library | Home'},[])
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
        <motion.h4 variants={childVariants} className='text-xl font-bold'>For you</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:mx-20 md:mx-0 lg:grid-cols-2 gap-5'>

          {
            Books.map((book,i)=>{
                while(i<2){
                  return(
                    <motion.span key={i} variants={childVariants}><DetailedBook book={book} index={book.BookId}/></motion.span>
                  )
                }

            })
          }
        </motion.div>
        <motion.h4  variants={childVariants} className='text-xl mt-5 font-bold'>All Books</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            Books.map((book,i)=>{
              return(
                <motion.span key={i} variants={cardChildVariants}><BookGridView book={book} index={book.BookId}/></motion.span>
              )
            })
          }
        </motion.div>
    </motion.div>
  )
}
