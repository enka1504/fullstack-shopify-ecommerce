import React, { useEffect, useRef, useState } from "react";
export default function UserMenu({ isLoggedIn, user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Detect if device supports hover (desktop) vs touch (mobile)
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function go(path) {
    window.location.href = path; // or React Router navigate()
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
      // Hover behavior ONLY on hover-capable devices
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
        // Click/tap works for ALL devices (mobile + desktop)
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
          // keep it open when hovering inside menu (desktop)
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
