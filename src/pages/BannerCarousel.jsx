import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => {
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1920&q=80',
      alt: 'Sale Banner 1',
      caption: 'Big Summer Sale! Up to 50% OFF',
      subCaption: 'Shop your favorite products now',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80',
      alt: 'Sale Banner 2',
      caption: 'New Arrivals Just Landed',
      subCaption: 'Explore the latest collections',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1920&q=80',
      alt: 'Sale Banner 3',
      caption: 'Exclusive Deals for You',
      subCaption: 'Don’t miss out on limited offers',
    },
  ];

  return (
    <>
      <style>{`
        /* Fade-in animation for caption */
        .carousel-caption {
          animation: fadeInUp 1s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        .carousel-item.active .carousel-caption {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Minimum height for carousel images */
        .carousel-item img {
          min-height: 400px;  /* you can change to 300 or 450 */
          max-height: 70vh;
          width: 100%;
          object-fit: cover;
        }
      `}</style>

      <Carousel fade interval={4000} pause="hover" className="mb-4 rounded shadow-sm">
        {banners.map(({ id, image, alt, caption, subCaption }) => (
          <Carousel.Item key={id}>
            <img
              className="d-block w-100"
              src={image}
              alt={alt}
            />
            <Carousel.Caption
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
                padding: '1.5rem',
                maxWidth: '600px',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '20%',
              }}
            >
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>{caption}</h1>
              <p style={{ fontSize: '1.25rem' }}>{subCaption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default BannerCarousel;
