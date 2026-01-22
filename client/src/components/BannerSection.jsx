import React, { useState } from "react";

export default function BannerSection() {
  return (
    <section className="bannerSection">
      <div className="banner">
        <div className="bannerOverlay"></div>
        <div className="bannerContent">
          <h2>Wear More Shoes and T-shirts</h2>
          <button className="bannerBtn">Learn more →</button>
        </div>
      </div>
    </section>
  );
}
