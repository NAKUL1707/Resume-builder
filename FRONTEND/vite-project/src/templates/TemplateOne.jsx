import React from "react";

function TemplateOne({ data }) {
  const {
    profileInfo,
    contactInfo,
    skills,
    workExperience,
    education,
    projects,
  } = data;

  return (
    <div className="bg-white text-slate-800 p-7 md:p-8 w-full font-sans">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {profileInfo.fullName || "Your Name"}
        </h1>
        <h2 className="text-base text-sky-700 font-medium mt-1">
          {profileInfo.designation || "Professional Title"}
        </h2>
        {profileInfo.summary && (
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{profileInfo.summary}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <aside className="md:col-span-1 space-y-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Contact
            </h3>
            <div className="text-sm text-slate-700 space-y-1">
              <p>{contactInfo.email || "email@example.com"}</p>
              <p>{contactInfo.phone || "+91 XXXXX XXXXX"}</p>
              <p>{contactInfo.location || "City, Country"}</p>
              {contactInfo.linkedin && <p>{contactInfo.linkedin}</p>}
              {contactInfo.github && <p>{contactInfo.github}</p>}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(skills.length ? skills : ["JavaScript", "React", "Communication"]).map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <main className="md:col-span-2 space-y-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Experience
            </h3>
            {workExperience.length ? (
              workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="font-semibold text-slate-900">
                    {exp.role || "Role"} <span className="text-slate-500">- {exp.company || "Company"}</span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Add your work experience details.</p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Education
            </h3>
            {education.length ? (
              education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="font-semibold text-slate-900">{edu.degree || "Degree"}</div>
                  <div className="text-sm text-slate-600">{edu.institution || "Institution"}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Add your education details.</p>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Projects
            </h3>
            {projects.length ? (
              projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="font-semibold text-slate-900">{project.title || "Project Title"}</div>
                  {project.description && <p className="text-sm text-slate-700">{project.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Add project highlights.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default TemplateOne;
