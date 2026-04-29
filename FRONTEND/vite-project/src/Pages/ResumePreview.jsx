import TemplateOne from "../templates/TemplateOne";

function ResumePreview({ data }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-300/70 shadow-xl bg-white">
      <TemplateOne data={data} />
    </div>
  );
}

export default ResumePreview;
