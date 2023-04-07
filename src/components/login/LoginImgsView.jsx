import React, {  useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Books } from '../../Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectCoverflow} from 'swiper'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { rightContainerVariants } from '../../animations/settings';
const loginImgsContainerVariants = {
  show:{
    transition:{
      staggerChildren:0.3
    }
  }
} 
const loginImgsTextVariants = {
  init:{
    x:'calc(25px + -50%)',
    opacity:0
  },
  show:{
    x:'-50%',
    opacity:1,
    transition:{
      duration:0.3
    }
  },
  exit:{
    x:'calc(-25px + -50%)',
    opacity:0,
    transition:{
      duration:0.3
    }
  }
} 
export const LoginImgsView = () => {
  const [currentBook,setCurrentBook] = useState('Oliver Twist')
  return (
    <div  className='w-full h-full bg-primary flex justify-center items-center'>
    <div className='bg-secondary/75 backdrop-blur-sm p-10 z-10 md:w-[100vh] lg:w-auto md:rounded-2xl text-center md:text-start'>
      <h3 className='text-3xl text-slate-50 font-bold max-w-sm'>Hundreds of books are waiting for you 🤞</h3>
      <h4 className='text-3xl mt-2 text-slate-50 font-bold max-w-sm'>Login Now</h4>
      <div className='relative py-14 h-[28rem]'>    
      <div  className='absolute -translate-y-8 left-1/2 -translate-x-1/2 overflow-hidden h-full z-0'>
      <Swiper
      effect='coverflow'
      spaceBetween={50}
      slidesPerView={2}
      loop={true}
      grabCursor={true}
      centeredSlides={true}
      onRealIndexChange={(swiper)=>setCurrentBook(swiper.visibleSlides[1].firstChild.alt)}
      className='w-[450px] h-[350px]'
      modules={[EffectCoverflow, Autoplay]}
      coverflowEffect={{
        rotate:0,
        stretch:0,
        depth:100,
        modifier:2.5
      }}
      autoplay={{pauseOnMouseEnter:true,delay:'3000',disableOnInteraction:false}}
    >
    {
      Books.map((book)=>{
        return(
          <SwiperSlide  key={book.BookId} className='flex items-center justify-center'><motion.img initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}}  className='h-full w-full' src={book.BookImg} alt={`${book.BookName}`} /></SwiperSlide>
        )
      })
    }
    </Swiper>
      </div>
    <motion.div variants={loginImgsContainerVariants} initial='init' animate='show' exit='exit' className='w-full text-center'>
    <AnimatePresence mode='wait'>
      {
        Books.map((book)=>{
          return(
            currentBook===book.BookName&&<React.Fragment>
              <motion.p key={book.BookName} variants={loginImgsTextVariants} className='absolute bottom-3 left-1/2 -translate-x-1/2 text-3xl w-full text-slate-50'>{book.BookName}</motion.p>
              <motion.p key={book.BookAuthor} variants={loginImgsTextVariants} className='absolute -bottom-4 left-1/2 -translate-x-1/2 text-2xl w-full text-slate-50 sec '>{book.BookAuthor}</motion.p>
            </React.Fragment>
          )
        })
      }
    </AnimatePresence>
    </motion.div>
      </div>
    </div>
    </div>
  )
}
