import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsNavVariantsContainer } from '../../../animations/detailsNav';
import * as Slider from '@radix-ui/react-slider';
import { useSearchParams } from 'react-router-dom';
import { cats, authors } from '../../../Data';

export const DetailsNavSearch = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    //All Category state and ref
    const [catAll,setCatAll] = useState(true)
    const catAllRef = useRef(0)
    //All author state and ref
    const [AuthorsAll,setAuthorsAll] = useState(true)
    const AuthorsAllRef = useRef(0)
    //All Publication Date state
    const [PDVal,setPDVal] = useState({0:1800,1:2023})
    //make All in Category is default 
    useEffect(()=>{
        catAllRef.current.checked = catAll
        catAll&&searchParams.set('category','All')
        catAll&&setSearchParams(searchParams)
    },[catAll])
    //make All in author is default 
    useEffect(()=>{
        AuthorsAllRef.current.checked = AuthorsAll
        AuthorsAll&&searchParams.set('author','All')
        AuthorsAll&&setSearchParams(searchParams)
    },[AuthorsAll])
    //make [minimum-maximum] in Publication Date is default 
    useEffect(()=>{
        PDVal&&searchParams.set('publication date',`${PDVal[0]},${PDVal[1]}`)
        PDVal&&setSearchParams(searchParams)
    },[PDVal])
    //Handling all filtration types and pass them to the url
    const handleClicked = (checked,name,type)=>{
        if(type==='slider'){
            searchParams.set('publication date',`${checked[0]},${checked[1]}`)
            setSearchParams(searchParams)
        }else{
            let checkedFields = []
            //make sure searchParam values Doesn't equal All or nothing
            searchParams.get(`${type}`)!='All'&&searchParams.get(`${type}`)!=''&&checkedFields.push(searchParams.get(`${type}`).split('&'))
            //filtering all repeated values
            checkedFields = [...new Set(...checkedFields)]
            //uncheck 'All' checkbox from either category or author based on the name parameter
            const catsNames = []
            cats.map((cat)=>{
                catsNames.push(cat.name)
                return catsNames
            })
            catsNames.includes(name)?setCatAll(false):setAuthorsAll(false)
            //tracking if user checked or unchecked the input 
            if(checked){
                //adding the filed if it's not found in the checkedFields array
                if(!checkedFields.includes(name)){
                    checkedFields.push(`${name}`)
                }
                //passing all checkedFields to the url with the same type
                searchParams.set(`${type}`,checkedFields.join('&'))
                setSearchParams(searchParams)
            }else{
                //if checkedFields includes the unchecked filed
                if(checkedFields.includes(name)){
                    //filter checkedFields and remove unchecked filed
                    checkedFields = checkedFields.filter((cat)=>cat!=name)
                    //reset and pass all checkedFields to the url with the same type
                    searchParams.set(`${type}`,checkedFields.join('&'))
                    setSearchParams(searchParams)
                    //if checkedFields is empty set all authors or category = true
                    checkedFields.length===0&&searchParams.get('category')==''?setCatAll(true):null
                    checkedFields.length===0&&searchParams.get('author')==''?setAuthorsAll(true):null
                }
            }
        }
    }
    return (
        <motion.div key='Search' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave' className='text-slate-50 w-full h-full flex px-10 flex-col justify-start  overflow-y-auto overflow-x-hidden'>
        <AnimatePresence mode='wait'>
            <div className='flex flex-col gap-5 pt-8'>
                <div className='category'>
                    <h4 className='text-xl pb-3'>Category</h4>
                    <div className='flex flex-col gap-3 pt-3 overflow-scroll max-h-[150px]'>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input ref={catAllRef} onChange={(e)=>setCatAll(e.target.checked)} type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">All</span> 
                        </label>
                        {
                            cats.map((category)=>{
                                //if all category is selected uncheck others
                                const ref = useRef(0)
                                useEffect(()=>{
                                    catAll?ref.current.checked = false : null
                                },[catAll])
                                return(
                                    <label key={category.name} className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                                    <input ref={ref} onChange={(e)=>handleClicked(e.target.checked,category.name,'category')} type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text text-slate-50">{category.name}</span> 
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='h-[1px] bg-slate-400'></div>
                <div className='author'>
                    <h4 className='text-xl'>Author</h4>
                    <div className='flex flex-col gap-3 pt-4 overflow-scroll max-h-[150px]'>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input ref={AuthorsAllRef} onChange={(e)=>setAuthorsAll(e.target.checked)} type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">All</span> 
                        </label>
                        {
                            authors.map((author)=>{
                                //if all author is selected uncheck others
                                const ref2 = useRef(0)
                                useEffect(()=>{
                                    AuthorsAll?ref2.current.checked = false : null
                                },[AuthorsAll])
                                return(
                                    <label key={author.name} className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                                    <input ref={ref2} onChange={(e)=>handleClicked(e.target.checked,author.name,'author')}  type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text text-slate-50">{author.name}</span> 
                                    </label>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='h-[1px] bg-slate-400'></div>
                <div className='flex flex-col gap-2'>
                <h4 className='text-xl pb-3'>Publication Date</h4>
                <Slider.Root onValueCommit={(val)=>handleClicked(val,'Date','slider')} onValueChange={(val)=>setPDVal({0:val[0],1:val[1]})} className="SliderRoot relative flex items-center h-[20px]" defaultValue={[1800,2023]} min={1800} max={2023} step={1} minStepsBetweenThumbs={1} aria-label="Volume">
                    <Slider.Track className="bg-red-500  relative rounded-full flex-1 h-[3px]">
                        <Slider.Range className="SliderRange bg-primary absolute rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="SliderThumb hover:bg-primary"/>
                    <Slider.Thumb className="SliderThumb hover:bg-primary"/>
                </Slider.Root>
                <div className='flex flex-col'>
                <div className='flex justify-between'>
                <p>1800</p>
                <p>2023</p>
                </div>
                <div className='flex pt-4 gap-4 items-center'>
                <p>From Date</p>
                <input className='w-14 py-1 bg-slate-50 text-center rounded-md text-secondary' value={PDVal[0]} type="text" readOnly/>
                <p className=''>To</p>
                <input className='w-14 py-1 bg-slate-50 text-center rounded-md text-secondary' value={PDVal[1]} type="text" readOnly/>
                </div>
                </div>
                </div>
            </div>
        </AnimatePresence>
        </motion.div>
    )
}
