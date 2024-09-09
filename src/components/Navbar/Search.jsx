"use client"
import { useRouter } from 'nextjs-toploader/app';
import queryString from 'query-string';
import { useState } from 'react'
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";

const Search = () => {
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        const query = {
            search_query: search
        }

        const url = queryString.stringifyUrl({
            url: '/search',
            query
        }, { skipNull: true })

        router.push(url)
    }

    return (
        <>
            <form className='hidden md:flex items-center relative' onSubmit={handleSearch}>

                <div className='flex items-center relative'>
                    <input onChange={e => setSearch(e.target.value)} value={search} className='w-[30vw] placeholder:text-gray-600 py-2 px-4 rounded-l-full border-2 border-gray-300 outline-none focus:border-[#35b7ff]' type="search" placeholder='Search' name="search" id="search" />
                    <button onClick={() => setSearch('')} type='reset' className='hover:bg-opacity-75 hover:bg-[#35b7ff] rounded-full text-3xl text-gray-600 absolute right-3 p-1'>
                        <RxCross2 className={`${search.length >= 1 ? 'block' : 'hidden'}`} />
                    </button>
                </div>

                <button disabled={search.length == 0} title='Search' type='submit' className='flex items-center py-2 px-4 placeholder:text-gray-600 text-gray-600 rounded-r-full border-t-2 border-r-2 border-b-2 border-gray-300 outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-75'><FiSearch className='text-2xl' /></button>

            </form>

            <form className='md:hidden flex items-center' onSubmit={handleSearch}>

                <span onClick={() => setShowSearch(true)} className='flex items-center placeholder:text-gray-600 text-gray-600'><FiSearch className='text-2xl' /></span>

                <div className={`${showSearch ? 'translate-x-0' : 'translate-x-[110%]'} transform transition-transform duration-200 ease-in-out w-fit h-fit flex items-center justify-between absolute top-0 left-2 bg-white py-2`}>

                    <IoIosArrowBack onClick={() => setShowSearch(false)} className='text-4xl text-gray-600 cursor-pointer' />
                    <input
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        className='w-[85vw] placeholder:text-gray-600 py-2 px-4 rounded-full border-2 border-gray-300 outline-none focus:border-[#35b7ff]'
                        type="search"
                        placeholder='Search'
                        name="search"
                        id="search"
                    />
                    <button
                        onClick={() => setSearch('')}
                        type='button'
                        className='text-3xl text-gray-600 absolute right-3 p-1'
                    >
                        <RxCross2 className={`${search.length >= 1 ? 'block' : 'hidden'}`} />
                    </button>

                </div>

            </form>
        </>
    )
}

export default Search
