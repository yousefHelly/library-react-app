import React from 'react'
import { authors } from '../../Data';
import { AuthorProfileHeader } from '../../components/Authors/AuthorProfileHeader';
import { useParams } from 'react-router-dom';
import { AuthorProfileContent } from '../../components/Authors/AuthorProfileContent';

export const AuthorProfile = () => {
    const {author} = useParams()
  return (
    authors.map((auth)=>{
        return(
            author===auth.name&&
            <React.Fragment>
            <AuthorProfileHeader auth = {auth}/>
            <AuthorProfileContent auth={auth}/>
            </React.Fragment>
        )
    })
  )
}
