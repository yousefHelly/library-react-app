import React, { useEffect, useState } from 'react'
import { AuthorProfileHeader } from '../../components/Authors/AuthorProfileHeader';
import { useParams } from 'react-router-dom';
import { AuthorProfileContent } from '../../components/Authors/AuthorProfileContent';
import { ChangeDetailsNav, GetAuthorData } from '../../Redux/actions/AllActions';
import { HOME } from '../../Redux/Types';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from './../../components/layout/Pagination';

export const AuthorProfile = () => {
    const {author} = useParams()
    const [authorData,setAuthorData] = useState([])
    const dispatch = useDispatch()
    const currentPage = useSelector((state)=>state.authorsData.currentPage) || 0
    useEffect(()=>{
      dispatch(ChangeDetailsNav(HOME))
      document.title=`Library | ${author}`
      dispatch(GetAuthorData(author,currentPage))
    },[])
    const authorBooks = useSelector((state)=>state.authorsData.authorBooks)
    useEffect(()=>{
      setAuthorData(authorBooks)
    },[authorBooks])

  return (
    <React.Fragment>
    <AuthorProfileHeader  authorName={author}/>
    <AuthorProfileContent authorName={author} authorData = {authorData} booksCount = {authorData.length}/>
    <div className='w-full flex items-center justify-center'>
    {authorBooks&&authorBooks.length>0&&<Pagination page='authorProfile' author={author}/>}
    </div>
    </React.Fragment>
  )
}
