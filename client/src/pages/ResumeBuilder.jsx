import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Folder,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { dummyResumeData } from "../assets/assets";
import PersonalInfoForm from "../components/other/PersonalInfoForm";
import ResumePreview from "../components/other/ResumePreview";
import TemplateSelector from "../components/other/TemplateSelector";
import ColorPicker from "../components/other/ColorPicker";
import ProfessionalSummaryForm from "../components/other/ProfessionalSummaryForm";
import ExperienceForm from "../components/other/ExperienceForm";
import EducationForm from "../components/other/EducationForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personalInfo: {},
    professionalSummary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accentColor: "#3BA256",
    public: false,
  });

  const loadResumeData = async () => {
    const targetResume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );
    if (targetResume) {
      setResumeData(targetResume);
      document.title = targetResume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    {
      id: "personal",
      name: "Personal Info",
      icon: User,
    },
    {
      id: "summary",
      name: "Personal Info",
      icon: FileText,
    },
    {
      id: "experience",
      name: "Personal Info",
      icon: Briefcase,
    },
    {
      id: "education",
      name: "Personal Info",
      icon: GraduationCap,
    },
    {
      id: "projects",
      name: "Personal Info",
      icon: Folder,
    },
    {
      id: "skills",
      name: "Personal Info",
      icon: Sparkles,
    },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadResumeData();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Side (Form) */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress Bar using ActiveSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${(activeSectionIndex * 100) / sections.length - 1}%`,
                }}
              />
              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accentColor}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accentColor: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1)
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, personalInfo: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professionalSummary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professionalSummary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}
                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {/* Right Side (Preview) */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div>{/* Buttons */}</div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accentColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
