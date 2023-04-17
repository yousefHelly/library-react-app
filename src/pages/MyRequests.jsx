import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks } from '../Redux/actions/AllActions';
import { HOME, REQUESTED } from '../Redux/Types';
import { motion } from 'framer-motion';
import { childVariants } from '../animations/home';
import { ContainerVariants } from './../animations/home';
import { RequestedBook } from '../components/myRequests/RequestedBook';
import { AVAILABLE } from './../Redux/Types';
import axios from 'axios';
import { BiMessageAltError } from 'react-icons/bi';
export const MyRequests = () => {
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
      document.title = 'Library | My requests'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  if(Books&&Books.length>0){
    dispatch(ChangeCurrent(Books[0].book_id)) 
  }
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
    <motion.h4 variants={childVariants} className='text-xl font-bold'>My requests</motion.h4>
    <motion.div variants={ContainerVariants} className='suggested books grid sm:mx-20 md:mx-0 gap-5'>
      {
        Books?
        Books.map((book)=>{
          return(
                requested.map((request)=>{
                return(
                  book.bookName===request.bookName&&<RequestedBook key={book.book_id} book={book} index={book.book_id} date={request.requestDate} status={request.status}/>
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
