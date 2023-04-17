import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { toast, ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BookViewContentContainerVariants, BookViewContentTextVariants } from './../../animations/viewBook';
import { ADMIN, APPROVED, AVAILABLE, DECLINED, READER, REQUESTED } from './../../Redux/Types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios' 
export const BookViewContent = ({book,id}) => {
    const User = useSelector((state)=>state.user.currentUser)
    const [bookStatus,setBookStatus] = useState('')
    useEffect(()=>{
        axios.get(`http://localhost:4000/request/${User.user_id}/${id}`).then((res)=>{
            const Status = res.data.status
            if(Status===APPROVED || Status === REQUESTED || Status === DECLINED){
                setBookStatus(Status)
            }
        }).catch((err)=>{
            const isAvailable = err.response.data.status === AVAILABLE
            if(isAvailable){
                setBookStatus(AVAILABLE)
            }
        })
    },[bookStatus])
    const HandleRequest = ()=>{
        axios.post(`http://localhost:4000/request`,{
            reader_id:User.user_id,
            book_id:id
        }).then(()=>notifyRequest()).then(
            setBookStatus(REQUESTED)
        )
    }
    console.log(bookStatus);
    const notifyRequest = ()=>{
        toast.success(`${book.bookName} has been requested Successfully !`, {
            position: "top-left",
            theme: "dark",
            toastId:1          
        }
        );
    }
    // const notifyRead = ()=>{
    //     toast.info(`${book.bookName} has been Added to your Library !`, {
    //         position: "top-left",
    //         theme: "dark",
    //         toastId:2         
    //     })
    // }
  return (
    <React.Fragment>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-3'>
            <motion.h3 variants={BookViewContentTextVariants} className='text-4xl font-bold'>Plot</motion.h3>
            <motion.p variants={BookViewContentTextVariants} className='p-4'>{book.bookDescription}</motion.p>
        </motion.div>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-1 flex flex-col gap-3'>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Publication Date: <span className='font-normal sec'>{book.publicationDate}</span></motion.div>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Chapters: <span className='font-normal sec'>{book.CountChapters}</span></motion.div>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Edition: <span className='font-normal sec rounded-full border bg-primary text-slate-50 px-3 py-1'>PDF</span></motion.div>
            {
                User.type ===READER?
                bookStatus===AVAILABLE?
                <motion.button variants={BookViewContentTextVariants}  onClick={()=>HandleRequest()} className='btn btn-primary rounded-3xl capitalize'>Request book</motion.button>:
                bookStatus===REQUESTED? <motion.button variants={BookViewContentTextVariants}  className='btn btn-primary btn-outline rounded-3xl capitalize'>Book Requested</motion.button>:
                bookStatus===APPROVED?<motion.a variants={BookViewContentTextVariants} href={`${book.pdf_url}`} download><button className='btn btn-primary btn-active w-full rounded-3xl capitalize'>Read Book</button></motion.a>:
                <motion.button variants={BookViewContentTextVariants} className='btn btn-error rounded-3xl capitalize cursor-default'>Request Declined</motion.button>
                : User.type ===ADMIN&&
                <motion.button variants={BookViewContentTextVariants}  className='btn btn-primary rounded-3xl capitalize'><Link to={`/admin/add-edit-book/${id}`}>Modify book</Link></motion.button>
            }
        <ToastContainer transition={Zoom} />
        </motion.div>
    </React.Fragment>
  )
}
