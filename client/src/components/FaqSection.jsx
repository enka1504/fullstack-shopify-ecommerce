import React, { useState } from "react";
import "./Example.css";

const FAQS = [
  {
    q: "What materials are commonly used in T-shirts?",
    a: "T-shirts are usually made from cotton, polyester, or cotton-poly blends.\n✅Cotton is soft and breathable\n✅Polyester is durable and dries fast\n✅Blends give comfort + long-lasting quality",
  },
  {
    q: "How do you choose the right T-shirt size?",
    a: "The best way is to check the size chart and compare it with your body measurements.",
  },
  {
    q: "What are the key features customers look for in shoes?",
    a: "Customers usually look for:\n✅ Comfort (cushion and fit)\n✅ Durability (strong sole and stitching)\n✅ Design/style (fashion and color)\n✅ Purpose (running, walking, casual, formal)",
  },
  {
    q: "How do you take care of T-shirts and shoes to make them last longer?",
    a: "For T-shirts:\n✅Wash in cold water\n✅Avoid high heat drying\n✅Turn inside-out before washing\nFor Shoes:\n✅Clean regularly\n✅Keep them dry\n✅Use shoe spray or protectors\n✅Store in a cool place",
  },
  {
    q: "What is the difference between casual shoes and sports shoes?",
    a: "Casual shoes are designed for everyday wear and style, while sports shoes are built for specific athletic activities, providing support, cushioning, and performance features tailored to those activities.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faqSection">
      <div className="faqGrid">
        <div className="faqLeft">
          <h2>Shoes & T-shirts FAQs</h2>
        </div>

        <div className="faqRight">
          {FAQS.map((f, idx) => (
            <div className="faqItem" key={idx}>
              <button
                className="faqQuestion"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span>{f.q}</span>
                <span className="faqIcon">{openIndex === idx ? "−" : "+"}</span>
              </button>

              {openIndex === idx && <p className="faqAnswer">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
