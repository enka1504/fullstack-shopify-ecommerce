import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apicalls";
import { Link } from "react-router-dom";

function useMediaQuery(query) {
  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

export default function Login() {
  const isMobile = useMediaQuery("(max-width: 720px)");
  const dispatch = useDispatch();

  const [form, setForm] = useState({ username: "", password: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showPw, setShowPw] = useState(false);

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => validateLogin(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const styles = makeStyles(isMobile);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const maxSizeMB = 2;

    if (!allowed.includes(file.type)) return alert("Upload PNG/JPG/WEBP only.");
    if (file.size > maxSizeMB * 1024 * 1024) return alert("Max size is 2MB.");

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const markAllTouched = () => setTouched({ username: true, password: true });

  const onSubmit = async (e) => {
    e.preventDefault();
    markAllTouched();
    if (!isValid) return;

    try {
      setSubmitting(true);
      const user = dispatch(login, form);
      console.log(user, "u-s-e-r");

      await fakeDelay(600);
      setForm({ username: "", password: "" });
      removeAvatar();
      setTouched({});
      window.location.href = "http://localhost:3000";
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />
      <div style={styles.card}>
        <header style={styles.header}>
          <div style={styles.brandDot} />
          <div>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>
              Login with your username/email and password.
            </p>
          </div>
        </header>

        <form onSubmit={onSubmit} style={styles.form} noValidate>
          {/* Avatar optional */}
          <div style={styles.section}>
            <label style={styles.labelRow}>
              <span style={styles.label}>Avatar (optional)</span>
              <span style={styles.hint}>PNG/JPG/WEBP up to 2MB</span>
            </label>

            <div style={styles.avatarRow}>
              <div style={styles.avatarWrap}>
                <div style={styles.avatarRing}>
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      style={styles.avatarImg}
                    />
                  ) : (
                    <div style={styles.avatarFallback}>
                      <span style={styles.avatarLetter}>
                        {form.username?.trim()?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.avatarActions}>
                <label style={styles.fileBtn}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onPickAvatar}
                    style={{ display: "none" }}
                  />
                  Upload avatar
                </label>

                <button
                  type="button"
                  onClick={removeAvatar}
                  disabled={!avatarFile}
                  style={{
                    ...styles.ghostBtn,
                    opacity: avatarFile ? 1 : 0.55,
                    cursor: avatarFile ? "pointer" : "not-allowed",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Username */}
          <Field
            styles={styles}
            label="Username or Email"
            name="username"
            type="text"
            placeholder="tony_dev or tony@example.com"
            value={form.username}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.username ? errors.username : ""}
          />

          {/* Password */}
          <PasswordField
            styles={styles}
            label="Password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            onBlur={onBlur}
            show={showPw}
            setShow={setShowPw}
            error={touched.password ? errors.password : ""}
          />

          <div style={styles.rowBetween}>
            <label style={styles.checkboxRow}>
              <input type="checkbox" />
              <span style={styles.checkboxText}>Remember me</span>
            </label>

            <button type="button" style={styles.textBtn}>
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              ...styles.primaryBtn,
              opacity: submitting ? 0.75 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

          <div style={styles.bottomRow}>
            <span style={styles.muted}>Don’t have an account?</span>
            <Link to="/register">
              <button type="button" style={styles.textBtn}>
                Create one
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Field({ styles, label, error, ...props }) {
  return (
    <div style={styles.field}>
      <label style={styles.label} htmlFor={props.name}>
        {label}
      </label>
      <input
        {...props}
        id={props.name}
        style={{
          ...styles.input,
          borderColor: error ? "rgba(255,90,90,0.7)" : "rgba(255,255,255,0.14)",
        }}
      />
      {error ? <div style={styles.errorText}>{error}</div> : null}
    </div>
  );
}

function PasswordField({
  styles,
  label,
  name,
  value,
  onChange,
  onBlur,
  show,
  setShow,
  error,
  placeholder,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label} htmlFor={name}>
        {label}
      </label>

      <div style={styles.pwWrap}>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          style={{
            ...styles.input,
            paddingRight: 46,
            borderColor: error
              ? "rgba(255,90,90,0.7)"
              : "rgba(255,255,255,0.14)",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={styles.eyeBtn}
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      {error ? <div style={styles.errorText}>{error}</div> : null}
    </div>
  );
}

/* ---------- Validation ---------- */

function validateLogin(form) {
  const errs = {};
  const id = form.username.trim();

  if (!id) errs.username = "Username or email is required.";
  else if (id.includes("@")) {
    if (!/^\S+@\S+\.\S+$/.test(id))
      errs.username = "Enter a valid email address.";
  } else {
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(id))
      errs.username = "Username must be 3–20 chars (letters/numbers/_).";
  }

  if (!form.password) errs.password = "Password is required.";
  else if (form.password.length < 8)
    errs.password = "Password must be at least 8 characters.";

  return errs;
}

function fakeDelay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/* ---------- Responsive Styles ---------- */

function makeStyles(isMobile) {
  return {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: isMobile ? 14 : 20,
      background:
        "radial-gradient(1200px 800px at 20% 10%, rgba(120, 119, 198, 0.25), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(46, 211, 183, 0.18), transparent 55%), linear-gradient(180deg, #0b0e14 0%, #090a10 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily:
        "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
    },
    bgGlow: {
      position: "absolute",
      inset: -200,
      background:
        "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 50%)",
      filter: "blur(20px)",
      pointerEvents: "none",
    },
    card: {
      width: "min(900px, 100%)",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 22,
      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      backdropFilter: "blur(14px)",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: isMobile ? "20px 16px 6px 16px" : "26px 26px 8px 26px",
    },
    brandDot: {
      width: 14,
      height: 14,
      borderRadius: 999,
      marginTop: 8,
      background:
        "linear-gradient(135deg, rgba(46, 211, 183, 1), rgba(120, 119, 198, 1))",
      boxShadow: "0 0 0 6px rgba(46, 211, 183, 0.08)",
    },
    title: {
      margin: 0,
      color: "#f3f5ff",
      fontSize: isMobile ? 22 : 26,
      letterSpacing: 0.2,
    },
    subtitle: {
      margin: "6px 0 0 0",
      color: "#b7bcc7",
      lineHeight: 1.4,
      fontSize: 14,
    },
    form: {
      padding: isMobile ? "14px 16px 18px 16px" : "18px 26px 26px 26px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    },
    section: {
      padding: 14,
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.04)",
    },
    labelRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: 10,
      alignItems: "baseline",
      marginBottom: 10,
      flexWrap: "wrap",
    },
    hint: { color: "#aab0bd", fontSize: 12 },
    avatarRow: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      flexWrap: "wrap",
    },
    avatarWrap: { width: 84, height: 84, flex: "0 0 auto" },
    avatarRing: {
      width: 84,
      height: 84,
      borderRadius: 999,
      padding: 2,
      background:
        "linear-gradient(135deg, rgba(46, 211, 183, 1), rgba(120, 119, 198, 1))",
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      borderRadius: 999,
      objectFit: "cover",
      display: "block",
    },
    avatarFallback: {
      width: "100%",
      height: "100%",
      borderRadius: 999,
      display: "grid",
      placeItems: "center",
      background: "rgba(0,0,0,0.35)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    avatarLetter: { color: "#f3f5ff", fontSize: 26, fontWeight: 700 },
    avatarActions: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      minWidth: isMobile ? "100%" : 260,
    },
    fileBtn: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 42,
      padding: "0 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.16)",
      background: "rgba(255,255,255,0.06)",
      color: "#f3f5ff",
      cursor: "pointer",
      userSelect: "none",
      width: isMobile ? "100%" : "fit-content",
    },
    ghostBtn: {
      height: 42,
      padding: "0 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "transparent",
      color: "#d5d9e6",
      width: isMobile ? "100%" : "fit-content",
    },
    field: { display: "flex", flexDirection: "column", gap: 8 },
    label: { color: "#d8dbe7", fontSize: 13 },
    input: {
      height: 46,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(0,0,0,0.25)",
      color: "#f3f5ff",
      padding: "0 12px",
      outline: "none",
    },
    pwWrap: { position: "relative" },
    eyeBtn: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 18,
      lineHeight: 1,
      padding: 6,
    },
    errorText: {
      color: "rgba(255, 120, 120, 0.95)",
      fontSize: 12,
      marginTop: -2,
    },
    rowBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    checkboxRow: { display: "inline-flex", alignItems: "center", gap: 8 },
    checkboxText: { color: "#b7bcc7", fontSize: 13 },
    primaryBtn: {
      height: 48,
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.16)",
      background:
        "linear-gradient(135deg, rgba(46, 211, 183, 1), rgba(120, 119, 198, 1))",
      color: "#0b0e14",
      fontWeight: 800,
      letterSpacing: 0.2,
      width: "100%",
    },
    bottomRow: {
      marginTop: 6,
      display: "flex",
      justifyContent: "center",
      gap: 10,
      alignItems: "center",
      flexWrap: "wrap",
    },
    muted: { color: "#b7bcc7" },
    textBtn: {
      border: "none",
      background: "transparent",
      color: "#f3f5ff",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 4,
      padding: 0,
    },
  };
}
