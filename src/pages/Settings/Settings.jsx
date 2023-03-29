import React, { useEffect } from 'react'
import {FaUserAlt , FaHistory , FaUserCog} from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { settingsNavContainerVariants, settingsNavVariants } from './../../animations/settings';

export const Settings = () => {
    useEffect(()=>{
        document.title = 'Library | Settings'
    },[])
  return (
    <div className='grid grid-cols-12'>
    <motion.div variants={settingsNavContainerVariants} initial='init' animate='show' className='col-span-3 p-6 glass bg-primary/75 hover:bg-primary/75 rounded rounded-r-none shadow-md flex flex-col gap-8'>
        <motion.span variants={settingsNavVariants}><NavLink to='profile' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><FaUserAlt/>Profile</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='search-history' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><FaHistory/>Search History</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='account-status' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><FaUserCog/>Account Status</NavLink></motion.span>
    </motion.div>
    <motion.div initial={{x:100,rotate:'15deg'}} animate={{x:0,rotate:0,transition:{duration:0.3}}} className='col-span-9 p-6 bg-base-100 border rounded-r'>
    <Outlet/>
    </motion.div>
    </div>
  )
}
