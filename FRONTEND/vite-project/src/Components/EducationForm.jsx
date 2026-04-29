function EducationForm({ data, setData }) {
  const addEdu = () => {
    setData({
      ...data,
      education: [...data.education, { degree: "", institution: "" }]
    });
  };

  return (
    <div className="bg-slate-900/70 p-4 rounded-xl shadow-md w-full mx-auto mt-2 border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-slate-100">
        Education
      </h3>

      <div className="flex flex-col gap-2">
        {data.education.map((e, i) => (
          <div
            key={i}
            className="border border-slate-700 rounded-md p-4 flex flex-col gap-3 bg-slate-950/40"
          >
            <input
              placeholder="Degree"
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <input
              placeholder="Institution"
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        ))}
      </div>

      <button
        onClick={addEdu}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 rounded-md hover:from-sky-400 hover:to-indigo-400 font-semibold transition"
      >
        + Add Education
      </button>
    </div>
  );
}

export default EducationForm;
