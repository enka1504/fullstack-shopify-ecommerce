import app from "../firebase";
import { useDispatch } from "react-redux";
import { register } from "../redux/apicalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function useMediaQuery(query) {
  const get = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(get);

  React.useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

export default function Register() {
  const isMobile = useMediaQuery("(max-width: 720px)");

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const dispatch = useDispatch();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(
    () => validateRegister(form, avatarFile),
    [form, avatarFile],
  );
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

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setForm({ ...form, img: downloadURL });
        });
      },
    );
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const markAllTouched = () =>
    setTouched({
      fullName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      avatar: true,
      gender: true,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    markAllTouched();
    if (!isValid) return;

    try {
      setSubmitting(true);
      register(dispatch, form);
      // if (!res.ok) throw new Error(data?.message || "Register failed");
      // console.log(data, "---------------");
      await fakeDelay(700);
      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gener: "",
      });
      removeAvatar();
      setTouched({});
      window.location.href = "http://localhost:3000/login";
    } catch (err) {
      alert(err.message || "Register failed");
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
            <h1 style={styles.title}>Create your account</h1>
            <p style={styles.subtitle}>Sign up to start using the app.</p>
          </div>
        </header>

        <form onSubmit={onSubmit} style={styles.form} noValidate>
          {/* Avatar */}
          <div style={styles.section}>
            <label style={styles.labelRow}>
              <span style={styles.label}>Avatar</span>
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
                        {form.fullName?.trim()?.[0]?.toUpperCase() || "A"}
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

                {touched.avatar && errors.avatar ? (
                  <div style={styles.errorText}>{errors.avatar}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Grid (becomes 1 column on mobile) */}
          <div style={styles.grid2}>
            <Field
              styles={styles}
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Tony Stark"
              value={form.fullName}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.fullName ? errors.fullName : ""}
            />
            <Field
              styles={styles}
              label="Username"
              name="username"
              type="text"
              placeholder="tony_dev"
              value={form.username}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.username ? errors.username : ""}
            />
          </div>

          <Field
            styles={styles}
            label="Email"
            name="email"
            type="email"
            placeholder="tony@example.com"
            value={form.email}
            onChange={onChange}
            onBlur={onBlur}
            error={touched.email ? errors.email : ""}
          />
          <div style={styles.field}>
            <label style={styles.label}>Gender</label>

            <div style={styles.radioGroup}>
              <label style={styles.radioItem}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <span>Male</span>
              </label>

              <label style={styles.radioItem}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <span>Female</span>
              </label>

              <label style={styles.radioItem}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={form.gender === "other"}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <span>Other</span>
              </label>
            </div>

            {touched.gender && errors.gender ? (
              <div style={styles.errorText}>{errors.gender}</div>
            ) : null}
          </div>

          <div style={styles.grid2}>
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
            <PasswordField
              styles={styles}
              label="Confirm password"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={onChange}
              onBlur={onBlur}
              show={showConfirm}
              setShow={setShowConfirm}
              error={touched.confirmPassword ? errors.confirmPassword : ""}
            />
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
            {submitting ? "Creating..." : "Create account"}
          </button>

          <div style={styles.bottomRow}>
            <span style={styles.muted}>Already have an account?</span>
            <Link to="/login">
              <button type="button" style={styles.textBtn}>
                Login
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

function validateRegister(form, avatarFile) {
  const errs = {};
  if (!avatarFile) errs.avatar = "Please upload an avatar.";

  if (!form.fullName.trim()) errs.fullName = "Full name is required.";
  else if (form.fullName.trim().length < 3)
    errs.fullName = "At least 3 characters.";

  if (!form.username.trim()) errs.username = "Username is required.";
  else if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.username.trim()))
    errs.username = "3–20 chars: letters, numbers, underscore.";

  if (!form.email.trim()) errs.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
    errs.email = "Enter a valid email.";

  if (!form.password) errs.password = "Password is required.";
  else if (form.password.length < 8) errs.password = "At least 8 characters.";
  else if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password))
    errs.password = "Include 1 uppercase letter and 1 number.";

  if (!form.confirmPassword) errs.confirmPassword = "Confirm your password.";
  else if (form.confirmPassword !== form.password)
    errs.confirmPassword = "Passwords do not match.";
  if (!form.gender) errs.gender = "Please select your gender.";

  return errs;
}

function fakeDelay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/* ---------- Shared Responsive Styles ---------- */

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
      width: "min(920px, 100%)",
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
    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 14,
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
    radioGroup: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(0,0,0,0.20)",
    },
    radioItem: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      color: "#f3f5ff",
      fontSize: 13,
    },
  };
}
