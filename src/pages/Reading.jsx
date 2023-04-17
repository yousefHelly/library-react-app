import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks } from '../Redux/actions/AllActions';
import { HOME, APPROVED } from './../Redux/Types';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../animations/home';
import { BookGridView } from './../components/home/BookGridView';
import axios from 'axios';
import { BiMessageAltError } from 'react-icons/bi';

export const Reading = () => {
  const dispatch = useDispatch()
  const [Books,setBooks] = useState([])
  const [requested,setRequested] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  useEffect(()=>{
    dispatch(GetAllBooks())
    axios.get(`http://localhost:4000/request/${User.user_id}`).then((res)=>setRequested(res.data))
  },[])
  const BooksData = useSelector((state)=>state.booksData.Books)
  useEffect(()=>{
  setBooks(BooksData.books)
  },[BooksData])
  useEffect(
    ()=>{
      document.title = 'Library | Reading'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  if(Books&&Books.length>0){
    dispatch(ChangeCurrent(Books[0].book_id)) 
  }
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
        <motion.h4  variants={childVariants} className='text-xl mt-5 font-bold'>My Books</motion.h4>
        <motion.div variants={childVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          Books && Books.length>0?
          Books.map((book)=>{
            return(
                  requested.map((request)=>{
                  return(
                    (book.bookName=== request.bookName && request.status===APPROVED)&&<BookGridView key={book.book_id} book={book} index={book.book_id}/>
                  )
                })
            )
            }
          ):
          <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
            <BiMessageAltError className='text-5xl text-primary'/>
            <h3 className='text-xl'>No Books Available</h3>
          </div>
        }
        </motion.div>
    </motion.div>
  )
}
