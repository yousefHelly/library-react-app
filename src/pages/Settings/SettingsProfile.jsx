import React from 'react'
import { ProfileForm } from '../../components/Settings/ProfileForm';
import { UserAvatar } from '../../components/layout/UserAvatar';
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from './../../animations/home';

export const SettingsProfile = () => {
    return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        <motion.div variants={childVariants} className='flex flex-col'>
            <ProfileForm/>
        </motion.div>
    </motion.div>
    )
}
