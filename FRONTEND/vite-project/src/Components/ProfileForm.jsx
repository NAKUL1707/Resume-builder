function ProfileForm({ data, setData }) {
  const handleChange = (e) => {
    setData({
      ...data,
      profileInfo: {
        ...data.profileInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const inputClass =
    "border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500/50 transition";

  return (
    <div className="bg-slate-900/50 p-5 rounded-xl border border-white/10 w-full">
      <h3 className="text-base font-semibold mb-4 text-slate-100 flex items-center gap-2">
        <span className="w-1 h-4 bg-sky-400 rounded-full" />
        Profile
      </h3>

      <div className="flex flex-col gap-3">
        <input
          name="fullName"
          value={data.profileInfo?.fullName || ""}
          placeholder="Full Name"
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="designation"
          value={data.profileInfo?.designation || ""}
          placeholder="Job Title / Designation"
          onChange={handleChange}
          className={inputClass}
        />

        <textarea
          name="summary"
          value={data.profileInfo?.summary || ""}
          placeholder="Professional summary — a brief overview of your experience and goals"
          rows="3"
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}

export default ProfileForm;
