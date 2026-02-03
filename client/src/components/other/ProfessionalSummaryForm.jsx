import { Sparkles } from "lucide-react";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-xs text-gray-500">
            Add summary for your resumé here!
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
          <Sparkles className="size-4" />
          Enhance with AI
        </button>
      </div>
      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(event) => onChange(event.target.value)}
          rows={7}
          placeholder="Write a compelling professional summary that highlights your key strengths and career goals..."
          className="w-full p-3 px-4 mt-2 text-sm border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-50 outline-none transition-colors resize-none rounded-lg"
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences max) and focus on your most
          relevant skills and achievements
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
