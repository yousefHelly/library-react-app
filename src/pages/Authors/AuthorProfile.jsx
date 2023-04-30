import React, { useEffect, useState } from 'react'
import { AuthorProfileHeader } from '../../components/Authors/AuthorProfileHeader';
import { useParams } from 'react-router-dom';
import { AuthorProfileContent } from '../../components/Authors/AuthorProfileContent';
import { ChangeDetailsNav } from '../../Redux/actions/AllActions';
import { HOME } from '../../Redux/Types';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export const AuthorProfile = () => {
    const {author} = useParams()
    const [authorData,setAuthorData] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(ChangeDetailsNav(HOME))
      axios.get(`http://localhost:4000/getAuthor/${author}`).then((res)=>{
        setAuthorData(res.data)
      })
    },[])
  return (
    <React.Fragment>
    <AuthorProfileHeader  authorName={author}/>
    <AuthorProfileContent authorName={author} authorData = {authorData} booksCount = {authorData.length}/>
    </React.Fragment>
  )
}
