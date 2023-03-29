import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ChangeDetailsNav } from '../Redux/actions/AllActions';
import { HOME, REQUESTED } from '../Redux/Types';
import { motion } from 'framer-motion';
import { childVariants } from '../animations/home';
import { ContainerVariants } from './../animations/home';
import { Books } from './../Data';
import { RequestedBook } from '../components/myRequests/RequestedBook';
import { AVAILABLE } from './../Redux/Types';
export const MyRequests = () => {
  const dispatch = useDispatch()
  useEffect(
    ()=>{
      document.title = 'Library | My requests'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
    <motion.h4 variants={childVariants} className='text-xl font-bold'>My requests</motion.h4>
    <motion.div variants={ContainerVariants} className='suggested books grid sm:mx-20 md:mx-0 gap-5'>

      {
        Books.map((book,i)=>{
              return(
                book.status!=AVAILABLE&&<motion.span key={i} variants={childVariants}><RequestedBook book={book} index={book.BookId}/>
                </motion.span>
              )
        })
      }
    </motion.div>
    </motion.div>
  )
}
