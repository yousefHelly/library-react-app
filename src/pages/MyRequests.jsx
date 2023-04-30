import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent, ChangeDetailsNav, GetAllBooks, GetUserRequests } from '../Redux/actions/AllActions';
import { HOME } from '../Redux/Types';
import { motion } from 'framer-motion';
import { childVariants } from '../animations/home';
import { ContainerVariants } from './../animations/home';
import { RequestedBook } from '../components/myRequests/RequestedBook';
import { BiMessageAltError } from 'react-icons/bi';
export const MyRequests = () => {
  const dispatch = useDispatch()
  const [Books,setBooks] = useState([])
  const [requested,setRequested] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  const userIdRef = useRef(null)
  userIdRef.current = User.user_id? User.user_id:userIdRef.current
  let count = 0
  useEffect(()=>{
    dispatch(GetAllBooks(0))
    userIdRef.current&&dispatch(GetUserRequests(userIdRef.current))
},[userIdRef.current])
  const BooksData = useSelector((state)=>state.booksData.Books)
  const requestsData = useSelector((state)=>state.requestsData.Requests)
  useEffect(()=>{
  setBooks(BooksData.books)
  },[BooksData])
  useEffect(()=>{
    setRequested(requestsData)
    },[requestsData])
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
        <React.Fragment>
        {
        Books.map((book)=>{
          return(
                requested.map((request)=>{
                return(
                  book.bookName===request.bookName&&<RequestedBook key={count++} book={book} index={book.book_id} date={request.requestDate} status={request.status}/>
                )
              })
          )
          }
        )
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
    </motion.div>
  )
}
