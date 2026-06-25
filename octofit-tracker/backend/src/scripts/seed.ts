import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data.
export const seedDatabase = async () => {
  const connectionString = 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(connectionString);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Promise.all([
    User.create([
      { name: 'Alex Chen', email: 'alex@example.com', role: 'member', age: 29 },
      { name: 'Jamie Rivera', email: 'jamie@example.com', role: 'captain', age: 31 },
      { name: 'Morgan Lee', email: 'morgan@example.com', role: 'coach', age: 35 },
    ]),
    Team.create([
      { name: 'Power Squad', focus: 'endurance', members: 4 },
      { name: 'Momentum Crew', focus: 'strength', members: 3 },
    ]),
    Activity.create([
      { type: 'run', duration: 30, calories: 320, date: '2026-06-25' },
      { type: 'cycle', duration: 45, calories: 410, date: '2026-06-24' },
      { type: 'swim', duration: 25, calories: 280, date: '2026-06-23' },
    ]),
    LeaderboardEntry.create([
      { rank: 1, name: 'Alex Chen', points: 1420 },
      { rank: 2, name: 'Jamie Rivera', points: 1380 },
      { rank: 3, name: 'Morgan Lee', points: 1325 },
    ]),
    Workout.create([
      { title: 'HIIT Circuit', duration: 25, difficulty: 'medium' },
      { title: 'Core Flow', duration: 20, difficulty: 'easy' },
      { title: 'Power Intervals', duration: 35, difficulty: 'hard' },
    ]),
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
