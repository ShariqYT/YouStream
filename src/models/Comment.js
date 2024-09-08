import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const CommentSchema = new Schema({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  email: { type: String },
  videoId: { type: String, ref: "Video", required: true },
  channelId: { type: String, ref: "Channel", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // Relations
  video: { type: Schema.Types.ObjectId, ref: "Video" },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
});

export default mongoose.models.Comment || model("Comment", CommentSchema);
