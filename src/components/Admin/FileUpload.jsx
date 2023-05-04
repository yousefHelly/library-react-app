import { Field, useField } from 'formik'
import React, { useRef } from 'react'
import { ImFolderUpload } from 'react-icons/im'
import { MdError } from 'react-icons/md';

export const FileUpload = ({type,text = type, page='Default', id , fileRef, ...props }) => {
    const [field, meta] = useField(props);
    const {value, ...rest} = field;
    return (
        page==='Settings'?
        <div className=''>
        <label htmlFor={`${rest.name}`} className={`flex flex-col items-center cursor-pointer justify-center p-4`}>
        {
            value?
            <React.Fragment>
                {text==='image'&&<img src={!fileRef?.current?.files[0]?value:URL.createObjectURL(fileRef.current.files[0])} className='h-28 rounded-full'/>}
                <div className='flex items-center justify-center'>
                    <p className='sec text-2xl pl-1 py-2'>Update</p>
                </div>
            </React.Fragment>
            :                                
            <React.Fragment>
                <ImFolderUpload className='text-primary text-3xl m-6'/>
                <p className='sec'>Upload {text}</p>
            </React.Fragment>
        }
        <input hidden id={`${rest.name}`} ref={fileRef} type="file" {...rest} />
        </label>
        {meta.touched && meta.error ? (
        <span className='text-error text-sm flex gap-3 items-center'><MdError/>{ meta.error}</span>
        ) : null}
    </div>
        :
        <div className='border rounded-xl shadow-xl p-4 flex gap-2 flex-col'>
            <label htmlFor={`${rest.name}`} className={`flex flex-col items-center cursor-pointer justify-center p-4 border rounded-2xl`}>
            {
                value?
                <React.Fragment>
                    {text==='image'&&<img src={!fileRef?.current?.files[0]?value:URL.createObjectURL(fileRef.current.files[0])} className='h-48'/>}
                    <p className='sec w-full break-words text-center my-2'>{id?value:fileRef.current.files[0].name}</p>
                    <div className='flex items-center justify-center p-4'>
                        <p className='sec text-2xl'>Update</p>
                    </div>
                </React.Fragment>
                :                                
                <React.Fragment>
                    <ImFolderUpload className='text-primary text-3xl m-6'/>
                    <p className='sec'>Upload {text}</p>
                </React.Fragment>
            }
            <input hidden id={`${rest.name}`} ref={fileRef} type="file" {...rest} />
            </label>
            {meta.touched && meta.error ? (
            <span className='text-error text-sm flex gap-3 items-center'><MdError/>{ meta.error}</span>
            ) : null}
        </div>
    );
  };
