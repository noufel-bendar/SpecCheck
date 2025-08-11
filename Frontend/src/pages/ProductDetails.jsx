import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Rating from "../utils/Rating";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import { API_BASE } from "../utils/config";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Fetch single product
    fetch(`${API_BASE}/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product", err));

    // Fetch all products
    fetch(`${API_BASE}/api/products/`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-20 text-red-600">Loading product...</div>;
  }

  const rating = Rating(
    product.cpu_cores || 0,
    product.cpu_clock_speed || 0,
    product.gpu_score || 0,
    product.ram || 0,
    product.screen_resolution || "FHD",
    product.refresh_rate || 60,
    parseFloat(product.battery_life) || 0,
    parseFloat(product.weight) || 0
  );

  const competitors = allProducts
    .filter((p) => p.id !== parseInt(id))
    .map((other) => {
      const otherRating = Rating(
        other.cpu_cores || 0,
        other.cpu_clock_speed || 0,
        other.gpu_score || 0,
        other.ram || 0,
        other.screen_resolution || "FHD",
        other.refresh_rate || 60,
        parseFloat(other.battery_life) || 0,
        parseFloat(other.weight) || 0
      );

      let similarity = 0;
      Object.keys(rating.categories).forEach((key) => {
        const diff = Math.abs(rating.categories[key] - otherRating.categories[key]);
        similarity += (10 - diff);
      });

      return { product: other, score: similarity };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full max-w-7xl mx-auto py-10 px-4 md:px-8 xl:px-16 mt-[80px]">
        <h1 className="text-5xl font-bold text-gray-100 mb-6 tracking-tight" data-aos="fade-down">
          Laptop Details
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6" data-aos="fade-right">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain bg-gray-100 rounded-xl mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}

            <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
            <h3 className="text-md text-blue-700 mb-4">{product.model}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Processor:</strong> {product.processor}</li>
              <li><strong>RAM:</strong> {product.ram} GB</li>
              <li><strong>Storage:</strong> {product.storage}</li>
              <li><strong>GPU:</strong> {product.gpu}</li>
              <li><strong>Display:</strong> {product.display}</li>
              <li><strong>Keyboard:</strong> {product.keyboard}</li>
              <li><strong>OS:</strong> {product.os}</li>
              <li><strong>Battery Life:</strong> {product.battery_life} hrs</li>
              <li><strong>Weight:</strong> {product.weight}</li>
            </ul>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Category Ratings</h4>
              {Object.entries(rating.categories).map(([category, score], index) => {
                let barColor = "bg-red-500";
                if (score >= 8.5) barColor = "bg-emerald-500";
                else if (score >= 7) barColor = "bg-yellow-500";
                else if (score >= 5) barColor = "bg-orange-400";

                return (
                  <div key={category} className="mb-2" data-aos="fade-up" data-aos-delay={index * 60}>
                    <div className="flex justify-between text-xs font-medium text-gray-600">
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      <span>{score} / 10</span>
                    </div>
                    <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                      <div
                        className={`${barColor} h-full transition-all duration-1000 ease-out`}
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <p className="font-medium text-sm text-gray-600 mb-1">Component Breakdown</p>
              <ul className="list-disc ml-5 mt-1 text-gray-600 text-sm space-y-1">
                {Object.entries(rating.details).map(([label, value]) => (
                  <li key={label}><strong>{label}:</strong> {value} / 10</li>
                ))}
              </ul>
            </div>

            <div className="text-xl font-bold text-royal mt-6">{product.price} DA</div>
          </div>

          {/* Competitor Sidebar */}
          <div className="lg:w-1/3 hidden lg:block space-y-5" data-aos="fade-left">
            <h4 className="text-xl font-semibold text-gray-200 tracking-wide">Closest Competitors</h4>
            {competitors.map(({ product: comp }, idx) => (
              <div
                key={comp.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 duration-300"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <img
                  src={`${API_BASE}${comp.image}` }
                  alt={comp.model}
                  className="w-full h-32 object-contain bg-gray-50 rounded-lg"
                />
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {comp.title} {comp.model}
                </p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1">
                  <li>CPU: {comp.processor}</li>
                  <li>RAM: {comp.ram} GB</li>
                  <li>GPU: {comp.gpu}</li>
                  <li>Battery: {comp.battery_life} hrs</li>
                  <li>Weight: {comp.weight}</li>
                </ul>
                <p className="text-sm text-royal font-bold mt-2">{comp.price} DA</p>
                <Link
                  to={`/product/${comp.id}`}
                  className="block mt-3 text-center text-xs text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
