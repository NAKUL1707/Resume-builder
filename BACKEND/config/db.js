import * as dotenv from "dotenv";
dotenv.config();


import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Supabase (PostgreSQL) connected");
    console.log("🔗 URL:", process.env.DATABASE_URL);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

export default prisma;