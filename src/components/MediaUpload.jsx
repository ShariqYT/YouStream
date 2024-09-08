"use client";

import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

const MediaUpload = ({ onChange, children }) => {
  const handleSuccess = (result) => {
    const { width, height, bytes } = result.info;
    
    // Check if the uploaded image is exactly 1920x1080 and less than 5 MB
    if (width === 1920 && height === 1080 && bytes <= 5 * 1024 * 1024) {
      onChange(result.info.secure_url);
    } else {
      // Notify the user if image resolution or size is incorrect
      let errorMessage = "Please upload an image with exactly 1920x1080 resolution";
      if (bytes > 2 * 1024 * 1024) {
        errorMessage = "Image size must be less than or equal to 5 MB";
      }
      toast.error(errorMessage, {
        style: {
          borderRadius: "10px",
          background: "#f87171",  // Red color background for error
          color: "#fff",
        },
      });
    }
  };

  return (
    <CldUploadWidget
      onSuccess={handleSuccess}
      uploadPreset="lqlsenem"
      options={{
        maxFiles: 1,
        maxFileSize: 5 * 1024 * 1024, // 2 MB size limit
        cropping: true, // Optional: allows user to crop image before uploading
        croppingAspectRatio: 16 / 9, // 1920x1080 is a 16:9 aspect ratio
        sources: ['local', 'url', 'camera'], // Specify allowed upload sources
        clientAllowedFormats: ["jpg", "png"], // Allowed formats
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open && open()} className="inline-block">
            {children}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default MediaUpload;
