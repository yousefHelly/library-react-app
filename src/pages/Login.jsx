import React, { useEffect } from 'react'
import { LoginForm } from '../components/login/LoginForm'
import pattern from '../assets/imgs/pattern_waves-secondary.png'
import { LoginImgsView } from '../components/login/LoginImgsView'
import { rightContainerVariants } from '../animations/settings'
import { motion } from 'framer-motion';


export const Login = () => {
  useEffect(()=>{
    document.title = 'Library | Login'
  },[])
  return (
    <div className='mx-auto grid lg:grid-cols-2'>
    <LoginForm/>
    <motion.div variants={rightContainerVariants} initial='init' animate='show' className='col-span-1 -order-1 lg:order-1 relative overflow-hidden'>
      <LoginImgsView/>
      <img className='absolute col-start-1 col-end-3 inset-0 h-full w-full z-0' src={pattern}/>
    </motion.div>
    </div>
  )
}
