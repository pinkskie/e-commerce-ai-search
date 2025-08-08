import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { KEYWORD_MAPPINGS, PRICE_PATTERNS } from "../lib";

import "./AISearch.css";

const AISearch = ({ onSearchResults, products }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced price extraction with better regex
  const extractPriceRange = (query) => {
    for (const pattern of PRICE_PATTERNS) {
      const match = query.match(pattern);
      if (match) {
        const price = parseFloat(match[1] || "0");
        if (
          pattern.source.includes("under") ||
          pattern.source.includes("cheap")
        ) {
          return { type: "max", value: price };
        } else if (
          pattern.source.includes("over") ||
          pattern.source.includes("expensive") ||
          pattern.source.includes("higher")
        ) {
          return { type: "min", value: price };
        }
      }
    }
    return null;
  };

  // Enhanced category detection
  const detectCategory = (query) => {
    const detectedCategories = [];

    Object.entries(KEYWORD_MAPPINGS.categories).forEach(
      ([category, keywords]) => {
        if (keywords.some((keyword) => query.toLowerCase().includes(keyword))) {
          detectedCategories.push(category);
        }
      }
    );

    return detectedCategories;
  };

  // Enhanced attribute detection
  const detectAttributes = (query) => {
    const detectedAttributes = [];

    Object.entries(KEYWORD_MAPPINGS.attributes).forEach(
      ([attribute, keywords]) => {
        if (keywords.some((keyword) => query.toLowerCase().includes(keyword))) {
          detectedAttributes.push(attribute);
        }
      }
    );

    return detectedAttributes;
  };

  // Enhanced quality detection
  const detectQuality = (query) => {
    const lowerQuery = query.toLowerCase();

    if (
      KEYWORD_MAPPINGS.quality.good.some((keyword) =>
        lowerQuery.includes(keyword)
      )
    ) {
      return "high";
    } else if (
      KEYWORD_MAPPINGS.quality.cheap.some((keyword) =>
        lowerQuery.includes(keyword)
      )
    ) {
      return "low";
    } else if (
      KEYWORD_MAPPINGS.quality.luxury.some((keyword) =>
        lowerQuery.includes(keyword)
      )
    ) {
      return "luxury";
    }

    // Special handling for "higher" queries
    if (lowerQuery.includes("higher")) {
      return "luxury"; // Treat "higher" as luxury/premium
    }

    return null;
  };

  // Enhanced product scoring based on query relevance
  const calculateProductScore = (
    product,
    query,
    detectedCategories,
    detectedAttributes,
    quality
  ) => {
    let score = 0;
    const lowerQuery = query.toLowerCase();
    const lowerTitle = product.title.toLowerCase();
    const lowerDescription = (product.description || "").toLowerCase();
    const lowerCategory = product.category.toLowerCase();

    // Category matching
    if (detectedCategories.length > 0) {
      if (detectedCategories.some((cat) => lowerCategory.includes(cat))) {
        score += 10;
      }
    }

    // Title matching
    if (lowerTitle.includes(lowerQuery)) {
      score += 8;
    }

    // Description matching
    if (lowerDescription.includes(lowerQuery)) {
      score += 5;
    }

    // Attribute matching
    detectedAttributes.forEach((attr) => {
      if (lowerTitle.includes(attr) || lowerDescription.includes(attr)) {
        score += 3;
      }
    });

    // Quality matching
    if (quality === "high" && product.rating && product.rating.rate >= 4.0) {
      score += 4;
    } else if (quality === "low" && product.price < 50) {
      score += 4;
    } else if (quality === "luxury" && product.price > 100) {
      score += 4;
    }

    // Rating boost
    if (product.rating && product.rating.rate >= 4.5) {
      score += 2;
    }

    return score;
  };

  const searchWithAI = async (naturalQuery) => {
    setIsLoading(true);

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let filteredProducts = [...products];

      // Extract price range
      const priceRange = extractPriceRange(naturalQuery);
      if (priceRange) {
        if (priceRange.type === "max") {
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= priceRange.value
          );
        } else {
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= priceRange.value
          );
        }
      }

      // Detect categories
      const detectedCategories = detectCategory(naturalQuery);

      // Detect attributes
      const detectedAttributes = detectAttributes(naturalQuery);

      // Detect quality preferences
      const quality = detectQuality(naturalQuery);

      // Apply category filtering if categories detected
      if (detectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          detectedCategories.some(
            (cat) =>
              product.category.toLowerCase().includes(cat) ||
              product.title.toLowerCase().includes(cat)
          )
        );
      }

      // Apply rating filtering
      if (
        naturalQuery.toLowerCase().includes("good reviews") ||
        naturalQuery.toLowerCase().includes("high rating") ||
        quality === "high"
      ) {
        filteredProducts = filteredProducts.filter(
          (product) => product.rating && product.rating.rate >= 4.0
        );
      }

      // If no specific filters applied, do semantic search
      if (filteredProducts.length === products.length) {
        // Calculate relevance scores for all products
        const scoredProducts = products.map((product) => ({
          ...product,
          relevanceScore: calculateProductScore(
            product,
            naturalQuery,
            detectedCategories,
            detectedAttributes,
            quality
          ),
        }));

        // Filter by minimum relevance score and sort by score
        filteredProducts = scoredProducts
          .filter((product) => product.relevanceScore > 0)
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .map(({ relevanceScore, ...product }) => product);
      }

      setIsLoading(false);
      return filteredProducts;
    } catch (error) {
      setIsLoading(false);
      toast.error("AI search failed. Please try again.");
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    const results = await searchWithAI(query);
    onSearchResults(results, query);
  };

  return (
    <div className="ai-search-container mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">🤖 AI Smart Search</h5>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Describe what you're looking for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Searching...
                  </>
                ) : (
                  "Search with AI"
                )}
              </button>
            </div>
          </form>

          <div className="mt-3">
            <small className="text-muted">
              <strong>Examples:</strong> "comfortable running shoes under $80",
              "luxury electronics with good reviews", "cheap stylish clothing"
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
