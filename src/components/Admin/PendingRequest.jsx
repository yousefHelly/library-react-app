import React from 'react'
import { motion } from 'framer-motion';
import { childVariants } from '../../animations/home';
import axios from 'axios';
import { ToastContainer, Zoom, toast } from 'react-toastify';

export const PendingRequest = ({request}) => {
    const handleAccept = ()=>{
        axios.put(`http://localhost:4000/approveRequest/${request.user_id}/${request.book_id}`)
        .then((res)=>toast.success(res.data.msg,{
            position:'top-right',
            theme:'dark'
        }))
    }
    const handleDecline = ()=>{
        axios.put(`http://localhost:4000/declineRequest/${request.user_id}/${request.book_id}`)
        .then((res)=>toast.success(res.data.msg,{
            position:'top-right',
            theme:'dark'
        }))
    }
  return (
    <React.Fragment>
    <motion.div variants={childVariants} className='grid grid-cols-4 my-8'>
    <div className='col-span-1 h-36'>
    <img className='w-full h-full object-contain' src={request.image_url}/>
    </div>
    <div className='col-span-2'>
        <p className='text-xl italic px-12 pt-5 font-bold sec'>#UserID{request.user_id}</p>
        <h4 className='text-3xl text-primary px-12 font-bold'>{request.userName}</h4>
        <p className=' px-12 py-4 sec'>Requested book {request.bookName} <p>in <span className='italic sec py-2'>{request.requestDate}</span></p></p>
    </div>
    <div className='col-span-1 flex items-center justify-center w-full gap-6'>
        <button onClick={()=>handleAccept()} className='btn btn-success btn-outline'>Accept</button>
        <button onClick={()=>handleDecline()} className='btn btn-error btn-outline'>Decline</button>
    </div>
  </motion.div>
  <ToastContainer transition={Zoom}/>
  </React.Fragment>
  )
}
