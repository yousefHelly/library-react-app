import React,{useState, useRef} from 'react'
import { FaSearch } from 'react-icons/fa';
import {MdOutlineYoutubeSearchedFor} from 'react-icons/md'
import {AnimatePresence, motion} from 'framer-motion'
import { searchInputVariants } from '../../animations/search';
import { searchHistoryVariants } from './../../animations/search';
export const SearchInput = () => {
    const [searchHistory,setSearchHistory] = useState(false)
    const searchInput = useRef(0)
    const PreviousSearch = (e)=>{
      const string = e.target.childNodes[0].textContent
      searchInput.current.value = string
    }
    const searchInputHandler = ()=>{
      searchInput.current.value!=''?setSearchHistory(true):setSearchHistory(false)
    }
  return (
    <motion.div  className='searchContainer w-ful z-10 h-40 relative'>
    <motion.div variants={searchInputVariants} initial='init' animate='show' className='absolute shadow-xl items-center left-1/2 -bottom-5 -translate-x-1/2 flex'>
      <FaSearch className='text-2xl absolute z-10 translate-x-4 text-zinc-400'/>
      <input ref={searchInput} onChange={searchInputHandler} type="search" className='h-12 pl-14 pr-4 py-3 w-[375px] rounded rounded-r-none focus-within:outline-none' placeholder='Search...' />
      <button className='btn btn-secondary px-6 rounded-l-none'> Search</button>
      <AnimatePresence>
      {
        searchHistory&&            
        <motion.div key='searchHistory' variants={searchHistoryVariants} initial='init' animate='show' exit='leave' className='absolute top-full shadow-none rounded-t-none min-h-[175px] dropdown-content menu bg-white rounded-box w-[375px]'>
        <div className='flex sec flex-col'>
        <p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>Oliver Twist<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
        <p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>The Great gatsby<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
        <p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>Great Expectations<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
        <a className='sec text-center cursor-pointer py-1'>view all history</a>
      </div>
    </motion.div>
      }
      </AnimatePresence>
    </motion.div>
  </motion.div>
  )
}
