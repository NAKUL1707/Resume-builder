import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { initialTemplateData } from "../Data/TemplateModel";
import ProfileForm from "../Components/ProfileForm";
import ContactForm from "../Components/ContactForm";
import SkillForm from "../Components/SkillForm";
import ExperienceForm from "../Components/ExperienceForm";
import EducationForm from "../Components/EducationForm";
import ResumePreview from "../Pages/ResumePreview";

const API = "http://localhost:3000";

// Helper — adds JWT token to every request
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

function ResumeBuilder() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(initialTemplateData);
  const [resumeId, setResumeId] = useState(null);       // MongoDB _id of the resume
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saving" | "saved" | "error"
  const [loading, setLoading] = useState(true);

  // ─── 1. On mount: load existing resume or create a new one ───────────────
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
      // Try to fetch existing resumes for this user
      const res = await fetch(`${API}/api/resume`, { headers: authHeaders() });
      if (res.status === 401) { navigate("/login"); return; }
      const resumes = await res.json();

      if (resumes.length > 0) {
        // Load the most recent resume
        const latest = resumes[0];
        setResumeId(latest._id);
        // Merge saved data with initialTemplateData so no field is ever undefined
        setResumeData({ ...initialTemplateData, ...latest });
      } else {
        // No resume yet — create a blank one in the DB
        const createRes = await fetch(`${API}/api/resume`, {
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

  // ─── 2. Auto-save: whenever resumeData changes, save to backend ──────────
  // useCallback + debounce pattern — waits 1.5s after last keystroke to save
  const saveToBackend = useCallback(
    debounce(async (id, data) => {
      if (!id) return;
      setSaveStatus("saving");
      try {
        const res = await fetch(`${API}/api/resume/${id}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setSaveStatus("saved");
          // Reset back to idle after 2 seconds
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

  // Fire save whenever resumeData changes (skip on first render while loading)
  useEffect(() => {
    if (!loading && resumeId) {
      saveToBackend(resumeId, resumeData);
    }
  }, [resumeData]);

  // ─── 3. Download ─────────────────────────────────────────────────────────
  const Download = () => {
    window.print();
  };

  // ─── 4. Render ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950/85 flex items-center justify-center">
        <p className="text-slate-300 text-lg animate-pulse">Loading your resume...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950/85 p-6 md:p-8 backdrop-blur">

      {/* Save status indicator */}
      <div className="max-w-7xl mx-auto mb-3 flex justify-end">
        {saveStatus === "saving" && (
          <span className="text-xs text-slate-400 animate-pulse">💾 Saving...</span>
        )}
        {saveStatus === "saved" && (
          <span className="text-xs text-emerald-400">✓ Saved</span>
        )}
        {saveStatus === "error" && (
          <span className="text-xs text-red-400">⚠ Save failed</span>
        )}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE FORMS */}
        <div className="flex-1 flex flex-col gap-4">
          <ProfileForm data={resumeData} setData={setResumeData} />
          <ContactForm data={resumeData} setData={setResumeData} />
          <SkillForm data={resumeData} setData={setResumeData} />
          <ExperienceForm data={resumeData} setData={setResumeData} />
          <EducationForm data={resumeData} setData={setResumeData} />
        </div>

        {/* RIGHT SIDE PREVIEW */}
        <div className="flex-1 bg-slate-900/75 rounded-2xl shadow-2xl shadow-slate-950/70 p-4 md:p-5 sticky top-6 h-fit border border-white/10">
          <h2 className="text-slate-100 text-lg font-semibold mb-3">Live Preview</h2>
          <div id="resume-preview">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={Download}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 rounded-lg hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-900/40 font-semibold transition"
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
}

// ─── Debounce utility ────────────────────────────────────────────────────────
// Delays calling fn until after `delay` ms have passed since the last call
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default ResumeBuilder;
