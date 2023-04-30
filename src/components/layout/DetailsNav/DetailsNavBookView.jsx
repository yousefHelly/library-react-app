import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { DetailsNavVariants, DetailsNavVariantsContainer } from '../../../animations/detailsNav';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const DetailsNavBookView = () => {
    const {id} = useParams()
    const [chapters,setChapters] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
      const ChaptersData = axios.get(`http://localhost:4000/chapter/${id}`)
      ChaptersData.then((res)=>setChapters(...[res.data]))
    },[])
  return (
    <motion.div key='BookView' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave'  className='text-slate-50 w-full h-full flex px-10 flex-col justify-start items-center overflow-y-auto overflow-x-hidden'>
        <motion.div variants={DetailsNavVariants} initial='init' animate='show' exit='leave' className='flex gap-4 flex-col items-start'>
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
    </motion.div>
  )
}
