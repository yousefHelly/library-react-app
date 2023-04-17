import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { MdError } from 'react-icons/md'

export const AddEditBookDes = () => {
  return (
    <div className='border rounded-xl shadow-xl p-4 h-full flex gap-2 flex-col'>
        <label htmlFor='BookName' className='sec font-bold'>Book Name</label>
        <Field className='input input-primary' name='BookName' id='BookName'/>
        <ErrorMessage component='div' name='BookName'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
        <label htmlFor='BookPlot' className='sec font-bold'>Book Plot</label>
        <Field className='textarea textarea-primary h-52' as="textarea" name='BookPlot' id='BookPlot'/>
        <ErrorMessage component='div' name='BookPlot'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
        <label htmlFor='BookPublicationDate' className='sec font-bold'>Book Publication Date</label>
        <Field className='input input-primary' name='BookPublicationDate' id='BookPublicationDate'/>
        <ErrorMessage component='div' name='BookPublicationDate'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
    </div>
  )
}
