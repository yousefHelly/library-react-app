import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ChangeDetailsNav } from '../Redux/actions/AllActions';
import { HOME, APPROVED } from './../Redux/Types';
import { motion } from 'framer-motion';
import { cardChildVariants, childVariants, ContainerVariants } from './../animations/home';
import { Books } from './../Data';
import { BookGridView } from './../components/home/BookGridView';

export const Reading = () => {
  const dispatch = useDispatch()
  useEffect(
    ()=>{
      document.title = 'Library | Reading'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
        <motion.h4  variants={childVariants} className='text-xl mt-5 font-bold'>My Books</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            Books.map((book,i)=>{
              return(
                book.status===APPROVED&&<motion.span key={i} variants={cardChildVariants}><BookGridView book={book} index={book.BookId}/></motion.span>

              )
            })
          }
        </motion.div>
    </motion.div>
  )
}
