import React, { useState } from 'react'
import { Books } from './../../Data';
import {motion} from 'framer-motion'
import { toast, ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BookViewContentContainerVariants, BookViewContentTextVariants } from './../../animations/viewBook';
import { ADMIN, AVAILABLE, READER, REQUESTED } from './../../Redux/Types';
import { useSelector } from 'react-redux';
export const BookViewContent = ({id}) => {
    const [bookState,setBookState] = useState(AVAILABLE)
    const User = useSelector((state)=>state.user.currentUser)
    const testBook = Books[id]
    const notifyRequest = ()=>{
        setBookState(REQUESTED)
        toast.success(`${testBook.BookName} has been requested Successfully !`, {
            position: "top-left",
            theme: "dark",
            toastId:1          
        }
        );
        setTimeout(()=>{
            testBook.status = 'Approved'
            setBookState('Approved')
            notifyRead()
        },6000)
    }
    const notifyRead = ()=>{
        toast.info(`${testBook.BookName} has been Added to your Library !`, {
            position: "top-left",
            theme: "dark",
            toastId:2         
        })
    }
    console.log(bookState);
  return (
    <React.Fragment>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-3'>
            <motion.h3 variants={BookViewContentTextVariants} className='text-4xl font-bold'>Plot</motion.h3>
            <motion.p variants={BookViewContentTextVariants} className='p-4'>{testBook.BookPlot.repeat(10)}</motion.p>
        </motion.div>
        <motion.div variants={BookViewContentContainerVariants} initial='init' animate='show' className='col-span-1 flex flex-col gap-3'>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Publication Date: <span className='font-normal sec'>{testBook.BookPublicationDate}</span></motion.div>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Chapters: <span className='font-normal sec'>{testBook.BookChapters}</span></motion.div>
            <motion.div variants={BookViewContentTextVariants} className='text-md font-bold'>Edition: <span className='font-normal sec rounded-full border bg-primary text-slate-50 px-3 py-1'>PDF</span></motion.div>
            {
                User.userType ===READER?
                bookState===AVAILABLE?
                <motion.button variants={BookViewContentTextVariants}  onClick={()=>notifyRequest()} className='btn btn-primary rounded-3xl capitalize'>Request book</motion.button>:
                bookState===REQUESTED? <motion.button variants={BookViewContentTextVariants}  className='btn btn-primary btn-outline rounded-3xl capitalize'>Book Requested</motion.button>:
                <motion.a variants={BookViewContentTextVariants} href={`${testBook.pdf}`} download><button className='btn btn-primary btn-active w-full rounded-3xl capitalize'>Read Book</button></motion.a>
                : User.userType ===ADMIN&&
                <motion.button variants={BookViewContentTextVariants}  className='btn btn-primary rounded-3xl capitalize'>Modify book</motion.button>
            }
        <ToastContainer transition={Zoom} />
        </motion.div>
    </React.Fragment>
  )
}
