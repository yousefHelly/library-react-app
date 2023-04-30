import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDetailsNav, GetAllAuthors } from '../../Redux/actions/AllActions';
import { HOME } from '../../Redux/Types';
import { childVariants, ContainerVariants } from '../../animations/home';
import { motion } from 'framer-motion';
import { AuthorCard } from '../../components/Authors/AuthorCard';
import axios from 'axios';
import { BiMessageAltError } from 'react-icons/bi';
import { Pagination } from '../../components/layout/Pagination';

export const Authors = () => {
  useEffect(()=>{document.title = 'Library | Authors'},[])
  const [authors,setAuthors] = useState([])
  const dispatch = useDispatch()
  const currentPage = useSelector((state)=>state.authorsData.currentPage)
  useEffect(
    ()=>{
      document.title = 'Library | Authors'
      dispatch(GetAllAuthors(currentPage))
      dispatch(ChangeDetailsNav(HOME))
    },[])
  const authorsData = useSelector((state)=>state.authorsData.Authors)
  useEffect(()=>{
    setAuthors(authorsData.authors)
  },[authorsData])
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
    <motion.h4 variants={childVariants} className='text-xl font-bold'>All Authors</motion.h4>
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='grid grid-cols-2 md:grid-cols-4 gap-8 lg:grid-cols-4'>
    {
      authors&&
      authors.length>0?
      authors.map((author,i)=>{
        return(
          <AuthorCard key={i} author={author}/>
        )
      }):
      <div className='flex flex-col col-span-full items-center h-80 justify-center p-8'>
        <BiMessageAltError className='text-5xl text-primary'/>
        <h3 className='text-xl'>No Books Available</h3>
      </div>
    }
    </motion.div>
    {
      authors&&
      authors.length>0&&
      <Pagination page={'author'}/>
    }
    </motion.div>
  )
}
