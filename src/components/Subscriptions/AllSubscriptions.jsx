"use client"
import { IoClose } from "react-icons/io5";
import Avatar from "../Navbar/Avatar";
import Link from "next/link";

const AllSubscriptions = ({ subscriptions, setOpen }) => {
    return (
        <div className="absolute bg-black z-50 bg-opacity-75 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div className="bg-white border-2 overflow-y-auto border-[#35b7ff] drop-shadow-[0_0_20px_rgba(53,183,255,0.25)] p-4 rounded-lg w-[22rem] md:w-[30rem] h-[30rem] md:h-[40rem]">
                <div className="flex justify-between items-start border-b-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="md:text-2xl text-lg font-semibold">All Subscriptions</h1>
                        <p className="md:text-sm text-xs">Total Subscriptions: {subscriptions?.length}</p>
                    </div>
                    <button onClick={() => setOpen(false)}><IoClose className="h-8 w-8 cursor-pointer" /></button>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    {subscriptions?.map((subscription, index) => {
                        return (
                            <Link href={`/channel/${subscription?._id}`} key={index} className="flex items-center gap-4">
                                <div className="md:block hidden">
                                    <Avatar classname={"object-cover aspect-square"} imageSrc={subscription?.imageSrc} alt={subscription?.name} width={60} height={60} />
                                </div>
                                <div className="block md:hidden">
                                    <Avatar classname={"object-cover aspect-square"} imageSrc={subscription?.imageSrc} alt={subscription?.name} width={40} height={40} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="md:text-lg text-base font-semibold">{subscription?.name}</p>
                                </div>
                            </Link>
                        )
                    })}

                </div>

            </div>
        </div>
    )
}

export default AllSubscriptions
