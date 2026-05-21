import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
 
export const protect = async (req, res, next) => {
  try {
    let token;
 
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
      // Fetch user from Supabase via Prisma (exclude password)
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true, createdAt: true },
      });
 
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
 
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token found" });
    }
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
      error: error.message,
    });
  }
};