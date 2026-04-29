function ProfileForm({ data, setData }) {
  const handleChange = (e) => {
    setData({
      ...data,
      profileInfo: {
        ...data.profileInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="bg-slate-900/70 p-4 rounded-xl shadow-md w-full border border-white/10">
      <h3 className="text-lg font-semibold mb-2 text-slate-100">
        Profile
      </h3>

      <div className="flex flex-col gap-2">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
        />

        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
        />

        <textarea
          name="summary"
          placeholder="Professional Summary"
          rows="2"
          onChange={handleChange}
          className="border border-slate-600 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-sky-400"
        />
      </div>
    </div>
  );
}

export default ProfileForm;
