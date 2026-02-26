import fs from "fs";

import imageKit from "../config/imageKit.js";
import Resume from "../models/Resume.js";

//Controller for creating a new resumé
//POST: /api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    //Create new resumé
    const newResume = await Resume.create({ userId: userId, title: title });

    //Return success message
    return res
      .status(201)
      .json({ message: "Resumé created successfully!", resume: newResume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Controller for deleting a resumé
//DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    //Delete resumé
    await Resume.findOneAndDelete({ userId: userId, _id: resumeId });

    //Return success message
    return res.status(200).json({ message: "Resumé deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Controller for getting user resumé by ID
//GET: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId: userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resumé not found!" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    //Return success message
    return res.status(200).json({ resume: resume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Controller for getting resumé by ID if public
//GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resumé not found!" });
    }

    //Return success message
    return res.status(200).json({ resume: resume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//Controller for updating a resumé
//PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;

    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.jpg",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300, h-300, fo-face, z-0.75" +
            (removeBackground ? ", e-bgremove" : ""),
        },
      });

      resumeDataCopy.personalInfo.image = response.url;
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { userId: userId, _id: resumeId },
      resumeDataCopy,
      { new: true },
    );

    return res
      .status(200)
      .json({ error: "Saved successfully!", resume: updatedResume });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
