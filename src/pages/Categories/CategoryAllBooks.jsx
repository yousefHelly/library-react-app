import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants, cardChildVariants } from './../../animations/home';
import { useParams } from 'react-router-dom';
import { BookGridView } from './../../components/home/BookGridView';
import { useDispatch, useSelector } from 'react-redux';
import { HOME } from '../../Redux/Types';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks } from '../../Redux/actions/AllActions';

export const CategoryAllBooks = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const [Books,setBooks] = useState([])
    useEffect(()=>{
      dispatch(GetAllBooks())
    },[])
    const BooksData = useSelector((state)=>state.booksData.Books)
    useEffect(()=>{
    setBooks(BooksData.books)
    },[BooksData])
    useEffect(
      ()=>{
        document.title = 'Library | Home'
        dispatch(ChangeDetailsNav(HOME))
      }  
    ,)
    if(Books.length>0){
      dispatch(ChangeCurrent(Books[0].book_id)) 
    }
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
      <motion.h4 variants={childVariants} className='text-xl font-bold'>All {category} books</motion.h4>
      <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {
        Books.map((book,i)=>{
          return(
            book.field===category&&<BookGridView book={book} index={book.book_id}/>
          )
        })
      }
    </motion.div>
    </motion.div>
  )
}
