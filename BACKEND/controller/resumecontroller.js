import fs from "fs";
import path from "path";
import prisma from "../config/db.js";

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newResume = await prisma.resume.create({
      data: {
        userID: req.user.id,
        title,
        thumbnailLink: req.body.thumbnailLink || null,
        aboutYourself: req.body.About_Yourself || null,

        // Template
        templateId: req.body.template?.id || null,
        templateColorPalette: req.body.template?.colorPalette || [],

        // Profile Info
        profilePreviewURL: req.body.profileInfo?.profilePreviewURL || null,
        fullName: req.body.profileInfo?.fullName || "",
        designation: req.body.profileInfo?.designation || "",
        summary: req.body.profileInfo?.summary || "",

        // Contact Info
        email: req.body.contactInfo?.email || "",
        phone: req.body.contactInfo?.phone || "",
        location: req.body.contactInfo?.location || "",
        linkedin: req.body.contactInfo?.linkedin || "",
        github: req.body.contactInfo?.github || "",
        website: req.body.contactInfo?.website || "",

        // JSON arrays
        workExperience: req.body.workExperience || [
          { company: "", role: "", startDate: "", endDate: "", description: "" },
        ],
        education: req.body.education || [
          { degree: "", institution: "", startDate: "", endDate: "" },
        ],
        skills: req.body.skills || [{ name: "", progress: 0 }],
        projects: req.body.projects || [
          { title: "", description: "", github: "", livedemo: "" },
        ],
        certification: req.body.certifications || [
          { title: "", issuer: "", year: "" },
        ],
        languages: req.body.languages || [{ name: "", progress: "" }],
        interests: req.body.interests || [],
      },
    });

    res.status(201).json(formatResume(newResume));
  } catch (error) {
    res.status(500).json({ message: "Failed to create resume", error: error.message });
  }
};

export const getUserResume = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userID: req.user.id },
      orderBy: { updatedAt: "desc" },
    });
    res.json(resumes.map(formatResume));
  } catch (error) {
    res.status(500).json({ message: "Failed to get resumes", error: error.message });
  }
};

export const getResumebyID = async (req, res) => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { id: req.params.id, userID: req.user.id },
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(formatResume(resume));
  } catch (error) {
    res.status(500).json({ message: "Failed to get resume", error: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    // Check ownership first
    const existing = await prisma.resume.findFirst({
      where: { id: req.params.id, userID: req.user.id },
    });
    if (!existing) {
      return res.status(404).json({ message: "Resume not found or not authorized" });
    }

    const updated = await prisma.resume.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title || existing.title,
        thumbnailLink: req.body.thumbnailLink ?? existing.thumbnailLink,
        aboutYourself: req.body.About_Yourself ?? existing.aboutYourself,

        // Template
        templateId: req.body.template?.id ?? existing.templateId,
        templateColorPalette: req.body.template?.colorPalette ?? existing.templateColorPalette,

        // Profile Info
        profilePreviewURL: req.body.profileInfo?.profilePreviewURL ?? existing.profilePreviewURL,
        fullName: req.body.profileInfo?.fullName ?? existing.fullName,
        designation: req.body.profileInfo?.designation ?? existing.designation,
        summary: req.body.profileInfo?.summary ?? existing.summary,

        // Contact Info
        email: req.body.contactInfo?.email ?? existing.email,
        phone: req.body.contactInfo?.phone ?? existing.phone,
        location: req.body.contactInfo?.location ?? existing.location,
        linkedin: req.body.contactInfo?.linkedin ?? existing.linkedin,
        github: req.body.contactInfo?.github ?? existing.github,
        website: req.body.contactInfo?.website ?? existing.website,

        // JSON arrays
        workExperience: req.body.workExperience ?? existing.workExperience,
        education: req.body.education ?? existing.education,
        skills: req.body.skills ?? existing.skills,
        projects: req.body.projects ?? existing.projects,
        certification: req.body.certifications ?? existing.certification,
        languages: req.body.languages ?? existing.languages,
        interests: req.body.interests ?? existing.interests,
      },
    });

    res.json(formatResume(updated));
  } catch (error) {
    res.status(500).json({ message: "Failed to update resume", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { id: req.params.id, userID: req.user.id },
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found or not authorized" });
    }

    // Delete associated uploaded files
    const uploadsFolder = path.join(process.cwd(), "uploads");
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }
    if (resume.profilePreviewURL) {
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profilePreviewURL));
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    await prisma.resume.delete({ where: { id: req.params.id } });

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete resume", error: error.message });
  }
};

// Helper: reshape flat Prisma row back into nested structure (matches original Mongoose shape)
const formatResume = (resume) => ({
  _id: resume.id,
  userID: resume.userID,
  title: resume.title,
  thumbnailLink: resume.thumbnailLink,
  About_Yourself: resume.aboutYourself,
  template: {
    id: resume.templateId,
    colorPalette: resume.templateColorPalette,
  },
  profileInfo: {
    profilePreviewURL: resume.profilePreviewURL,
    fullName: resume.fullName,
    designation: resume.designation,
    summary: resume.summary,
  },
  contactInfo: {
    email: resume.email,
    phone: resume.phone,
    location: resume.location,
    linkedin: resume.linkedin,
    github: resume.github,
    website: resume.website,
  },
  workExperience: resume.workExperience,
  education: resume.education,
  skills: resume.skills,
  projects: resume.projects,
  certifications: resume.certification,
  languages: resume.languages,
  interests: resume.interests,
  createdAt: resume.createdAt,
  updatedAt: resume.updatedAt,
});