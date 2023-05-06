import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks, GetAllMyBooks, GetUserRequests } from '../Redux/actions/AllActions';
import { HOME, APPROVED } from './../Redux/Types';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../animations/home';
import { BookGridView } from './../components/home/BookGridView';
import { BiMessageAltError } from 'react-icons/bi';
import { Pagination } from '../components/layout/Pagination';

export const Reading = () => {
  const dispatch = useDispatch()
  const [Books,setBooks] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  const userIdRef = useRef(null)
  userIdRef.current = User.user_id? User.user_id:userIdRef.current
  let count = 0;
  const currentPage = useSelector((state)=>state.booksData.currentPage) || 0
  useEffect(()=>{
    userIdRef.current&&dispatch(GetAllMyBooks(userIdRef.current,currentPage))
  },[userIdRef.current])
  const booksData = useSelector((state)=>state.booksData.Books)
  useEffect(()=>{
    setBooks(booksData.books)
  },[booksData])
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
              <BookGridView key={count++} book={book} index={book.book_id}/>
            )            
            }
          ):
          <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
          <BiMessageAltError className='text-5xl text-primary'/>
          <h3 className='text-xl'>No Books Available</h3>
          </div>
        }
        </motion.div>
        {
          Books&&
          Books.length>0&&
          <Pagination id={userIdRef.current}/>
        }
    </motion.div>
  )
}
