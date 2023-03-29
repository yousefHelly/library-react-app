import React,{useEffect} from 'react'
import { SearchInput } from '../components/Search/SearchInput'
import { motion } from 'framer-motion';
import { BookGridViewSearch } from './../components/Search/BookGridViewSearch';
import { Books } from './../Data';
import { cardChildVariants, ContainerVariants } from './../animations/home';
import { ChangeDetailsNav } from '../Redux/actions/AllActions';
import { useDispatch } from 'react-redux';
import { SEARCH } from './../Redux/Types';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
  const dispatch = useDispatch()
  const [searchParams,setSearchParams] = useSearchParams()
  useEffect(()=>{
    document.title = `Library | search`
    dispatch(ChangeDetailsNav(SEARCH))
  },[])
  return (
    <div className='h-screen'>
      <SearchInput/>
      <div className='pt-10'>
      <div className='flex justify-between'>
      <p className='sec text-lg px-4'>{searchParams.get('category')} books by {searchParams.get('author')} in {searchParams.get('publication date')}</p>
      <p className='sec text-lg px-4'>total books : 4</p>
      </div>
      <div className='w-full h-[2px] bg-slate-300'></div>
      <motion.div variants={ContainerVariants} initial='init' whileInView='show' exit='leave' className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8'>
      {
        Books.map((book,i)=>{
          return(
            <motion.span key={i} variants={cardChildVariants}><BookGridViewSearch book={book} index={book.BookId}/></motion.span>
          )
        })
      }
      </motion.div>
      </div>
    </div>
  )
}
