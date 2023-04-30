import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BookViewHeader } from '../components/BookView/BookViewHeader';
import { BookViewContent } from './../components/BookView/BookViewContent';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDetailsNav, GetBook } from '../Redux/actions/AllActions';
import { VIEW_BOOK } from '../Redux/Types';
export const BookView = () => {
  const {id} = useParams()  
  const [book,setBook] = useState({})
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(GetBook(id))
  },[])
  const bookData = useSelector((state)=>state.booksData.CurrentBook)
  useEffect(()=>{
    setBook(bookData)
  },[bookData])
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
