"use client";

import Avatar from "@/components/Navbar/Avatar";
import dayjs from "@/db/dayjs";

const Comment = ({ comment }) => {
  return (
    <div key={comment.id} className="flex items-start gap-2">
      <div className="md:block hidden">
        <Avatar classname={"object-cover aspect-square"} imageSrc={comment.channel.imageSrc} alt={comment.channel.name} width={60} height={60} />
      </div>
      <div className="block md:hidden">
        <Avatar classname={"object-cover aspect-square"} imageSrc={comment.channel.imageSrc} alt={comment.channel.name} width={50} height={50} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center text-sm">
          <p className="font-medium">@{comment.channel.handle}</p>
          <p className="font-light text-neutral-600">
            {dayjs(comment.createdAt).fromNow()}
          </p>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
