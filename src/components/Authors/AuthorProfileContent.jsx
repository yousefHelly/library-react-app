import React from 'react'
import { BookViewContentContainerVariants, BookViewContentTextVariants } from './../../animations/viewBook';
import { motion } from 'framer-motion';
import { ContainerVariants, cardChildVariants } from './../../animations/home';
import { Books } from './../../Data';
import { BookGridView } from './../home/BookGridView';

export const AuthorProfileContent = ({auth}) => {
  return (
    <React.Fragment>
    <div className='grid mb-8 grid-cols-4'>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-3'>
            <motion.h3 variants={BookViewContentTextVariants} className='text-xl font-bold'>About {auth.name}</motion.h3>
            <motion.p variants={BookViewContentTextVariants} className='p-4 sec text-lg'>{auth.desc}</motion.p>
        </motion.div>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-1 flex flex-col gap-3'>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Available Books: <span className='font-normal sec'>{auth.booksNum}</span></motion.div>
        </motion.div>
    </div>
    <motion.div initial={{opacity:0, x:-25}} animate={{opacity:1,x:0,transition:{duration:0.3,delay:1.2,staggerChildren:0.3,when:'beforeChildren'}}}>
            <motion.h3 variants={BookViewContentTextVariants} initial='init' animate='show' className='text-xl my-5 font-bold'>{auth.name} All Books</motion.h3>
            <motion.div variants={ContainerVariants} initial='init' whileInView='show' className='suggested books p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                Books.map((book,i)=>{
                    return(
                    book.BookAuthor===auth.name&&<motion.span key={i} variants={cardChildVariants}><BookGridView book={book} index={book.BookId}/></motion.span>

                    )
                })
                }
            </motion.div>
    </motion.div>
    </React.Fragment>
  )
}