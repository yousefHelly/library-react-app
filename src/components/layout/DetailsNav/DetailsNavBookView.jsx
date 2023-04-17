import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsNavVariants, DetailsNavVariantsContainer } from '../../../animations/detailsNav';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const DetailsNavBookView = () => {
    const currentBook = useSelector((state)=>state.current.currentBook)
    const [Books,setBooks] = useState([])
    const [chapters,setChapters] = useState([])
    useEffect(()=>{
      const booksData = axios.get(`http://localhost:4000/bookspage/0`)
      booksData.then((res)=>setBooks(res.data.books))
      const ChaptersData = axios.get(`http://localhost:4000/chapter/${currentBook}`)
      ChaptersData.then((res)=>setChapters(...[res.data]))
    },[])
  return (
    <motion.div key='BookView' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave'  className='text-slate-50 w-full h-full flex px-10 flex-col justify-start items-center overflow-y-auto overflow-x-hidden'>
    <AnimatePresence mode='wait'>
       {
        Books.map((book,i)=>{return(
            book.book_id === currentBook&&
            <motion.div variants={DetailsNavVariants} initial='init' animate='show' exit='leave' key={i} className='flex gap-4 flex-col items-start'>
                <h3 className='text-2xl mt-5'>All Chapters</h3>
                <Accordion.Root className="AccordionRoot w-[275px] rounded-sm" type='single' collapsible>
                {
                    chapters.map((chapter,i)=>{
                        return(
                            
                            <Accordion.Item key={i} className='AccordionItem overflow-hidden mt-[1px] focus-within:shadow-md focus-within:relative focus-within:z-[1]' value={`item-${i+1}`}>
                            <Accordion.Header className="AccordionHeader flex">
                                <Accordion.Trigger className='AccordionTrigger shadow-sm hover:bg-primary aria-expanded:bg-primary transition duration-300 aria-expanded:rounded-t-xl text-start'>{chapter.title}
                                <FaChevronDown className='AccordionChevron'/>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="AccordionContent overflow-hidden flex-wrap text-[15px] bg-primary rounded-b-xl">
                            <div className="AccordionContentText px-8 py-3">
                            {chapter.chapterDescription}</div>
                            </Accordion.Content>
                            </Accordion.Item>
                            
                        )
                    })
                    
                }
                </Accordion.Root>
            </motion.div>
        )})
       }
       </AnimatePresence>
    </motion.div>
  )
}
