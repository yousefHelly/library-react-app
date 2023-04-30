import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAuthors, GetAllBooks, GetSearchHistory } from '../../Redux/actions/AllActions'

export const Pagination = ({page='books'}) => {
    const dispatch = useDispatch()
    //books page
    const AllPages = useSelector((state)=>state.booksData.totalPages)
    const currentPage = useSelector((state)=>state.booksData.currentPage)
    //authors page
    const authorAllPages = useSelector((state)=>state.authorsData.totalPages)
    const authorCurrentPage = useSelector((state)=>state.authorsData.currentPage)
    //search history
    const historyAllPages = useSelector((state)=>state.searchHistoryData.totalPages)
    const historyUserId = useSelector((state)=>state.searchHistoryData.userId)
    const historyCurrentPage = useSelector((state)=>state.searchHistoryData.currentPage)
    //const searchValue = useSelector((state)=>state.searchValue)
    const handlePageClick = (pageNum)=>{
        //dispatch(searchMovies(searchValue,pageNum.selected + 1))
        page==='books'?dispatch(GetAllBooks(pageNum.selected)):page==='searchHistory'?dispatch(GetSearchHistory(historyUserId,pageNum.selected)):dispatch(GetAllAuthors(pageNum.selected))
        window.scrollTo({
            left:0,
            top:0,
            behavior:'smooth'
        })
    }
    const [range,setRange] = useState(0)
    useEffect(()=>{setRange(window.innerWidth>=500?2:window.innerWidth>=375?1:0)},[])
    window.addEventListener('resize',()=>{
        setRange(window.innerWidth>=500?2:window.innerWidth>=375?1:0)
    })
  return (
    <React.Fragment>
        <ReactPaginate
            breakLabel=".."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={range}
            marginPagesDisplayed={range}
            pageCount={page==='books'?AllPages:page==='searchHistory'?historyAllPages:authorAllPages}
            previousLabel="Prev"
            containerClassName='btn-group justify-center m-4'
            pageClassName='btn btn-md'
            pageLinkClassName='w-full h-full flex justify-center items-center'
            previousClassName='btn btn-md'
            previousLinkClassName='w-full h-full flex justify-center items-center'
            nextClassName='btn btn-md'
            nextLinkClassName='w-full h-full flex justify-center items-center'
            breakClassName='btn btn-md'
            breakLinkClassName='w-full h-full flex justify-center items-center'
            activeClassName='btn btn-md btn-active'
            activeLinkClassName='w-full h-full flex justify-center items-center'
            forcePage={page==='books'?currentPage:page==='searchHistory'?historyCurrentPage:authorCurrentPage}
        />
    </React.Fragment>
  )
}
