import React from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';

export const SettingsHistory = () => {
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Search History</motion.h4>
        <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        <motion.div variants={childVariants} className='py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
            <MdOutlineYoutubeSearchedFor className='text-xl'/>
            <p className=''> You searched for <Link className='text-primary hover:border-b hover:border-primary' to='/search'>Oliver Twist</Link></p>
            </div>
            <span className='sec'>2 minutes ago</span>
        </motion.div>
            <motion.div variants={childVariants} className='py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
            <MdOutlineYoutubeSearchedFor className='text-xl'/>
            <p className=''> You searched for <Link className='text-primary hover:border-b hover:border-primary' to='/search'>The Great Gatsby</Link></p>
            </div>
            <span className='sec'>2 minutes ago</span>
        </motion.div>
        <motion.div variants={childVariants} className='py-4 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
            <MdOutlineYoutubeSearchedFor className='text-xl'/>
            <p className=''> You searched for <Link className='text-primary hover:border-b hover:border-primary' to='/search'>Great Expectations</Link></p>
            </div>
            <span className='sec'>2 minutes ago</span>
        </motion.div>
        </motion.div>
    </motion.div>
  )
}
