import Image from 'next/image'
import React from 'react'

const AccountInfo = ({ currentUser }) => {
    return (
        <div className='flex items-center gap-4 p-4'>
            <div>
                <Image priority title='Account' src={currentUser?.image} width={40} height={40} alt="avatar" className='rounded-full cursor-pointer aspect-square object-contain' />
            </div>
            <div>
                <p className='text-black text-base font-semibold'>{currentUser?.name}</p>
                <p className='text-gray-400 md:text-sm text-xs'>{currentUser?.email}</p>
            </div>
        </div>
    )
}

export default AccountInfo
