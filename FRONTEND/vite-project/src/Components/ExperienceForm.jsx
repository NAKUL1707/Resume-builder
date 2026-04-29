function ExperienceForm({ data, setData }) {
  const addExp = () => {
    setData({
      ...data,
      workExperience: [
        ...data.workExperience,
        { company: "", role: "", description: "" }
      ]
    });
  };

  const updateExp = (i, field, value) => {
    const exp = [...data.workExperience];
    exp[i][field] = value;
    setData({ ...data, workExperience: exp });
  };

  return (
    <div className="bg-slate-900/70 p-4 rounded-xl shadow-md w-full mx-auto mt-2 border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-slate-100">
        Work Experience
      </h3>

      <div className="flex flex-col gap-2">
        {data.workExperience.map((e, i) => (
          <div
            key={i}
            className="border border-slate-700 rounded-md p-4 flex flex-col gap-3 bg-slate-950/40"
          >
            <input
              placeholder="Company"
              onChange={(ev) =>
                updateExp(i, "company", ev.target.value)
              }
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <input
              placeholder="Role"
              onChange={(ev) =>
                updateExp(i, "role", ev.target.value)
              }
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <textarea
              placeholder="Description"
              rows="4"
              onChange={(ev) =>
                updateExp(i, "description", ev.target.value)
              }
              className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        ))}
      </div>

      <button
        onClick={addExp}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 rounded-md hover:from-sky-400 hover:to-indigo-400 font-semibold transition"
      >
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceForm;
