export const KEYWORD_MAPPINGS = {
  price: {
    under: ["under", "less than", "below", "cheaper than", "up to"],
    over: [
      "over",
      "more than",
      "above",
      "expensive",
      "premium",
      "higher",
      "higher than",
    ],
    cheap: ["cheap", "budget", "affordable", "inexpensive", "low cost"],
    expensive: ["expensive", "luxury", "premium", "high-end", "costly"],
  },
  categories: {
    electronics: [
      "electronics",
      "tech",
      "technology",
      "gadgets",
      "devices",
      "computers",
      "phones",
    ],
    clothing: ["clothing", "clothes", "apparel", "fashion", "wear", "outfit"],
    shoes: ["shoes", "footwear", "sneakers", "boots", "sandals", "trainers"],
    jewelry: [
      "jewelry",
      "jewellery",
      "accessories",
      "rings",
      "necklaces",
      "earrings",
    ],
    books: ["books", "reading", "literature", "novels", "textbooks"],
    sports: ["sports", "fitness", "exercise", "athletic", "workout"],
  },
  quality: {
    good: ["good", "high quality", "premium", "excellent", "top rated"],
    cheap: ["cheap", "budget", "affordable", "inexpensive"],
    luxury: ["luxury", "premium", "high-end", "expensive", "exclusive"],
  },
  attributes: {
    comfortable: ["comfortable", "comfy", "soft", "cozy", "relaxing"],
    stylish: ["stylish", "fashionable", "trendy", "modern", "elegant"],
    durable: ["durable", "long lasting", "sturdy", "robust", "strong"],
    lightweight: ["lightweight", "light", "portable", "compact"],
    waterproof: ["waterproof", "water resistant", "water proof"],
  },
};

export const PRICE_PATTERNS = [
  /(?:under|less than|below|up to)\s*\$?(\d+)/i,
  /(?:over|more than|above|higher|higher than)\s*\$?(\d+)/i,
  /(\d+)\s*(?:dollars?|bucks?|usd)/i,
  /cheap(?:er)?\s*(?:than\s*\$?(\d+))?/i,
  /expensive\s*(?:over\s*\$?(\d+))?/i,
];
