import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants, cardChildVariants } from './../../animations/home';
import { useParams } from 'react-router-dom';
import { BookGridView } from './../../components/home/BookGridView';
import { Books } from './../../Data';
import { useDispatch } from 'react-redux';
import { HOME } from '../../Redux/Types';
import { ChangeDetailsNav } from '../../Redux/actions/AllActions';

export const CategoryAllBooks = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    useEffect(
      ()=>{
        document.title = 'Library | Home'
        dispatch(ChangeDetailsNav(HOME))
      }  
    ,)
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
      <motion.h4 variants={childVariants} className='text-xl font-bold'>All {category} books</motion.h4>
      <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {
        Books.map((book,i)=>{
          return(
            book.BookCategory===category&&<motion.span key={i} variants={cardChildVariants}><BookGridView book={book} index={book.BookId}/></motion.span>
          )
        })
      }
    </motion.div>
    </motion.div>
  )
}
