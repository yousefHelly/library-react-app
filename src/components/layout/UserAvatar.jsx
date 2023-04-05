import React from 'react'
import * as Avatar from '@radix-ui/react-avatar';
import img from '../../assets/imgs/wp1901420-tame-impala-wallpapers.jpg'
export const UserAvatar = ({size=24}) => {
  return (
    <Avatar.Root className={`avatar w-${size} h-${size} col-span-1`}>
    <Avatar.Image
        className={`rounded-full h-full w-full`}
        src={img}
        alt="User Avatar"
    />
    <Avatar.Fallback className="avatar w-24 h-24 flex items-center justify-center rounded-full bg-slate-400  text-3xl font-bold " delayMs={50}>
        YH
    </Avatar.Fallback>
</Avatar.Root>
  )
}
