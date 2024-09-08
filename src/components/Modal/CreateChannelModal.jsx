"use client";

import { useForm } from "react-hook-form";
import Button from "../Button";
import Avatar from "../Navbar/Avatar";
import Input from "../Input";
import { useContext, useState, useEffect } from "react";
import MediaUpload from "../MediaUpload";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

const CreateChannelModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // State to track if the modal is mounted
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            name: '',
            handle: '',
            imageSrc: '',
        }
    });

    const router = useRouter();
    const createChannelModal = useContext(CreateChannelModalContext);
    const imageSrc = watch('imageSrc');

    useEffect(() => {
        if (createChannelModal?.isOpen) {
            setIsMounted(true);
            // Delay to allow the transition to kick in
            setTimeout(() => setIsMounted(false), 200);
        }
    }, [createChannelModal?.isOpen]);

    const handleImageUpload = (value) => {
        setValue('imageSrc', value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        const response = await fetch('/api/channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            setIsLoading(false);
            toast.success('Channel created', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid green',
                    background: 'rgba(22,163,74,1)',
                    color: '#fff',
                },
            });
            createChannelModal.onClose();
            router.refresh();
        } else {
            setIsLoading(false);
            toast.error('Something went wrong', {
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

    return createChannelModal?.isOpen ? (
        <div className={`w-screen h-screen absolute top-0 left-0 z-[1030] bg-[rgba(0,0,0,0.8)] transition-colors duration-500 ease-linear`}>
            <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center z-[10002] bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] border-2 border-[#35b7ff] w-[30rem] max-w-xl rounded-xl
                    transition-all duration-500 ease-linear
                    ${isMounted ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
                <h1 className="border-b border-neutral-300 p-3 text-xl">How you&apos;ll appear</h1>
                <div className="flex flex-col items-center py-6 gap-4">
                    <Avatar classname={'object-cover aspect-square'} alt={''} imageSrc={imageSrc} width={100} height={100} />
                    <MediaUpload onChange={handleImageUpload}>
                        <Button type="primary">Upload picture</Button>
                    </MediaUpload>

                    <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} pattern={{
                        value: /^[a-zA-Z0-9\s]{3,36}$/,
                        message: 'Name can only contain letters and numbers'
                    }} required className="w-3/4" />
                    <Input id="handle" label="Handle" disabled={isLoading} register={register} errors={errors} pattern={{
                        value: /^[a-z0-9_-]{3,36}$/,
                        message: 'Handle can only contain letters, numbers, underscores and dashes'
                    }} required className="w-3/4" />
                </div>

                <div className="p-3 border-t border-neutral-300 flex justify-end gap-6">
                    <Button type="secondary" onClick={createChannelModal.onClose}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmit(onSubmit)}>Create Channel</Button>
                </div>
            </div>
        </div>
    ) : null;
};

export default CreateChannelModal;
