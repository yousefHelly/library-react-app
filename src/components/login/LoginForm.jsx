import React,{useState} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import  * as Yup  from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { motion } from 'framer-motion';
import { childVariants } from './../../animations/home';
import { leftContainerVariants } from '../../animations/settings';
import { useDispatch } from 'react-redux';
import { ChangeCurrentUser } from '../../Redux/actions/AllActions';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { AES } from 'crypto-js';
import {ImEye,ImEyeBlocked} from 'react-icons/im'
import { SECRET } from './../../Redux/Types';
import axios from 'axios';
import { useRef } from 'react';
export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword,setShowPassword] = useState(false)
    const passRef = useRef(null)
    const loginError = (msg)=>{
      toast.error(msg,{
        theme:'dark',
        position:'top-left'
      })
    }
    const LogIn = ({login, message, user}, password)=>{
      if (login){
        passRef.current = password
        navigate('/',{
          replace:true
        })
        const userSession = {...user, password:passRef.current};
        const decryptedUser = AES.encrypt(JSON.stringify(userSession),SECRET).toString()
        sessionStorage.setItem('User',decryptedUser)          
        dispatch(ChangeCurrentUser(userSession));
      }else{
        loginError(message)
      }
    }
  return (
    <motion.div variants={leftContainerVariants} initial='init' animate='show' exit='exit' className='col-span-1 flex flex-col items-center justify-center h-screen'>
    <motion.div variants={childVariants}  className='text-start w-full px-12 lg:px-28 flex flex-col mb-8 gap-1'>
    <h4 className='text-3xl font-extrabold'>Login ✌</h4>
    <p className='sec text-xl'>How do i get started reading books ?</p>
    </motion.div>
    <motion.div variants={childVariants} className='flex flex-col gap-4 w-full mb-4 px-12 lg:px-28 items-center'>
    <button className='btn btn-ghost border border-secondary/10 capitalize w-full rounded-full gap-2 text-secondary/75'><FcGoogle className='text-2xl'/> Sign in with Google</button>
    <button className='btn btn-ghost border border-secondary/10 capitalize w-full rounded-full gap-2 text-secondary/75'><FaFacebook className='text-2xl text-primary'/> Sign in with Facebook</button>
    </motion.div>
    <div className="divider sec w-full px-12 lg:px-28 self-center text-xs font-bold">or Sign in with Email</div>
  <div className='w-full px-12 lg:px-28'>
    <Formik initialValues={{
      email:'',
      password:''
    }}
    validationSchema={Yup.object({
      email:Yup.string().email('Invalid Email').required('Required'),
      password:Yup.string().min(8,'Must be at least 8 characters').required('Required')
    })}
    onSubmit={
      ({email,password})=>{
          axios.post("http://localhost:4000/login",{
            email:email,
            password:password
          }).then((res)=>LogIn(res.data,password)).catch((err)=>loginError(err.response.data.errors[0].msg))
      }
    }
    >{
      ({errors,touched})=>{
        return(
          <Form className='flex flex-col w-full gap-2 relative'>
            <label className='font-bold' htmlFor='email'>Email</label>
            <Field className={`input input-bordered rounded-full focus:input-primary ${errors.email&&touched.email?'input-error':''}`} name='email' id='email' type='email'/>
            <ErrorMessage component='div' name='email'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
            <label className='font-bold' htmlFor='password'>Password</label>
            <span className='relative w-full'>           
            <Field className={`input input-bordered rounded-full w-full focus:input-primary ${errors.password&&touched.password?'input-error':''}`} name='password' id='password' type={`${showPassword?'text':'password'}`}/>
            {
              showPassword?
              <ImEyeBlocked onClick={()=>setShowPassword(!showPassword)} className='text-2xl sec absolute top-1/2 -translate-y-1/2 right-4 hover:text-primary cursor-pointer'/>
              :
              <ImEye onClick={()=>setShowPassword(!showPassword)} className='text-2xl sec absolute top-1/2 -translate-y-1/2 right-4 hover:text-primary cursor-pointer'/>
            }
            </span>
            <ErrorMessage component='div' name='password'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
            <Link className='text-primary font-bold text-sm self-end mt-2'>Forgot Password?</Link>
            <input className='btn btn-primary capitalize my-4 rounded-full' type="submit" value='Login'/>
          </Form>
        )
      }
    }
    </Formik>
    </div>
    <ToastContainer transition={Zoom} />
  </motion.div>
  )
}
