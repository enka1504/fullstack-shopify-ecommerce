import React, { useMemo, useState } from "react";

/**
 * Layout inspired by the screenshot:
 * - Product grid (4 columns desktop / 2 tablet / 1 mobile)
 * - Each card: tag, image, title, short description, price row, "View product" button
 * - Mid-page wide banner ("Eat More Protein")
 * - FAQ section: left big title, right accordion list
 *
 * TailwindCSS required.
 */

const PRODUCTS = [
  {
    tag: "BESTSELLER",
    title: "Black Edition",
    desc: "Complete high-protein powder meal.",
    img: "https://images.unsplash.com/photo-1615486364163-2f8b84f1a4c6?auto=format&fit=crop&w=900&q=60",
    price: 34.95,
    unit: "/ bag",
  },
  {
    tag: "BESTSELLER",
    title: "Black Edition Ready-to-drink",
    desc: "High-protein ready-to-drink bottles.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=60",
    price: 49.95,
    unit: "/ case",
  },
  {
    tag: "",
    title: "High-Protein Starter Kit",
    desc: "Everything you need to get started.",
    img: "https://images.unsplash.com/photo-1585238342028-1f7a4f2d1c3b?auto=format&fit=crop&w=900&q=60",
    price: 59.0,
    unit: "",
  },
  {
    tag: "",
    title: "Complete Nutrition Bar",
    desc: "Complete protein bar.",
    img: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=900&q=60",
    price: 28.0,
    unit: "/ box",
  },
  {
    tag: "",
    title: "Complete Protein",
    desc: "Complete protein powder.",
    img: "https://images.unsplash.com/photo-1615485737651-5802d947eaa6?auto=format&fit=crop&w=900&q=60",
    price: 32.5,
    unit: "/ bag",
  },
  {
    tag: "",
    title: "Greens",
    desc: "Daily greens & superfood blend.",
    img: "https://images.unsplash.com/photo-1524594162868-7c5260f8b2f1?auto=format&fit=crop&w=900&q=60",
    price: 27.0,
    unit: "/ pouch",
  },
  {
    tag: "",
    title: "High-Protein Bundle",
    desc: "Best value bundle for protein goals.",
    img: "https://images.unsplash.com/photo-1582719478185-2b7b0f4d3f1a?auto=format&fit=crop&w=900&q=60",
    price: 89.0,
    unit: "",
  },
];

const FAQS = [
  {
    q: "Why choose a Huel high-protein meal?",
    a: "A high-protein meal helps support muscle recovery and keeps you fuller for longer. In a storefront like this, you’d add the specific nutrition claims and link to lab results or ingredient pages.",
  },
  {
    q: "How much protein does Huel contain?",
    a: "It depends on the product. Powders, RTD, and bars often vary by serving size. Store the exact values in your product data and render them dynamically.",
  },
  {
    q: "Is it suitable for weight loss?",
    a: "Many customers use meal replacements as part of a calorie-controlled diet. Avoid hard claims; provide guidance and encourage professional advice where needed.",
  },
  {
    q: "How do subscriptions work?",
    a: "Subscriptions typically offer a discount and flexible delivery frequency. You can model this as selling-plan options (Shopify) or a custom subscription engine.",
  },
];

function Money({ value }) {
  const formatted = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value),
    [value],
  );
  return <span>{formatted}</span>;
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] tracking-wider font-semibold text-neutral-700">
      <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
      {children}
    </span>
  );
}

function ProductCard({ p }) {
  return (
    <article className="group">
      <div className="rounded-2xl border border-black/5 bg-[#F4F1EA] p-4 shadow-sm">
        <div className="h-6">{p.tag ? <Pill>{p.tag}</Pill> : null}</div>

        <div className="mt-3 rounded-xl bg-white/50 overflow-hidden">
          <div className="aspect-[4/3] grid place-items-center">
            <img
              src={p.img}
              alt={p.title}
              className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
            {p.title}
          </h3>
          <p className="mt-1 text-xs text-neutral-600">{p.desc}</p>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="text-sm font-semibold text-neutral-900">
              <Money value={p.price} />{" "}
              <span className="text-xs font-normal text-neutral-500">
                {p.unit}
              </span>
            </div>

            <button className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/90">
              View product
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold text-neutral-900">{item.q}</span>
        <span className="mt-0.5 text-lg leading-none text-neutral-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {open ? (
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
          {item.a}
        </p>
      ) : null}
    </div>
  );
}

export default function HuelLikeCollectionPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Minimal top spacing like a page section */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Product grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={`${p.title}-${i}`} p={p} />
            ))}
          </div>
        </section>

        {/* Wide banner */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-black/5">
            <div
              className="h-36 md:h-44 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1542736667-069246bdbc6d?auto=format&fit=crop&w=2000&q=60)",
              }}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-0 flex items-end">
              <div className="p-4 md:p-6">
                <h2 className="text-white text-lg md:text-xl font-extrabold tracking-tight">
                  Eat More Protein
                </h2>
                <button className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-white/90">
                  Learn more →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section (title left, accordion right) */}
        <section className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Protein &amp; Fitness FAQs
              </h2>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                Add your educational content here. In a real Shopify build,
                these could be theme blocks or metafields.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-black/10">
                {FAQS.map((item, idx) => (
                  <AccordionItem
                    key={item.q}
                    item={item}
                    open={openIdx === idx}
                    onToggle={() =>
                      setOpenIdx((cur) => (cur === idx ? -1 : idx))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating chat bubble (bottom right) */}
      <button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black text-white shadow-lg grid place-items-center"
        aria-label="Chat"
      >
        💬
      </button>
    </div>
  );
}
