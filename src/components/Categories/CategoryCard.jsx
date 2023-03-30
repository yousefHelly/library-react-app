import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { childVariants } from '../../animations/home';

export const CategoryCard = ({cat,randomColor}) => {
    const navigate = useNavigate()
  return (
    <motion.div onClick={()=>navigate(`${cat.name}`)} variants={childVariants} className={`col-span-1 cursor-pointer h-64 shadow-xl rounded-xl transition duration-150 glass ${randomColor.bg} ${randomColor.hover} flex flex-col gap-4 items-center justify-center`}>
    <img className='w-16' src={cat.img} />
    <h4 className='text-md font-bold text-center'>{cat.name}</h4>
    </motion.div>
  )
}
