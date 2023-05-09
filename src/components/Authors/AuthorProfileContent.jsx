import React from 'react'
import { BookViewContentContainerVariants, BookViewContentTextVariants } from './../../animations/viewBook';
import { motion } from 'framer-motion';
import { ContainerVariants, cardChildVariants } from './../../animations/home';
import { BookGridView } from './../home/BookGridView';
import { BiMessageAltError } from 'react-icons/bi';
export const AuthorProfileContent = ({authorData,booksCount,authorName}) => {
  return (
    <React.Fragment>
    <div className='grid mb-8 grid-cols-4'>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-full mb-8 md:mb-0 md:col-span-3'>
            <motion.h3 variants={BookViewContentTextVariants} className='text-xl font-bold'>About {authorName}</motion.h3>
            <motion.p variants={BookViewContentTextVariants} className='p-4 sec text-lg'>{authorName.desc?authorName.desc:'Not Found'}</motion.p>
        </motion.div>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-full mb-8 md:mb-0 md:col-span-1 flex flex-col gap-3'>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Available Books: <span className='font-normal sec'>{booksCount}</span></motion.div>
        </motion.div>
    </div>
    <motion.div initial={{opacity:0, x:-25}} animate={{opacity:1,x:0,transition:{duration:0.3,delay:1.2,staggerChildren:0.3,when:'beforeChildren'}}}>
            <motion.h3 variants={BookViewContentTextVariants} initial='init' animate='show' className='text-xl my-5 font-bold'>{authorName} All Books</motion.h3>
            <motion.div variants={ContainerVariants} initial='init' animate='show' className='suggested books p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>          
                {
                    authorData.length > 0 ? 
                    authorData.map((auth, i)=>{
                        return(
                            <motion.span key={i} variants={cardChildVariants}><BookGridView book={auth} index={auth.book_id}/></motion.span>
                        )
                    }):
                    <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
                    <BiMessageAltError className='text-5xl text-primary'/>
                    <h3 className='text-xl'>No Books Available</h3>
                    </div>
                }
            </motion.div>
    </motion.div>
    </React.Fragment>
  )
}
