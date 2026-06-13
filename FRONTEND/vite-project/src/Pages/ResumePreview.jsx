import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";

function ResumePreview({ data }) {
  const templateId = data?.template?.id || "template-1";
  const Template = templateId === "template-2" ? TemplateTwo : TemplateOne;

  return (
    <div
      id="resume-content"
      className="rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white"
    >
      <Template data={data} />
    </div>
  );
}

export default ResumePreview;
