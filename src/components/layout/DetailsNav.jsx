import React,{useState,useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { bookInfoVariants, DetailsNavVariants, imgVariants, bookInfoTextVariants, bookViewBtn, plotTextVariants, plotVariants, DetailsNavVariantsContainer } from './../../animations/detailsNav';
import { useSelector } from 'react-redux';
import { Books } from './../../Data';
import { DetailsNavCurrentBook } from './DetailsNavCurrentBook';
import { DetailsNavBookView } from './DetailsNavBookView';
import { HOME, VIEW_BOOK } from './../../Redux/Types';

export const DetailsNav = () => {
    const [current,setCurrent] = useState(0)
    const currentPage = useSelector((state)=>state.detailsNav.currentBook)
    console.log(currentPage);
    useEffect(()=>{
        setCurrent(currentPage),[currentPage]
    })
    return (
    <React.Fragment>
    {
        current===HOME? <DetailsNavCurrentBook/>:current===VIEW_BOOK?<DetailsNavBookView/>:null
    }
    </React.Fragment>
  )
}
