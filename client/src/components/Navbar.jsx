import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../Utils/Constants";

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
  {
    id: "on-the-go",
    title: "On-the-go",
    bg: "linear-gradient(135deg, #2f6d33, #6aa64f)",
    image:
      "https://images.unsplash.com/photo-1615486364527-5c5f6be9f96a?auto=format&fit=crop&w=1200&q=60",
    alt: "Green bottle",
  },
  {
    id: "on-the-go",
    title: "On-the-go",
    bg: "linear-gradient(135deg, #2f6d33, #6aa64f)",
    image:
      "https://images.unsplash.com/photo-1615486364527-5c5f6be9f96a?auto=format&fit=crop&w=1200&q=60",
    alt: "Green bottle",
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
function NavDropdown({ id, label, openId, setOpenId, children }) {
  const isOpen = openId === id;

  return (
    <div
      className={"dd " + (isOpen ? "dd--open" : "")}
      onMouseEnter={() => setOpenId(id)}
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

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid #f1d8d8e8;
  ${mobile({ height: "50px" })};
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
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
const Navbar = ({ key, setProducts, setKeywords }) => {
  const quantity = useSelector((state) => state.cart.quantity);

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

  const setKeyword = (value) => {
    axios
      .get(`${API_URL}/products?search=${value}`)
      .then((response) => {
        setProducts(response.data);
        setKeywords(value);
      })
      .catch((error) => {
        console.error("There was an error searching for products!", error);
      });
  };
  // console.log(cart);
  return (
    <Container>
      <div className="header__inner">
        <div className="logo">Tony</div>

        {/* Desktop nav */}
        <nav className="nav nav--desktop" aria-label="Primary">
          <NavDropdown
            id="shop"
            label="Shop all"
            openId={openId}
            setOpenId={setOpenId}
          ></NavDropdown>

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
            Which Product is right for you?
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

          <Language>EN</Language>
          {/* keep your icons if you want */}
          <Link to="/register">
            <button className="iconBtn" aria-label="Account">
              👤
            </button>
          </Link>
          <Link to="/cart">
            <button className="iconBtn" aria-label="Cart">
              👜
            </button>
          </Link>
        </div>

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
        {/* onMouseLeave={() => setOpenId(null)} */}
        {openId && (
          <></>
          // <main className="main">
          //   <aside className="sidebar">
          //     <h4 className="sidebar__title">Shop by Collection</h4>
          //     <button className="sidebar__link">Shop by Goal</button>
          //     <button className="sidebar__link">Help me choose</button>

          //     <button className="sidebar__outlet">
          //       Shop outlet &amp; save
          //     </button>

          //     <button className="sidebar__primary">Shop all</button>
          //   </aside>

          //   <section className="content">
          //     {/* <div className="cardsHeader">
          //       <div className="cardsHeader__spacer" />
          //       <div className="cardsHeader__controls">
          //         <button
          //           className="roundBtn"
          //           onClick={prev}
          //           aria-label="Previous"
          //         >
          //           ‹
          //         </button>
          //         <button className="roundBtn" onClick={next} aria-label="Next">
          //           ›
          //         </button>
          //       </div>
          //     </div> */}

          //     <div className="cardsRow" role="list">
          //       {visibleCards.map((card) => (
          //         <article
          //           key={card.id}
          //           className={"card" + (card.active ? " card--active" : "")}
          //           style={{ background: card.bg }}
          //           role="listitem"
          //           onMouseEnter={() =>
          //             setActiveIndex(CARDS.findIndex((c) => c.id === card.id))
          //           }
          //         >
          //           <div className="card__title">{card.title}</div>
          //           <div className="card__imageWrap">
          //             <img
          //               className="card__image"
          //               src={card.image}
          //               alt={card.alt}
          //             />
          //           </div>
          //           <button className="card__arrow" aria-label="Open">
          //             →
          //           </button>
          //         </article>
          //       ))}
          //     </div>
          //   </section>
          // </main>
        )}
      </div>

      {/* Mobile slide-down menu */}

      {/* <Right>
          <SearchContainer>
            <Input
              placeholder="Search"
              onKeyUp={(e) => setKeyword(e.target.value)}
            />
            <Search />
          </SearchContainer>
        </Right> */}
    </Container>
  );
};

export default Navbar;
