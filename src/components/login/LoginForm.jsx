import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import  * as Yup  from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { motion } from 'framer-motion';
import { childVariants } from './../../animations/home';
import { leftContainerVariants } from '../../animations/settings';
import { Users } from '../../Data';
import { useDispatch } from 'react-redux';
import { ChangeCurrentUser } from '../../Redux/actions/AllActions';
export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
        if(Users.some((user)=>user.userMail === email && user.userPassword === password)){
          const currentUser = Users.filter((user)=>user.userMail===email && user.userPassword === password)
          dispatch(ChangeCurrentUser(currentUser[0]));
          navigate('/',{
            replace:true
          })
        }
        else{
          console.log(password);
        }
      }
    }
    >{
      ({errors,touched})=>{
        return(
          <Form className='flex flex-col w-full gap-2'>
            <label className='font-bold' htmlFor='email'>Email</label>
            <Field className={`input input-bordered rounded-full focus:input-primary ${errors.email&&touched.email?'input-error':''}`} name='email' id='email' type='email'/>
            <ErrorMessage component='div' name='email'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
            <label className='font-bold' htmlFor='password'>Password</label>
            <Field className={`input input-bordered rounded-full focus:input-primary ${errors.password&&touched.password?'input-error':''}`} name='password' id='password' type='password'/>
            <ErrorMessage component='div' name='password'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
            <Link className='text-primary font-bold text-sm self-end mt-2'>Forgot Password?</Link>
            <input className='btn btn-primary capitalize my-4 rounded-full' type="submit" value='Login'/>
          </Form>
        )
      }
    }
    </Formik>
    </div>
  </motion.div>
  )
}
