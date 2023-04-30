import React from 'react'
import { motion } from 'framer-motion';
import { childVariants } from '../../animations/home';
import { useNavigate } from 'react-router-dom';

export const AuthorCard = ({author}) => {
    const navigate = useNavigate()

  return (
    <motion.div onClick={()=>navigate(`${author.author}`)} variants={childVariants} className={`col-span-2 cursor-pointer shadow-xl rounded-xl transition duration-150 glass grid grid-cols-6 gap-4 items-center justify-center`}>
        <div className={`w-full col-span-full md:col-span-3 rounded-xl rounded-r-none relative after:absolute after:bg-gray-900/25 after:backdrop-blur-[0.5px] after:inset-0 overflow-hidden ${author.img?'':'flex h-full items-center justify-center'}`}>
        {author.img?<img className='h-72 w-full object-cover' src={author.img} />:<h3 className='text-xl text-black/50'>{author.author}</h3>}
        </div>
        <div className='col-span-full py-8 md:col-span-3 flex flex-col gap-3'>
        <h4 className='text-xl font-bold text-center'>{author.author}</h4>
        <h4 className='text-md sec font-bold text-center'>{author.NumberOfBooks} Books found</h4>
        <button className='btn btn-secondary w-32 text-base font-normal capitalize self-center'>View Profile</button>
        </div>
    </motion.div>
  )
}
