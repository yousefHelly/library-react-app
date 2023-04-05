import React from 'react'
import { ProfileForm } from '../../components/Settings/ProfileForm';
import { UserAvatar } from '../../components/layout/UserAvatar';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';

export const SettingsProfile = () => {
    return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        <motion.div variants={childVariants} className='grid grid-cols-4 gap-5 items-center pb-5 border-b'>
            <span className='col-span-1 flex items-center justify-center'><UserAvatar size={28}/></span>
            <div className='col-span-3 flex flex-col gap-3'>
                <h3 className='text-3xl font-bold'>Avatar</h3>
                <p className='sec'>600x600 or larger recommended</p>
                <button className='btn btn-circle btn-primary w-36'>Upload new</button>
            </div>
        </motion.div>
        <motion.div variants={childVariants} className='flex flex-col py-5'>
            <h4 className='text-md font-bold'>Personal Information</h4>
            <ProfileForm/>
        </motion.div>
    </motion.div>
    )
}
