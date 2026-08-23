import { projectSchema, type Project } from "../schema";

/**
 * ⚠️  PLACEHOLDER DATES — DO NOT PUBLISH AS-IS.
 *
 * Names, summaries, roles and links are taken verbatim from ericluttmann.com
 * and are accurate. The `start` / `end` values are INFERRED from the ordering
 * on that page, not sourced — they are structurally valid so the CV and the
 * timeline render, and they are wrong.
 *
 * Fix these before the CV or the chat goes public. The chat is grounded in this
 * file, so a wrong date here becomes a confidently wrong answer from the model,
 * and the CV prints it next to your name.
 */
const raw = [
  {
    slug: "pillar",
    name: "Pillar",
    summary: "Spatial AI that helps Los Angeles homeowners get insurance after the fires.",
    role: "Product Builder — design, engineering, management",
    start: "2025",
    outcomes: [],
    disciplines: ["Spatial AI", "Product design", "Engineering"],
    links: [
      { label: "buildwithpillar.com", href: "https://buildwithpillar.com/" },
      { label: "Walkthrough", href: "https://app.buildwithpillar.com/walkthrough" },
    ],
    weight: 100,
    featured: true,
  },
  {
    slug: "langgraph-studio",
    name: "LangGraph Studio",
    summary:
      "Visual agent development tool at LangChain, used by Apple, Visa, Uber, Replit and LinkedIn.",
    role: "Product Design",
    org: "LangChain",
    start: "2024",
    end: "2025",
    outcomes: [],
    disciplines: ["Product design", "Agent tooling"],
    links: [{ label: "Demo", href: "https://www.youtube.com/watch?v=Mi1gSlHwZLM" }],
    weight: 90,
    featured: true,
  },
  {
    slug: "autoprospector",
    name: "AutoProspector",
    summary: "Do knowledge work in minutes rather than days with AI.",
    role: "Founding Product Designer",
    start: "2023",
    end: "2024",
    outcomes: [],
    disciplines: ["Product design", "AI"],
    links: [
      { label: "Overview", href: "https://ericluttmann.com/autoprospector" },
      { label: "Case study", href: "https://www.2d.ericluttmann.com/autoprospector/" },
    ],
    weight: 80,
    featured: true,
  },
  {
    slug: "marble",
    name: "Marble",
    summary:
      "Geospatial AI web app giving institutions access to decades of spatial data to improve place performance.",
    role: "Product Design & Management",
    start: "2022",
    end: "2023",
    outcomes: [],
    disciplines: ["Geospatial", "Product design"],
    links: [],
    weight: 70,
    featured: true,
  },
  {
    slug: "ombi",
    name: "Ombi",
    summary: "Preview experiences through video. Feel what it's really like.",
    role: "Founder — product, design, go-to-market",
    start: "2020",
    end: "2022",
    outcomes: [],
    disciplines: ["Founding", "Product design", "Go-to-market"],
    links: [{ label: "Case study", href: "https://www.2d.ericluttmann.com/ombi/" }],
    weight: 60,
    featured: true,
  },
  {
    slug: "dbc-app",
    name: "DBC App",
    summary: "Order buildings from 3D models.",
    role: "3D Product Manager — product management & design",
    start: "2019",
    end: "2020",
    outcomes: [],
    disciplines: ["3D", "Product management"],
    links: [{ label: "Case study", href: "https://www.2d.ericluttmann.com/dbc/" }],
    weight: 50,
    featured: false,
  },
  {
    slug: "millennial-entertainment",
    name: "Millennial Entertainment",
    // House rule: no "+" glyph on a figure in user-facing copy — say it in words.
    summary: "Visual and brand identity for a network reaching more than 100 million monthly viewers.",
    role: "Visual & Brand Design — website and video",
    start: "2018",
    end: "2019",
    outcomes: ["More than 100 million combined monthly viewers"],
    disciplines: ["Brand design", "Visual design"],
    links: [{ label: "millentertainment.com", href: "https://www.millentertainment.com/" }],
    weight: 40,
    featured: false,
  },
  {
    slug: "vr-design-reviews",
    name: "VR Design Reviews",
    summary: "Spatial prototyping and design review on $300 million buildings.",
    role: "XR Engineer — 3D design management",
    start: "2017",
    end: "2018",
    outcomes: [],
    disciplines: ["XR", "Engineering", "3D"],
    links: [{ label: "Case study", href: "https://www.2d.ericluttmann.com/vr/" }],
    weight: 30,
    featured: false,
  },
  {
    slug: "immersive-workspaces",
    name: "Immersive Workspaces",
    summary:
      "A $10 million interactive workspace and video conference project for the Department of Energy.",
    role: "VR Research Assistant",
    org: "Penn State",
    start: "2015",
    end: "2017",
    outcomes: [],
    disciplines: ["XR", "Research"],
    links: [{ label: "bim.psu.edu", href: "https://bim.psu.edu/interactive_workspaces/" }],
    weight: 20,
    featured: false,
  },
] as const;

export const projects: Project[] = raw.map((p) => projectSchema.parse(p));
