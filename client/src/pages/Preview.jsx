import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../components/other/ResumePreview";
import Loader from "../components/shared/Loader";

const Preview = () => {
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null),
    );
    setLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accentColor}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-center text-6xl text-slate-400 font-medium">
        Resumé Not Found
      </p>
      <a
        href="/"
        className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
      >
        <ArrowLeft className="mr-2 size-4" /> Go to Home Page
      </a>
    </div>
  );
};

export default Preview;
