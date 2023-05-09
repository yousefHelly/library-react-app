import React, { useRef ,useState, Fragment, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { NavLink} from 'react-router-dom'
import {FaBars, FaSearch, FaChevronUp} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import { SideNav } from './SideNav'
import { Dialog } from '@headlessui/react'
import { AnimatePresence , motion, useMotionValueEvent, useScroll} from 'framer-motion'
import { DetailsNav } from './DetailsNav/DetailsNav';
import { useDispatch, useSelector } from 'react-redux'
import { openNav, closeNav, GetSearchHistory, ShowNotification } from '../../Redux/actions/AllActions'
import CryptoJS,{ AES } from 'crypto-js'
import { FAILED, SECRET, SUCCESS } from './../../Redux/Types';
import { ChangeCurrentUser } from './../../Redux/actions/AllActions';
import { ToastContainer, Zoom, toast } from 'react-toastify'
const ScrollToTopBtn = ({currentPage})=>{
    const [showBtn, setShowBtn] = useState(false)
    const r = 20
    const circle = useRef(0)
    let circumference = 2*Math.PI*20
    const {scrollYProgress} = useScroll();
    useMotionValueEvent(scrollYProgress,'change',(latest)=>{
        latest>=0.15?setShowBtn(true):setShowBtn(false)
        circle.current.style.strokeDashoffset = circumference - (circumference*latest)
    })
    return(
        <React.Fragment>
        <motion.div whileHover={{scale:1.25}} whileTap={{scale:0.9}} className={`fixed right-4 ${currentPage!=null?'xl:right-[22rem]':''} bottom-4 z-10`}>
        <svg width='50' height='50' className='-rotate-90'>
            <motion.circle ref={circle} className='fill-none stroke-secondary stroke-2' style={{strokeDasharray:`${2*Math.PI*20}px`,strokeDashoffset:`${circumference}px`}} r={`${r}px`} cx='25' cy='25'></motion.circle>
        </svg>
        <AnimatePresence>
        {
            showBtn && <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><FaChevronUp onClick={()=>window.scrollTo({top:0,left:0,behavior:'smooth'})} className='absolute cursor-pointer right-4 bottom-4 pr-[2px] pb-[2px] text-secondary'/></motion.span>
        }
        </AnimatePresence>
        </motion.div>
        </React.Fragment>
    )
}

export const NavBar = () => {
    const searchInput = useRef()
    const [searchIcon,setSearchIcon] = useState(true)
    const [searchQuery,setSearchQuery] = useState('')
    const sideNav = useSelector((state)=>state.nav.sideNavOpen)
    const dispatch = useDispatch()
    const notificationMsg = useSelector((state)=>state.nav.notification.msg)
    const notificationType = useSelector((state)=>state.nav.notification.type)
    useEffect(()=>{
        (notificationMsg&&notificationType===SUCCESS)?
        toast.success(`${notificationMsg}`,{
            position:'top-right',
            theme:'dark'
        }):(notificationMsg&&notificationType===FAILED)&&
        toast.error(`${notificationMsg}`,{
            position:'top-right',
            theme:'dark'
        })
        setTimeout(()=>{
            dispatch(ShowNotification(null,null))
        },5000)
    },[notificationMsg])

    const searchText =()=>{
        if(searchInput.current.value != ''){
            setSearchIcon(false)
        }else{
            setSearchIcon(true)
        }
    }
    const navigate = useNavigate()
    useEffect(()=>{
        //if there is a user session decrypt and dispatch User data else navigate to login 
        if(sessionStorage.getItem('User')){
            const encryptedUser =  sessionStorage.getItem('User');
            const User = JSON.parse(AES.decrypt(encryptedUser,SECRET).toString(CryptoJS.enc.Utf8))
            dispatch(ChangeCurrentUser(User))
        }else{
            navigate('/login')
        }
    },[])
    const User = useSelector((state)=>state.user.currentUser)
    const currentPage = useSelector((state)=>state.detailsNav.currentBook)
    const handleKeyDown = (event)=>{
        if(event.key==='Enter' && searchQuery!=''){
            navigate(`/search?value=${searchQuery}`)
            searchInput.current.value = ''
            setSearchIcon(true)
            setTimeout(()=>{
                dispatch(GetSearchHistory(User.user_id,0))
            },100)
        }
    }
  return (
    <React.Fragment>
        <div className='grid grid-cols-12 mx-auto overflow-x-hidden'>
            <div className={`relative w-full px-10 col-span-12 ${currentPage!=null?' xl:col-span-9':''}`}>
                <div className='flex h-[80px] items-center justify-between'>
                    <div className='flex h-full items-center justify-center'>
                        <button className='self-center'  onClick={()=>dispatch(openNav)}>    
                        {
                            sideNav?
                            <AiOutlineClose className='text-xl mr-5 hover:text-primary cursor-pointer'/> 
                            :
                            <FaBars className='text-xl mr-5 hover:text-primary cursor-pointer'/> 
                        } 
                        </button>
                        <ul className='flex gap-8 lg:gap-16 md:px-12 lg:text-lg md:border-b-[0.25rem] border-zinc-100'>
                            <li className='py-3'><NavLink className='sec transition' to='/'>Books</NavLink></li>
                            <li className='py-3'><NavLink className='sec transition' to='/categories'>Categories</NavLink></li>
                            <li className='py-3'><NavLink className='sec transition' to='/authors'>Authors</NavLink></li>
                        </ul>
                    </div>
                    <div className='hidden lg:block relative self-center'>
                        <input ref={searchInput} onKeyDown={handleKeyDown} onChange={(e)=>{setSearchQuery(e.target.value);searchText()}}  type='search' className='px-3 w-[18rem] py-2 border rounded-full bg-zinc-50 focus-within:outline-none' placeholder='Book Name or Author'/>
                        {searchIcon&& <FaSearch className='absolute right-[15px] top-[10px] text-xl text-zinc-400'/>}
                    </div>
                    <AnimatePresence>
                        {
                            sideNav &&
                            <Dialog static  as={motion.div} className='modal-bg' open={sideNav} onClose={()=>dispatch(closeNav)}>
                            <Dialog.Panel>
                                <SideNav/>
                            </Dialog.Panel>
                            </Dialog>
                        }
                    </AnimatePresence>
                </div>
                <ScrollToTopBtn currentPage = {currentPage}/>
                <Outlet/>
            </div>
                {
                    currentPage!=null&&
                    <div className='hidden xl:block col-span-3 relative'>
                    <div className='w-1/4 h-screen bg-secondary fixed'>
                            <DetailsNav/>
                    </div>
                    </div>
                }
        </div>
        <ToastContainer transition={Zoom}/>
    </React.Fragment>
  )
}
