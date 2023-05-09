import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from './../../animations/home';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup  from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { cats } from '../../Data';
import Select from 'react-select';
import { AddEditBookDes } from '../../components/Admin/AddEditBookDes';
import { FileUpload } from '../../components/Admin/FileUpload';
import { AddEditBookChapters } from '../../components/Admin/AddEditBookChapters';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN, FAILED, SUCCESS } from '../../Redux/Types';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { ShowNotification } from '../../Redux/actions/AllActions';
const categoryOptions = []
cats.map((cat)=>{
    categoryOptions.push({
        value:cat.name,
        label:cat.name
    })
})
export const AdminAddEditBook = () => {
    let {id} = useParams()
    const User = useSelector((state)=>state.user.currentUser)
    const dispatch = useDispatch()
    const [currentBook,setCurrentBook] = useState({})
    const [chapters,setChapters] = useState([])
    useEffect(()=>{
        if(id && User.type===ADMIN){
            const bookData = axios.get(`http://localhost:4000/books/${id}`)
            bookData.then((res)=>setCurrentBook(...[res.data]))
            const ChaptersData = axios.get(`http://localhost:4000/chapter/${id}`)
            ChaptersData.then((res)=>setChapters(...[res.data]))
        }
    },[])
    const ImgRef = useRef(null)
    const fileRef = useRef(null)
    const navigate = useNavigate()
    const AddEditValidation  = Yup.object({
        BookImg:Yup.mixed().required('Book image is Required')
        .test("is-img-to-big", "image exceeds 5MB", () => {
            let valid = true;
            const files = ImgRef?.current?.files;
            if (files) {
                const fileArr = Array.from(files);
                fileArr.forEach((file) => {
                const size = file.size / 1024 / 1024;
                if (size > 10) {
                    valid = false;
                }
                });
            }
            return valid;
            }).test(
            "img-of-correct-type",
            "image is not of supported type",
                () => {
                let valid = true;
                const files = ImgRef?.current?.files;
                if (files) {
                const fileArr = Array.from(files);
                fileArr.forEach((file) => {
                const type = file.type.split("/")[1];
                const validTypes = ['jpeg','png','jpg','webp']
                if (!validTypes.includes(type)) {
                    valid = false;
                }
                });
                }
                return valid;
            }
            ),
        BookName:Yup.string().required('Book Name is Required').min(5,'Book Name Should Be At Least 5 Characters'),
        BookAuthor:Yup.string().required('Author is Required'),
        chapters:Yup.array().of(
            Yup.object().shape({
                id:Yup.number(),
                title:Yup.string().required('Chapter title is Required'),
                description:Yup.string().required('Chapter Description is Required'),
            })
        ),
        BookCategory:Yup.string().required('Book Category is Required'),
        BookPlot:Yup.string().required('Book Plot is Required').min(25,'Book Plot Should Be At Least 25 Characters'),
        BookPublicationDate:Yup.string().required('Book Publication Date is Required'),
        pdf: Yup.mixed().required('Book pdf is Required')
        .test("is-file-too-big", "File exceeds 20MB", () => {
            let valid = true;
            const files = fileRef?.current?.files;
            if (files) {
                const fileArr = Array.from(files);
                fileArr.forEach((file) => {
                const size = file.size / 1024 / 1024;
                if (size > 20) {
                    valid = false;
                }
                });
            }
            return valid;
            }).test(
                "is-file-of-correct-type",
                "File is not of supported type",
                    () => {
                    let valid = true;
                    const files = fileRef?.current?.files;
                    if (files) {
                    const fileArr = Array.from(files);
                    fileArr.forEach((file) => {
                    const type = file.type.split("/")[1];
                    const validTypes = ['pdf']
                    if (!validTypes.includes(type)) {
                        valid = false;
                    }
                    });
                    }
                    return valid;
                }
                )
    }
    )
  return (
    <React.Fragment>
    <Formik 
    enableReinitialize
    initialValues={{
        //if there is a params in the page get it
        //+ send request to fetch the book data
        //+ put its values as initial values in the form
        //Book Description
        BookName:`${id?currentBook.bookName:''}`,
        BookPlot:`${id?currentBook.bookDescription:''}`,
        BookPublicationDate:`${id?currentBook.publicationDate:''}`,
        //Book Image
        BookImg:`${id?currentBook.image_url:''}`,
        //Book Author
        BookAuthor:`${id?currentBook.author:''}`,
        //Book Category
        BookCategory:`${id?currentBook.field:''}`,
        //Download Link
        pdf:`${id?currentBook.pdf_url:''}`,
        chapters:chapters.length>0?[...
            chapters.map((chapter,i)=>{
                return{
                    id:chapter.chapter_id,
                    title:chapter.title,
                    description:chapter.chapterDescription
                }
            })
    ]:[{
        id:'',
        title:'',
        description:''
    }]
    }}
    onSubmit={
        (values)=>{
            //set image and pdf values to their files to pass them to multer 
            values.BookImg = ImgRef.current.files[0]
            values.pdf = fileRef.current.files[0]
            if(id){
                //send book data without pdf and chapters 
                axios.put(`http://localhost:4000/updateAll/${id}`,{
                    bookName:values.BookName,
                    bookDescription:values.BookPlot,
                    author:values.BookAuthor,
                    field:values.BookCategory,
                    publicationDate:values.BookPublicationDate,
                    image:values.BookImg
                },{headers:{'Content-Type':'multipart/form-data'}})
                //take book id from respond and send the pdf in another request
                .then( (res)=>{
                    dispatch(ShowNotification(res.data.msg,SUCCESS))
                    axios.put(`http://localhost:4000/addPDF/${id}`,{pdf: fileRef.current.files[0]},{headers:{'Content-Type':'multipart/form-data'}})
                }
                )
                setTimeout(()=>{
                    values.chapters.map((chapter)=>{
                        if(chapter.id){
                            axios.put(`http://localhost:4000/chapter/${chapter.id}`,{
                                bookName:values.BookName,
                                title:chapter.title,
                                chapterDescription:chapter.description
                            })
                        }else{
                            axios.post(`http://localhost:4000/chapter`,{
                                bookName:values.BookName,
                                title:chapter.title,
                                chapterDescription:chapter.description
                            })
                        }
                })},250)
                setTimeout(()=>{
                    navigate('/admin/all-books')
                },1000)
            }
            else{
                //send book data without pdf and chapters 
                        axios.post('http://localhost:4000/books',{
                        bookName:values.BookName,
                        bookDescription:values.BookPlot,
                        author:values.BookAuthor,
                        field:values.BookCategory,
                        publicationDate:values.BookPublicationDate,
                        image:values.BookImg}
                        ,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
                            dispatch(ShowNotification(res.data.msg,SUCCESS))
                            axios.put(`http://localhost:4000/addPDF/${res.data.book_id[0].book_id}`,{pdf: fileRef.current.files[0]},{headers:{'Content-Type':'multipart/form-data'}})
                        }
                        ).then(()=>{
                            setTimeout(()=>{
                            values.chapters.map((chapter)=>{
                                axios.post(`http://localhost:4000/chapter`,{
                                    bookName:values.BookName,
                                    title:chapter.title,
                                    chapterDescription:chapter.description
                                })})
                            },250)
                            setTimeout(()=>{
                                navigate('/admin/all-books')
                            },1000)
                        }).catch((err)=>{
                            dispatch(ShowNotification(err.response.data.errors[0].msg,FAILED))
                        })
        }
    }
}
    validationSchema={AddEditValidation}
    >{
        ({values,handleBlur,setFieldValue,initialValues})=>{
            return(
                <Form>
                <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
                    <motion.h4 variants={childVariants} className='text-2xl'>Add/Edit Book</motion.h4>
                    <motion.div variants={ContainerVariants} className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        <motion.div variants={childVariants} className='col-span-2 row-span-2 mb-12'>
                            <h4  className='text-2xl my-4'>Book Description</h4>
                            <AddEditBookDes/>
                        </motion.div>  
                        <motion.div variants={childVariants} className='col-span-2'>
                            <h4 className='text-2xl my-4'>Book Image</h4>
                            <FileUpload name='BookImg'  id={id} type={'image'} fileRef={ImgRef}/>
                        </motion.div>
                        <motion.div variants={childVariants} className='col-span-2'>
                            <h4 className='text-2xl my-4'>Category</h4>
                            <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                                <label htmlFor='BookCategory' className='sec font-bold'>Choose category</label>
                                <Select
                                    id={"BookCategory"}
                                    type={"text"}
                                    value={categoryOptions.find((catOpt)=>catOpt.value === values.BookCategory)}
                                    onChange={option => setFieldValue("BookCategory", option.value)}
                                    options={categoryOptions}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage component='div' name={`BookCategory`}>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            </div>
                        </motion.div>
                        <motion.div  variants={childVariants} className='col-span-2'>
                            <h4 className='text-2xl my-4'>Author</h4>
                            <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                            <label htmlFor='BookAuthor' className='sec font-bold'>Author Name</label>
                            <Field className='input input-primary' name='BookAuthor' id='BookAuthor'/>
                            <ErrorMessage component='div' name={`BookAuthor`}>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            </div>
                        </motion.div>
                        <motion.div  variants={childVariants} className='col-span-2 row-span-2'>
                            <h4 className='text-2xl my-4'>PDF File</h4>
                            <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                            <label htmlFor='pdf' className='sec font-bold'>Book PDF</label>
                            <FileUpload name='pdf' id={id} type={'pdf'} fileRef={fileRef}/>
                            </div>
                        </motion.div>
                        <motion.div  variants={childVariants} className='col-span-4 row-span-2'>
                            <h4 className='text-2xl my-4'>Chapters</h4>
                            <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                                <label htmlFor='chapters' className='sec font-bold'>Book Chapters</label>
                                <AddEditBookChapters values={values}/>
                            </div>
                        </motion.div>
                        <div className='col-span-4 row-span-2 h-full w-full justify-center items-center my-4 flex gap-4'>
                            <motion.input type='reset' variants={childVariants} value='Reset' className='btn btn-primary'/>
                            <motion.input type='submit' disabled={initialValues===values?true:false}  value='Confirm' variants={childVariants} className='btn btn-primary px-12'/>                        
                        </div>
                    </motion.div>
                </motion.div>
                </Form>
            )
        }
        
    }
    </Formik>
    <ToastContainer transition={Zoom}/>
    </React.Fragment>
)
}
