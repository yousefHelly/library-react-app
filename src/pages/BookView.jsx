import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BookViewHeader } from '../components/BookView/BookViewHeader';
import { BookViewContent } from './../components/BookView/BookViewContent';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDetailsNav } from '../Redux/actions/AllActions';
import { VIEW_BOOK } from '../Redux/Types';
import { Books } from './../Data';
export const BookView = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(
    ()=>{
      document.title = `Library | ${Books[id].BookName}`
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
      <BookViewHeader id={id}/>
      <div className='grid grid-cols-4'>
      <BookViewContent id={id}/>
      </div>
    </div>
  )
}
