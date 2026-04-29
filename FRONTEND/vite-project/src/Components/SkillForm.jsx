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
    const updatedSkills = data.skills.filter(
      (_, index) => index !== indexToRemove
    );
    setData({ ...data, skills: updatedSkills });
  };

  return (
    <div className="bg-slate-900/70 p-4 rounded-xl shadow-md w-full mx-auto mt-2 border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-slate-100">
        Skills
      </h3>

      <div className="flex flex-col gap-3">
        {data.skills.map((skill, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              value={skill}
              placeholder={`Skill ${i + 1}`}
              onChange={(e) => updateSkill(i, e.target.value)}
              className="flex-1 border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              onClick={() => deleteSkill(i)}
              className="px-3 py-2 bg-rose-500/90 text-white rounded-md hover:bg-rose-400 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 rounded-md hover:from-sky-400 hover:to-indigo-400 font-semibold transition"
      >
        + Add Skill
      </button>
    </div>
  );
}

export default SkillsForm;
