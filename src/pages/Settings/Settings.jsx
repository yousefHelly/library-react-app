import React, { useEffect } from 'react'
import {FaUserAlt , FaHistory , FaUserCog} from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { leftContainerVariants, rightContainerVariants, settingsNavVariants } from './../../animations/settings';
import { useSelector } from 'react-redux';
import { READER } from '../../Redux/Types';

export const Settings = () => {
    useEffect(()=>{
        document.title = 'Library | Settings'
    },[])
    const User = useSelector((state)=>state.user.currentUser)
  return (
    <div className='grid grid-cols-12'>
    <motion.div variants={leftContainerVariants} initial='init' animate='show' className='col-span-3 p-6 glass bg-primary/75 hover:bg-primary/75 rounded rounded-r-none shadow-md flex flex-col gap-8'>
        <motion.span variants={settingsNavVariants}><NavLink to='profile' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><FaUserAlt/>Profile</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='search-history' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><FaHistory/>Search History</NavLink></motion.span>
        {User.userType===READER&&<motion.span variants={settingsNavVariants}><NavLink to='account-status' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><FaUserCog/>Account Status</NavLink></motion.span>}
    </motion.div>
    <motion.div variants={rightContainerVariants}  initial='init' animate='show' className='col-span-9 p-6 bg-base-100 border rounded-r'>
    <Outlet/>
    </motion.div>
    </div>
  )
}
