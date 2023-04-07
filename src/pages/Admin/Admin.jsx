import React, { useEffect } from 'react'
import {FaHistory , FaUserCog} from 'react-icons/fa'
import {ImBooks} from 'react-icons/im'
import {GiNotebook} from 'react-icons/gi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { leftContainerVariants, rightContainerVariants, settingsNavVariants } from './../../animations/settings';
import { useSelector, useDispatch } from 'react-redux';
import { ADMIN } from '../../Redux/Types';
import {ChangeDetailsNav} from '../../Redux/actions/AllActions'
import { MdDashboard } from 'react-icons/md';
export const Admin = () => {
  const dispatch =  useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state)=>state.user.currentUser)
    useEffect(()=>{
        document.title = 'Library | Admin'
        dispatch(ChangeDetailsNav(null))
        User.userType!=ADMIN&&navigate('/')
    },[])
  return (
    <div className='grid grid-cols-12'>
    <motion.div variants={leftContainerVariants} initial='init' animate='show' className='col-span-2 p-6 glass bg-primary/75 hover:bg-primary/75 rounded rounded-r-none shadow-md flex flex-col gap-8'>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/dashboard' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><MdDashboard/>Dashboard</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/all-books' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><ImBooks/>All Books</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/add-edit-book-:id' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><GiNotebook/>Add/Edit Book</NavLink></motion.span>
    </motion.div>
    <motion.div variants={rightContainerVariants}  initial='init' animate='show' className='col-span-10 p-6 bg-base-100 border rounded-r'>
    <Outlet/>
    </motion.div>
    </div>
  )
}