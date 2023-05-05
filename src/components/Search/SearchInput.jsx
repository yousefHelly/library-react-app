import React,{useState, useRef, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa';
import {MdOutlineYoutubeSearchedFor} from 'react-icons/md'
import {AnimatePresence, motion} from 'framer-motion'
import { searchInputVariants } from '../../animations/search';
import { searchHistoryVariants } from './../../animations/search';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBooks, GetSearchHistory, GetSearchedBooks } from '../../Redux/actions/AllActions';
export const SearchInput = () => {
    const [searchHistory,setSearchHistory] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams()
    const [history,setHistory] = useState([])
    const searchInput = useRef(0)
    const userIdRef = useRef(-1)
    const dispatch = useDispatch()
    const User = useSelector((state)=>state.user.currentUser)
    userIdRef.current = User.user_id? User.user_id:userIdRef.current
    useEffect(()=>{
      (userIdRef.current&&userIdRef.current!=-1)&&dispatch(GetSearchHistory(userIdRef.current,0))
    },[userIdRef.current])
    const searchHistoryData = useSelector((state)=>state.searchHistoryData.SearchHistory)
    useEffect(()=>{
      setHistory(searchHistoryData)
    },[searchHistoryData])
    const PreviousSearch = (e)=>{
      const string = e.target.childNodes[0].textContent
      searchInput.current.value = string
      searchInputHandler(string)
    }
    const searchInputHandler = (string = searchInput.current.value)=>{
      if(searchInput.current.value===''){
        dispatch(GetAllBooks(0))
      }else{
        dispatch(GetSearchedBooks(userIdRef.current,string))
      }
      setSearchHistory(false)
      setTimeout(()=>{
        dispatch(GetSearchHistory(userIdRef.current,0))
      },100)
    }
    const handleKeyDown = (event)=>{
      if(event.key==='Enter' && searchInput.current.value!=''){
          searchInputHandler()
      }
  }
    const openHideHistory = ()=>{
      searchInput.current.value===''&& dispatch(GetAllBooks(0))
      searchInput.current.value!=''?setSearchHistory(true):setSearchHistory(false)
    }
    useEffect(()=>{
      searchParams.get('value')?searchInput.current.value =searchParams.get('value'):searchInput.current.value=''
    },[])
  return (
    <motion.div  className='searchContainer w-full h-40 relative'>
    <motion.div variants={searchInputVariants} initial='init' animate='show' className='absolute shadow-xl z-10 items-center left-1/2 -bottom-5 -translate-x-1/2 flex flex-col md:flex-row'>
      <FaSearch className='text-2xl absolute z-10 -translate-x-28 translate-y-3 md:translate-x-4 md:translate-y-0 text-zinc-400'/>
      <input onKeyDown={handleKeyDown} onBlur={()=>setSearchHistory(false)} ref={searchInput} onChange={()=>openHideHistory()} type="search" className='h-12 pl-14 pr-4 py-3 w-[275px] md:w-[375px] rounded rounded-r-none focus-within:outline-none' placeholder='Search...' />
      <button onClick={()=>searchInputHandler()} className='btn btn-secondary w-full md:w-28 px-6 rounded-t-none md:rounded-tr-lg md:rounded-l-none'> Search</button>
      <AnimatePresence>
      {
        searchHistory&&            
        <motion.div key='searchHistory' variants={searchHistoryVariants} initial='init' animate='show' exit='leave' className='absolute top-full shadow-none rounded-t-none dropdown-content menu bg-white rounded-box w-[275px] md:w-[375px]'>
        <div className='flex sec flex-col'>
        {
          history.map((history,i)=>{
            while(i<3){
              return(
                (history&&history!='')&&<p key={i} onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>{history&&history.search}<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
              )
            }
          })
        }
        <Link to='/settings/search-history' className='sec text-center cursor-pointer py-1'>view all history</Link>
      </div>
    </motion.div>
      }
      </AnimatePresence>
    </motion.div>
  </motion.div>
  )
}
