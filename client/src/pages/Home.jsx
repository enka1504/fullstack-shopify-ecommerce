import { React, useState, useEffect } from "react";
import Annoucement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import HuelHeader from "../components/huel";

import BannerSection from "../components/BannerSection";
import FaqSection from "../components/FaqSection";
import "../components/Example.css";

const Home = () => {
  const [keyword, setKeywords] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <div className="pageWrap">
      <HuelHeader />
      <Annoucement />
      <Navbar
        key={keyword}
        setProducts={setProducts}
        setKeywords={setKeywords}
      />
      <Slider />
      {/* <Categories /> */}
      <Products products={products} />
      <NewsLetter />
      <BannerSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Home;
