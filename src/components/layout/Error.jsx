import React from 'react'
import svg from '../../assets/imgs/undraw_reading_book.svg'
import { useNavigate } from 'react-router-dom';
export const Error = () => {
  const navigate = useNavigate() 
  return (
    <div className="flex flex-col pt-[20px] items-center justify-center gap-5">
      <div className="w-[40vh] md:w-[60vh]"><img className="w-full h-full" src={svg}/></div>
      <h4 className="text-5xl font-bold uppercase text-primary text-center">Error 404</h4>
      <p className="text-md font-bold sec">Page Not Found</p>
      <button onClick={()=>navigate('/')} className="btn btn-primary btn-outline"> back to home</button>
    </div>
  )
}
