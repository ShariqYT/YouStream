"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Logo_Light from '../../assets/images/logo-light.png'
import { RxBell, RxUpload } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import Search from './Search';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import Notifications from './Notifications';
import { signIn } from 'next-auth/react';
import Account from './Account';
import Avatar from './Avatar';
import { CurrentUserContext } from '@/context/CurrentUserContext';
import { CurrentChannelContext } from '@/context/CurrentChannelContext';
import { CreateChannelModalContext } from '@/context/CreateChannelModalContext';

const Header = () => {
  const pathname = usePathname()
  const [notification, setNotification] = useState(false)
  const [acctMenu, setAcctMenu] = useState(false)

  const currentUser = useContext(CurrentUserContext)
  const currentChannel = useContext(CurrentChannelContext)
  const CreateChannelModal = useContext(CreateChannelModalContext)

  const router = useRouter();

  const handleUploadClick = () => {
    if (!currentChannel) CreateChannelModal?.onOpen();
    else router.push('/studio/upload')
  }

  return (
    <header className='z-[1050] fixed top-0 w-[100vw] flex justify-center'>
      <div className='md:w-[90vw] w-full bg-white flex justify-between items-center border-t-0 border-2 drop-shadow-xl border-[#35b7ff] rounded-t-none rounded-xl py-4 md:py-2 px-4 md:px-8'>

        <Link title='YouStream Home' href={'/'}>
          <Image priority className='cursor-pointer' src={Logo_Light} alt="logo" width={120} height={120} />
        </Link>

        <div className='hidden md:block'>
          <Search />
        </div>

        <div className='flex items-center gap-4 md:gap-6'>

          {currentUser ?
            <>
              <button onClick={handleUploadClick} title='Upload' className={`${pathname === '/upload' ? 'bg-[#35b7ff] bg-opacity-75' : ''} hidden md:flex items-center py-2 px-2 placeholder:text-gray-600 text-black rounded-full outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-75`}><RxUpload className='text-2xl' /></button>

              <div className='relative'>
                <button onClick={() => setNotification(!notification)} onBlur={() => setNotification(false)} title='Notifications' className={`${notification ? 'bg-[#35b7ff] bg-opacity-75' : ''} flex items-center py-2 px-2 placeholder:text-gray-600 text-black rounded-full outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-75`}><RxBell className='text-2xl' /></button>
                <Notifications notification={notification} />
              </div>


              <div className='hidden md:block'>
                <Avatar title={'Account'} alt={"avatar"} width={40} height={40} imageSrc={currentUser?.image} classname={'cursor-pointer, aspect-square object-contain'} currentUser={currentUser} onClick={() => setAcctMenu(true)} />
                {acctMenu ? <Account currentUser={currentUser} onClose={() => setAcctMenu(false)} /> : null}
              </div>

            </>
            :
            <button onClick={() => signIn('google')} title='Account' className='border-2 border-[#35b7ff] hidden md:flex items-center gap-2 py-2 px-2 placeholder:text-gray-600 text-black rounded-full outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-35'><CgProfile className='text-2xl' /> Sign in</button>
          }
          <div className='md:hidden'>
            <Search />
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header