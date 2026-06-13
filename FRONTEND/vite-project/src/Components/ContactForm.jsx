function ContactForm({ data, setData }) {
  const handleChange = (e) => {
    setData({
      ...data,
      contactInfo: {
        ...data.contactInfo,
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
        Contact Information
      </h3>

      <div className="grid sm:grid-cols-2 gap-3">
        <input name="email" value={data.contactInfo?.email || ""} placeholder="Email" onChange={handleChange} className={inputClass} />
        <input name="phone" value={data.contactInfo?.phone || ""} placeholder="Phone" onChange={handleChange} className={inputClass} />
        <input name="location" value={data.contactInfo?.location || ""} placeholder="Location" onChange={handleChange} className={inputClass} />
        <input name="linkedin" value={data.contactInfo?.linkedin || ""} placeholder="LinkedIn URL" onChange={handleChange} className={inputClass} />
        <input name="github" value={data.contactInfo?.github || ""} placeholder="GitHub URL" onChange={handleChange} className={`${inputClass} sm:col-span-2`} />
      </div>
    </div>
  );
}

export default ContactForm;
