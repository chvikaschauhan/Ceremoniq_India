const regionalEdits = {
  Punjabi: {
    treats: "A box of pinni and handcrafted phulkari keepsakes",
    artifact: "A brass diya set with a hand-painted phulkari detail",
    wrap: "Phulkari-inspired fabric wrap in jewel tones",
    note: "Phulkari embroidery brings color and auspicious wishes to celebrations across Punjab.",
  },
  Bengali: {
    treats: "A curated mishti box with sandesh and nolen gur delicacies",
    artifact: "A hand-crafted dokra brass keepsake",
    wrap: "Soft red-and-white handloom cotton with a shola-inspired tag",
    note: "Bengali mishti and artisanal craft make a warm, familiar expression of celebration.",
  },
  Maharashtrian: {
    treats: "Puran poli and a selection of festive chivda",
    artifact: "A Paithani-inspired keepsake with a small brass diya",
    wrap: "Paithani-inspired silk ribbon around a handloom box",
    note: "Paithani motifs and festive Maharashtrian flavors bring a sense of occasion.",
  },
  "South Indian": {
    treats: "Mysore pak and filter coffee in a keepsake tin",
    artifact: "A hand-etched brass urli or traditional lamp",
    wrap: "Kalamkari cotton wrap with a subtle kolam-inspired tag",
    note: "South Indian handloom, brass craft and beloved regional flavors make this edit feel rooted.",
  },
  Rajasthani: {
    treats: "A festive box of ghewar and dry fruit sweets",
    artifact: "A miniature blue pottery keepsake or carved wooden accent",
    wrap: "Block-printed cotton with a traditional gota detail",
    note: "Rajasthani block printing and vibrant craft carry a little royal warmth.",
  },
  Gujarati: {
    treats: "A festive assortment of sukhdi, mohanthal and dry fruits",
    artifact: "A hand-painted mata-ni-pachedi inspired keepsake",
    wrap: "Bandhani-inspired fabric tie on a hand-painted box",
    note: "Bandhani color and Gujarati festive treats bring an auspicious, celebratory spirit.",
  },
  Assamese: {
    treats: "Assam tea, pitha and locally sourced honey",
    artifact: "A handwoven gamusa keepsake or bamboo craft piece",
    wrap: "Eri silk or handloom cotton with a woven gamusa-inspired band",
    note: "Assamese handloom and tea traditions offer a graceful, locally rooted gesture.",
  },
  "Surprise me": {
    treats: "A rotating selection of regional mithai and artisanal tea",
    artifact: "A hand-finished brass keepsake from an Indian craft collective",
    wrap: "A handloom cotton wrap paired with a reusable keepsake box",
    note: "A pan-Indian edit celebrates the many craft traditions and flavors found across India.",
  },
};

const occasionDetails = {
  Wedding: "Auspicious and keepsake-worthy, chosen to honor a new beginning.",
  Housewarming: "A welcoming gift to bring warmth and good wishes into a new home.",
  Diwali: "A festive gesture inspired by light, abundance and togetherness.",
  Birthday: "A personal treat with a little everyday delight and a lasting keepsake.",
  "Baby shower": "A gentle, thoughtful welcome for the little one and their family.",
  "Thank you": "A gracious way to say thank you, with care in every detail.",
};

export function createRecommendations(request, response) {
  const { occasion, recipient, culture, state } = request.body || {};
  const normalizedOccasion = typeof occasion === "string" ? occasion.trim() : "";
  const normalizedRecipient = typeof recipient === "string" ? recipient.trim() : "";
  const normalizedCulture = typeof (culture || state) === "string" ? (culture || state).trim() : "";

  if (!normalizedOccasion || !normalizedRecipient || !normalizedCulture) {
    return response.status(400).json({ message: "Please provide an occasion, recipient, and culture or state." });
  }

  const regional = regionalEdits[normalizedCulture] || regionalEdits["Surprise me"];
  const occasionContext = occasionDetails[normalizedOccasion] || `A thoughtful ${normalizedOccasion.toLowerCase()} gesture.`;
  const items = [
    {
      name: regional.treats,
      description: `${occasionContext} A beautiful edible gift to share with ${normalizedRecipient.toLowerCase()}.`,
      culturalNote: regional.note,
    },
    {
      name: regional.artifact,
      description: `A lasting keepsake for ${normalizedRecipient.toLowerCase()}, chosen for this ${normalizedOccasion.toLowerCase()}.`,
      culturalNote: regional.note,
    },
  ];
  const packaging = [
    { name: regional.wrap, description: "Reusable, locally inspired and finished by hand." },
    { name: "A note for the moment", description: `A handwritten card with wishes for ${normalizedRecipient.toLowerCase()} and a short note on the craft tradition.` },
  ];

  return response.json({ occasion: normalizedOccasion, recipient: normalizedRecipient, culture: normalizedCulture, items, packaging });
}
