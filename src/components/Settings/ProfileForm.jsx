import React, { useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import {MdError} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { childVariants } from '../../animations/home';
import { UserAvatar } from '../layout/UserAvatar';
import axios from 'axios';
import { FileUpload } from '../Admin/FileUpload';
import { ACTIVE, SECRET } from '../../Redux/Types';
import { useNavigate } from 'react-router-dom';
import { AES } from 'crypto-js';
import { ChangeCurrentUser } from '../../Redux/actions/AllActions';
const FormInput = ({children})=>{
    return(
        <div className='flex gap-2 flex-col col-span-6 px-6'>
        {children}
        </div>
    )
}
export const ProfileForm = () => {
    const [showPassword,setShowPassword] = useState(false)
    const ImgRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state)=>state.user.currentUser)
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
        Email:Yup.string().email('Invalid Email').required('Email is required'),
        Password:Yup.string().required('Password is Required').min(8,'Password Should Be At Least 8 Characters'),
    })
  return (
    <Formik
    initialValues={{
        //User Info
        FirstName:`${User?User.userName&&User.userName.split(' ')[0]:''}`,
        LastName:`${User?User.userName&&User.userName.split(' ')[1]:''}`,
        Phone:`${User?User.phone:''}`,
        //Avatar Image
        Avatar:`${User?User.image_url:''}`,
        //Account Info
        Email:`${User?User.email:''}`,
        Password:`${User?User.password:''}`,
    }}
    validationSchema={AddEditValidation}
    onSubmit={(values)=>{
        const fullName = `${values.FirstName} ${values.LastName}`
        axios.put(`http://localhost:4000/reader/${User.user_id}`,{
            userName:fullName,
            email:values.Email,
            password:values.Password,
            phone:values.Phone,
            status:ACTIVE,
            image:ImgRef.current.files[0]
        },{headers:{'Content-Type':'multipart/form-data'}}).then(async(res)=>{
            const user = await res.data.user
            console.log(user);
            const decryptedUser = AES.encrypt(JSON.stringify(user),SECRET).toString()
            sessionStorage.setItem('User',decryptedUser)          
            dispatch(ChangeCurrentUser(res.data.user));
        })
        console.log(values);
        setTimeout(()=>{
            navigate('/')
        },1000)
    }}
    >
    {
        ({initialValues,errors,values,touched})=>{
            return(
                <Form className='grid my-5 gap-5 grid-cols-12'>
                <motion.div variants={childVariants} className='col-span-12 grid grid-cols-4 gap-5 items-center pb-5 border-b'>
                    <FileUpload page='Settings' name='Avatar' id={User.user_id} type={'image'} fileRef={ImgRef}/>
                    <div className='col-span-3 flex flex-col gap-3'>
                        <h3 className='text-3xl font-bold'>Avatar</h3>
                        <p className='sec'>600x600 or larger recommended</p>
                    </div>
                </motion.div>
                <h4 className='text-md font-bold col-span-12'>Personal Information</h4>
                <FormInput>
                <label htmlFor='FirstName'>First Name</label>
                <Field 
                type='text'
                name='FirstName'
                id='FirstName'
                className={`input input-bordered input-primary ${errors.FirstName&&touched.FirstName?'input-error':''}`}
                />
                <ErrorMessage component='div' name='name'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='LastName'>Last Name</label>
                <Field 
                type='text'
                name='LastName'
                id='LastName'
                className={`input input-bordered input-primary ${errors.LastName&&touched.LastName?'input-error':''}`}
                />
                <ErrorMessage component='div' name='name'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='Email'>Email</label>
                <Field 
                type='email'
                name='Email'
                id='Email'
                className={`input input-bordered input-primary ${errors.Email&&touched.Email?'input-error':''}`}
                />
                <ErrorMessage component='div' name='email'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='Phone'>Phone</label>
                <Field 
                type='text'
                name='Phone'
                id='Phone'
                className={`input input-bordered input-primary ${errors.Phone&&touched.Phone?'input-error':''}`}
                />
                <ErrorMessage component='div' name='phone'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
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
                </FormInput>
                <div className='col-span-12 grid grid-cols-12 gap-8 py-4'>
                <input className='btn btn-primary col-span-3 ml-6' type="reset" />
                <input disabled={initialValues===values?true:false} className='btn btn-primary col-span-4 mr-6' type="submit" />
                </div>
                </Form>
            )
        }
    }
    </Formik>
  )
}
