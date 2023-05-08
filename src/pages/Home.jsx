import React,{useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import { DetailedBook } from './../components/home/DetailedBook';
import { BookGridView } from '../components/home/BookGridView';
import { childVariants, ContainerVariants } from './../animations/home';
import { useDispatch, useSelector } from 'react-redux';
import { HOME } from './../Redux/Types';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks } from '../Redux/actions/AllActions';
import { Pagination } from '../components/layout/Pagination';
import { BiMessageAltError } from 'react-icons/bi';

export const Home = () => {
  const dispatch = useDispatch()
  const [Books,setBooks] = useState([])
    useEffect(()=>{
      document.title = 'Library | Home'
      dispatch(GetAllBooks(0))
    },[])
    useEffect(()=>{
      dispatch(ChangeDetailsNav(HOME))
    },[])
    const booksData = useSelector((state)=>state.booksData.Books)
    useEffect(()=>{
      setBooks(booksData.books)
    },[booksData])
    if(Books&&Books.length>0){
      dispatch(ChangeCurrent(Books[0].book_id)) 
    }
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
        <motion.h4 variants={childVariants} className='text-xl font-bold'>For you</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:mx-20 md:mx-0 lg:grid-cols-2 gap-5'>
          {
            Books&&
            Books.length>0?
            Books.map((book,i)=>{
                while(i<2){
                  return(
                    <DetailedBook key={book.book_id} id={book.book_id} book={book} index={book.book_id}/>
                  )
                }

            }):
            <div className='col-span-full flex flex-col items-center h-80 justify-center p-8'>
              <BiMessageAltError className='text-5xl text-primary'/>
              <h3 className='text-xl'>No Books Available</h3>
          </div>
          }
        </motion.div>
        <motion.h4  variants={childVariants} className='text-xl mt-5 font-bold'>All Books</motion.h4>
        <motion.div variants={childVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {
            Books&&
            Books.length>0?
            Books.map((book,i)=>{
              return(
              <BookGridView key={book.book_id} book={book} index={book.book_id}/>
              )
            }):
            <div className='col-span-full flex flex-col items-center h-80 justify-center p-8'>
              <BiMessageAltError className='text-5xl text-primary'/>
              <h3 className='text-xl'>No Books Available</h3>
            </div>
          }
        </motion.div>
        {
          Books&&
          Books.length>0&&
          <Pagination/>
        }
    </motion.div>
  )
}
