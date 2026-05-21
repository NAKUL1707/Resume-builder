import fs from "fs";
import path from "path";
import upload from "../middleware/uploadMiddlewares.js";
import prisma from "../config/db.js";

export const uploadResumeImage = [
  upload.fields([{ name: "thumbnail" }, { name: "profileImage" }]),
  async (req, res) => {
    try {
      const resumeId = req.params.id;

      // Find resume and check ownership
      const resume = await prisma.resume.findFirst({
        where: { id: resumeId, userID: req.user.id }, // ✅ id not _id
      });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      const uploadsFolder = path.join(process.cwd(), "uploads");
      const baseURL = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      let updatedThumbnailLink = resume.thumbnailLink;
      let updatedProfilePreviewURL = resume.profilePreviewURL;

      // Handle thumbnail upload
      if (newThumbnail) {
        // Delete old thumbnail if exists
        if (resume.thumbnailLink) {
          const oldThumbnail = path.join(
            uploadsFolder,
            path.basename(resume.thumbnailLink)
          );
          if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }
        updatedThumbnailLink = `${baseURL}/uploads/${newThumbnail.filename}`;
      }

      // Handle profile image upload
      if (newProfileImage) {
        // Delete old profile image if exists
        if (resume.profilePreviewURL) {
          const oldProfile = path.join(
            uploadsFolder,
            path.basename(resume.profilePreviewURL)
          );
          if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }
        updatedProfilePreviewURL = `${baseURL}/uploads/${newProfileImage.filename}`;
      }

      // Save updated URLs to Supabase via Prisma
      const updated = await prisma.resume.update({
        where: { id: resumeId },
        data: {
          thumbnailLink: updatedThumbnailLink,
          profilePreviewURL: updatedProfilePreviewURL,
        },
      });

      res.status(200).json({
        message: "Image uploaded successfully",
        thumbnailLink: updated.thumbnailLink,
        profilePreviewURL: updated.profilePreviewURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Failed to upload images", error: error.message });
    }
  },
];