import React,{useState} from 'react'
import {AiFillHome, AiOutlineMenu, AiFillSetting} from 'react-icons/ai'
import {ImExit} from 'react-icons/im'
import {FaBookReader,FaSearch} from 'react-icons/fa'
import {AnimatePresence, motion} from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { closeNav } from '../../Redux/actions/AllActions'
import { Dialog } from '@headlessui/react';
import { UserAvatar } from './UserAvatar'


export const SideNav = () => {
    const navigate = useNavigate()
    const [showLogOut,setShowLogOut] = useState(false)
    const dispatchSideNav = useDispatch()
    const sideNavItems = [
        {
            icon:AiFillHome,
            text:'Home',
            dest:'/'
        },        
        {
            icon:FaSearch,
            text:'Search',
            dest:'/search'
        },        
        {
            icon:AiOutlineMenu,
            text:'My requests',
            dest:'/my-requests'
        },        
        {
            icon:FaBookReader,
            text:'Reading',
            dest:'/reading'
        }
    ]
    const handleSettings = ()=>{
        navigate('/settings/profile')
        dispatchSideNav(closeNav)
    }
    const handleLogout = ()=>{
        navigate('/login')
        dispatchSideNav(closeNav)
    }
  return (
    <React.Fragment>
        <motion.div 
        key='sidenav' 
        initial={{x:'-25vh',opacity:0}} 
        animate={{x:0,opacity:1}} 
        exit={{x:'-25vh',opacity:0}} 
        className='fixed left-0 overflow-y-auto h-full bg-secondary w-80'>
            <div className='flex flex-col text-slate-50 items-center gap-5 py-5'>
            <UserAvatar/>
            <div className='text-center flex flex-col gap-1'>
                <h4 className='text-3xl'>Yousef Helly</h4>
                <p className='sec'>@yousefHelly</p>
            </div>
            <div className='h-[1px] w-60 bg-slate-400'></div>
            <div className='self-start px-12 w-full flex flex-col gap-3'>
            {
                sideNavItems.map((navItem,i)=>{
                    return(
                        <div key={i} className='text-lg'>
                            <NavLink onClick={()=>dispatchSideNav(closeNav)} to={navItem.dest} className='side-sec flex items-center gap-3 rounded-full py-1  px-5'>
                            <navItem.icon/>{navItem.text}
                            </NavLink>
                        </div>
                    )
                })
            }
            </div>
            <div className='h-[1px] w-60 bg-slate-400'></div>
            <div className='self-start px-12 w-full flex flex-col gap-3'>
                <div className='text-lg'>
                        <button onClick={()=>handleSettings()} className='side-sec flex items-center gap-3 rounded-full py-1 px-5'>
                            <AiFillSetting className=''/>Settings
                        </button>
                </div>
                <div className='text-lg'>
                        <button onClick={()=>handleLogout()} className='side-sec flex items-center gap-3 rounded-full py-1 px-5'>
                            <ImExit className=''/>Log Out
                        </button>
                </div>
            </div>
            {
                //LogOut Modal
            }
            <AnimatePresence>
            {
                showLogOut &&
                <Dialog static className='modal-bg' open={showLogOut} onClose={()=>setShowLogOut(false)}>
                <Dialog.Panel key='logout' as={motion.div} initial={{y:'-100%',x:'-50%',opacity:0}} animate={{y:'-50%',x:'-50%',opacity:1}} exit={{y:'-100%',x:'-50%',opacity:0}} className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary p-12 rounded-xl shadow-md flex justify-center items-center gap-8 flex-col text-slate-50'>
                <Dialog.Title className='text-2xl'>Are you sure you want to logout ?</Dialog.Title>
                <Dialog.Description className='sec text-lg'>you will have to login again to continue reading your favorite books.</Dialog.Description>
                <div className='flex justify-center gap-5'>
                    <button onClick={()=>navigate('/login')} className='btn btn-error'>Logout</button>
                    <button onClick={()=>setShowLogOut(false)} className='btn btn-ghost'>Cancel</button>
                </div>
                </Dialog.Panel>
                </Dialog>
            }
            </AnimatePresence>
            </div>
        </motion.div>
    </React.Fragment>
  )
}
