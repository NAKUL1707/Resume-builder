function ProjectForm({ data, setData }) {
  const addProject = () => {
    setData({
      ...data,
      projects: [
        ...(data.projects || []),
        { title: "", description: "", link: "" },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const projects = [...(data.projects || [])];
    projects[index] = { ...projects[index], [field]: value };
    setData({ ...data, projects });
  };

  const removeProject = (indexToRemove) => {
    setData({
      ...data,
      projects: (data.projects || []).filter((_, index) => index !== indexToRemove),
    });
  };

  const inputClass =
    "border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50 transition";

  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 w-full">
      <h3 className="text-base font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <span className="w-1 h-4 bg-sky-400 rounded-full" />
        Projects
      </h3>

      <div className="flex flex-col gap-3">
        {(data.projects || []).map((project, index) => (
          <div
            key={index}
            className="border border-slate-700/80 rounded-lg p-4 flex flex-col gap-3 bg-slate-950/40"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                value={project.title || ""}
                placeholder="Project Title"
                onChange={(ev) => updateProject(index, "title", ev.target.value)}
                className={inputClass}
              />
              <input
                value={project.link || ""}
                placeholder="Project Link (optional)"
                onChange={(ev) => updateProject(index, "link", ev.target.value)}
                className={inputClass}
              />
            </div>

            <textarea
              value={project.description || ""}
              placeholder="Project Description"
              rows="3"
              onChange={(ev) => updateProject(index, "description", ev.target.value)}
              className={`${inputClass} resize-none`}
            />

            <button
              type="button"
              onClick={() => removeProject(index)}
              className="self-start mt-1 px-3 py-2 text-sm bg-slate-800 hover:bg-red-500/20 text-slate-300 border border-slate-600 rounded-lg transition"
            >
              Remove Project
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="mt-4 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-lg font-medium transition"
      >
        + Add Project
      </button>
    </div>
  );
}

export default ProjectForm;
