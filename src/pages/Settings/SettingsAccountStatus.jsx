import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';
import { plotTextVariants } from '../../animations/detailsNav';
import { ADMIN } from '../../Redux/Types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SettingsAccountStatus = () => {
  const User = useSelector((state)=>state.user.currentUser)
  const navigate = useNavigate()
  useEffect(()=>{
    if(User.userType === ADMIN){
      navigate('/settings/profile')
    }
  },[User])
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Account Status</motion.h4>
        <motion.p variants={childVariants} className='sec'>Your Account is in Active status</motion.p>
        <motion.button variants={plotTextVariants} className='btn btn-error self-start px-6'>Deactivate</motion.button>
    </motion.div>
  )
}
