import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Rating from "../utils/Rating";
import { API_BASE } from "../utils/config";

const ITEMS_PER_PAGE = 15;

function ProductGrid({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadError, setLoadError] = useState("");

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`${API_BASE}/api/products/`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoadError("");
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setLoadError("Failed to load products. Please try again later.");
        setProducts([]);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = !isLoggedIn
    ? safeProducts
    : selectedCategory === "all"
    ? safeProducts
    : safeProducts
        .map((product) => {
          const { categories } = Rating(
            product.cpu_cores || 0,
            product.cpu_clock_speed || 0,
            product.gpu_score || 0,
            product.ram || 0,
            product.screen_resolution || "FHD",
            product.refresh_rate || 60,
            parseFloat(product.battery_life) || 0,
            parseFloat(product.weight) || 0
          );
          return { ...product, categoryScore: categories[selectedCategory] || 0 };
        })
        .filter((p) => p.categoryScore >= 6)
        .sort((a, b) => b.categoryScore - a.categoryScore);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;

    const filteredBySearch = filteredProducts.filter((product) =>
>>>>
    (product.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.model || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProducts = filteredBySearch.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <section className="px-4 sm:px-8 py-16 bg-[#000080]">
      <h1 id="shop-section" className="text-3xl font-bold text-center mb-12 text-white" data-aos="fade-down">
        Explore Our Laptops
      </h1>

      {loadError && (
        <p className="text-red-400 text-center mb-6">{loadError}</p>
      )}

      {!isLoggedIn && (
        <p className="text-white text-center mb-6">
          🔒 Login to filter and rank products by categories like gaming, student use, etc.
        </p>
      )}

      {isLoggedIn && (
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {["all", "gaming", "programming", "student", "design", "editing", "media", "travel", "everyday use"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-white font-semibold transition ${
                selectedCategory === cat ? "bg-indigo-500 text-black" : "bg-blue-600 hover:bg-blue-800"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))
        ) : (
          <p className="text-white col-span-full text-center">No laptops match this category.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === page ? "bg-indigo-500 text-black" : "bg-white text-blue-800 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
