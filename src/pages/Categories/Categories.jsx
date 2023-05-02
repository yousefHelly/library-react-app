import React,{useEffect} from 'react'
import { motion } from 'framer-motion';
import { childVariants, ContainerVariants } from '../../animations/home';
import { useDispatch } from 'react-redux';
import { HOME } from '../../Redux/Types';
import { ChangeDetailsNav } from '../../Redux/actions/AllActions';
import { cats } from '../../Data';
import { colors } from './../../Data';
import { CategoryCard } from '../../components/Categories/CategoryCard';
export const Categories = () => {
  useEffect(()=>{document.title = 'Library | Categories'},[])
  const dispatch = useDispatch()
  function randomNoRepeats(array) {
    let copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      const index = Math.floor(Math.random() * copy.length);
      const item = copy[index];
      copy.splice(index, 1);
      return item;
    };
  }
  const chooser = randomNoRepeats(colors)
  useEffect(
    ()=>{
      document.title = 'Library | Categories'
      dispatch(ChangeDetailsNav(HOME))
    }  
  ,)
  return (
    <motion.div variants={ContainerVariants} initial='init' animate='show' className='my-5 flex flex-col gap-5'>
      <motion.h4 variants={childVariants} className='text-xl font-bold'>All Categories</motion.h4>
      <motion.div variants={ContainerVariants} initial='init' animate='show' className='grid grid-cols-1 md:grid-cols-2 h-screen gap-8 lg:grid-cols-3'>
      {
        cats.map((cat)=>{
          const randomColor = chooser()
          return(
            <CategoryCard key={cat.name} cat={cat} randomColor={randomColor}/>
          )
        })
      }
      </motion.div>
    </motion.div>
  )
}
