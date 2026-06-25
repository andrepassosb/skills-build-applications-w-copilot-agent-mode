import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl: baseUrl });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

app.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(activities);
});

app.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

app.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend running on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

startServer();
