import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAuthors, GetAllBooks, GetAllMyBooks, GetAllUsers, GetAuthorData, GetCategoryBooks, GetSearchHistory } from '../../Redux/actions/AllActions'

export const Pagination = ({page='books',category,id ,author}) => {
    const dispatch = useDispatch()
    //books page
    const AllPages = useSelector((state)=>state.booksData.totalPages)
    const currentPage = useSelector((state)=>state.booksData.currentPage) || 0
    //authors page
    const authorAllPages = useSelector((state)=>state.authorsData.totalPages)
    const authorCurrentPage = useSelector((state)=>state.authorsData.currentPage)
    //all users page
    const usersAllPages = useSelector((state)=>state.usersData.totalPages)
    const userCurrentPage = useSelector((state)=>state.usersData.currentPage)
    //search history
    const historyAllPages = useSelector((state)=>state.searchHistoryData.totalPages)
    const historyUserId = useSelector((state)=>state.searchHistoryData.userId)
    const historyCurrentPage = useSelector((state)=>state.searchHistoryData.currentPage)
    //const searchValue = useSelector((state)=>state.searchValue)
    const handlePageClick = (pageNum)=>{
        //dispatch(searchMovies(searchValue,pageNum.selected + 1))
        page==='books'&& !id?dispatch(GetAllBooks(pageNum.selected)):page==='category'?dispatch(GetCategoryBooks(category,pageNum.selected)):page==='searchHistory'?dispatch(GetSearchHistory(historyUserId,pageNum.selected)):page==='allUsers'?dispatch(GetAllUsers(pageNum.selected)):page==='authorProfile'?dispatch(GetAuthorData(author,pageNum.selected)): dispatch(GetAllAuthors(pageNum.selected))
        id?page==='books'&&dispatch(GetAllMyBooks(id,pageNum.selected)):null
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
            pageCount={page==='books'|| page ==='category'?AllPages:page==='searchHistory'?historyAllPages:page==='allUsers'?usersAllPages:authorAllPages}
            previousLabel="Prev"
            containerClassName='btn-group justify-center m-4'
            pageClassName='btn btn-md px-0'
            pageLinkClassName='w-full h-full px-4 flex justify-center items-center'
            previousClassName='btn btn-md px-0'
            previousLinkClassName='w-full px-4 h-full flex justify-center items-center'
            nextClassName='btn btn-md px-0'
            nextLinkClassName='w-full px-4 h-full flex justify-center items-center'
            breakClassName='btn btn-md px-0'
            breakLinkClassName='w-full h-full flex justify-center items-center'
            activeClassName='btn btn-md btn-active'
            activeLinkClassName='w-full h-full flex justify-center items-center'
            forcePage={page==='books'|| page ==='category'?currentPage:page==='searchHistory'?historyCurrentPage:page==='allUsers'?userCurrentPage:authorCurrentPage}
        />
    </React.Fragment>
  )
}
