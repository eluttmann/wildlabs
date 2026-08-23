import { personSchema, type Person } from "../schema";

/**
 * Seeded from ericluttmann.com. The statement and bio are Eric's own words and
 * should stay that way — they are the brand voice, not placeholder copy.
 */
export const person: Person = personSchema.parse({
  name: "Eric Luttmann",
  statement: "Enable access to knowledge & creation via spatial AI",
  bio: "Eric creates 3D & AI software products that enable access to knowledge & creation. He's worked with startups backed by Sequoia to enterprises such as Nvidia. His products have been presented at an Autodesk Keynote and Stanford University.",
  location: "Los Angeles, California",
  mark: "ワイルド",
  email: "hello@wildeylabs.com", // TODO(eric): confirm the address you want public
  links: [
    { label: "Wild Labs", href: "https://wildeylabs.com" },
    { label: "Personal", href: "https://www.ericluttmann.com" },
    { label: "GitHub", href: "https://github.com/eluttmann" },
  ],
  capabilities: [
    "Spatial AI",
    "3D software",
    "Product design",
    "Design engineering",
    "Gaussian splatting",
    "Agent tooling",
  ],
});
