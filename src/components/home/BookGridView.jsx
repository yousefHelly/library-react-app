import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent } from '../../Redux/actions/AllActions';
export const BookGridView = ({book,index}) => {
  const dispatch = useDispatch()
  const isSelected = useSelector((state)=>state.current.currentBook)
  return (
    <div onClick={()=>dispatch(ChangeCurrent(index))} className={`relative flex p-3 rounded-xl transition duration-300 flex-col gap-3 cursor-pointer ${isSelected===index?'bg-primary text-slate-50':'hover:bg-primary hover:text-slate-50'}`}>
        <img className='h-72 object-cover' src={book.BookImg} alt="book img" />
        <h3 className='text-xl font-bold'>{book.BookName}</h3>
        <p className='sec -mt-3'>{book.BookAuthor}</p>
    </div>
  )
}
