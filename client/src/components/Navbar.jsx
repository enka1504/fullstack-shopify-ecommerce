import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
import UserMenu from "./UserMenu";
import i18n from "../assets/i18n";

function FlagUS(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#fff" />
      <path
        d="M3 6h18v2H3V6zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"
        fill="#D32F2F"
      />
      <path d="M3 6h9v8H3V6z" fill="#1E3A8A" />
      <path
        d="M4.2 7.2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1z"
        fill="#fff"
      />
    </svg>
  );
}

function FlagRS(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#fff" />
      <path d="M2.5 6.5h19v4h-19v-4z" fill="#D32F2F" />
      <path d="M2.5 10.5h19v3h-19v-3z" fill="#1E3A8A" />
      <path d="M2.5 13.5h19v4h-19v-4z" fill="#fff" />
    </svg>
  );
}

function FlagCN(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#D32F2F" />
      <path
        d="M7 7.5l.7 2.2 2.3.02-1.9 1.35.7 2.2L7 12.1l-1.8 1.37.7-2.2L4 9.92l2.3-.02L7 7.5z"
        fill="#FBBF24"
      />
      <circle cx="12.7" cy="7.6" r="0.6" fill="#FBBF24" />
      <circle cx="14.1" cy="9.2" r="0.6" fill="#FBBF24" />
      <circle cx="14.1" cy="11.1" r="0.6" fill="#FBBF24" />
      <circle cx="12.8" cy="12.6" r="0.6" fill="#FBBF24" />
    </svg>
  );
}

function FlagES(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="6" fill="#fff" />
      <path d="M2.5 6.5h19v4.2h-19V6.5z" fill="#C62828" />
      <path d="M2.5 10.7h19v2.6h-19v-2.6z" fill="#FBBF24" />
      <path d="M2.5 13.3h19v4.2h-19v-4.2z" fill="#C62828" />
    </svg>
  );
}

const LANGS = [
  { code: "en", label: "English", Flag: FlagUS },
  { code: "sr", label: "Srpski", Flag: FlagRS },
  { code: "zh", label: "中文", Flag: FlagCN },
  { code: "es", label: "Español", Flag: FlagES },
];

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

function LanguageModalExcellent({ open, onClose, currentLang, onSelect }) {
  const panelRef = useRef(null);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGS;
    return LANGS.filter(
      (l) =>
        l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    // focus search after open (small delay so animation doesn't block focus)
    const t = setTimeout(() => searchRef.current?.focus(), 80);

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    function onMouseDown(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel (✅ slide-up animation) */}
      <div
        ref={panelRef}
        className="
          relative w-full max-w-md overflow-hidden rounded-3xl
          border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl
          dark:border-white/10 dark:bg-zinc-900/80
          transform transition-all duration-200 ease-out
          translate-y-0 opacity-100
          animate-[langModalIn_.20s_ease-out]
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Choose language
            </h2>
            <p className="text-sm text-gray-500 dark:text-white/60">
              Search and select your preferred language
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/70 p-2 shadow-sm transition hover:bg-white hover:shadow
                       dark:bg-white/10 dark:hover:bg-white/20"
            aria-label="Close"
          >
            <span className="text-gray-800 dark:text-white">✕</span>
          </button>
        </div>

        {/* Search (✅ search input) */}
        <div className="px-5 pb-3">
          <div
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/70 px-3 py-2
                          dark:border-white/10 dark:bg-white/10"
          >
            <span className="text-gray-500 dark:text-white/60">🔎</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language…"
              className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400
                         dark:text-white dark:placeholder:text-white/40"
            />
          </div>
        </div>

        {/* List */}
        <div className="px-5 pb-5">
          <div className="grid gap-2">
            {filtered.map((l) => {
              const active = l.code === currentLang;
              const Flag = l.Flag;

              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => onSelect(l.code)}
                  className={[
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-left",
                    "transition duration-200 border",
                    "hover:shadow-sm",
                    active
                      ? "border-blue-500 bg-blue-50/80"
                      : "border-gray-200 bg-white/70 hover:bg-white",
                    "dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/15",
                    active ? "dark:border-blue-400 dark:bg-blue-500/15" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    {/* ✅ SVG flag */}
                    <Flag className="h-6 w-6" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {l.label}
                      </div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-white/50">
                        {l.code}
                      </div>
                    </div>
                  </div>

                  {active ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      ✓ Active
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-400 dark:text-white/40">
                      Select →
                    </span>
                  )}
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div
                className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-4 text-sm text-gray-600
                              dark:border-white/15 dark:bg-white/5 dark:text-white/60"
              >
                No languages found.
              </div>
            )}
          </div>
        </div>

        {/* CSS animation keyframes via Tailwind arbitrary */}
        <style>{`
          @keyframes langModalIn {
            from { transform: translateY(14px); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
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
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

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

  useEffect(() => {
    let mounted = true;
    async function loadMe() {
      if (!token) return;
      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setUser(data);
      } catch {}
    }
    loadMe();
    return () => (mounted = false);
  }, [token]);

  function signOut() {
    localStorage.removeItem("token");
    // if you store user in state globally, clear it too
    setUser(null);
  }

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

  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  function changeLanguage(code) {
    localStorage.setItem("lang", code);
    i18n.changeLanguage(code);
    setOpen(false);
  }

  useEffect(() => {
    // sync initial i18next language from local storage
    if (i18n?.changeLanguage && lang) i18n.changeLanguage(lang);
  }, []); // run once
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

          <Link to="/about">
            <div className="nav__cta">About</div>
          </Link>
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
          <div className="relative flex items-center">
            {/* Tooltip wrapper */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="
        relative inline-flex h-10 w-10 items-center justify-center
        rounded-full border border-gray-200/70 bg-white/70
        shadow-sm backdrop-blur-xl
        transition-all duration-200 ease-out
        hover:-translate-y-[1px] hover:bg-white hover:shadow-md
        active:translate-y-0 active:shadow-sm

        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2
        focus-visible:ring-offset-white

        dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15
        dark:focus-visible:ring-blue-400/70 dark:focus-visible:ring-offset-zinc-950
      "
                aria-label="Change language"
                aria-haspopup="dialog"
                aria-expanded={open}
              >
                {/* subtle glow ring on hover */}
                <span
                  className="
          pointer-events-none absolute inset-0 rounded-full
          ring-0 ring-blue-500/0 transition
          group-hover:ring-2 group-hover:ring-blue-500/20
          dark:group-hover:ring-blue-400/20
        "
                />

                {/* Active language dot */}
                <span
                  className="
          absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full
          bg-emerald-500 shadow-sm
          ring-2 ring-white
          dark:ring-zinc-950
        "
                  title="Language set"
                />

                {/* Flag Icon with hover scale */}
                <span className="transition-transform duration-200 group-hover:scale-110">
                  <current.Flag className="h-5 w-5" />
                </span>

                {/* Arrow bubble bottom-right */}
                <span
                  className="
          absolute -bottom-1 -right-1
          flex h-4 w-4 items-center justify-center
          rounded-full border border-gray-200 bg-white
          text-[10px] text-gray-500 shadow-sm
          transition
          dark:border-white/10 dark:bg-zinc-900 dark:text-white/60
        "
                >
                  <span
                    className={[
                      "inline-block transition-transform duration-200",
                      open ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  >
                    ▾
                  </span>
                </span>
              </button>

              {/* Tooltip */}
              <div
                className="
        pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2
        whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1
        text-xs font-semibold text-white
        opacity-0 shadow-lg transition
        group-hover:opacity-100
        dark:bg-black
      "
              >
                Language
                <span
                  className="
          absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2
          h-2 w-2 rotate-45 bg-zinc-900
          dark:bg-black
        "
                />
              </div>
            </div>

            {/* Modal */}
            <LanguageModalExcellent
              open={open}
              onClose={() => setOpen(false)}
              currentLang={lang}
              onSelect={changeLanguage}
            />
          </div>

          <Language>EN</Language>
          {/* keep your icons if you want */}
          {/* <Link to="/register">
            <button className="iconBtn" aria-label="Account">
              👤
            </button>
          </Link> */}
          <UserMenu isLoggedIn={isLoggedIn} user={user} onSignOut={signOut} />
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
