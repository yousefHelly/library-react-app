import React from 'react'
import { Link } from 'react-router-dom';

export const BookGridViewSearch = ({book,children}) => {
  return (
    <Link className='' to={`/${book.book_id}`}><div className={`bookHolder overflow-hidden relative flex p-3 rounded-xl transition duration-300 flex-col gap-3 cursor-pointer hover:bg-primary hover:text-slate-50`}>
    <img className='h-72 object-cover' src={book.image_url} alt="book img" />
    <h3 className='text-xl font-bold'>{book.bookName}</h3>
    <p className='sec -mt-3'>{book.author}</p>
    {children}
    </div>
    </Link>
  )
}
