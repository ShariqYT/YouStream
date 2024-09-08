"use client";

import Button from "@/components/Button";
import UploadVideoModal from "@/components/Modal/UploadVideoModal";
import VideoPreview from "@/components/Studio/upload/VideoPreview";
import VideoUploadForm from "@/components/Studio/upload/VideoUploadForm";
import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import { useProtectedRoutes } from "@/hooks/useProtectedRoutes";
import { useRouter } from "nextjs-toploader/app";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

export default function UploadPage() {

    useProtectedRoutes();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const uploadVideoModal = useContext(UploadVideoModalContext)

    const videoId = useMemo(() => {
        const buffer = Buffer.alloc(12);
        return uuid({}, buffer).toString('hex');
    }, []);

    useEffect(() => {
        uploadVideoModal?.onOpen();
    }, []);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            title: '',
            description: '',
            thumbnailSrc: '',
            videoSrc: '',
            tags: [],
        }
    });

    const thumbnailSrc = watch('thumbnailSrc');
    const videoSrc = watch('videoSrc');

    const changeValue = (id, value) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const result = await fetch('/api/watch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                id: videoId,
            }),
        });

        if (result.ok) {
            setIsLoading(false);
            toast.success('Video published successfully', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid green',
                    background: 'rgba(22,163,74,1)',
                    color: '#fff',
                },
            });
            router.push('/studio');
        } else {
            setIsLoading(false);
            toast.error('Failed to publish video', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid red',
                    background: 'rgba(255,0,0,0.5)',
                    color: '#fff',
                },
            });
        }
    };



    return (
        <div className="w-full h-full py-20 px-20">
            {uploadVideoModal.isOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 z-[10] -translate-y-1/2 w-full h-full">
                    <UploadVideoModal onUpload={(value) => changeValue("videoSrc", value)} />
                </div>
            )}
            <div className="flex flex-col px-8 pt-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Details</h1>
                    <span className="flex gap-4">
                        <Button type="secondary" onClick={() => router.back()}>Cancel</Button>
                        <Button type="box" className="rounded-md" onClick={handleSubmit(onSubmit)}>
                            Save
                        </Button>
                    </span>
                </div>
                <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-2">
                    <VideoUploadForm
                        register={register}
                        errors={errors}
                        changeValue={changeValue}
                        thumbnailSrc={thumbnailSrc}
                        isLoading={isLoading}
                    />
                    <VideoPreview videoSrc={videoSrc} videoId={videoId} />
                </div>
            </div>
        </div>
    );
}
