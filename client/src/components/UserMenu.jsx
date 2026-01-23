import React, { useEffect, useRef, useState } from "react";

/**
 * ✅ UserMenu styles (in the same file)
 * - Injected when component mounts
 * - Removed when component unmounts
 * - Scoped with .umWrap / .umMenu class names (your existing classes)
 */
const userMenuCss = `
/* wrapper */
.umWrap {
  position: relative;
  display: inline-flex;
}

/* button */
.umBtn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform 0.15s ease, background 0.15s ease;
}

.umWrap:hover .umBtn {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.umAvatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  object-fit: cover;
}

.umIcon {
  font-size: 18px;
  opacity: 0.9;
}

/* menu dropdown */
.umMenu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  min-width: 200px;
  background: rgba(20, 22, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  z-index: 50;
  animation: fadeInUp 0.14s ease-out;
  transform-origin: top right;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* top area */
.umTop {
  padding: 12px 12px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.umName {
  font-weight: 800;
  font-size: 14px;
}

.umSub {
  margin-top: 3px;
  font-size: 12px;
  opacity: 0.7;
}

/* items */
.umItem {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
  font-weight: 600;
}

.umItem:hover {
  background: rgba(255, 255, 255, 0.08);
}

.umDanger {
  color: rgba(248, 113, 113, 0.95);
}

.umDanger:hover {
  background: rgba(248, 113, 113, 0.12);
}
`;

function useInjectedStyle(cssText, id = "usermenu-css") {
  useEffect(() => {
    // Avoid duplicate <style> tag if component re-renders
    let style = document.querySelector(`style[data-style-id="${id}"]`);

    if (!style) {
      style = document.createElement("style");
      style.setAttribute("data-style-id", id);
      style.textContent = cssText;
      document.head.appendChild(style);
    }

    // Remove only if THIS component added it
    return () => {
      const existing = document.querySelector(`style[data-style-id="${id}"]`);
      if (existing) existing.remove();
    };
  }, [cssText, id]);
}

export default function UserMenu({ isLoggedIn, user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimerRef = useRef(null);

  // ✅ Inject CSS from the same file
  useInjectedStyle(userMenuCss, "usermenu-css");

  // Detect hover devices (desktop) vs touch (mobile)
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function go(path) {
    window.location.href = path; // or use React Router navigate()
  }

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function closeMenu() {
    clearCloseTimer();
    setOpen(false);
  }

  function closeMenuWithDelay() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 160);
  }

  // Close on outside click + ESC
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) closeMenu();
    }
    function onEsc(e) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div
      className="umWrap"
      ref={wrapRef}
      onMouseEnter={() => {
        if (canHover) openMenu();
      }}
      onMouseLeave={() => {
        if (canHover) closeMenuWithDelay();
      }}
    >
      <button
        className="umBtn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {user?.avatarUrl ? (
          <img className="umAvatar" src={user.avatarUrl} alt="User avatar" />
        ) : (
          <span className="umIcon" aria-hidden="true">
            👤
          </span>
        )}
      </button>

      {open && (
        <div
          className="umMenu"
          role="menu"
          onMouseEnter={() => {
            if (canHover) openMenu();
          }}
          onMouseLeave={() => {
            if (canHover) closeMenuWithDelay();
          }}
        >
          {isLoggedIn ? (
            <>
              <div className="umTop">
                <div className="umName">
                  {user?.fullName || user?.username || "Account"}
                </div>
                {user?.username ? (
                  <div className="umSub">@{user.username}</div>
                ) : null}
              </div>

              <button
                className="umItem"
                role="menuitem"
                onClick={() => go("/profile")}
              >
                Profile
              </button>

              <button
                className="umItem umDanger"
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  onSignOut?.();
                  go("/login");
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              className="umItem"
              role="menuitem"
              onClick={() => go("/login")}
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
