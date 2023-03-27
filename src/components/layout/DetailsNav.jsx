import React,{useState,useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'
import { useSelector } from 'react-redux';
import { DetailsNavCurrentBook } from './DetailsNavCurrentBook';
import { DetailsNavBookView } from './DetailsNavBookView';
import { HOME, VIEW_BOOK, SEARCH } from './../../Redux/Types';
import { DetailsNavSearch } from './DetailsNavSearch';

export const DetailsNav = () => {
    const [current,setCurrent] = useState(0)
    const currentPage = useSelector((state)=>state.detailsNav.currentBook)
    useEffect(()=>{
        setCurrent(currentPage),[currentPage]
    })
    return (
    <React.Fragment>
    <AnimatePresence mode='wait'>
    {
        current===HOME? <DetailsNavCurrentBook key={1}/>:current===VIEW_BOOK?<DetailsNavBookView key={2}/>:current===SEARCH?<DetailsNavSearch key={3}/>:null
    }
    </AnimatePresence>
    </React.Fragment>
  )
}
