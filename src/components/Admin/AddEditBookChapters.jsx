import React from 'react'
import { ErrorMessage, Field, FieldArray } from 'formik';
import { MdError } from 'react-icons/md';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer, Zoom, toast } from 'react-toastify';

export const AddEditBookChapters = ({values}) => {

  return (
    <React.Fragment>
    <FieldArray name='chapters'>
    {
        ({remove,push})=>{
            const handleRemoveChapter =  (chapter,index)=>{
                remove(index)
                if(chapter.id){
                    const removeChapter = axios.delete(`http://localhost:4000/chapter/${chapter.id}`)
                    removeChapter.then((res)=>console.log(res.data.msg))
                    toast.success('Chapter Deleted Successfully',{
                        position:'top-left',
                        theme:'dark'
                    })
                }
            }
            return(
            <div className='grid grid-cols-4 gap-4'>
            {
                values.chapters.length>0?
                values.chapters.map((chapter,index)=>{
                    return(
                        <motion.div initial={{y:-50,opacity:0}} animate={{y:0,opacity:1}} className='border rounded-xl col-span-2 p-4 flex gap-3 my-4 shadow-xl flex-col' key={chapter.id}>
                            <h3 className='text-2xl capitalize font-bold py-2'>chapter {index + 1}</h3>
                            <div className='grid grid-cols-4 gap-4'>
                                <label className='sec col-span-1 font-bold text-lg my-auto capitalize' htmlFor={`chapters[${index}].title`}>title</label>
                                <Field className='input col-span-3 input-primary' id={`chapters[${index}].title`} name={`chapters[${index}].title`}/>
                            </div>
                            <ErrorMessage component='div' name={`chapters[${index}].title`}>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            <div  className='grid grid-cols-4 gap-4'>
                                <label className='sec  col-span-1 font-bold text-lg my-auto capitalize' htmlFor={`chapters[${index}].description`}>description</label>
                                <Field as='textarea' className='textarea col-span-3 textarea-primary' id={`chapters[${index}].description`} name={`chapters[${index}].description`}/>
                            </div>
                            <ErrorMessage component='div' name={`chapters[${index}].description`}>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            <button disabled={index===0?true:false} className='btn btn-primary' onClick={()=>handleRemoveChapter(chapter,index)}>remove Chapter</button>
                        </motion.div>
                    )
                }):
                <h4 className='col-span-4 p-4 text-3xl m-auto'>No Chapters Available</h4>
            }
                <button
                type='button'
                className="btn btn-primary col-span-4 px-14 m-auto"
                onClick={() => push({ title: '', description: '' })}>
                Add Chapter
                </button>
            </div>
            )
        }
        
    }
    </FieldArray>
    <ToastContainer transition={Zoom}/>
    </React.Fragment>
  )
}
