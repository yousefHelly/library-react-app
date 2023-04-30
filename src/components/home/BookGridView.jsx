import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeCurrent } from '../../Redux/actions/AllActions';
import { cardChildVariants } from '../../animations/home';
import { motion } from 'framer-motion';
export const BookGridView = ({book,index}) => {
  const dispatch = useDispatch()
  const isSelected = useSelector((state)=>state.current.currentBook)
  return (
    <div onClick={()=>dispatch(ChangeCurrent(index))} className={`bookHolder relative flex p-3 rounded-xl before:rounded-xl overflow-hidden flex-col gap-3 cursor-pointer ${isSelected===index?'bg-primary text-slate-50 active':''}`}>
        <img className='h-72 object-cover' src={book.image_url} alt="book img" />
        <h3 className='text-xl font-bold capitalize'>{book.bookName}</h3>
        <p className='sec -mt-3 capitalize'>{book.author}</p>
    </div>
  )
}
