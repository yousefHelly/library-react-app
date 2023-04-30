import React,{useEffect, useRef} from 'react'
import {motion} from 'framer-motion'
import { FastAverageColor } from 'fast-average-color';
import {FaChevronRight} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { ChangeCurrent } from '../../Redux/actions/AllActions';
import { childVariants } from '../../animations/home';
export const DetailedBook = ({book, index}) => {
    const isSelected = useSelector((state)=>state.current.currentBook)
    const dispatch = useDispatch()
  return (
    <motion.div variants={childVariants} key={book.bookName} className={`flex flex-col sm:flex-row justify-around items-center lg:items-start p-5 gap-3 border rounded-xl transition duration-300 shadow-md glass ${isSelected===index?'bg-primary text-slate-50 hover:text-black':'hover:bg-primary/75 hover:text-slate-50'}`}>
        <div className='relative h-[185px]'>
            <img className='w-full h-full' src={book.image_url} alt="Suggested book" />
            <motion.span initial={{rotate:0}} animate={{rotate:'-15deg',transition:{duration:0.5,delay:0.3}}} className={`absolute left-0 top-0 w-full h-full rounded-xl -z-10`}></motion.span>
        </div>
        <div className='flex flex-col gap-2 mx-8'>
            <h3 className='text-xl text-center md:text-start capitalize font-bold'>{book.bookName}</h3>
            <p className="-mt-2 text-center md:text-start capitalize sec">{book.author}</p>
            <p className='text-base'>Publication Date : <span className="sec">{book.publicationDate}</span></p>
            <p className='text-base capitalize'>Category : <span className="sec">{book.field}</span></p>
        </div>
        <button onClick={()=>dispatch(ChangeCurrent(index))} className={`btn btn-primary self-center lg:self-end ${isSelected===index&&'bg-slate-50 text-primary hover:bg-slate-100'}`}><FaChevronRight/></button>
    </motion.div>
  )
}
