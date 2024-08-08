import mongoose, { Document, Schema } from 'mongoose';

interface IChallenge extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  frequency: 'daily' | 'weekly';
  progress: { date: Date, completed: boolean }[];
  status: string;
  userId: mongoose.Types.ObjectId;
}

const challengeSchema = new Schema<IChallenge>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  frequency: { type: String, required: true, enum: ['daily', 'weekly'] },
  progress: [{ date: { type: Date, required: true }, completed: { type: Boolean, default: false } }],
  status: { type: String, required: true, default: 'active' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


export default mongoose.model<IChallenge>('Challenge', challengeSchema);
