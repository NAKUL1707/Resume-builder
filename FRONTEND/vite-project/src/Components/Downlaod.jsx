import ResumePreview from "../Pages/ResumePreview";
import html2pdf from "html2pdf.js";

function Builder() {

  const Download = () => {
    const element = document.getElementById("resume-preview");
    console.log("hello")

    html2pdf().set({
      margin: 0.5,
      filename: "My_Resume.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4" }
    }).from(element).save();
  };
}

export default Builder;
