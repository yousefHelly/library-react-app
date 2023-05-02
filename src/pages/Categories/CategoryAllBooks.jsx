import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants, cardChildVariants } from './../../animations/home';
import { useParams } from 'react-router-dom';
import { BookGridView } from './../../components/home/BookGridView';
import { useDispatch, useSelector } from 'react-redux';
import { HOME } from '../../Redux/Types';
import { ChangeCurrent, ChangeDetailsNav, GetCategoryBooks } from '../../Redux/actions/AllActions';
import { BiMessageAltError } from 'react-icons/bi';
import { Pagination } from './../../components/layout/Pagination';

export const CategoryAllBooks = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const [Books,setBooks] = useState([])
    let count = 0;
    const BooksData = useSelector((state)=>state.booksData.Books)
    const currentPage = useSelector((state)=>state.booksData.currentPage) || 0
    useEffect(()=>{
      dispatch(GetCategoryBooks(category,currentPage))
    },[])
    useEffect(()=>{
    setBooks(BooksData.books)
    },[BooksData])
    useEffect(
      ()=>{
        document.title = `Library | ${category}` 
        dispatch(ChangeDetailsNav(HOME))
      }  
    ,[])
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
      <motion.h4 variants={childVariants} className='text-xl font-bold'>All {category} books</motion.h4>
      <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {
        Books?
          <React.Fragment>
          {
            Books.map((book,i)=>{
            return(
              book.field===category&&<BookGridView key={count++} book={book} index={book.book_id}/>
            )
            })
          }
          {
            count===0&&
            <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
              <BiMessageAltError className='text-5xl text-primary'/>
              <h3 className='text-xl'>No Books Available</h3>
            </div>
          }
          </React.Fragment>
        :
        <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
          <BiMessageAltError className='text-5xl text-primary'/>
          <h3 className='text-xl'>No Books Available</h3>
        </div>
      }
    </motion.div>
    {Books&&Books.length>0&&<Pagination page='category' category={category}/>}
    </motion.div>
  )
}
