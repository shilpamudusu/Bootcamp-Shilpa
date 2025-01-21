import { getProduct } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Await the params object before accessing its properties
  const { id } = params; // params are already resolved, no need for an extra await
  const product = await getProduct(parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Stock: {product.stock}</p>
      <FavoriteButton product={product} />
    </div>
  );
}
