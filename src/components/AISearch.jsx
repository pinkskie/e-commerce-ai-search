import React, { useState } from "react";
import { toast } from "react-hot-toast";

import "./AISearch.css";

const AISearch = ({ onSearchResults, products, loading }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchWithAI = async (naturalQuery) => {
    setIsLoading(true);

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Parse natural language query
      const lowerQuery = naturalQuery.toLowerCase();

      let filteredProducts = [...products];

      // Price filtering
      if (lowerQuery.includes("under") || lowerQuery.includes("less than")) {
        const priceMatch = lowerQuery.match(/(\d+)/);
        if (priceMatch) {
          const maxPrice = parseFloat(priceMatch[1]);
          filteredProducts = filteredProducts.filter(
            (product) => product.price <= maxPrice
          );
        }
      }

      if (lowerQuery.includes("over") || lowerQuery.includes("more than")) {
        const priceMatch = lowerQuery.match(/(\d+)/);
        if (priceMatch) {
          const minPrice = parseFloat(priceMatch[1]);
          filteredProducts = filteredProducts.filter(
            (product) => product.price >= minPrice
          );
        }
      }

      // Category filtering
      if (lowerQuery.includes("shoes") || lowerQuery.includes("footwear")) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes("shoes") ||
            product.category.toLowerCase().includes("clothing")
        );
      }

      if (lowerQuery.includes("electronics") || lowerQuery.includes("tech")) {
        filteredProducts = filteredProducts.filter((product) =>
          product.category.toLowerCase().includes("electronics")
        );
      }

      if (lowerQuery.includes("jewelry") || lowerQuery.includes("jewelery")) {
        filteredProducts = filteredProducts.filter((product) =>
          product.category.toLowerCase().includes("jewelery")
        );
      }

      // Rating filtering
      if (
        lowerQuery.includes("good reviews") ||
        lowerQuery.includes("high rating")
      ) {
        filteredProducts = filteredProducts.filter(
          (product) => product.rating && product.rating.rate >= 4.0
        );
      }

      // General search terms
      const searchTerms = [
        "running",
        "comfortable",
        "stylish",
        "cheap",
        "expensive",
      ];
      searchTerms.forEach((term) => {
        if (lowerQuery.includes(term)) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.title.toLowerCase().includes(term) ||
              product.description.toLowerCase().includes(term)
          );
        }
      });

      // If no specific filters applied, do general search
      if (filteredProducts.length === products.length) {
        filteredProducts = products.filter(
          (product) =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
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
              <strong>Examples:</strong> "electronics under $50", "women's
              clothing with good reviews", "cheap running shoes"
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
