import React,{useEffect} from 'react'

export const Authors = () => {
  useEffect(()=>{document.title = 'Library | Authors'},[])
  return (
    <div>Authors</div>
  )
}
