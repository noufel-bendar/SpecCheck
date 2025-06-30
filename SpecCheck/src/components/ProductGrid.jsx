import ProductCard from "./ProductCard";
import products from "../Data/products";
function ProductGrid() {
  return (
    <section className="px-4 sm:px-8 py-16 bg-[#000080]">
      <h1 className="text-3xl font-bold text-center mb-12 text-white" data-aos="fade-down">
        Explore Our Laptops
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
