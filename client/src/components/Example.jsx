import React, { useState } from "react";
import "./Example.css";

const PRODUCTS = [
  {
    tag: "BESTSELLER",
    title: "Black Edition",
    desc: "Complete high-protein powder meal.",
    price: "$34.95",
    per: "/ bag",
    img: "https://images.unsplash.com/photo-1615485737651-5802d947eaa6?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "BESTSELLER",
    title: "Black Edition Ready-to-drink",
    desc: "High-protein ready-to-drink bottles.",
    price: "$49.95",
    per: "/ case",
    img: "https://images.unsplash.com/photo-1598514982841-052e2bfae0aa?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "",
    title: "High-Protein Starter Kit",
    desc: "The best way to start your journey.",
    price: "$59.00",
    per: "",
    img: "https://images.unsplash.com/photo-1585238342028-1f7a4f2d1c3b?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "",
    title: "Complete Nutrition Bar",
    desc: "Complete protein bar for busy days.",
    price: "$28.00",
    per: "/ box",
    img: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "",
    title: "Complete Protein",
    desc: "High-quality complete protein powder.",
    price: "$32.50",
    per: "/ bag",
    img: "https://images.unsplash.com/photo-1615486364163-2f8b84f1a4c6?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "",
    title: "Greens",
    desc: "Daily superfood & greens blend.",
    price: "$27.00",
    per: "/ pouch",
    img: "https://images.unsplash.com/photo-1524594162868-7c5260f8b2f1?auto=format&fit=crop&w=800&q=60",
  },
  {
    tag: "",
    title: "High-Protein Bundle",
    desc: "Bundle and save on protein products.",
    price: "$89.00",
    per: "",
    img: "https://images.unsplash.com/photo-1582719478185-2b7b0f4d3f1a?auto=format&fit=crop&w=800&q=60",
  },
];

const FAQS = [
  {
    q: "Why choose a high-protein meal?",
    a: "High-protein meals help support muscle growth, recovery, and long-lasting fullness.",
  },
  {
    q: "How much protein does it contain?",
    a: "It depends on each product. Powders, RTD, and bars have different serving protein values.",
  },
  {
    q: "Is it good for fitness goals?",
    a: "Yes. High-protein options are often used for lean muscle and performance support.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, shipping options depend on your country and store configuration.",
  },
];

export default function HuelPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="pageWrap">
      {/* Product Grid */}
      <section className="productSection">
        <div className="productGrid">
          {PRODUCTS.map((p, i) => (
            <div className="productCard" key={i}>
              {/* Tag */}
              <div className="tagRow">
                {p.tag ? (
                  <div className="tag">
                    <span className="tagDot"></span>
                    {p.tag}
                  </div>
                ) : (
                  <div className="tagEmpty"></div>
                )}
              </div>

              {/* Image */}
              <div className="productImgBox">
                <img className="productImg" src={p.img} alt={p.title} />
              </div>

              {/* Info */}
              <div className="productInfo">
                <h3 className="productTitle">{p.title}</h3>
                <p className="productDesc">{p.desc}</p>

                <div className="priceRow">
                  <div className="priceText">
                    <span className="price">{p.price}</span>{" "}
                    <span className="per">{p.per}</span>
                  </div>

                  <button className="viewBtn">View product</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bannerSection">
        <div className="banner">
          <div className="bannerOverlay"></div>
          <div className="bannerContent">
            <h2>Eat More Protein</h2>
            <button className="bannerBtn">Learn more →</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faqSection">
        <div className="faqGrid">
          <div className="faqLeft">
            <h2>Protein & Fitness FAQs</h2>
          </div>

          <div className="faqRight">
            {FAQS.map((f, idx) => (
              <div className="faqItem" key={idx}>
                <button
                  className="faqQuestion"
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                >
                  <span>{f.q}</span>
                  <span className="faqIcon">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>

                {openIndex === idx && <p className="faqAnswer">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
