import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsNavVariants, DetailsNavVariantsContainer } from './../../animations/detailsNav';
import { Books } from './../../Data';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const DetailsNavBookView = () => {
    const currentBook = useSelector((state)=>state.current.currentBook)
  return (
    <motion.div key='BookView' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave'  className='text-slate-50 w-full h-full flex px-10 flex-col justify-start items-center overflow-y-auto overflow-x-hidden'>
    <AnimatePresence mode='wait'>
       {
        Books.map((book,i)=>{return(
            book === Books[currentBook]&&
            <motion.div variants={DetailsNavVariants} initial='init' animate='show' exit='leave' key={i} className='flex gap-4 flex-col items-start'>
                <h3 className='text-2xl mt-5'>All Chapters</h3>
                <Accordion.Root className="AccordionRoot w-[275px] rounded-sm" type='single' collapsible>
                {
                    book.chapters?book.chapters.map((chapter,i)=>{
                        return(
                            
                            <Accordion.Item key={i} className='AccordionItem overflow-hidden mt-[1px] focus-within:shadow-md focus-within:relative focus-within:z-[1]' value={`item-${i+1}`}>
                            <Accordion.Header className="AccordionHeader flex">
                                <Accordion.Trigger className='AccordionTrigger shadow-sm hover:bg-primary aria-expanded:bg-primary transition duration-300 aria-expanded:rounded-t-xl'>{chapter.title}
                                <FaChevronDown className='AccordionChevron'/>
                                </Accordion.Trigger>
                                
                            </Accordion.Header>
                            <Accordion.Content className="AccordionContent overflow-hidden flex-wrap text-[15px] bg-primary rounded-b-xl">
                            <div className="AccordionContentText px-8 py-3">
                            {chapter.description}</div>
                            </Accordion.Content>
                            </Accordion.Item>
                            
                        )
                    }):<h3 className='text-lg text-slate-50'>Chapters not found for this book.</h3>
                    
                }
                </Accordion.Root>
            </motion.div>
        )})
       }
       </AnimatePresence>
    </motion.div>
  )
}
