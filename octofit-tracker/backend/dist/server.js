"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl: baseUrl });
});
app.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
app.post('/api/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
app.post('/api/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find({}).lean();
    res.json(activities);
});
app.post('/api/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post('/api/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend running on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
};
startServer();
