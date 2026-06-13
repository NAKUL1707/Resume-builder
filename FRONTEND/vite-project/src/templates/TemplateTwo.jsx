import React from "react";

function TemplateTwo({ data }) {
  const {
    profileInfo,
    contactInfo,
    skills,
    workExperience,
    education,
    projects,
    certifications,
    languages,
  } = data;

  const initials = profileInfo?.fullName
    ? profileInfo.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JD";

  const skillLevels = {
    Expert: "90%",
    Advanced: "75%",
    Intermediate: "55%",
    Beginner: "35%",
  };

  return (
    <div className="bg-white text-slate-800 w-full font-sans flex flex-col md:flex-row">
      {/* ── Sidebar ── */}
      <aside className="bg-slate-900 text-slate-200 w-full md:w-64 shrink-0 flex flex-col gap-8 p-8">
        {/* Avatar + Name */}
        <div>
          <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center text-white text-2xl font-medium mb-4">
            {initials}
          </div>
          <h1 className="text-xl font-medium text-slate-100 leading-snug">
            {profileInfo?.fullName || "Your Name"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {profileInfo?.designation || "Professional Title"}
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mb-3">
            Contact
          </p>
          <div className="flex flex-col gap-1.5 text-sm text-slate-300">
            {contactInfo?.email && <span>{contactInfo.email}</span>}
            {contactInfo?.phone && <span>{contactInfo.phone}</span>}
            {contactInfo?.location && <span>{contactInfo.location}</span>}
            {contactInfo?.linkedin && <span>{contactInfo.linkedin}</span>}
            {contactInfo?.github && <span>{contactInfo.github}</span>}
          </div>
        </div>

        {/* Skills with progress bars */}
        {skills?.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mb-3">
              Skills
            </p>
            <div className="flex flex-col gap-3">
              {skills.map((skill, i) => {
                const label = typeof skill === "object" ? skill.name : skill;
                const level =
                  typeof skill === "object" ? skill.level : "Intermediate";
                const width = skillLevels[level] || "60%";
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{label}</span>
                      <span className="text-slate-500">{level}</span>
                    </div>
                    <div className="h-0.5 bg-slate-700 rounded-full">
                      <div
                        className="h-0.5 bg-sky-400 rounded-full"
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mb-3">
              Education
            </p>
            <div className="flex flex-col gap-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-slate-200 leading-snug">
                    {edu.degree || "Degree"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {edu.institution || "Institution"}
                  </p>
                  {edu.duration && (
                    <p className="text-xs text-slate-600 mt-0.5">
                      {edu.duration}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mb-3">
              Languages
            </p>
            <div className="flex flex-col gap-1.5">
              {languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-300">
                    {typeof lang === "object" ? lang.name : lang}
                  </span>
                  {typeof lang === "object" && lang.proficiency && (
                    <span className="text-slate-500">{lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col gap-8 p-8 md:p-10">
        {/* Profile Summary */}
        {profileInfo?.summary && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-5 bg-sky-400 rounded-full" />
              <h2 className="text-[11px] uppercase tracking-widest font-medium text-slate-400">
                Profile
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {profileInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience?.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-sky-400 rounded-full" />
              <h2 className="text-[11px] uppercase tracking-widest font-medium text-slate-400">
                Experience
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {workExperience.map((exp, i) => (
                <div
                  key={i}
                  className="border-l-2 border-slate-200 pl-4 relative"
                >
                  <div
                    className={`w-2 h-2 rounded-full absolute -left-[5px] top-1 ${
                      i === 0 ? "bg-sky-400" : "bg-slate-400"
                    }`}
                  />
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {exp.role || "Role"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    {exp.duration && (
                      <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-sky-400 rounded-full" />
              <h2 className="text-[11px] uppercase tracking-widest font-medium text-slate-400">
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-4"
                >
                  <p className="text-sm font-medium text-slate-800 mb-1">
                    {project.title || "Project Title"}
                  </p>
                  {project.description && (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-xs text-sky-600 mt-2 inline-block"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-5 bg-sky-400 rounded-full" />
              <h2 className="text-[11px] uppercase tracking-widest font-medium text-slate-400">
                Certifications
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, i) => (
                <span
                  key={i}
                  className="text-xs text-slate-600 border border-slate-200 px-3 py-1 rounded"
                >
                  {typeof cert === "object" ? cert.name : cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TemplateTwo;