import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const ChannelSchema = new Schema({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  userId: { type: String, ref: "User", unique: true },
  name: { type: String, required: true },
  handle: { type: String, required: true },
  imageSrc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  subscriberCount: { type: Number, default: 0 },

  // References to other models
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

// Ensure that handle is unique within the collection
ChannelSchema.index({ handle: 1 }, { unique: true });

export default mongoose.models.Channel || model("Channel", ChannelSchema);
