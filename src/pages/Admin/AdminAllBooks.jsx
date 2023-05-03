import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { ContainerVariants, cardChildVariants, childVariants } from '../../animations/home';
import { BookGridViewSearch } from '../../components/Search/BookGridViewSearch';
import {BiBookAdd} from 'react-icons/bi'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllBooks } from '../../Redux/actions/AllActions';
import { AdminViewAll } from '../../components/Admin/AdminViewAll';
import { Pagination } from '../../components/layout/Pagination';
export const AdminAllBooks = () => {
    const dispatch = useDispatch()
    const [Books,setBooks] = useState([])
    const [deleteDialog,setDeleteDialog] = useState(false)
    const [deletedBook,setDeletedBook] = useState({})
    const currentPge = useSelector((state)=>state.booksData.currentPage) || 0
    useEffect(()=>{
        dispatch(GetAllBooks(currentPge))
    },[])
    const booksData = useSelector((state)=>state.booksData.Books)
    useEffect(()=>{
        setBooks(booksData.books)
        console.log(booksData);

    },[booksData])
    const showDeleteDialog=(book)=>{
        setDeleteDialog(true)
        setDeletedBook(book)
    }
    const handleDelete = async()=>{
        const deleteBook =  await axios.delete(`http://localhost:4000/books/${deletedBook.book_id}`)
        const res =  await deleteBook.data
        setDeleteDialog(false)
        console.log(res.msg);
        toast.success(res.msg,{
            theme:'dark',
            position:'top-right'
        })
    }

  return (
    <React.Fragment>
        <AdminViewAll type={'book'} addIcon={<BiBookAdd/>}>
            {
                Books&&
                Books.map((book,i)=>{
                return(
                    <motion.span key={i} variants={cardChildVariants} className=' hover:bg-primary hover:text-slate-50 transition duration-300 pb-4'>
                    <BookGridViewSearch book={book} index={book.book_id}/>
                    <div className='w-full flex gap-4 items-center justify-center'>
                    <Link to={`/admin/add-edit-book/${book.book_id}`} className='btn btn-secondary'>edit</Link>
                    <button onClick={()=>showDeleteDialog(book)} className='btn btn-error'>Delete</button>
                    </div>
                    </motion.span>
                )
                })
            }
        </AdminViewAll>
        <AnimatePresence>
        {
            deleteDialog &&
            <Dialog static className='modal-bg' open={deleteDialog} onClose={()=>setDeleteDialog(false)}>
            <Dialog.Panel key='logout' as={motion.div} initial={{y:'-100%',x:'-50%',opacity:0}} animate={{y:'-50%',x:'-50%',opacity:1}} exit={{y:'-100%',x:'-50%',opacity:0}} className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary p-12 rounded-xl shadow-md flex justify-center items-center gap-8 flex-col text-slate-50'>
            <Dialog.Title className='text-2xl'>Are you sure you want to Delete {deletedBook.bookName} ?</Dialog.Title>
            <Dialog.Description className='sec text-lg'>you will delete all data and chapters for this book.</Dialog.Description>
            <div className='flex justify-center gap-5'>
                <button onClick={()=>handleDelete()} className='btn btn-error'>Delete</button>
                <button onClick={()=>setDeleteDialog(false)} className='btn btn-ghost'>Cancel</button>
            </div>
            </Dialog.Panel>
            </Dialog>
        }
        </AnimatePresence>
        <div className='w-full flex justify-center items-center'>
            {Books&&Books.length>0&&<Pagination/>}
        </div>
    <ToastContainer transition={Zoom}/>
    </React.Fragment>
  )
}
