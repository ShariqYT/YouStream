"use client"

import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import { useRouter } from "nextjs-toploader/app";
import { useContext } from "react";
import { MdClose, MdUpload } from "react-icons/md"
import VideoUploadthing from "../VideoUploadthing";

const UploadVideoModal = ({ onUpload }) => {
    const router = useRouter();

    const uploadVideoModal = useContext(UploadVideoModalContext)

    const handleUpload = (value) => {
        onUpload(value);
        uploadVideoModal?.onClose();
    }

    return (
        <div className="fixed top-96 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start z-[10002] bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] border-2 border-[#35b7ff] w-[90vw] md:w-[100rem] h-[80vh] md:h-[45rem] rounded-xl">
            <div className="p-3 border-b border-neutral-400 flex justify-between">
                <h1 className="text-xl">Upload Video</h1>
                <MdClose className="h-8 w-8 cursor-pointer" onClick={() => { uploadVideoModal.onClose(); router.back() }} />
            </div>

            <div className="flex flex-col md:gap-4 gap-10 justify-center items-center h-full">

                <MdUpload className="h-20 w-20" />

                <div className="flex flex-col items-center">
                    <p className="text-sm md:text-base">Select files to upload (max size 512MB)</p>
                    <p className="text-neutral-400 text-xs md:text-sm">Your videos will be private until you publish them.</p>
                </div>
                <VideoUploadthing onChange={handleUpload} />
            </div>
        </div>
    )
}

export default UploadVideoModal
