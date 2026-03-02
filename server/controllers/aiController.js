import Resume from "../models/Resume.js";
import ai from '../config/ai.js';

//Controller for enhancing a resumé's professional summary
//POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing Required Fields!" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resumé writing. Your task is to enhance the professional summary of a resumé.  The summary should highlight key skills, experience and career objectives.  Make it compelling, ATS-friendly, and only return text (no options or anything else). Finally, the summary should be 2-3 sentences.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedResponse = response.choices[0].message.content;

    return res.status(200).json({ enhancedResponse });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for enhancing a resumé's job description
//POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing Required Fields!" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resumé writing. Your task is to enhance the job description of a resumé.  The job desscription should highlight key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and only return text (no options or anything else). Finally, the summary should be 2-3 sentences.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedResponse = response.choices[0].message.content;

    return res.status(200).json({ enhancedResponse });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for uploading a resumé to database
//POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;

    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing Required Fields!" });
    }

    const systemPrompt = "You are an expert AI agent to extract from resumé.";
    const userPrompt = `Extract data from this resumé: ${resumeText}
    Provide data in the following JSON format with no additional text before or after:
    {
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
    }
    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId: userId,
      title: title,
      ...parsedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
