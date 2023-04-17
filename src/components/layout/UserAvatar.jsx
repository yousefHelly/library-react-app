import React from 'react'
import * as Avatar from '@radix-ui/react-avatar';
import img from '../../assets/imgs/wp1901420-tame-impala-wallpapers.jpg'
import { useSelector } from 'react-redux';
export const UserAvatar = ({size=24}) => {
  const User = useSelector((state)=>state.user.currentUser)
  return (
    <Avatar.Root className={`avatar w-${size} h-${size} col-span-1`}>
    <Avatar.Image
        className={`rounded-full h-full w-full`}
        src={User.image_url}
        alt="User Avatar"
    />
    <Avatar.Fallback className="avatar w-24 h-24 flex items-center justify-center rounded-full bg-slate-400  text-3xl font-bold " delayMs={50}>
        {
          User.userName&&User.userName.charAt(0).toUpperCase()+User.userName.split(" ")[1].charAt(0).toUpperCase()  
        }
    </Avatar.Fallback>
</Avatar.Root>
  )
}
