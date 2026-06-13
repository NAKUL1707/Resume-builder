function EducationForm({ data, setData }) {
  const addEdu = () => {
    setData({
      ...data,
      education: [...data.education, { degree: "", institution: "" }],
    });
  };

  const updateEdu = (index, field, value) => {
    const education = [...data.education];
    education[index] = { ...education[index], [field]: value };
    setData({ ...data, education });
  };

  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 w-full">
      <h3 className="text-base font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <span className="w-1 h-4 bg-sky-400 rounded-full" />
        Education
      </h3>

      <div className="flex flex-col gap-3">
        {data.education.map((e, i) => (
          <div
            key={i}
            className="border border-slate-700/80 rounded-lg p-4 flex flex-col gap-3 bg-slate-950/40"
          >
            <input
              value={e.degree || ""}
              placeholder="Degree"
              onChange={(ev) => updateEdu(i, "degree", ev.target.value)}
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50"
            />

            <input
              value={e.institution || ""}
              placeholder="Institution"
              onChange={(ev) => updateEdu(i, "institution", ev.target.value)}
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addEdu}
        className="mt-4 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-600 rounded-lg font-medium transition"
      >
        + Add Education
      </button>
    </div>
  );
}

export default EducationForm;
