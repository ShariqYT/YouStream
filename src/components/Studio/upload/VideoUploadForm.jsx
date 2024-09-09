"use client"

import MediaUpload from "@/components/MediaUpload"
import TextArea from "@/components/TextArea"
import Image from "next/image"
import toast from "react-hot-toast";
import { FaRegFileImage } from "react-icons/fa";
import { LuChevronsDown } from "react-icons/lu";
import { TagsInput } from "../TagsInput";

const VideoUploadForm = ({ register, errors, changeValue, thumbnailSrc, isLoading }) => {
  return (
    <div className="w-full md:w-3/5 flex flex-col gap-8 md:mb-0 mb-10">
      <TextArea register={register} limit={'100'} errors={errors} id="title" label="Title (required)" disabled={isLoading} changeValue={changeValue} required />

      <TextArea className={`max-h-96 overflow-y-auto`} limit={'5000'} register={register} errors={errors} id="description" label="Description (required)" disabled={isLoading} changeValue={changeValue} required />

      <div>
        <label className="block font-semibold">Thumbnail</label>
        <p className="text-sm mb-4">Set a thumbnail that stands out and draws viewer&apos;s attention.</p>
        <MediaUpload onChange={(value) => !isLoading && changeValue("thumbnailSrc", value)} >
          {
            thumbnailSrc ?
              <Image unoptimized src={thumbnailSrc} width={120} height={192} alt="thumbnail" className={`h-32 w-56 overflow-hidden rounded-md ${!isLoading ? "cursor-pointer" : "animate-pulse"}`} /> :
              <div id="thumbnailSrc"
                {...register("thumbnailSrc", { required: true })}
                className={`h-28 w-48 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer border-[2px] border-dotted ${errors["thumbnailSrc"] ? 'border-red-500' : 'border-zinc-300'} `}
              >
                <FaRegFileImage className="w-8 h-8" />
                <p className="text-sm">Upload image</p>
              </div>
          }
        </MediaUpload>
      </div>

      <div>
        <label className="block font-semibold">Playlists</label>
        <p className="text-sm mb-4">Add your video to one or more playlists to organize your content for viewers.</p>
        <button onClick={() => {
          toast('Coming soon!', {
            icon: '🚀',
            style: {
              border: '1px solid orange',
              borderRadius: '10px',
              background: 'rgb(255,214,99)',
              color: '#000',
            },
          });
        }} className="border border-zinc-300 rounded-md p-2 flex justify-between items-center w-52"> Select <LuChevronsDown className="inline-block text-xl" /></button>
      </div>

      <div>
        <label className="block font-semibold">Tags</label>
        <p className="text-sm mb-4">Tags can be useful if content in your video is commonly misspelled. Otherwise, tags play a minimal role in helping viewers find your content.</p>

        <TagsInput id="tags" placeholder="Add a tag and press Enter/Tab" charLimit={500} disabled={isLoading} changeValue={changeValue} />

      </div>

      <div>
        <label className="block font-semibold">Category</label>
        <p className="text-sm mb-4">Add your video to a category so viewers can find it more easily.</p>
        <button onClick={() => {
          toast('Coming soon!', {
            icon: '🚀',
            style: {
              border: '1px solid orange',
              borderRadius: '10px',
              background: 'rgb(255,214,99)',
              color: '#000',
            },
          });
        }} className="border border-zinc-300 rounded-md p-2 flex justify-between font-semibold items-center w-52"> Gaming <LuChevronsDown className="inline-block text-xl" /></button>

        <div className="relative">
          <input type="text" className="border-[1px] transition ease-linear border-zinc-300 rounded-md p-2 pt-5 mt-4 w-full focus:border-2 focus:border-blue-400 outline-none" placeholder="None" />
            <label className="font-semibold text-xs absolute top-5 left-2">Game title (optional)</label>
        </div>
      </div>

    </div>
  )
}

export default VideoUploadForm
