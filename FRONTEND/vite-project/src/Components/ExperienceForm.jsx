function ExperienceForm({ data, setData }) {
  const addExp = () => {
    setData({
      ...data,
      workExperience: [
        ...data.workExperience,
        { company: "", role: "", description: "" },
      ],
    });
  };

  const updateExp = (i, field, value) => {
    const exp = [...data.workExperience];
    exp[i] = { ...exp[i], [field]: value };
    setData({ ...data, workExperience: exp });
  };

  const inputClass =
    "border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50 transition";

  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 w-full">
      <h3 className="text-base font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <span className="w-1 h-4 bg-sky-400 rounded-full" />
        Work Experience
      </h3>

      <div className="flex flex-col gap-3">
        {data.workExperience.map((e, i) => (
          <div
            key={i}
            className="border border-slate-700/80 rounded-lg p-4 flex flex-col gap-3 bg-slate-950/40"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                value={e.company || ""}
                placeholder="Company"
                onChange={(ev) => updateExp(i, "company", ev.target.value)}
                className={inputClass}
              />
              <input
                value={e.role || ""}
                placeholder="Role / Position"
                onChange={(ev) => updateExp(i, "role", ev.target.value)}
                className={inputClass}
              />
            </div>
            <textarea
              value={e.description || ""}
              placeholder="Describe your responsibilities and achievements"
              rows="3"
              onChange={(ev) => updateExp(i, "description", ev.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExp}
        className="mt-4 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-lg font-medium transition"
      >
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceForm;
