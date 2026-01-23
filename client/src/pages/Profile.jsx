import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

/**
 * ✅ E-commerce dashboard UI
 * - Single file: Profile.jsx only
 * - CSS injected on mount, removed on unmount
 * - Body background applied only on Profile
 * - Styles scoped under .profileRoot so it won't affect other pages
 */
const profileCss = `
/* Page background only on Profile */
body.profilePageBody {
  background: #0b1220; /* deep navy */
}

/* Root */
.profileRoot{
  --bg: #0b1220;
  --panel: #0f1b2d;
  --card: #101f33;
  --card2: #0f1b2d;
  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.66);
  --border: rgba(255,255,255,0.10);
  --shadow: 0 10px 24px rgba(0,0,0,0.35);

  --primary: #4f46e5;      /* indigo */
  --primary2: #6d28d9;     /* purple */
  --primaryHover: #4338ca;

  --successBg: rgba(34,197,94,0.14);
  --successText: rgba(134,239,172,0.95);
  --errorBg: rgba(239,68,68,0.14);
  --errorText: rgba(252,165,165,0.95);

  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
}

/* Outer background */
.profileRoot{
  min-height: 100vh;
  background:
    radial-gradient(1000px 600px at 20% 0%, rgba(79,70,229,0.25), transparent 60%),
    radial-gradient(900px 600px at 80% 10%, rgba(109,40,217,0.22), transparent 65%),
    radial-gradient(1100px 700px at 60% 95%, rgba(16,185,129,0.12), transparent 60%),
    var(--bg);
}

/* Page container */
.profileRoot .page{
  max-width: 1180px;
  margin: 0 auto;
  padding: 22px 14px 60px;
}

@media (min-width: 720px){
  .profileRoot .page{ padding: 28px 18px 70px; }
}

/* Top bar */
.profileRoot .topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
  background:transparent !important; 
  margin-bottom: 16px;
}

.profileRoot .titleBlock{
  display:flex;
  flex-direction:column;
  gap: 4px;
}

.profileRoot .title{
  margin:0;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.2px;
}

.profileRoot .subtitle{
  margin:0;
  font-size: 13px;
  color: var(--muted);
}

.profileRoot .topActions{
  display:flex;
  gap: 10px;
  align-items:center;
  flex-wrap:wrap;
}

/* Dashboard layout */
.profileRoot .grid{
  display:grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 980px){
  .profileRoot .grid{
    grid-template-columns: 1.25fr 0.75fr;
    align-items:start;
  }
}

/* Card */
.profileRoot .card{
  background: linear-gradient(180deg, rgba(16,31,51,0.95), rgba(15,27,45,0.95));
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 16px;
}

.profileRoot .cardHeader{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.profileRoot .cardTitle{
  margin:0;
  font-size: 15px;
  font-weight: 900;
}

.profileRoot .cardHint{
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.35;
}

.profileRoot .pill{
  display:inline-flex;
  align-items:center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.78);
  font-size: 12px;
  font-weight: 700;
}

/* Alerts */
.profileRoot .alert{
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 10px 12px;
  margin: 10px 0 12px;
  font-size: 13px;
}

.profileRoot .alertSuccess{
  background: var(--successBg);
  color: var(--successText);
  border-color: rgba(34,197,94,0.25);
}

.profileRoot .alertError{
  background: var(--errorBg);
  color: var(--errorText);
  border-color: rgba(239,68,68,0.25);
}

/* Form */
.profileRoot .form{ display:grid; gap: 12px; }

.profileRoot .row{
  display:grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 720px){
  .profileRoot .row{ grid-template-columns: 1fr 1fr; }
}

.profileRoot .field{ display:grid; gap: 6px; }

.profileRoot .label{
  font-size: 12px;
  color: rgba(255,255,255,0.72);
  font-weight: 800;
  letter-spacing: 0.2px;
}

/* Inputs */
.profileRoot .input,
.profileRoot .select{
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(10, 16, 28, 0.55);
  color: rgba(255,255,255,0.92);
  outline: none;
}

.profileRoot .input::placeholder{ color: rgba(255,255,255,0.40); }

.profileRoot .input:focus,
.profileRoot .select:focus{
  border-color: rgba(79,70,229,0.55);
  box-shadow: 0 0 0 4px rgba(79,70,229,0.18);
}

.profileRoot .select{ cursor:pointer; }

/* Buttons */
.profileRoot .actions{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items:center;
  margin-top: 2px;
}

@media (max-width: 520px){
  .profileRoot .actions{
    flex-direction:column;
    align-items:stretch;
  }
  .profileRoot .actions button,
  .profileRoot .actions .btnSecondary,
  .profileRoot .actions .btnPrimary,
  .profileRoot .actions .btnGhost{
    width: 100%;
  }
}

.profileRoot .btnPrimary,
.profileRoot .btnSecondary,
.profileRoot .btnGhost{
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(255,255,255,0.14);
  cursor: pointer;
  font-weight: 900;
  letter-spacing: 0.2px;
}

.profileRoot .btnPrimary{
  color: #fff;
  border: 1px solid rgba(79,70,229,0.45);
  background: linear-gradient(90deg, var(--primary), var(--primary2));
}
.profileRoot .btnPrimary:hover{ filter: brightness(1.05); }

.profileRoot .btnSecondary{
  color: rgba(255,255,255,0.90);
  background: rgba(255,255,255,0.06);
}
.profileRoot .btnSecondary:hover{ background: rgba(255,255,255,0.09); }

.profileRoot .btnGhost{
  background: transparent;
  border-color: transparent;
  color: rgba(255,255,255,0.70);
}
.profileRoot .btnGhost:hover{
  color: rgba(255,255,255,0.92);
  background: rgba(255,255,255,0.06);
}

/* Avatar header row */
.profileRoot .avatarRow{
  display:flex;
  gap: 12px;
  align-items:center;
  flex-wrap: wrap;
  padding: 6px 0 2px;
}

.profileRoot .avatarWrap{
  width: 68px;
  height: 68px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  overflow: hidden;
  display:grid;
  place-items:center;
}

.profileRoot .avatarImg{ width:100%; height:100%; object-fit:cover; }

.profileRoot .avatarFallback{
  width:100%;
  height:100%;
  display:grid;
  place-items:center;
  font-size: 22px;
  font-weight: 900;
  color: rgba(255,255,255,0.92);
  background: linear-gradient(135deg, rgba(79,70,229,0.35), rgba(16,185,129,0.18));
}

.profileRoot .avatarActions{
  display:flex;
  gap: 10px;
  align-items:center;
  flex-wrap: wrap;
}

.profileRoot .fileInput{ display:none; }

.profileRoot .smallText{
  font-size: 12px;
  color: rgba(255,255,255,0.66);
}

/* Password lock */
.profileRoot .toggleRow{
  display:flex;
  justify-content:flex-end;
}

.profileRoot .checkbox{
  display:flex;
  gap: 8px;
  align-items:center;
  color: rgba(255,255,255,0.70);
  font-size: 13px;
}

.profileRoot .lockBox{
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255,255,255,0.04);
}

.profileRoot .lockClosed{ opacity: 0.78; }
.profileRoot .lockOpen{
  opacity: 1;
  border-color: rgba(34,197,94,0.26);
  background: rgba(34,197,94,0.06);
}

.profileRoot .lockHeader{
  display:flex;
  gap: 10px;
  align-items:center;
  margin-bottom: 10px;
}

.profileRoot .lockIcon{ font-size: 18px; }

.profileRoot .lockTitle{
  font-weight: 900;
  color: rgba(255,255,255,0.92);
}

.profileRoot .lockHint{
  margin-top: 2px;
  font-size: 12px;
  color: rgba(255,255,255,0.66);
}

/* Skeleton */
.profileRoot .skeletonTitle,
.profileRoot .skeletonRow{
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  position: relative;
  overflow: hidden;
}

.profileRoot .skeletonTitle{
  height: 22px;
  width: 220px;
  margin-bottom: 14px;
}
.profileRoot .skeletonRow{
  height: 44px;
  width: 100%;
  margin-bottom: 10px;
}

.profileRoot .skeletonTitle::after,
.profileRoot .skeletonRow::after{
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-60%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
  animation: shimmer 1.15s infinite;
}

@keyframes shimmer{
  0%{ transform: translateX(-60%); }
  100%{ transform: translateX(60%); }
}

.profileRoot .input:disabled{
  opacity: 0.6;
  cursor: not-allowed;
}
`;

/** Inject + remove styles for this page only */
function ProfileStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-profile-css", "true");
    style.textContent = profileCss;
    document.head.appendChild(style);

    document.body.classList.add("profilePageBody");

    return () => {
      style.remove();
      document.body.classList.remove("profilePageBody");
    };
  }, []);

  return null;
}

/**
 * API Config
 */
const API_BASE = "http://localhost:5000";

function getAuthToken() {
  return localStorage.getItem("token");
}

async function apiFetch(path, options = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json"))
    data = await res.json().catch(() => null);
  else data = await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export default function ProfilePage() {
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [changing, setChanging] = useState(false);
  const [loading, setLoading] = useState(true);

  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("prefer_not_to_say");

  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const avatarShown = useMemo(
    () => avatarPreview || avatarUrl || "",
    [avatarPreview, avatarUrl],
  );

  async function handleVerifyPassword(e) {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (!currentPassword) {
      return setPasswordMsg({
        type: "error",
        text: "Current password is required.",
      });
    }

    try {
      setVerifying(true);

      await apiFetch("/api/users/me/password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword }),
      });

      setPasswordVerified(true);
      setPasswordMsg({
        type: "success",
        text: "Password verified. You can now set a new password.",
      });
    } catch (err) {
      setPasswordVerified(false);
      setPasswordMsg({
        type: "error",
        text: err.message || "Current password is incorrect.",
      });
    } finally {
      setVerifying(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setProfileMsg({ type: "", text: "" });

        const me = await apiFetch("/api/users/me", { method: "GET" });
        if (!mounted) return;

        setAvatarUrl(me?.avatarUrl || "");
        setUsername(me?.username || "");
        setFullName(me?.fullName || "");
        setEmail(me?.email || "");
        setGender(me?.gender || "prefer_not_to_say");
      } catch (err) {
        if (!mounted) return;
        setProfileMsg({
          type: "error",
          text: err.message || "Failed to load profile.",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPickAvatar(e) {
    const file = e.target.files?.[0] || null;
    setProfileMsg({ type: "", text: "" });

    if (!file) {
      setAvatarFile(null);
      setAvatarPreview("");
      return;
    }

    const maxSizeMB = 3;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setProfileMsg({
        type: "error",
        text: `Avatar must be <= ${maxSizeMB}MB.`,
      });
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setProfileMsg({ type: "error", text: "Please select an image file." });
      e.target.value = "";
      return;
    }

    setAvatarFile(file);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });

    if (!username.trim())
      return setProfileMsg({ type: "error", text: "Username is required." });
    if (!fullName.trim())
      return setProfileMsg({ type: "error", text: "Full name is required." });
    if (!email.trim())
      return setProfileMsg({ type: "error", text: "Email is required." });

    try {
      const form = new FormData();
      form.append("username", username.trim());
      form.append("fullName", fullName.trim());
      form.append("email", email.trim());
      form.append("gender", gender);
      if (avatarFile) form.append("avatar", avatarFile);

      const updated = await apiFetch("/api/users/me", {
        method: "PUT",
        body: form,
      });

      setAvatarUrl(updated?.avatarUrl || avatarUrl);
      setAvatarFile(null);

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview("");
      }

      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err.message || "Failed to update profile.",
      });
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (!passwordVerified) {
      return setPasswordMsg({
        type: "error",
        text: "Please verify your current password first.",
      });
    }

    if (!newPassword)
      return setPasswordMsg({
        type: "error",
        text: "New password is required.",
      });
    if (newPassword.length < 8)
      return setPasswordMsg({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
    if (newPassword !== confirmNewPassword)
      return setPasswordMsg({
        type: "error",
        text: "New password and confirmation do not match.",
      });

    try {
      setChanging(true);

      await apiFetch("/api/users/me/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordVerified(false);

      setPasswordMsg({
        type: "success",
        text: "Password changed successfully.",
      });
    } catch (err) {
      setPasswordMsg({
        type: "error",
        text: err.message || "Failed to change password.",
      });
    } finally {
      setChanging(false);
    }
  }

  if (loading) {
    return (
      <div className="profileRoot">
        <ProfileStyles />
        <div className="page profile-content">
          <div className="card">
            <div className="skeletonTitle" />
            <div className="skeletonRow" />
            <div className="skeletonRow" />
            <div className="skeletonRow" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profileRoot">
      <ProfileStyles />

      <div className="page profile-content">
        <div className="topbar">
          <div className="titleBlock">
            <h1 className="title">Account Settings</h1>
            <p className="subtitle">
              Manage profile info, avatar, and password.
            </p>
          </div>

          <div className="topActions">
            <Link to="/">
              <span className="pill">🛒 Dashboard</span>
            </Link>
            <span className="pill">⚡ Secure</span>
          </div>
        </div>

        <div className="grid">
          {/* Profile Card */}
          <section className="card">
            <div className="cardHeader">
              <div>
                <h2 className="cardTitle">Customer Profile</h2>
                <p className="cardHint">
                  Keep your account details up-to-date for order updates and
                  support.
                </p>
              </div>
              <span className="pill">👤 Profile</span>
            </div>

            {profileMsg.text ? (
              <div
                className={`alert ${profileMsg.type === "success" ? "alertSuccess" : "alertError"}`}
              >
                {profileMsg.text}
              </div>
            ) : null}

            <form onSubmit={handleUpdateProfile} className="form">
              <div className="avatarRow">
                <div className="avatarWrap" aria-label="Avatar preview">
                  {avatarShown ? (
                    <img className="avatarImg" src={avatarShown} alt="Avatar" />
                  ) : (
                    <div className="avatarFallback">
                      {(fullName || username || "U").slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="avatarActions">
                  <label className="btnSecondary">
                    Upload Avatar
                    <input
                      className="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={onPickAvatar}
                    />
                  </label>

                  {avatarPreview ? (
                    <button
                      type="button"
                      className="btnGhost"
                      onClick={() => {
                        if (avatarPreview) URL.revokeObjectURL(avatarPreview);
                        setAvatarPreview("");
                        setAvatarFile(null);
                        setProfileMsg({ type: "", text: "" });
                      }}
                    >
                      Remove
                    </button>
                  ) : (
                    <span className="smallText">
                      PNG/JPG recommended (max 3MB)
                    </span>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label className="label">Username</label>
                  <input
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                <div className="field">
                  <label className="label">Full Name</label>
                  <input
                    className="input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label className="label">Email</label>
                  <input
                    className="input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <label className="label">Gender</label>
                  <select
                    className="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="prefer_not_to_say">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="actions">
                <button className="btnPrimary" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Password Card */}
          <section className="card">
            <div className="cardHeader">
              <div>
                <h2 className="cardTitle">Security</h2>
                <p className="cardHint">
                  Verify your current password before setting a new one.
                </p>
              </div>
              <span className="pill">🔐 Security</span>
            </div>

            {passwordMsg.text ? (
              <div
                className={`alert ${passwordMsg.type === "success" ? "alertSuccess" : "alertError"}`}
              >
                {passwordMsg.text}
              </div>
            ) : null}

            <form
              className="form"
              onSubmit={
                passwordVerified ? handleChangePassword : handleVerifyPassword
              }
            >
              <div className="toggleRow">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                  />
                  <span>Show passwords</span>
                </label>
              </div>

              <div className="field">
                <label className="label">Current Password</label>
                <input
                  className="input"
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (passwordVerified) {
                      setPasswordVerified(false);
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setPasswordMsg({ type: "", text: "" });
                    }
                  }}
                  autoComplete="current-password"
                />
              </div>

              <div
                className={`lockBox ${passwordVerified ? "lockOpen" : "lockClosed"}`}
              >
                <div className="lockHeader">
                  <span className="lockIcon" aria-hidden="true">
                    {passwordVerified ? "✅" : "🔒"}
                  </span>
                  <div>
                    <div className="lockTitle">
                      {passwordVerified ? "Verified" : "Locked"}
                    </div>
                    <div className="lockHint">
                      {passwordVerified
                        ? "Now you can set a new password."
                        : "Verify to unlock the new password fields."}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label className="label">New Password</label>
                    <input
                      className="input"
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      disabled={!passwordVerified}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Confirm New Password</label>
                    <input
                      className="input"
                      type={showPasswords ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      autoComplete="new-password"
                      disabled={!passwordVerified}
                    />
                  </div>
                </div>
              </div>

              <div className="actions">
                {!passwordVerified ? (
                  <button
                    className="btnPrimary"
                    type="submit"
                    disabled={verifying}
                  >
                    {verifying ? "Verifying..." : "Verify"}
                  </button>
                ) : (
                  <button
                    className="btnPrimary"
                    type="submit"
                    disabled={changing}
                  >
                    {changing ? "Updating..." : "Update Password"}
                  </button>
                )}

                <button
                  type="button"
                  className="btnSecondary"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setPasswordVerified(false);
                    setPasswordMsg({ type: "", text: "" });
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
