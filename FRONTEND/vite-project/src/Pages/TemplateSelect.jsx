import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Check, ArrowRight, FileText } from "lucide-react";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import { TEMPLATES, initialTemplateData } from "../Data/TemplateModel";
import { sampleResumeData } from "../Data/sampleResumeData";
import { API_URL, authHeaders } from "../utils/api";

const PREVIEW_COMPONENTS = {
  "template-1": TemplateOne,
  "template-2": TemplateTwo,
};

function TemplateSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("template-1");
  const [resumeId, setResumeId] = useState(null);
  const [resumeData, setResumeData] = useState(initialTemplateData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resume`, { headers: authHeaders() });
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      const resumes = await res.json();

      if (resumes.length > 0) {
        const latest = { ...initialTemplateData, ...resumes[0] };
        setResumeId(latest._id);
        setResumeData(latest);
        if (latest.template?.id) setSelected(latest.template.id);
      } else {
        const createRes = await fetch(`${API_URL}/api/resume`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ title: "My Resume", ...initialTemplateData }),
        });
        const newResume = await createRes.json();
        setResumeId(newResume._id);
        setResumeData({ ...initialTemplateData, ...newResume });
      }
    } catch (err) {
      console.error("Failed to load resume:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!resumeId) return;
    setSaving(true);
    try {
      const updated = {
        ...resumeData,
        template: { id: selected, colorPalette: resumeData.template?.colorPalette || [] },
      };
      await fetch(`${API_URL}/api/resume/${resumeId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(updated),
      });
      navigate("/builder");
    } catch (err) {
      console.error("Failed to save template:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950/90 flex items-center justify-center">
        <p className="text-slate-400 text-lg animate-pulse">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950/90 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm mb-4">
            <FileText size={14} />
            Step 1 of 2
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Resume Template
            </span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Pick a design that fits your style. You can switch templates anytime from the builder.
          </p>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {TEMPLATES.map((tpl, index) => {
            const Preview = PREVIEW_COMPONENTS[tpl.id];
            const isSelected = selected === tpl.id;
            const previewData = { ...sampleResumeData, template: { id: tpl.id } };

            return (
              <Motion.button
                key={tpl.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelected(tpl.id)}
                className={`text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden group ${
                  isSelected
                    ? "border-sky-400 shadow-lg shadow-sky-900/30 ring-1 ring-sky-400/50"
                    : "border-white/10 hover:border-white/25 hover:shadow-xl hover:shadow-slate-950/50"
                }`}
              >
                <div className="relative bg-slate-900/80 p-4 border-b border-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-sky-400">
                        {tpl.tag}
                      </span>
                      <h2 className="text-xl font-semibold text-slate-100 mt-1">{tpl.name}</h2>
                      <p className="text-sm text-slate-400 mt-1">{tpl.description}</p>
                    </div>
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition ${
                        isSelected
                          ? "bg-sky-500 text-white"
                          : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
                      }`}
                    >
                      {isSelected && <Check size={16} strokeWidth={3} />}
                    </div>
                  </div>
                </div>

                <div className="relative h-[280px] sm:h-[320px] bg-slate-200 overflow-hidden">
                  <div className="absolute inset-0 origin-top-left scale-[0.28] sm:scale-[0.32] w-[360%] pointer-events-none select-none">
                    <Preview data={previewData} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
              </Motion.button>
            );
          })}
        </div>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <button
            type="button"
            onClick={handleContinue}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-sky-400 hover:to-indigo-400 shadow-lg shadow-sky-900/40 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Continue to Builder"}
            {!saving && <ArrowRight size={18} />}
          </button>
          <button
            type="button"
            onClick={() => navigate("/builder")}
            className="text-slate-400 hover:text-slate-200 text-sm transition"
          >
            Skip — use current template
          </button>
        </Motion.div>
      </div>
    </div>
  );
}

export default TemplateSelect;
