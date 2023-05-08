import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { ContainerVariants, childVariants } from './../../animations/home';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import * as Yup  from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { FileUpload } from '../../components/Admin/FileUpload';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { ACTIVE, ADMIN, INACTIVE, READER } from '../../Redux/Types';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
const StatusOptions = []
const Status = [ACTIVE,INACTIVE]
Status.map((status)=>{
    StatusOptions.push({
        value:status,
        label:status
    })
})

export const AdminAddEditUser = () => {
    let {id} = useParams()
    const User = useSelector((state)=>state.user.currentUser)
    const [currentUser,setCurrentUser] = useState({})
    const [showPassword,setShowPassword] = useState(false)
    useEffect(()=>{
        if(id && User.type===ADMIN){
            const UserData = axios.get(`http://localhost:4000/reader/${id}`)
            UserData.then((res)=>setCurrentUser(...[res.data]))
        }
    },[])
    const ImgRef = useRef(null)
    const navigate = useNavigate()
    const AddEditValidation  = Yup.object({
        Avatar:Yup.mixed().required('Avatar is Required')
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
        FirstName:Yup.string().required('First Name is Required').min(2,'First Name Should Be At Least 2 Characters'),
        LastName:Yup.string().required('Last Name is Required').min(2,'Last Name Should Be At Least 2 Characters'),
        Phone:Yup.string().required('Phone is Required').min(13,'Must be at least 13 number starting with country code '),
        Status:Yup.string().required('Status is Required'),
        Email:Yup.string().email('Invalid Email').required('Email is required'),
        Password:Yup.string().required('Password is Required').min(8,'Password Should Be At Least 8 Characters'),
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
        //User Info
        FirstName:`${id?currentUser.userName&&currentUser.userName.split(' ')[0]:''}`,
        LastName:`${id?currentUser.userName&&currentUser.userName.split(' ')[1]:''}`,
        Phone:`${id?currentUser.phone:''}`,
        //Avatar Image
        Avatar:`${id?currentUser.image_url:''}`,
        //Account Info
        Email:`${id?currentUser.email:''}`,
        Password:`${id?currentUser.password:''}`,
        //Account Status
        Status:`${id?currentUser.status:''}`
    }}
    onSubmit={
        (values)=>{
            //set image and pdf values to their files to pass them to multer 
            const fullName = `${values.FirstName} ${values.LastName}`
            console.log(ImgRef.current.files[0]);
            if(id){
                //send book data without pdf and chapters 
                axios.put(`http://localhost:4000/reader/${id}`,{
                    userName:fullName,
                    email:values.Email,
                    password:values.Password,
                    phone:values.Phone,
                    status:values.Status,
                    type:READER
                })
                if(ImgRef.current.files[0]){
                    axios.put(`http://localhost:4000/updateImg/${id}`,{
                        image:ImgRef.current.files[0],
                    },{headers:{'Content-Type':'multipart/form-data'}})
                }
            }
            else{
                //send book data without pdf and chapters 
                axios.post('http://localhost:4000/reader/',{
                    userName:fullName,
                    email:values.Email,
                    password:values.Password,
                    phone:values.Phone,
                    status:values.Status,
                    image:ImgRef.current.files[0],
                    type:READER
                }
                ,{headers:{'Content-Type':'multipart/form-data'}})
        }
        setTimeout(()=>{
            navigate('/admin/all-users')
        },1000)
    }
}
    validationSchema={AddEditValidation}
    >{
        ({values,handleBlur,setFieldValue,initialValues,errors,touched})=>{
            return(
                <Form>
                <motion.div variants={ContainerVariants} initial='init' animate='show' className='flex flex-col gap-6'>
                    <motion.h4 variants={childVariants} className='text-2xl'>Add/Edit User</motion.h4>
                    <motion.div variants={ContainerVariants} className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        <motion.div variants={childVariants} className='col-span-2 row-span-2 mb-12'>
                            <h4  className='text-2xl my-4'>User Info</h4>
                            <div className='border rounded-xl shadow-xl p-4 h-full flex gap-2 flex-col'>
                                <label htmlFor='FirstName' className='sec font-bold'>First Name</label>
                                <Field className='input input-primary' name='FirstName' id='FirstName'/>
                                <ErrorMessage component='div' name='FirstName'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                                <label htmlFor='LastName' className='sec font-bold'>Last Name</label>
                                <Field className='input input-primary' name='LastName' id='LastName'/>
                                <ErrorMessage component='div' name='LastName'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                                <label htmlFor='Phone' className='sec font-bold'>Phone</label>
                                <Field className='input input-primary' name='Phone' id='Phone'/>
                                <ErrorMessage component='div' name='Phone'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            </div>
                        </motion.div>  
                        <motion.div variants={childVariants} className='col-span-2'>
                            <h4 className='text-2xl my-4'>User Avatar</h4>
                            <FileUpload name='Avatar' id={id} type={'image'} fileRef={ImgRef}/>
                        </motion.div>
                        <motion.div variants={childVariants} className='col-span-2 row-span-2 mb-12'>
                        <h4  className='text-2xl my-4'>Account Info</h4>
                        <div className='border rounded-xl shadow-xl p-4 h-full flex gap-2 flex-col'>
                            <label htmlFor='Email' className='sec font-bold'>Email</label>
                            <Field className='input input-primary' name='Email' id='Email'/>
                            <ErrorMessage component='div' name='Email'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                            <label htmlFor='Password'>Password</label>
                            <span className='relative w-full'> 
                            <Field 
                            type={`${showPassword?'text':'password'}`}
                            name='Password'
                            id='Password'
                            className={`input w-full input-bordered input-primary ${errors.Password&&touched.Password?'input-error':''}`}
                            />          
                            {
                            showPassword?
                            <ImEyeBlocked onClick={()=>setShowPassword(!showPassword)} className='text-2xl sec absolute top-1/2 -translate-y-1/2 right-4 hover:text-primary cursor-pointer'/>
                            :
                            <ImEye onClick={()=>setShowPassword(!showPassword)} className='text-2xl sec absolute top-1/2 -translate-y-1/2 right-4 hover:text-primary cursor-pointer'/>
                            }
                            </span>
                            <ErrorMessage component='div' name='Password'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                        </div>
                    </motion.div>
                    <motion.div variants={childVariants} className='col-span-2'>
                        <h4 className='text-2xl my-4'>Account Status</h4>
                        <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
                        <label htmlFor='Status' className='sec font-bold'>Choose Status</label>
                        <Select
                        id={"Status"}
                        type={"text"}
                        value={StatusOptions.find((stOpt)=>stOpt.value === values.Status)}
                        onChange={option => setFieldValue("Status", option.value)}
                        options={StatusOptions}
                        onBlur={handleBlur}
                        />
                        <ErrorMessage component='div' name={`Status`}>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
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
    </React.Fragment>
)
}
