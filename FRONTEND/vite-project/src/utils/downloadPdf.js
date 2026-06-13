import { toPng } from "html-to-image";
import jsPDF from "jspdf";

/**
 * PDF export using html-to-image + jsPDF.
 * html-to-image natively supports modern CSS (oklch, oklch, etc.)
 * unlike html2canvas which crashes on Tailwind v4 colors.
 *
 * Targets: id="resume-preview" (set in ResumeBuilder.jsx)
 */
export async function downloadResumePdf(filename = "My_Resume.pdf") {
  const element = document.getElementById("resume-preview");

  if (!element) {
    throw new Error("Resume preview not found. Please wait for the preview to load.");
  }

  // Temporarily expand the scrollable container so full content is captured
  const originalMaxHeight = element.style.maxHeight;
  const originalOverflow = element.style.overflow;
  element.style.maxHeight = "none";
  element.style.overflow = "visible";
  element.scrollTop = 0;

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    // Load image to get natural dimensions
    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => (img.onload = resolve));

    const imgWidthPx = img.naturalWidth;
    const imgHeightPx = img.naturalHeight;

    // A4 dimensions in mm
    const A4_W = 210;
    const A4_H = 297;

    // Scale image height proportionally to A4 width
    const scaledHeightMm = (imgHeightPx / imgWidthPx) * A4_W;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const safeName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;

    if (scaledHeightMm <= A4_H) {
      // ── Single page ──────────────────────────────────────────────
      pdf.addImage(dataUrl, "PNG", 0, 0, A4_W, scaledHeightMm);
    } else {
      // ── Multi-page: slice canvas into A4-height strips ───────────
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // How many px correspond to one A4 page height?
      const pxPerMm = imgWidthPx / A4_W;
      const pageHeightPx = Math.round(A4_H * pxPerMm);
      const pageCount = Math.ceil(imgHeightPx / pageHeightPx);

      canvas.width = imgWidthPx;
      canvas.height = pageHeightPx;

      for (let page = 0; page < pageCount; page++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, -(page * pageHeightPx));

        const pageDataUrl = canvas.toDataURL("image/png");
        if (page > 0) pdf.addPage();
        pdf.addImage(pageDataUrl, "PNG", 0, 0, A4_W, A4_H);
      }
    }

    pdf.save(safeName);
    return true;
  } finally {
    // Always restore styles even if capture threw
    element.style.maxHeight = originalMaxHeight;
    element.style.overflow = originalOverflow;
  }
}