"use client";
import Image from "next/image";
import Profile from "@/assets/profile.png";

const Avatar = ({ onClick, title, classname, alt, imageSrc, width = 100, height = 100 }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-full ${classname} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      <Image
        priority
        unoptimized
        title={title}
        src={imageSrc || Profile}
        alt={alt || "Avatar"}
        layout="fill" // Ensures the image fills the container
        objectFit="cover" // Ensures the image covers the entire area without distortion
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
