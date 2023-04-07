import React from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from './../../animations/home';
import { Form, Formik, Field } from 'formik';
import * as Yup  from 'yup';
import { useParams } from 'react-router-dom';
import { Books } from '../../Data';

export const AddEditBook = () => {
    const {id} = useParams()
    return (
    <Formik 
    initialValues={{
        //Book Description
        BookName:`${id?Books[id].BookName:''}`,
        BookPlot:`${id?Books[id].BookPlot:''}`,
        BookPublicationDate:`${id?Books[id].BookPublicationDate:''}`,
        //Book Image
        BookImg:`${id?Books[id].BookImg:''}`,
        //Book Author
        BookAuthor:`${id?Books[id].BookAuthor:''}`,
        //Book Category
        BookCategory:`${id?Books[id].BookCategory:''}`,
        //Book Chapters
        BookChapters:`${id?Books[id].BookChapters:''}`,
        //Download Link
        pdf:`${id?Books[id].pdf:''}`
    }}
    onSubmit={
        (values)=>{
            console.log(values);
        }
    }
    validationSchema={Yup.object({
        BookImg:Yup.string().required('Book Image is Required'),
        BookName:Yup.string().required('Book Name is Required'),
        BookAuthor:Yup.string().required('Author is Required'),
        BookCategory:Yup.string().required('Book Category is Required'),
        BookChapters:Yup.string().required('Book Chapters is Required'),
        BookPlot:Yup.string().required('Book Plot is Required'),
        BookPublicationDate:Yup.string().required('Book Publication Date is Required'),
        pdf:Yup.string().required('pdf Link is Required')
    })}
    >
        <Form>
        <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
            <motion.h4 variants={childVariants} className='text-2xl'>Add/Edit Book</motion.h4>
            <motion.div variants={ContainerVariants} className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                <motion.div variants={childVariants} className='col-span-2'>
                <h4  className='text-2xl my-4'>Book Description</h4>
                <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                    <label htmlFor='BookName' className='sec font-bold'>Book Name</label>
                    <Field className='input input-primary' name='BookName' id='BookName'/>
                    <label htmlFor='BookPlot' className='sec font-bold'>Book Plot</label>
                    <Field className='textarea textarea-primary' name='BookPlot' id='BookPlot'/>
                    <label htmlFor='BookPublicationDate' className='sec font-bold'>Book Publication Date</label>
                    <Field className='input input-primary' name='BookPublicationDate' id='BookPublicationDate'/>
                </div>
                </motion.div>  
                <motion.div variants={childVariants} className='col-span-2'>
                    <h4 className='text-2xl'>Book Img</h4>
                </motion.div>
                <motion.div variants={childVariants} className='col-span-2'>
                <h4 className='text-2xl'>Category</h4>
                </motion.div>
                <motion.div  variants={childVariants} className='col-span-2'>
                    <h4 className='text-2xl'>Author</h4>
                </motion.div>
                <div className='col-span-2'>
                <motion.button variants={childVariants} className='btn btn-primary'>Reset</motion.button>
                <motion.button variants={childVariants} className='btn btn-primary'>Confirm</motion.button>
                </div>
            </motion.div>
        </motion.div>
        </Form>
    </Formik>
    )
}
