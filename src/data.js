const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: "mirakle-coq10",
    number: "01",
    title: "Mirakle CoQ-10",
    tagline: "A clean, clinical approach to supplement packaging — focused on visual identity, modern aesthetics, and clear information hierarchy.",
    tags: ["Supplement", "Visual Identity", "Packaging Design"],
    color: "#00B4D8",
    thumbnail: `${base}mirakle coq10/thumbnail.gif`,
    images: [
      { src: `${base}mirakle coq10/1.gif`, span: "span-full" },
      { src: `${base}mirakle coq10/2.webp`, span: "" },
      { src: `${base}mirakle coq10/3.webp`, span: "" },
      { src: `${base}mirakle coq10/4.webp`, span: "" },
      { src: `${base}mirakle coq10/5.webp`, span: "" },
      { src: `${base}mirakle coq10/6.webp`, span: "span-full" },
      { src: `${base}mirakle coq10/7.webp`, span: "" },
      { src: `${base}mirakle coq10/8.webp`, span: "" },
      { src: `${base}mirakle coq10/9.webp`, span: "span-2" },
    ]
  },
  {
    id: "mirakle-mr-mito",
    number: "02",
    title: "Mirakle Mr. MITO",
    tagline: "Vibrant and playful packaging for an energy drink brand — driven by bold illustrations and dynamic typography that demand shelf attention.",
    tags: ["Packaging", "Energy Drink", "Illustration", "Tetrapack"],
    color: "#FF6B35",
    thumbnail: `${base}mito/thumbnail.gif`,
    images: [
      { src: `${base}mito/1.gif`, span: "span-full" },
      { src: `${base}mito/2.gif`, span: "" },
      { src: `${base}mito/3.gif`, span: "" },
      { src: `${base}mito/4.gif`, span: "span-full" },
      { src: `${base}mito/5.gif`, span: "span-full" },
      { src: `${base}mito/6.jpg`, span: "span-full" },
    ]
  },
  {
    id: "nidra-nutrition",
    number: "03",
    title: "Nidra Nutrition",
    tagline: "Premium product packaging for a wellness brand — earthy tones and a trustworthy visual language crafted for health-conscious consumers.",
    tags: ["Product Design", "Nutrition", "Packaging", "Mockup"],
    color: "#2D6A4F",
    thumbnail: `${base}nidra/thumbnail.jpg`,
    images: [
      { src: `${base}nidra/1.jpg`, span: "span-full" },
      { src: `${base}nidra/2.jpg`, span: "" },
      { src: `${base}nidra/3.jpg`, span: "" },
      { src: `${base}nidra/4.jpg`, span: "span-full" },
      { src: `${base}nidra/5.jpg`, span: "" },
      { src: `${base}nidra/6.jpg`, span: "" },
    ]
  }
]
