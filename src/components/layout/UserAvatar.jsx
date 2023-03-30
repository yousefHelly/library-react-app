import React from 'react'
import * as Avatar from '@radix-ui/react-avatar';

export const UserAvatar = ({size=24}) => {
  return (
    <Avatar.Root className={`avatar w-${size} h-${size} col-span-1`}>
    <Avatar.Image
        className={`rounded-full w-${size} h-${size}`}
        src="https://media.istockphoto.com/id/1290233518/photo/ginger-cat-portrait.jpg?s=612x612&w=0&k=20&c=V-_wnKjh4w4WqVLhe20t-9IUbUoF47odDU5683cr2LM="
        alt="User Avatar"
    />
    <Avatar.Fallback className="avatar w-24 h-24 flex items-center justify-center rounded-full bg-slate-400  text-3xl font-bold " delayMs={50}>
        YH
    </Avatar.Fallback>
</Avatar.Root>
  )
}
