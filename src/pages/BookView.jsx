import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BookViewHeader } from '../components/BookView/BookViewHeader';
import { BookViewContent } from './../components/BookView/BookViewContent';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDetailsNav } from '../Redux/actions/AllActions';
import { AVAILABLE, VIEW_BOOK } from '../Redux/Types';
import { Books } from './../Data';
import axios from 'axios';
export const BookView = () => {
  const {id} = useParams()  
  const [book,setBook] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  useEffect(()=>{
    const bookData = axios.get(`http://localhost:4000/books/${id}`)
    bookData.then((res)=>setBook(res.data))
  },[])
  const dispatch = useDispatch()
  useEffect(
    ()=>{
      document.title = `Library | ${book.bookName}`
      dispatch(ChangeDetailsNav(VIEW_BOOK))
      window.scrollTo({
        left:0,
        top:0,
        behavior:'smooth'
      })
    }  
  ,)
  return (
    <div className='h-screen mt-2'>
      <BookViewHeader book={book}/>
      <div className='grid grid-cols-4'>
      <BookViewContent book={book} id={id}/>
      </div>
    </div>
  )
}
