import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const UserSchema = new Schema({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  name: { type: String, default: null },
  email: { type: String, unique: true, sparse: true },
  emailVerified: { type: Date, default: null },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  subscribedChannelIds: [{ type: String, ref: 'Channel', default: [] }],
  likedVideoIds: [{ type: String, ref: 'Video', default: [] }],
  dislikedVideoIds: [{ type: String, ref: 'Video', default: [] }],

  account: { type: Schema.Types.ObjectId, ref: "Account" },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
});

export default mongoose.models.User || model("User", UserSchema);