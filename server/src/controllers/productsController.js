const products = [
  { id: "phulkari-gift-set", name: "Phulkari Celebration Gift Set", price: 1890, regionalOrigin: "Punjab", cultureTag: "Hand embroidery", description: "A festive pairing of artisan treats and a keepsake inspired by Punjab’s vibrant phulkari tradition.", imagePlaceholder: "Phulkari gift set" },
  { id: "bengal-mishti-box", name: "Bengal Mishti & Dokra Box", price: 1450, regionalOrigin: "West Bengal", cultureTag: "Sweet traditions", description: "A considered assortment of regional sweets with a handcrafted dokra keepsake.", imagePlaceholder: "Mishti and dokra" },
  { id: "paithani-diya-edit", name: "Paithani Diya Keepsake Edit", price: 2250, regionalOrigin: "Maharashtra", cultureTag: "Festive keepsake", description: "A brass diya and Paithani-inspired details bring a warm glow to a new home or celebration.", imagePlaceholder: "Diya keepsake edit" },
  { id: "assam-tea-hamper", name: "Assam Tea & Handloom Hamper", price: 1690, regionalOrigin: "Assam", cultureTag: "Tea and handloom", description: "Locally sourced tea, pitha and a handloom accent make a gracious regional gift.", imagePlaceholder: "Tea hamper" },
  { id: "rajasthan-royal-box", name: "Rajasthan Royal Treat Box", price: 1990, regionalOrigin: "Rajasthan", cultureTag: "Artisan treats", description: "A festive selection of ghewar and dry fruits, finished with a colorful craft detail.", imagePlaceholder: "Royal treat box" },
  { id: "gujarat-bandhani-edit", name: "Gujarati Bandhani Gift Edit", price: 1790, regionalOrigin: "Gujarat", cultureTag: "Craft and mithai", description: "A joyful assortment of Gujarati festive treats with a Bandhani-inspired keepsake finish.", imagePlaceholder: "Bandhani gift edit" },
];

export function listProducts(_request, response) {
  response.json({ products });
}

export { products };
