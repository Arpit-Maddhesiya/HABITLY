import "dotenv/config";
import mongoose from "mongoose";
import { subDays } from "date-fns";

import { connectDB } from "../config/db.js";

import User from "../models/User.js";
import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import AIInsight from "../models/AIInsight.js";

const EMAIL = "arpit@owner.com";
const PASSWORD = "Owner123";
const NAME = "Arpit";

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const chance = (percent) => Math.random() * 100 < percent;

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const habitsData = [
  {
    name: "Morning Workout",
    description: "45 minutes strength training",
    category: "Fitness",
    frequency: "daily",
    targetDays: 6,
    color: "#ef4444",
    icon: "💪",
    probability: 90,
  },
  {
    name: "Drink 3L Water",
    description: "Stay hydrated throughout the day",
    category: "Health",
    frequency: "daily",
    targetDays: 7,
    color: "#0ea5e9",
    icon: "💧",
    probability: 96,
  },
  {
    name: "Read Books",
    description: "Read at least 20 pages",
    category: "Learning",
    frequency: "daily",
    targetDays: 6,
    color: "#8b5cf6",
    icon: "📚",
    probability: 82,
  },
  {
    name: "Meditation",
    description: "10 minutes mindfulness",
    category: "Mindfulness",
    frequency: "daily",
    targetDays: 5,
    color: "#10b981",
    icon: "🧘",
    probability: 76,
  },
  {
    name: "DSA Practice",
    description: "Solve coding problems",
    category: "Learning",
    frequency: "daily",
    targetDays: 5,
    color: "#6366f1",
    icon: "🧠",
    probability: 84,
  },
  {
    name: "Expense Tracking",
    description: "Record all daily expenses",
    category: "Finance",
    frequency: "daily",
    targetDays: 7,
    color: "#f59e0b",
    icon: "💰",
    probability: 88,
  },
  {
    name: "Journal Writing",
    description: "Reflect on the day",
    category: "Creative",
    frequency: "daily",
    targetDays: 5,
    color: "#ec4899",
    icon: "✍️",
    probability: 73,
  },
  {
    name: "Family Time",
    description: "Spend quality time together",
    category: "Social",
    frequency: "daily",
    targetDays: 6,
    color: "#14b8a6",
    icon: "❤️",
    probability: 81,
  },
];

async function seed() {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    // Remove old demo data
    await User.deleteOne({ email: EMAIL });

    let user = await User.create({
      name: NAME,
      email: EMAIL,
      password: PASSWORD,
    });

    console.log("Demo user created");

    const habits = [];

    // Create Habits
    for (let i = 0; i < habitsData.length; i++) {
      const h = habitsData[i];

      const habit = await Habit.create({
        userId: user._id,
        name: h.name,
        description: h.description,
        category: h.category,
        frequency: h.frequency,
        targetDays: h.targetDays,
        color: h.color,
        icon: h.icon,
        order: i,
      });

      habits.push({
        ...habit.toObject(),
        probability: h.probability,
      });
    }

    console.log(`${habits.length} habits created`);

    // Generate realistic logs for last 30 days
    const logs = [];

    for (let day = 29; day >= 0; day--) {
      const currentDate = normalizeDate(subDays(new Date(), day));

      for (const habit of habits) {
        let probability = habit.probability;

        // Weekend behavior
        const weekday = currentDate.getDay();

        if (weekday === 0 || weekday === 6) {
          if (
            habit.category === "Fitness" ||
            habit.category === "Learning"
          ) {
            probability -= 12;
          }

          if (
            habit.category === "Social" ||
            habit.category === "Health"
          ) {
            probability += 6;
          }
        }

        // Small random variation
        probability += random(-5, 5);

        probability = Math.max(45, Math.min(probability, 98));

        if (chance(probability)) {
          logs.push({
            userId: user._id,
            habitId: habit._id,
            completedDate: currentDate,
            notes: "",
          });
        }
      }
    }


    const today = normalizeDate(new Date());

    for (const habit of habits) {
      const exists = logs.some(
        (l) =>
          String(l.habitId) === String(habit._id) &&
          l.completedDate.getTime() === today.getTime(),
      );

      if (!exists) {
        logs.push({
          userId: user._id,
          habitId: habit._id,
          completedDate: today,
          notes: "",
        });
      }
    }

    await HabitLog.insertMany(logs);

    console.log(`${logs.length} habit logs created`);

        // Create AI Insights
    await AIInsight.insertMany([
      {
        userId: user._id,
        type: "weekly",
        content:
          "Excellent consistency this week! Your Health and Fitness habits are strong, while Learning dipped slightly over the weekend. Focus on maintaining your reading streak for even better balance.",
      },
      {
        userId: user._id,
        type: "morning",
        content:
          "🌞 Good morning Arpit! You're doing amazing. Complete your Morning Workout and DSA Practice early today to extend your streaks.",
      },
      {
        userId: user._id,
        type: "chat",
        content:
          "Analysis: You are most productive on weekdays, especially Tuesday through Thursday. Weekends show a small decline in Learning habits.",
      },
      {
        userId: user._id,
        type: "recovery",
        content:
          "You missed Journal Writing yesterday. Don't worry—restart today with just five minutes of writing. Small wins rebuild momentum.",
      },
    ]);

    console.log("AI Insights created");

    console.log("");
    console.log("======================================");
    console.log("   HABITLY DEMO DATABASE READY");
    console.log("======================================");
    console.log("");
    console.log(`User : ${EMAIL}`);
    console.log(`Pass : ${PASSWORD}`);
    console.log(`Habits : ${habits.length}`);
    console.log(`Logs : ${logs.length}`);
    console.log("History : Last 30 Days");
    console.log("");
    console.log("Everything seeded successfully!");
    console.log("");

    await mongoose.connection.close();
    process.exit(0);

  } catch (err) {
    console.error(err);

    await mongoose.connection.close();

    process.exit(1);
  }
}

seed();