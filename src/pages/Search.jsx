import React,{useEffect, useState} from 'react'
import { SearchInput } from '../components/Search/SearchInput'
import { motion } from 'framer-motion';
import { BookGridViewSearch } from './../components/Search/BookGridViewSearch';
import { cardChildVariants, childVariants, ContainerVariants } from './../animations/home';
import { ChangeDetailsNav, GetAllBooks, GetSearchedBooks } from '../Redux/actions/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH } from './../Redux/Types';
import { useSearchParams } from 'react-router-dom';
import { BiMessageAltError } from 'react-icons/bi';

export const Search = () => {
  const dispatch = useDispatch()
  const [searchParams,setSearchParams] = useSearchParams()
  const [Books,setBooks] = useState([])
  const [BooksCount,setBooksCount] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  useEffect(
    ()=>{
      searchParams.get('value')?dispatch(GetSearchedBooks(User.user_id,searchParams.get('value'))):dispatch(GetAllBooks())
      document.title = `Library | search`
      dispatch(ChangeDetailsNav(SEARCH))
    }
    ,[]
  )
  const BooksData = useSelector((state)=>state.booksData.Books)
  useEffect(
    ()=>{
      setBooks( BooksData.books)
      setBooksCount(BooksData.numberOfBooks[0])
    },
    [BooksData]
  )
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' exit='leave' className='h-screen'>
      <SearchInput/>
      <div className='pt-10'>
      <div className='flex flex-col gap-3 justify-center md:flex-row md:gap-0 md:justify-between'>
      <p className='sec md:text-lg px-4'>{searchParams.get('category')} books by {searchParams.get('author')} in {searchParams.get('publication date')}</p>
      <p className='sec md:text-lg px-4'>total books : {BooksCount.CountBooks}</p>
      </div>
      <div className='w-full my-4 md:my-0 h-[2px] bg-slate-300'></div>
      <motion.div variants={childVariants} className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8'>
      {
        Books && searchParams.get('category')&&
        Books.map((book,i)=>{
          const [startDate,endDate] = searchParams.get('publication date').split(',')
          const reqDate  = book.publicationDate
          return(
            (
              //filter categories
              (searchParams.get('category').split("&").includes(book.field) || searchParams.get('category').split("&").includes('All')) 
              && 
              //filter authors
              (searchParams.get('author').split("&").includes(book.author) || searchParams.get('author').split("&").includes('All'))
              &&
              //filter date
              (+reqDate>=+startDate && +reqDate<=+endDate)
              
            )&&
            <BookGridViewSearch key={book.book_id} book={book} index={book.book_id}/>
          )
        })
      }
      </motion.div>
      {BooksCount.CountBooks===0
        &&
        <div className='flex flex-col items-center h-80 justify-center p-8'>
        <BiMessageAltError className='text-5xl text-primary'/>
        <h3 className='text-xl'>No Books Available</h3>
        </div>
      }
      </div>
    </motion.div>
  )
}
