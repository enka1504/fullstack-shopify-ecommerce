import React, { useEffect, useMemo, useRef, useState } from "react";

const CARDS = [
  {
    id: "lose-weight",
    title: "Lose weight",
    bg: "linear-gradient(135deg, #0b0b0b, #1b1b1b)",
    image:
      "https://images.unsplash.com/photo-1622480916113-900fd9b8dbfe?auto=format&fit=crop&w=1200&q=60",
    alt: "Bottle",
  },
  {
    id: "more-protein",
    title: "More protein",
    bg: "linear-gradient(135deg, #7a4a32, #b97a58)",
    image:
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=60",
    alt: "Pouring drink",
  },
  {
    id: "eat-healthy",
    title: "Eat healthy",
    bg: "linear-gradient(135deg, #9b3d1f, #d1763a)",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=60",
    alt: "Bowl of food",
  },
  {
    id: "on-the-go",
    title: "On-the-go",
    bg: "linear-gradient(135deg, #2f6d33, #6aa64f)",
    image:
      "https://images.unsplash.com/photo-1615486364527-5c5f6be9f96a?auto=format&fit=crop&w=1200&q=60",
    alt: "Green bottle",
  },
];
function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={"dd" + (open ? " dd--open" : "")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="dd__btn"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {label} <span className="dd__caret">▾</span>
      </button>

      <div className="dd__menu">{children}</div>
    </div>
  );
}

function Icon({ name }) {
  // Tiny inline icons (no library needed)
  const common = { className: "icon", "aria-hidden": true };
  switch (name) {
    case "truck":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 7h11v9H3V7zm11 3h4l3 3v3h-7V10zm-8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8zm6-1h4v2h-4V7zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M7 7V6a5 5 0 0 1 10 0v1h3l-1 14H5L4 7h3zm2 0h6V6a3 3 0 0 0-6 0v1z" />
        </svg>
      );
    case "help":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 17a1.2 1.2 0 1 1 1.2-1.2A1.2 1.2 0 0 1 12 19zm1.6-6.8c-.8.6-1 .9-1 1.8h-2c0-1.8.6-2.6 1.7-3.4.8-.6 1.1-.9 1.1-1.6a1.4 1.4 0 0 0-2.8 0H8.6a3.4 3.4 0 0 1 6.8 0c0 1.6-.8 2.4-1.8 3.2z" />
        </svg>
      );
    default:
      return null;
  }
}

function useOnClickOutside(ref, handler, when = true) {
  useEffect(() => {
    if (!when) return;

    const listener = (event) => {
      const el = ref?.current;
      if (!el || el.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, when]);
}

function NavDropdown({ id, label, openId, setOpenId, children }) {
  const isOpen = openId === id;

  return (
    <div
      className={"dd " + (isOpen ? "dd--open" : "")}
      onMouseEnter={() => setOpenId(id)}
      onMouseLeave={() => setOpenId(null)}
    >
      <button
        className="dd__btn"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpenId(isOpen ? null : id)}
      >
        {label} <span className="dd__caret">▾</span>
      </button>

      <div className="dd__menu" role="menu">
        {children}
      </div>
    </div>
  );
}

function MobileAccordion({ id, label, openId, setOpenId, children }) {
  const isOpen = openId === id;

  return (
    <div className="mdd">
      <button
        className="mdd__btn"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setOpenId(isOpen ? null : id)}
      >
        <span>{label}</span>
        <span className={"mdd__caret " + (isOpen ? "mdd__caret--open" : "")}>
          ▾
        </span>
      </button>

      <div className={"mdd__panel " + (isOpen ? "mdd__panel--open" : "")}>
        {children}
      </div>
    </div>
  );
}

export default function HuelHeader() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [helpOpen, setHelpOpen] = useState(true);

  const visibleCards = useMemo(() => {
    // mimic a “scrollable row” by showing all; activeIndex used for small interaction
    return CARDS.map((c, i) => ({ ...c, active: i === activeIndex }));
  }, [activeIndex]);

  const next = () => setActiveIndex((i) => (i + 1) % CARDS.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + CARDS.length) % CARDS.length);

  const [openId, setOpenId] = useState(null); // desktop dropdowns
  const [mobileOpen, setMobileOpen] = useState(false); // hamburger panel
  const [mobileOpenId, setMobileOpenId] = useState(null); // mobile accordion section

  const headerRef = useRef(null);

  // close dropdowns and mobile menu when clicking outside header
  useOnClickOutside(
    headerRef,
    () => {
      setOpenId(null);
      setMobileOpen(false);
      setMobileOpenId(null);
    },
    true,
  );

  // close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
        setMobileOpenId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <div className="page">
      {/* Top promo bar */}
      <div className="topbar">
        <div className="topbar__inner">
          <div className="topbar__item">
            <span className="pill">GIVE 25% OFF</span>
            <span className="dim">, GET 25% OFF</span>
          </div>
          <div className="topbar__item">
            <Icon name="truck" />
            <span>FREE SHIPPING $65+</span>
          </div>
          <div className="topbar__item">
            <Icon name="ticket" />
            <span>SUBSCRIBE AND SAVE 20%</span>
          </div>
          <div className="topbar__item">
            <Icon name="shield" />
            <span>HSA/FSA ELIGIBLE: LEARN MORE</span>
          </div>
          <div className="topbar__right">
            <span className="dim">US</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header" ref={headerRef}>
        <div className="header__inner">
          <div className="logo">Huel</div>

          {/* Desktop nav */}
          <nav className="nav nav--desktop" aria-label="Primary">
            <NavDropdown
              id="shop"
              label="Shop all"
              openId={openId}
              setOpenId={setOpenId}
            >
              <a role="menuitem" href="#shop-all">
                All products
              </a>
              <a role="menuitem" href="#best-sellers">
                Best sellers
              </a>
              <a role="menuitem" href="#new">
                New arrivals
              </a>
            </NavDropdown>

            <NavDropdown
              id="science"
              label="Science"
              openId={openId}
              setOpenId={setOpenId}
            >
              <a role="menuitem" href="#nutrition">
                Nutrition
              </a>
              <a role="menuitem" href="#ingredients">
                Ingredients
              </a>
              <a role="menuitem" href="#research">
                Research
              </a>
            </NavDropdown>

            <NavDropdown
              id="about"
              label="About"
              openId={openId}
              setOpenId={setOpenId}
            >
              <a role="menuitem" href="#mission">
                Our mission
              </a>
              <a role="menuitem" href="#reviews">
                Reviews
              </a>
              <a role="menuitem" href="#sustainability">
                Sustainability
              </a>
            </NavDropdown>

            <NavDropdown
              id="why"
              label="Why Huel?"
              openId={openId}
              setOpenId={setOpenId}
            >
              <a role="menuitem" href="#why1">
                Why choose us
              </a>
              <a role="menuitem" href="#benefits">
                Benefits
              </a>
              <a role="menuitem" href="#faq">
                FAQ
              </a>
            </NavDropdown>

            <NavDropdown
              id="guides"
              label="Guides & Articles"
              openId={openId}
              setOpenId={setOpenId}
            >
              <a role="menuitem" href="#guides">
                Guides
              </a>
              <a role="menuitem" href="#articles">
                Articles
              </a>
              <a role="menuitem" href="#blog">
                Blog
              </a>
            </NavDropdown>

            <a
              className="nav__cta"
              href="#deal"
              onMouseEnter={() => setOpenId(null)}
            >
              Give 25%, Get 25%
            </a>
          </nav>

          {/* Right actions */}
          <div className="header__actions">
            <button className="chip headerOnlyDesktop">
              <span className="chip__dot" />
              Which Huel is right for you?
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="iconBtn headerOnlyMobile"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setOpenId(null);
                setMobileOpen((v) => !v);
                if (!mobileOpen) setMobileOpenId(null);
              }}
            >
              <span
                className={"hamburger " + (mobileOpen ? "hamburger--open" : "")}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </span>
            </button>

            {/* keep your icons if you want */}
            <button className="iconBtn" aria-label="Account">
              👤
            </button>
            <button className="iconBtn" aria-label="Cart">
              👜
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <div
          className={"mobilePanel " + (mobileOpen ? "mobilePanel--open" : "")}
        >
          <div className="mobilePanel__inner">
            <MobileAccordion
              id="m-shop"
              label="Shop all"
              openId={mobileOpenId}
              setOpenId={setMobileOpenId}
            >
              <a href="#shop-all" onClick={() => setMobileOpen(false)}>
                All products
              </a>
              <a href="#best-sellers" onClick={() => setMobileOpen(false)}>
                Best sellers
              </a>
              <a href="#new" onClick={() => setMobileOpen(false)}>
                New arrivals
              </a>
            </MobileAccordion>

            <MobileAccordion
              id="m-science"
              label="Science"
              openId={mobileOpenId}
              setOpenId={setMobileOpenId}
            >
              <a href="#nutrition" onClick={() => setMobileOpen(false)}>
                Nutrition
              </a>
              <a href="#ingredients" onClick={() => setMobileOpen(false)}>
                Ingredients
              </a>
              <a href="#research" onClick={() => setMobileOpen(false)}>
                Research
              </a>
            </MobileAccordion>

            <MobileAccordion
              id="m-about"
              label="About"
              openId={mobileOpenId}
              setOpenId={setMobileOpenId}
            >
              <a href="#mission" onClick={() => setMobileOpen(false)}>
                Our mission
              </a>
              <a href="#reviews" onClick={() => setMobileOpen(false)}>
                Reviews
              </a>
              <a href="#sustainability" onClick={() => setMobileOpen(false)}>
                Sustainability
              </a>
            </MobileAccordion>

            <MobileAccordion
              id="m-why"
              label="Why Huel?"
              openId={mobileOpenId}
              setOpenId={setMobileOpenId}
            >
              <a href="#why1" onClick={() => setMobileOpen(false)}>
                Why choose us
              </a>
              <a href="#benefits" onClick={() => setMobileOpen(false)}>
                Benefits
              </a>
              <a href="#faq" onClick={() => setMobileOpen(false)}>
                FAQ
              </a>
            </MobileAccordion>

            <MobileAccordion
              id="m-guides"
              label="Guides & Articles"
              openId={mobileOpenId}
              setOpenId={setMobileOpenId}
            >
              <a href="#guides" onClick={() => setMobileOpen(false)}>
                Guides
              </a>
              <a href="#articles" onClick={() => setMobileOpen(false)}>
                Articles
              </a>
              <a href="#blog" onClick={() => setMobileOpen(false)}>
                Blog
              </a>
            </MobileAccordion>

            <a
              className="mobileCta"
              href="#deal"
              onClick={() => setMobileOpen(false)}
            >
              Give 25%, Get 25%
            </a>
          </div>
        </div>

        {/* dim overlay when mobile open */}
        <div
          className={"overlay " + (mobileOpen ? "overlay--open" : "")}
          onClick={() => {
            setMobileOpen(false);
            setMobileOpenId(null);
          }}
        />
      </header>

      {/* Main */}
      <main className="main">
        <aside className="sidebar">
          <h4 className="sidebar__title">Shop by Collection</h4>
          <button className="sidebar__link">Shop by Goal</button>
          <button className="sidebar__link">Help me choose</button>

          <button className="sidebar__outlet">Shop outlet &amp; save</button>

          <button className="sidebar__primary">Shop all</button>
        </aside>

        <section className="content">
          <div className="cardsHeader">
            <div className="cardsHeader__spacer" />
            <div className="cardsHeader__controls">
              <button className="roundBtn" onClick={prev} aria-label="Previous">
                ‹
              </button>
              <button className="roundBtn" onClick={next} aria-label="Next">
                ›
              </button>
            </div>
          </div>

          <div className="cardsRow" role="list">
            {visibleCards.map((card) => (
              <article
                key={card.id}
                className={"card" + (card.active ? " card--active" : "")}
                style={{ background: card.bg }}
                role="listitem"
                onMouseEnter={() =>
                  setActiveIndex(CARDS.findIndex((c) => c.id === card.id))
                }
              >
                <div className="card__title">{card.title}</div>
                <div className="card__imageWrap">
                  <img
                    className="card__image"
                    src={card.image}
                    alt={card.alt}
                  />
                </div>
                <button className="card__arrow" aria-label="Open">
                  →
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Floating help bubble */}
      {helpOpen && (
        <div className="helpBubble">
          <button
            className="helpBubble__close"
            onClick={() => setHelpOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="helpBubble__text">Hi. Need any help?</div>
        </div>
      )}
    </div>
  );
}
