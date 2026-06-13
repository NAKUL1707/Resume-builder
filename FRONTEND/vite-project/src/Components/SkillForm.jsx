function SkillsForm({ data, setData }) {
  const addSkill = () => {
    setData({ ...data, skills: [...data.skills, ""] });
  };

  const updateSkill = (index, value) => {
    const skills = [...data.skills];
    skills[index] = value;
    setData({ ...data, skills });
  };

  const deleteSkill = (indexToRemove) => {
    setData({ ...data, skills: data.skills.filter((_, index) => index !== indexToRemove) });
  };

  const inputClass =
    "flex-1 border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50 transition";

  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 w-full">
      <h3 className="text-base font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <span className="w-1 h-4 bg-sky-400 rounded-full" />
        Skills
      </h3>

      <div className="flex flex-col gap-2">
        {data.skills.map((skill, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              value={skill}
              placeholder={`Skill ${i + 1}`}
              onChange={(e) => updateSkill(i, e.target.value)}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => deleteSkill(i)}
              className="shrink-0 w-9 h-9 flex items-center justify-center bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-600 rounded-lg transition"
              aria-label="Remove skill"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSkill}
        className="mt-4 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-lg font-medium transition"
      >
        + Add Skill
      </button>
    </div>
  );
}

export default SkillsForm;
