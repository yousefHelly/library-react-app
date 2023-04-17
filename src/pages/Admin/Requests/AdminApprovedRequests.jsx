import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from '../../../animations/home';
import axios from 'axios';
import { PendingRequest } from '../../../components/Admin/PendingRequest';
import { RequestDetails } from '../../../components/Admin/RequestDetails';
import { APPROVED } from '../../../Redux/Types';
import { BiMessageAltError } from 'react-icons/bi';

export const AdminApprovedRequests = () => {
    const [approve, setApprove] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/approveRequest`).then((res)=>{
            setApprove(res.data)
        })
    },[approve])
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
        <motion.h4 variants={childVariants} className='text-2xl'>Approved Requests</motion.h4>
        <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
        {
            approve.length>0?
            approve.map((request)=>{
                return(
                    <RequestDetails request={request} reqType={APPROVED}/>
                )
            })
            :
            <div className='flex flex-col items-center h-80 justify-center p-8'>
                <BiMessageAltError className='text-5xl text-primary'/>
                <h3 className='text-xl'>No Approved Requests Available</h3>
            </div>
        }
        </motion.div>
    </motion.div>
  )
}
