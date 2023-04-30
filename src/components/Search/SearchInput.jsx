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
    const dispatch = useDispatch()
    const User = useSelector((state)=>state.user.currentUser)
    const LastPage = useSelector((state)=>state.searchHistoryData.totalPages)
    let [searchData,setSearchData] = useState([])
    useEffect(()=>{
      dispatch(GetSearchHistory(User.user_id,LastPage))
    },[])
    const searchHistoryData = useSelector((state)=>state.searchHistoryData.SearchHistory)
    useEffect(()=>{
      setHistory(searchHistoryData)
      setSearchData(history.filter((sh,i)=>{
        if(i>history.length-4 && i<history.length){
          return(sh)
        }
      }))
    },[searchHistoryData])
    const PreviousSearch = (e)=>{
      const string = e.target.childNodes[0].textContent
      searchInput.current.value = string
      searchInputHandler(string)
    }
    const searchInputHandler = (string = searchInput.current.value)=>{
      console.log(User.user_id);
      console.log(searchInput.current.value);
      if(searchInput.current.value===''){
        dispatch(GetAllBooks())
      }else{
        dispatch(GetSearchedBooks(User.user_id,string))
      }
      setSearchHistory(false)
    }
    const openHideHistory = ()=>{
      searchInput.current.value===''&& dispatch(GetAllBooks())
      searchInput.current.value!=''?setSearchHistory(true):setSearchHistory(false)
    }
    useEffect(()=>{
      searchParams.get('value')?searchInput.current.value =searchParams.get('value'):searchInput.current.value=''
    },[])
  return (
    <motion.div  className='searchContainer w-full z-10 h-40 relative'>
    <motion.div variants={searchInputVariants} initial='init' animate='show' className='absolute shadow-xl items-center left-1/2 -bottom-5 -translate-x-1/2 flex flex-col md:flex-row'>
      <FaSearch className='text-2xl absolute z-10 -translate-x-28 translate-y-3 md:translate-x-4 md:translate-y-0 text-zinc-400'/>
      <input onBlur={()=>setSearchHistory(false)} ref={searchInput} onChange={()=>openHideHistory()} type="search" className='h-12 pl-14 pr-4 py-3 w-[275px] md:w-[375px] rounded rounded-r-none focus-within:outline-none' placeholder='Search...' />
      <button onClick={()=>searchInputHandler()} className='btn btn-secondary w-full md:w-28 px-6 rounded-t-none md:rounded-tr-lg md:rounded-l-none'> Search</button>
      <AnimatePresence>
      {
        searchHistory&&            
        <motion.div key='searchHistory' variants={searchHistoryVariants} initial='init' animate='show' exit='leave' className='absolute top-full shadow-none rounded-t-none dropdown-content menu bg-white rounded-box w-[275px] md:w-[375px]'>
        <div className='flex sec flex-col'>
        {
          (searchData[2]&&searchData[2]!='')&&<p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>{searchData[2]&&searchData[2].search}<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
        }
        {
          (searchData[1]&&searchData[1]!='')&&<p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>{searchData[1]&&searchData[1].search}<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
        }
        {
          (searchData[0]&&searchData[0]!='')&&<p onClick={(e)=>PreviousSearch(e)} className='border-b px-4 flex justify-between items-center cursor-pointer hover:bg-primary hover:text-slate-50 py-3 transition duration-150'>{searchData[0]&&searchData[0].search}<MdOutlineYoutubeSearchedFor className='text-xl'/></p>
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
