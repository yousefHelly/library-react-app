import React from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, cardChildVariants, childVariants } from '../../animations/home';
import { plotTextVariants } from '../../animations/detailsNav';
import { Books } from '../../Data';
import { BookGridView } from '../../components/home/BookGridView';
import { BookGridViewSearch } from '../../components/Search/BookGridViewSearch';
import {BiBookAdd} from 'react-icons/bi'
import { Link } from 'react-router-dom';
export const AdminAllBooks = () => {
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>All Books</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <motion.span key={'addNew'} variants={cardChildVariants} className=' hover:bg-primary hover:text-slate-50 flex items-center justify-center transition duration-300 pb-4'>
                <Link to={`/admin/add-edit-book`}>
                    <div className={`relative flex p-3 rounded-xl transition duration-300 flex-col gap-3 h-72 items-center justify-center  cursor-pointer hover:bg-primary hover:text-slate-50`}>
                        <h3 className='text-xl font-bold'><BiBookAdd className='text-8xl text-secondary'/></h3>
                        <p className=''>New Book</p>
                    </div>
                </Link>
            </motion.span>
            {
                Books.map((book,i)=>{
                return(
                    <motion.span key={i} variants={cardChildVariants} className=' hover:bg-primary hover:text-slate-50 transition duration-300 pb-4'>
                    <BookGridViewSearch book={book} index={book.BookId}/>
                    <div className='w-full flex gap-4 items-center justify-center'>
                    <Link to={`/admin/add-edit-book/${book.BookId}`} className='btn btn-secondary'>edit</Link>
                    <button className='btn btn-error'>Delete</button>
                    </div>
                    </motion.span>
                )
                })
            }
        </motion.div>
    </motion.div>
  )
}
