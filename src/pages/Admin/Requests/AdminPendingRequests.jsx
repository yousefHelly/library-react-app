import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from '../../../animations/home';
import { PendingRequest } from '../../../components/Admin/PendingRequest';
import axios from 'axios';
import { BiMessageAltError } from 'react-icons/bi';
export const AdminPendingRequests = () => {
    const [pending, setPending] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/request`).then((res)=>{
            setPending(res.data)
        })
    },[pending])
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
    <motion.h4 variants={childVariants} className='text-2xl'>Pending Requests</motion.h4>
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
    {
        pending.length>0?
        pending.map((request)=>{
            return(
                <PendingRequest request={request}/>
            )
        }):
        <div className='flex flex-col items-center h-80 justify-center p-8'>
            <BiMessageAltError className='text-5xl text-primary'/>
            <h3 className='text-xl'>No Pending Requests Available</h3>
        </div>
    }
    </motion.div>
</motion.div>
  )
}
