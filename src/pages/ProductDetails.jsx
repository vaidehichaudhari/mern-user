import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8000/api/product/getProductById/${id}`),
      fetch('http://localhost:8000/api/category/getAllCategories'),
    ])
      .then(async ([productRes, categoryRes]) => {
        if (!productRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch product or category data');
        }

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setProduct(productData.product);
        setCategories(categoryData.categories || []);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        toast.error('Failed to load product details');
      });
  }, [id]);

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id || c._id === id)?.name || 'N/A';

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
    // Add cart logic here (context/localStorage)
  };

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <Toaster position="top-right" />

      <div className="row align-items-start">
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
        </div>

        <div className="col-md-7">
          <h2 className="fw-bold text-primary mb-3">{product.name}</h2>
          <p className="text-muted mb-2">{product.description}</p>

          <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
          <p><strong>Category:</strong> {getCategoryName(product.categoryId)}</p>

          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            <Button variant="outline-secondary" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Static Highlights Section */}
      <div className="row">
        <div className="col-md-12">
          <h4 className="text-success fw-semibold mb-3">🌟 Why you'll love this product</h4>
          <ul className="list-unstyled">
            <li>✔️ Handpicked quality products</li>
            <li>✔️ Ideal for everyday use and long-term durability</li>
            <li>✔️ Quick delivery & hassle-free returns</li>
            <li>✔️ 24/7 customer support</li>
            <li>✔️ Loved and highly rated by other shoppers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
