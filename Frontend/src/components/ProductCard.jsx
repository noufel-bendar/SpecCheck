import { Link } from "react-router-dom";
import { normalizeImageUrl, getImageErrorHandler } from "../utils/imageUtils";

function ProductCard({ id, title, model, image, price, description }) {
  const imgSrc = normalizeImageUrl(image);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full" data-aos="fade-up">
      <img 
        src={imgSrc} 
        alt={title} 
        className="w-full h-48 object-contain bg-gray-100"
        onError={getImageErrorHandler()}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <h3 className="text-md text-royal font-medium mb-2">{model}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-blue-700">{price} DA</span>
          <Link to={`/product/${id}`}>
            <button className="px-4 py-1 text-sm bg-royal text-white rounded-full hover:bg-blue-800 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
