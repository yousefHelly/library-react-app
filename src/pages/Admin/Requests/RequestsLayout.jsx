import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { leftContainerVariants, rightContainerVariants, settingsNavVariants } from '../../../animations/settings'
import { MdError, MdPending } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FcOk } from 'react-icons/fc';

export const RequestsLayout = () => {
  return (
    <div className='grid grid-cols-10 shadow-2xl min-h-[400px]'>
    <motion.div variants={leftContainerVariants} initial='init' animate='show' className='col-span-2 p-6 glass  hover:bg-info bg-info rounded rounded-r-none hover:shadow-2xl shadow-2xl flex flex-col gap-8'>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/requests/pending-requests' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><MdPending className='text-indigo-900 text-lg'/>Pending Requests</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/requests/approved-requests' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec'><FcOk className='text-lg'/>Approved Requests</NavLink></motion.span>
        <motion.span variants={settingsNavVariants}><NavLink to='/admin/requests/declined-requests' className='text-md flex items-center transition duration-150 hover:text-slate-50 gap-3 p-2 rounded settings-side-sec '><MdError className='text-red-700 text-lg'/>Declined Requests</NavLink></motion.span>
    </motion.div>
    <motion.div variants={rightContainerVariants}  initial='init' animate='show' className='col-span-8 p-6 bg-base-100 border rounded-r shadow-2xl'>
    <Outlet/>
    </motion.div>
    </div>
  )
}
