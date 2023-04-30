import React, { useEffect } from 'react'
import {ImBooks} from 'react-icons/im'
import {GiNotebook} from 'react-icons/gi'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { leftContainerVariants, rightContainerVariants, settingsNavVariants } from './../../animations/settings';
import { useSelector, useDispatch } from 'react-redux';
import { ADMIN } from '../../Redux/Types';
import {ChangeDetailsNav} from '../../Redux/actions/AllActions'
import { MdPendingActions } from 'react-icons/md';
import { FaUsers,FaUserEdit } from 'react-icons/fa';
export const Admin = () => {
  const dispatch =  useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state)=>state.user.currentUser)
    useEffect(()=>{
        document.title = 'Library | Admin'
        dispatch(ChangeDetailsNav(null))
        User.type!=ADMIN?navigate('/'):null
    },[])
  return (
    <div className='grid grid-cols-12 min-h-[450px]'>
    <motion.div variants={leftContainerVariants} initial='init' animate='show' className='col-span-2 p-6 glass bg-primary/75 hover:bg-primary/75 rounded rounded-r-none shadow-md flex flex-col gap-8'>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/all-books' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><ImBooks/>All Books</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/add-edit-book' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><GiNotebook/>Add/Edit Book</NavLink></motion.span>
        <motion.span variants={settingsNavVariants} onClick={()=>navigate('/admin/requests/pending-requests')} ><NavLink to='/admin/requests' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><MdPendingActions/>Requests</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/all-users' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><FaUsers/>All Users</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/add-edit-user' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><FaUserEdit/>Add/Edit User</NavLink></motion.span>
    </motion.div>
    <motion.div variants={rightContainerVariants}  initial='init' animate='show' className='col-span-10 p-6 bg-base-100 border rounded-r'>
    <Outlet/>
    </motion.div>
    </div>
  )
}