import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import {MdError} from 'react-icons/md'
const FormInput = ({children})=>{
    return(
        <div className='flex gap-2 flex-col col-span-6 px-6'>
        {children}
        </div>
    )
}
export const ProfileForm = () => {
  return (
    <Formik
    initialValues={{name:'Yousef', email:'yousef.helly@gmail.com', password:'password1234', phone:'+201552505996'}}
    validationSchema={Yup.object({
        name:Yup.string().min(2,'Must be at least 2 characters').max(15,'Must be 15 characters or less').required('Required'),
        email:Yup.string().email('Invalid Email').required('Required'),
        phone:Yup.string().min(13,'Must be at least 13 number starting with country code '),
        password:Yup.string().min(8,'Must be at least 8 characters')
    })}
    onSubmit={(values)=>console.log(values)}
    >
    {
        ({initialValues,errors,values,touched})=>{
            return(
                <Form className='grid my-5 gap-5 grid-cols-12'>
                <FormInput>
                <label htmlFor='name'>Name</label>
                <Field 
                type="text"
                name='name'
                className={`input input-bordered input-primary ${errors.name&&touched.name?'input-error':''}`}
                />
                <ErrorMessage component='div' name='name'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='email'>Email</label>
                <Field 
                type="email"
                name='email'
                className={`input input-bordered input-primary ${errors.email&&touched.email?'input-error':''}`}
                />
                <ErrorMessage component='div' name='email'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='phone'>Phone</label>
                <Field 
                type="text"
                name='phone'
                id='phone'
                className={`input input-bordered input-primary ${errors.phone&&touched.phone?'input-error':''}`}
                />
                <ErrorMessage component='div' name='phone'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <FormInput>
                <label htmlFor='password'>Password</label>
                <Field 
                type="password"
                name='password'
                id='password'
                className={`input input-bordered input-primary ${errors.password&&touched.password?'input-error':''}`}
                />
                <ErrorMessage component='div' name='password'>{msg=>{return(<React.Fragment><span className='text-error text-sm flex gap-3 items-center'><MdError/>{msg}</span></React.Fragment>)}}</ErrorMessage>
                </FormInput>
                <input className='btn btn-primary col-span-3 ml-6' type="reset" />
                <input disabled={initialValues===values?true:false} className='btn btn-primary col-span-4 mr-6' type="submit" />
                </Form>
            )
        }
    }
    </Formik>
  )
}
