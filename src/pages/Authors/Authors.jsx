import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { ChangeDetailsNav } from '../../Redux/actions/AllActions';
import { HOME } from '../../Redux/Types';
import { childVariants, ContainerVariants } from '../../animations/home';
import { motion } from 'framer-motion';
import { authors } from '../../Data';
import { AuthorCard } from '../../components/Authors/AuthorCard';

export const Authors = () => {
  useEffect(()=>{document.title = 'Library | Authors'},[])
  const dispatch = useDispatch()
  useEffect(
    ()=>{
      document.title = 'Library | Home'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
    <motion.h4 variants={childVariants} className='text-xl font-bold'>All Authors</motion.h4>
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='grid grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4'>
    {
      authors.map((author)=>{
        return(
          <AuthorCard author={author}/>
        )
      })
    }
    </motion.div>
    </motion.div>
  )
}
