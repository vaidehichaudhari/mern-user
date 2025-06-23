import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch product, brands, and categories
    Promise.all([
      fetch(`http://localhost:8000/api/product/getProductById/${id}`),
      // fetch('http://localhost:8000/api/brand/getAllBrands'),
      fetch('http://localhost:8000/api/category/getAllCategories'),
    ])
      .then(async ([productRes, brandRes, categoryRes]) => {
        if (!productRes.ok || !brandRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const productData = await productRes.json();
        // const brandData = await brandRes.json();
        const categoryData = await categoryRes.json();

        setProduct(productData.product);
        // setBrands(brandData.brands || []);
        setCategories(categoryData.categories || []);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        toast.error('Failed to load product details');
      });
  }, [id]);

  // const getBrandName = (id) =>
  //   brands.find((b) => b.id === id || b._id === id)?.name || 'N/A';

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id || c._id === id)?.name || 'N/A';

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
    // Add your cart context/localStorage logic here
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
          {/* <p><strong>Brand:</strong> {getBrandName(product.brandId)}</p> */}
          <p><strong>Category:</strong> {getCategoryName(product.categoryId)}</p>

          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
            <Button variant="outline-secondary" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Static Attraction Section */}
      <div className="row">
        <div className="col-md-12">
          <h4 className="text-success fw-semibold mb-3">🌟 Why you'll love this product</h4>
          <ul className="list-unstyled">
            <li>✔️ Handpicked quality from trusted brands</li>
            <li>✔️ Great for daily use and long-lasting durability</li>
            <li>✔️ Fast delivery and easy returns</li>
            <li>✔️ 24/7 customer support for your peace of mind</li>
            <li>✔️ Top-rated by customers like you</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
