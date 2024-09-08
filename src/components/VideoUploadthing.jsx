"use client";

import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";

export default function VideoUploadthing({ onChange }) {

    const handleSuccess = (res) => {
        onChange(res[0].url);
    };

    return (

        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                handleSuccess(res);
                toast.success("Upload Completed", {
                    position: "bottom-right",
                    duration: 5000,
                    style: {
                        borderRadius: "10px",
                        border: "1px solid green",
                        background: "rgba(22,163,74,1)",
                        color: "#fff",
                    },
                });
            }}
            onUploadError={(error) => {
                // Do something with the error.
                toast.error(error, {
                    position: "bottom-right",
                    duration: 5000,
                    style: {
                        borderRadius: "10px",
                        border: "1px solid red",
                        background: "rgba(220,38,38,1)",
                        color: "#fff",
                    },
                });
            }}
        />

    );
}