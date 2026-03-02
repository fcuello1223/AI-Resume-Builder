import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: "Untitled Resumé",
    },
    public: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      default: "Classic",
    },
    accentColor: {
      type: String,
      default: "#3b82f6",
    },
    professionalSummary: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],
    personalInfo: {
      image: {
        type: String,
        default: "",
      },
      fullName: {
        type: String,
        default: "",
      },
      profession: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
        isCurrent: { type: Boolean },
      },
    ],
    projects: [
      {
        name: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],
    education: [
      {
        insitution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduationDate: { type: String },
        gpa: { type: String },
      },
    ],
  },
  { timestamps: true, minimize: false },
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
