export interface DocTopic {
  title: string;
  marathi: string;
  slug: string;
  category: "Overview" | "Core Language" | "Control Flow & Functions" | "Reference & Examples";
}

export const DOC_TOPICS: DocTopic[] = [
  { title: "Getting Started", marathi: "सुरुवात करा", slug: "getting-started", category: "Overview" },
  { title: "Installation & Setup", marathi: "इन्स्टॉलेशन व सेटअप", slug: "installation", category: "Overview" },
  { title: "Language Basics & Syntax", marathi: "मूलभूत रचना व नियम", slug: "language-basics", category: "Overview" },
  { title: "Variables & Assignment", marathi: "चल (Variables)", slug: "variables", category: "Core Language" },
  { title: "Data Types", marathi: "डेटा प्रकार (Data Types)", slug: "data-types", category: "Core Language" },
  { title: "Operators & Expressions", marathi: "ऑपरेटर्स व अभिव्यक्ती", slug: "operators", category: "Core Language" },
  { title: "Conditional Control Flow", marathi: "जर-नाहीतर (If-Else)", slug: "conditions", category: "Control Flow & Functions" },
  { title: "Loops & Iteration", marathi: "पर्यंत लूप (While Loop)", slug: "loops", category: "Control Flow & Functions" },
  { title: "Functions & Scope", marathi: "कार्य व स्कोप (Functions)", slug: "functions", category: "Control Flow & Functions" },
  { title: "Output & Built-in Functions", marathi: "छापा विधाने (Built-in)", slug: "builtin-functions", category: "Control Flow & Functions" },
  { title: "Keywords Reference", marathi: "कीवर्ड्स संदर्भ", slug: "keywords", category: "Reference & Examples" },
  { title: "Error Messages & Diagnostics", marathi: "त्रुटी संदेश व निदान", slug: "error-messages", category: "Reference & Examples" },
  { title: "Practical Examples", marathi: "व्यावहारिक उदाहरणे", slug: "examples", category: "Reference & Examples" },
  { title: "Frequently Asked Questions", marathi: "सतत विचारले जाणारे प्रश्न", slug: "faq", category: "Reference & Examples" },
];
