// pages/products/index.jsx
import products from '../../../../data/products.json';

export async function getStaticProps() {
  return { props: { products } };
}

export default function Products({ products }) {
  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <Link href={`/products/${product.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
