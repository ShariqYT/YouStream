import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const AccountSchema = new Schema({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  userId: { type: String, ref: "User", unique: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String, default: null },
  access_token: { type: String, default: null },
  expires_at: { type: Number, default: null },
  token_type: { type: String, default: null },
  scope: { type: String, default: null },
  id_token: { type: String, default: null },
  session_state: { type: String, default: null }

}, {timestamps: true});

// Ensure the combination of provider and providerAccountId is unique
AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export default mongoose.models.Account || model("Account", AccountSchema);
