import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  age: number;
}

export interface ITeam extends Document {
  name: string;
  focus: string;
  members: number;
}

export interface IActivity extends Document {
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface ILeaderboardEntry extends Document {
  name: string;
  points: number;
  rank: number;
}

export interface IWorkout extends Document {
  title: string;
  duration: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  difficulty: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.models.User || model<IUser>('User', userSchema);
export const Team = mongoose.models.Team || model<ITeam>('Team', teamSchema);
export const Activity = mongoose.models.Activity || model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.models.Workout || model<IWorkout>('Workout', workoutSchema);
