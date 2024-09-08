"use client"

import Comment from "./Comment"
import CommentInput from "./CommentInput"

const CommentSection = ({ comments, watchId }) => {
  return (
    <div className="flex flex-col gap-4 w-full my-4">
      <p className="text-xl font-semibold">{comments?.length} Comments</p>
      <CommentInput watchId={watchId} />
      <div className="flex flex-col gap-4 mt-4">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
