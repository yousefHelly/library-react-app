import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsNavVariants, DetailsNavVariantsContainer } from './../../animations/detailsNav';
import * as Slider from '@radix-ui/react-slider';
import { useSelector } from 'react-redux';
export const DetailsNavSearch = () => {
    const currentBook = useSelector((state)=>state.current.currentBook)
    return (
        <motion.div key='Search' variants={DetailsNavVariantsContainer} initial='init' animate='show' exit='leave' className='text-slate-50 w-full h-full flex px-10 flex-col justify-start  overflow-y-auto overflow-x-hidden'>
        <AnimatePresence mode='wait'>
            <div className='flex flex-col gap-5 pt-8'>
                <div className='category'>
                    <h4 className='text-xl pb-3'>Category</h4>
                    <div className='flex flex-col gap-3 pt-3 overflow-scroll max-h-[150px]'>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">All</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Social Novel</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Horror</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Short Story</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Depression</span> 
                        </label>

                    </div>
                </div>
                <div className='h-[1px] bg-slate-400'></div>
                <div className='author'>
                    <h4 className='text-xl'>Author</h4>
                    <div className='flex flex-col gap-3 pt-4 overflow-scroll max-h-[150px]'>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">All</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Charles Dickens</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">George Orwell</span> 
                        </label>
                        <label className="label pl-0 cursor-pointer flex justify-start gap-5 items-center">
                        <input type="checkbox" className="checkbox checkbox-primary" />
                        <span className="label-text text-slate-50">Scott Fitzgerald</span> 
                        </label>
                    </div>
                </div>
                <div className='h-[1px] bg-slate-400'></div>
                <div className='flex flex-col gap-2'>
                <h4 className='text-xl pb-3'>Publication Date</h4>
                <Slider.Root className="SliderRoot relative flex items-center h-[20px]" defaultValue={[0,100]} max={100} step={1} minStepsBetweenThumbs={1} aria-label="Volume">
                    <Slider.Track className="bg-red-500  relative rounded-full flex-1 h-[3px]">
                        <Slider.Range className="SliderRange bg-primary absolute rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="SliderThumb hover:bg-primary"/>
                    <Slider.Thumb className="SliderThumb hover:bg-primary"/>
                </Slider.Root>
                <div className='flex justify-between'>
                <p>1840</p>
                <p>2002</p>
                </div>
                </div>
            </div>
        </AnimatePresence>
        </motion.div>
      )
}
