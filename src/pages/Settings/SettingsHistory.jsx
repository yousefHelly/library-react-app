import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiMessageAltError } from 'react-icons/bi';

export const SettingsHistory = () => {
  const [history,setHistory] = useState([])
  const User = useSelector((state)=>state.user.currentUser)
  useEffect(()=>{
    const historyData = axios.get(`http://localhost:4000/searchHistory/${User.user_id}/0`)
    historyData.then((res)=>setHistory(res.data))
  },[])
  console.log();
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Search History</motion.h4>
        <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        {
          history.length>0?
          history.map((search)=>{
            return(
              <motion.div variants={childVariants} className='py-4 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
              <MdOutlineYoutubeSearchedFor className='text-xl'/>
              <p className=''> You searched for <Link className='text-primary hover:border-b hover:border-primary' to={`/search?value=${search.search}`}>{search.search}</Link></p>
              </div>
              <span className='sec italic'>{search.searchDate}</span>
            </motion.div>
            )
          }):
          <div className='flex flex-col items-center h-80 justify-center p-8'>
            <BiMessageAltError className='text-5xl text-primary'/>
            <h3 className='text-xl'>No search History Available</h3>
          </div>
        }
        </motion.div>
    </motion.div>
  )
}
