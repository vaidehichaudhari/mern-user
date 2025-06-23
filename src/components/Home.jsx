import React from "react";

import Products from "../pages/Product";

import BannerCarousel from '../pages/BannerCarousel'; // adjust path as needed


const Home = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <div className="container mt-3">
              <BannerCarousel />  
                <Products />
                
            </div>
        </div>
    );
};

export default Home;
