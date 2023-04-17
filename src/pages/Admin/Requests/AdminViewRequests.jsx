import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from '../../../animations/home';
import { APPROVED, REQUESTED } from '../../../Redux/Types';
import { RequestDetails } from '../../../components/Admin/RequestDetails';
import { PendingRequest } from '../../../components/Admin/PendingRequest';
import {BiMessageAltError} from 'react-icons/bi'
export const AdminViewRequests = () => {
    const {id} = useParams()
    const [user,setUser] = useState({})
    const [userRequests,setUserRequests] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/reader/${id}`).then((res)=>{
            setUser(res.data)
        })
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:4000/request/${id}`).then((res)=>{
            setUserRequests(res.data)
        }).catch((err)=>{
            setUserRequests(err.response.data.msg)
        })
    },[userRequests])
  return (
    <motion.div  variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
    <motion.h4 variants={childVariants} className='text-2xl capitalize'>{user.userName}<span className='lowercase'>'s </span>all Requests</motion.h4>
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col'>
    {
        userRequests.map?
        userRequests.map((request)=>{
            return(
                request.status===REQUESTED?
                <PendingRequest request={request}/>
                :<RequestDetails request={request} reqType={request.status}/>
            )
        })
        :
        <div className='flex flex-col items-center h-80 justify-center p-8'>
            <BiMessageAltError className='text-5xl text-primary'/>
            <h3 className='text-xl'>No Requests for this user</h3>
        </div>
    }
    </motion.div>
    </motion.div>
  )
}