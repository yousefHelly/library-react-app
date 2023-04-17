import React, { useEffect, useState } from 'react'
import { DECLINED } from '../../../Redux/Types'
import { RequestDetails } from '../../../components/Admin/RequestDetails'
import { ContainerVariants, childVariants } from '../../../animations/home'
import { motion } from 'framer-motion';
import axios from 'axios';
import { BiMessageAltError } from 'react-icons/bi';

export const AdminDeclinedRequests = () => {
    const [decline, setDecline] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/declineRequest`).then((res)=>{
            setDecline(res.data)
        })
    },[decline])
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Declined Requests</motion.h4>
        <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        {
            decline.length>0?
            decline.map((request)=>{
                return(
                    <RequestDetails request={request} reqType={DECLINED}/>
                )
            }):
            <div className='flex flex-col items-center h-80 justify-center p-8'>
                <BiMessageAltError className='text-5xl text-primary'/>
                <h3 className='text-xl'>No Declined Requests Available</h3>
            </div>
        }
        </motion.div>
    </motion.div>
  )
}
