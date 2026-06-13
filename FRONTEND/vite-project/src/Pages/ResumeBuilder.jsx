import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Download, LayoutTemplate, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { initialTemplateData, TEMPLATES } from "../Data/TemplateModel";
import ProfileForm from "../Components/ProfileForm";
import ContactForm from "../Components/ContactForm";
import SkillForm from "../Components/SkillForm";
import ExperienceForm from "../Components/ExperienceForm";
import EducationForm from "../Components/EducationForm";
import ResumePreview from "../Pages/ResumePreview";
import { API_URL, authHeaders } from "../utils/api";
import { downloadResumePdf } from "../utils/downloadPdf";

function ResumeBuilder() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(initialTemplateData);
  const [resumeId, setResumeId] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    loadOrCreateResume();
  }, []);

  const loadOrCreateResume = async () => {
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
      } else {
        const createRes = await fetch(`${API_URL}/api/resume`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ title: "My Resume", ...initialTemplateData }),
        });
        const newResume = await createRes.json();
        setResumeId(newResume._id);
      }
    } catch (err) {
      console.error("Failed to load resume:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveToBackend = useCallback(
    debounce(async (id, data) => {
      if (!id) return;
      setSaveStatus("saving");
      try {
        const res = await fetch(`${API_URL}/api/resume/${id}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        } else {
          setSaveStatus("error");
        }
      } catch {
        setSaveStatus("error");
      }
    }, 1500),
    []
  );

  useEffect(() => {
    if (!loading && resumeId) {
      saveToBackend(resumeId, resumeData);
    }
  }, [resumeData]);

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError("");
    try {
      const name = resumeData.profileInfo?.fullName?.trim() || "My";
      const filename = `${name.replace(/\s+/g, "_")}_Resume.pdf`;
      await downloadResumePdf(filename);
    } catch (err) {
      console.error("PDF download failed:", err);
      setDownloadError(err?.message || "PDF generation failed. Try again.");
    } finally {
      setDownloading(false);
    }
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === (resumeData.template?.id || "template-1"));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950/90 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <p className="text-slate-400">Loading your resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950/90">
      {/* Top bar */}
      <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-100">Resume Builder</h1>
            <p className="text-xs text-slate-500 mt-0.5">Fill in your details — changes save automatically</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-sky-300 border border-white/10 hover:border-sky-500/30 rounded-lg px-3 py-1.5 transition"
            >
              <LayoutTemplate size={15} />
              {activeTemplate?.name || "Classic"}
            </Link>

            <div className="text-xs min-w-[80px]">
              {saveStatus === "saving" && (
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Loader2 size={12} className="animate-spin" /> Saving
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 size={12} /> Saved
                </span>
              )}
              {saveStatus === "error" && (
                <span className="inline-flex items-center gap-1 text-red-400">
                  <AlertCircle size={12} /> Failed
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-lg hover:from-emerald-400 hover:to-teal-400 shadow-md shadow-emerald-900/30 transition disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download PDF
                </>
              )}
            </button>
          </div>
          {downloadError && (
            <p className="text-xs text-red-400 mt-2 sm:mt-0 sm:ml-auto">{downloadError}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Forms */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            <ProfileForm data={resumeData} setData={setResumeData} />
            <ContactForm data={resumeData} setData={setResumeData} />
            <SkillForm data={resumeData} setData={setResumeData} />
            <ExperienceForm data={resumeData} setData={setResumeData} />
            <EducationForm data={resumeData} setData={setResumeData} />
          </div>

          {/* Preview */}
          <div className="flex-1 lg:max-w-[480px] xl:max-w-[520px]">
            <div className="lg:sticky lg:top-24 bg-slate-900/50 rounded-2xl border border-white/10 p-4 shadow-2xl shadow-slate-950/50">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
                Live Preview
              </h2>
              <div id="resume-preview" className="max-h-[70vh] overflow-y-auto rounded-xl">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default ResumeBuilder;
