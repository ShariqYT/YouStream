import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const VideoSchema = new Schema({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  channelId: { type: String, ref: "Channel", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags : { type: [String], default: [] },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  thumbnailSrc: { type: String, required: true },
  videoSrc: { type: String, required: true },

  // Relations
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.models.Video || model("Video", VideoSchema);
