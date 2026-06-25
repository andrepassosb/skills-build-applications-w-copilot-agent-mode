"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
// Seed the octofit_db database with test data.
const seedDatabase = async () => {
    const connectionString = 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(connectionString);
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await Promise.all([
        models_1.User.create([
            { name: 'Alex Chen', email: 'alex@example.com', role: 'member', age: 29 },
            { name: 'Jamie Rivera', email: 'jamie@example.com', role: 'captain', age: 31 },
            { name: 'Morgan Lee', email: 'morgan@example.com', role: 'coach', age: 35 },
        ]),
        models_1.Team.create([
            { name: 'Power Squad', focus: 'endurance', members: 4 },
            { name: 'Momentum Crew', focus: 'strength', members: 3 },
        ]),
        models_1.Activity.create([
            { type: 'run', duration: 30, calories: 320, date: '2026-06-25' },
            { type: 'cycle', duration: 45, calories: 410, date: '2026-06-24' },
            { type: 'swim', duration: 25, calories: 280, date: '2026-06-23' },
        ]),
        models_1.LeaderboardEntry.create([
            { rank: 1, name: 'Alex Chen', points: 1420 },
            { rank: 2, name: 'Jamie Rivera', points: 1380 },
            { rank: 3, name: 'Morgan Lee', points: 1325 },
        ]),
        models_1.Workout.create([
            { title: 'HIIT Circuit', duration: 25, difficulty: 'medium' },
            { title: 'Core Flow', duration: 20, difficulty: 'easy' },
            { title: 'Power Intervals', duration: 35, difficulty: 'hard' },
        ]),
    ]);
    console.log('Seed the octofit_db database with test data');
    console.log('Database seeded successfully');
    await mongoose_1.default.disconnect();
};
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
