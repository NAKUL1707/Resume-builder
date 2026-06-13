export const TEMPLATES = [
  {
    id: "template-1",
    name: "Classic",
    description: "Clean two-column layout ideal for ATS and corporate roles.",
    tag: "ATS Friendly",
  },
  {
    id: "template-2",
    name: "Modern",
    description: "Bold sidebar design with skill bars and visual hierarchy.",
    tag: "Visual Impact",
  },
];

export const initialTemplateData = {
  template: {
    id: "template-1",
    colorPalette: [],
  },
  profileInfo: {
    fullName: "",
    designation: "",
    summary: ""
  },
  contactInfo: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: ""
  },
  skills: [],
  workExperience: [],
  education: [],
  projects: []
};
