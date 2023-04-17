import React from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, cardChildVariants, childVariants } from '../../animations/home';
import { Link } from 'react-router-dom';

export const AdminViewAll = ({type,children,addIcon}) => {
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl capitalize'>All {type}s</motion.h4>
        <motion.div variants={ContainerVariants} className='suggested books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <motion.span key={'addNew'} variants={cardChildVariants} className=' hover:bg-primary hover:text-slate-50 flex items-center justify-center transition duration-300 pb-4'>
                <Link to={`/admin/add-edit-${type}`}>
                    <div className={`relative flex p-3 rounded-xl transition duration-300 flex-col gap-3 h-72 items-center justify-center  cursor-pointer hover:bg-primary hover:text-slate-50`}>
                        <h3 className='text-xl font-bold'><span className="text-8xl text-secondary">{addIcon}</span></h3>
                        <p className='capitalize'>New {type}</p>
                    </div>
                </Link>
            </motion.span>
            {children}
        </motion.div>
    </motion.div>
  )
}
