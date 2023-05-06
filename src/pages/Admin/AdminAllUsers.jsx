import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import {cardChildVariants} from '../../animations/home';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AdminViewAll } from '../../components/Admin/AdminViewAll';
import { FaUserPlus } from 'react-icons/fa';
import { FcApproval, FcHighPriority } from 'react-icons/fc';
import { ACTIVE, SUCCESS } from '../../Redux/Types';
import { Pagination } from '../../components/layout/Pagination';
import { GetAllUsers } from '../../Redux/actions/AllActions';
export const AdminAllUsers = () => {
    const dispatch = useDispatch()
    const [users,setUsers] = useState([])
    const [deleteDialog,setDeleteDialog] = useState(false)
    const [deletedUser,setDeletedUser] = useState({})
    const currentPage = useSelector((state)=>state.usersData.currentPage) || 0
    useEffect(()=>{
        dispatch(GetAllUsers(currentPage))
    },[users])
    const usersData = useSelector((state)=>state.usersData)
    useEffect(()=>{
        setUsers(usersData.Users)
    },[usersData])

    const showDeleteDialog=(user)=>{
        setDeleteDialog(true)
        setDeletedUser(user)
    }
    //this function can be used in redux
    const handleDelete = async()=>{
        const deleteUser =  await axios.delete(`http://localhost:4000/reader/${deletedUser.user_id}`)
        const res =  await deleteUser.data        
        dispatch(ShowNotification(res.msg,SUCCESS))
        dispatch(GetAllUsers(currentPage))
        setDeleteDialog(false)
    }
  return (
    <React.Fragment>
        <AdminViewAll type={'user'} addIcon={<FaUserPlus/>}>
            {
                users&&
                users.length>0&&
                users.map((user,i)=>{
                return(
                    <motion.span key={i} variants={cardChildVariants} className='rounded-xl hover:bg-primary text-center hover:text-slate-50 transition flex flex-col gap-2 items-center duration-300 pb-4'>
                    <div>
                    <div className='relative'>
                    {
                        user.status===ACTIVE?
                        <span className='bg-primary/50 backdrop-blur-sm flex items-center justify-center gap-1 text-slate-50 absolute p-2 rounded-tr-xl right-0'><FcApproval className='text-2xl'/>Active</span>:
                        <span className='bg-primary/50 backdrop-blur-sm flex items-center justify-center gap-1 text-slate-50 absolute p-2 rounded-tr-xl right-0'><FcHighPriority className='text-2xl'/>Inactive</span>
                    }
                    <img src={user.image_url} className='rounded-t-xl' alt={`${user.userName}'s image`} />
                    </div>
                    <h3 className='text-lg capitalize pt-2 font-bold'>{user.userName}</h3>
                    <h3 className='sec text-sm font-bold'>{user.email}</h3>
                    </div>
                    <div className='w-full flex gap-4 items-center justify-center'>
                    <Link to={`/admin/add-edit-user/${user.user_id}`} className='btn btn-secondary'>edit</Link>
                    <button onClick={()=>showDeleteDialog(user)} className='btn btn-error'>Delete</button>
                    </div>
                    <Link to={`/admin/requests/view-requests/${user.user_id}`} className='btn btn-info'>view requests</Link>
                    </motion.span>
                )
                })
            }
        </AdminViewAll>
        <AnimatePresence>
        {
            deleteDialog &&
            <Dialog static className='modal-bg' open={deleteDialog} onClose={()=>setDeleteDialog(false)}>
            <Dialog.Panel key='logout' as={motion.div} initial={{y:'-100%',x:'-50%',opacity:0}} animate={{y:'-50%',x:'-50%',opacity:1}} exit={{y:'-100%',x:'-50%',opacity:0}} className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary p-12 rounded-xl shadow-md flex justify-center items-center gap-8 flex-col text-slate-50'>
            <Dialog.Title className='text-2xl text-center'>Are you sure you want to Delete {deletedUser.userName} ?</Dialog.Title>
            <Dialog.Description className='sec text-lg'>you will delete all data and requests for this user.</Dialog.Description>
            <div className='flex justify-center gap-5'>
                <button onClick={()=>handleDelete()} className='btn btn-error'>Delete</button>
                <button onClick={()=>setDeleteDialog(false)} className='btn btn-ghost'>Cancel</button>
            </div>
            </Dialog.Panel>
            </Dialog>
        }
        </AnimatePresence>
    <div className='w-full flex justify-center items-center'>
        {users&&users.length>0&&<Pagination page='allUsers'/>}
    </div>
    </React.Fragment>
    )
}
