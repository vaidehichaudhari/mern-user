import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaStar, FaRegStar, FaEye } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/api/product/getAllProducts'),
      // fetch('http://localhost:8000/api/brand/getAllBrands'),
      fetch('http://localhost:8000/api/category/getAllCategories')
    ])
      .then(async ([productRes, brandRes, categoryRes]) => {
        if (!productRes.ok || !brandRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const productData = await productRes.json();
        // const brandData = await brandRes.json();
        const categoryData = await categoryRes.json();

        setProducts(productData.products || []);
        // setBrands(brandData.brands || []);
        setCategories(categoryData.categories || []);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        toast.error('Failed to load product data');
      });
  }, []);

  // const getBrandName = (id) => brands.find((b) => b.id === id || b._id === id)?.name || 'N/A';
  const getCategoryName = (id) => categories.find((c) => c.id === id || c._id === id)?.name || 'N/A';

  const toggleReadMore = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-secondary" />);
    }
    return stars;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-center mb-4 fw-bold text-primary">🛍️ Discover Amazing Deals!</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="form-control mb-4 shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div className="col" key={product.id || product._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={product.image}
                  className="mx-auto d-block mt-3 rounded"
                  alt={product.name}
                  style={{ height: '120px', width: '120px', objectFit: 'cover' }}
                />

                <div className="card-body">
                  <h5 className="card-title fw-semibold">
                    {product.name}{' '}
                    {product.discount && <span className="badge bg-danger ms-2">{product.discount}% OFF</span>}
                  </h5>

                  <p className="card-text text-muted small">
                    {expanded[product._id || product.id]
                      ? product.description
                      : `${product.description.slice(0, 60)}...`}
                    {product.description.length > 60 && (
                      <span
                        className="text-primary ms-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleReadMore(product._id || product.id)}
                      >
                        {expanded[product._id || product.id] ? 'Read Less' : 'Read More'}
                      </span>
                    )}
                  </p>

                  <p className="mb-1"><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                  {/* <p className="mb-1"><strong>Brand:</strong> {getBrandName(product.brandId)}</p> */}
                  <p className="mb-1"><strong>Category:</strong> {getCategoryName(product.categoryId)}</p>

                  <div className="mb-2">{renderStars(product.rating || 4)}</div>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => navigate(`/product/${product._id || product.id}`)}>
                      View Details
                    </Button>
                    <Button variant="light" size="sm" onClick={() => setQuickViewProduct(product)}>
                      <FaEye />
                    </Button>
                  </div>

                  {product.stock < 1 && <span className="badge bg-secondary mt-2">Out of Stock</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick View Modal */}
      <Modal show={!!quickViewProduct} onHide={() => setQuickViewProduct(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quick View</Modal.Title>
        </Modal.Header>
        {quickViewProduct && (
          <Modal.Body>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="img-fluid rounded mb-3"
            />
            <h5>{quickViewProduct.name}</h5>
            <p>{quickViewProduct.description}</p>
            <p><strong>Price:</strong> ₹{quickViewProduct.price.toFixed(2)}</p>
            {/* <p><strong>Brand:</strong> {getBrandName(quickViewProduct.brandId)}</p> */}
            <p><strong>Category:</strong> {getCategoryName(quickViewProduct.categoryId)}</p>
            <div>{renderStars(quickViewProduct.rating || 4)}</div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setQuickViewProduct(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
