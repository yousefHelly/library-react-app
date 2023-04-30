import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';
import { plotTextVariants } from '../../animations/detailsNav';
import { ADMIN } from '../../Redux/Types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';

export const SettingsAccountStatus = () => {
  const User = useSelector((state)=>state.user.currentUser)
  const [showDialog,setShowDialog] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(User);
    if(User.type === ADMIN){
      navigate('/settings/profile')
    }
  },[User])
  const handleStatus = ()=>{
    axios.put(`http://localhost:4000/inactiveReaderAccount/${User.user_id}`).then((res)=>{
      toast.success(res.data.msg,{
        theme:'dark',
        position:'top-left'
      })
      setTimeout(()=>{
        navigate('/login')
        sessionStorage.clear()
      },1000)
    })
  }
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Account Status</motion.h4>
        <motion.p variants={childVariants} className='sec'>Your Account is {User.status}</motion.p>
        <motion.button onClick={()=>setShowDialog(true)} variants={plotTextVariants} className='btn btn-error self-start px-6'>Deactivate</motion.button>
        <AnimatePresence>
            {
                showDialog &&
                <Dialog static className='modal-bg' open={showDialog} onClose={()=>setShowDialog(false)}>
                <Dialog.Panel key='logout' as={motion.div} initial={{y:'-100%',x:'-50%',opacity:0}} animate={{y:'-50%',x:'-50%',opacity:1}} exit={{y:'-100%',x:'-50%',opacity:0}} className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary p-12 rounded-xl shadow-md flex justify-center items-center gap-8 flex-col text-slate-50'>
                <Dialog.Title className='text-2xl'>Are you sure you want to deactivate your account ?</Dialog.Title>
                <Dialog.Description className='sec text-lg'>you will have to contact admin to activate your account again.</Dialog.Description>
                <div className='flex justify-center gap-5'>
                    <button onClick={()=>handleStatus()} className='btn btn-error'>Deactivate</button>
                    <button onClick={()=>setShowDialog(false)} className='btn btn-ghost'>Cancel</button>
                </div>
                </Dialog.Panel>
                </Dialog>
            }
            </AnimatePresence>
    </motion.div>
  )
}
