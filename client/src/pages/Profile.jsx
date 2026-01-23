import React, { useEffect, useMemo, useState } from "react";

/**
 * ✅ Profile CSS (ONLY while Profile page is mounted)
 * - Injected into <head> on mount
 * - Removed on unmount
 * - Adds a body class to apply full-screen dark background ONLY on this page
 */
const profileCss = `
/* Full-screen background only for Profile page (body class toggled in JS) */
body.profilePageBody {
  background: #0b0f19;
}

/* Root wrapper for scoping variables + styles */
.profileRoot {
  --bg: #0b0f19;
  --card: rgba(255, 255, 255, 0.06);
  --card2: rgba(255, 255, 255, 0.08);
  --profile-text: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.68);
  --border: rgba(255, 255, 255, 0.14);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  --success: rgba(74, 222, 128, 0.18);
  --successText: rgba(74, 222, 128, 0.95);
  --error: rgba(248, 113, 113, 0.18);
  --errorText: rgba(248, 113, 113, 0.95);
}

/* Make the page fill the viewport and keep background consistent */
.profileRoot .profile-content {
  min-height: 100vh;
  padding-bottom: 60px;

  background:
    radial-gradient(1200px 600px at 30% 10%, rgba(99, 102, 241, 0.22), transparent 60%),
    radial-gradient(1000px 600px at 70% 20%, rgba(16, 185, 129, 0.18), transparent 60%),
    var(--bg);
}

.profileRoot .page {
  max-width: 1100px;
  padding: 24px 14px 50px;
  margin: 0 auto;
}

@media (min-width: 680px) {
  .profileRoot .page {
    padding: 28px 16px 50px;
  }
}

.profileRoot .profile-header {
  margin-bottom: 18px;
}

.profileRoot .title {
  margin: 0;
  font-size: 30px;
  letter-spacing: 0.2px;
  color: var(--profile-text);
}

.profileRoot .subtitle {
  margin: 6px 0 0;
  color: var(--muted);
}

.profileRoot .grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 980px) {
  .profileRoot .grid {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
}

.profileRoot .card {
  background: linear-gradient(180deg, var(--card), rgba(255, 255, 255, 0.03));
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 18px;
  backdrop-filter: blur(10px);
}

.profileRoot .cardHeader { margin-bottom: 14px; }

.profileRoot .cardTitle {
  margin: 0;
  font-size: 18px;
  color: var(--profile-text);
}

.profileRoot .cardHint {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.profileRoot .alert {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 12px;
  margin: 12px 0 14px;
  font-size: 14px;
}

.profileRoot .alertSuccess {
  background: var(--success);
  color: var(--successText);
  border-color: rgba(74, 222, 128, 0.35);
}

.profileRoot .alertError {
  background: var(--error);
  color: var(--errorText);
  border-color: rgba(248, 113, 113, 0.35);
}

.profileRoot .form {
  display: grid;
  gap: 12px;
}

.profileRoot .row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 680px) {
  .profileRoot .row {
    grid-template-columns: 1fr 1fr;
  }
}

.profileRoot .field { display: grid; gap: 6px; }

.profileRoot .label {
  font-size: 12px;
  color: var(--muted);
}

.profileRoot .input,
.profileRoot .select {
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.25);
  color: var(--profile-text);
  outline: none;
}

.profileRoot .input:focus,
.profileRoot .select:focus {
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
}

.profileRoot .select { cursor: pointer; }

.profileRoot .actions {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 4px;
  flex-wrap: wrap;
}

/* ✅ Mobile improvement: buttons stack nicely */
@media (max-width: 520px) {
  .profileRoot .actions {
    flex-direction: column;
    align-items: stretch;
  }
  .profileRoot .actions button,
  .profileRoot .actions .btnSecondary,
  .profileRoot .actions .btnPrimary {
    width: 100%;
  }
}

.profileRoot .btnPrimary,
.profileRoot .btnSecondary,
.profileRoot .btnGhost {
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  cursor: pointer;
  color: var(--profile-text);
  font-weight: 600;
  letter-spacing: 0.1px;
}

.profileRoot .btnPrimary {
  background: rgba(99, 102, 241, 0.85);
  border-color: rgba(99, 102, 241, 0.65);
}
.profileRoot .btnPrimary:hover { filter: brightness(1.05); }

.profileRoot .btnSecondary { background: rgba(255, 255, 255, 0.08); }
.profileRoot .btnSecondary:hover { background: rgba(255, 255, 255, 0.12); }

.profileRoot .btnGhost {
  background: transparent;
  color: var(--muted);
}
.profileRoot .btnGhost:hover {
  color: var(--profile-text);
  background: rgba(255, 255, 255, 0.06);
}

.profileRoot .avatarRow {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px 0 6px;
  flex-wrap: wrap;
}

.profileRoot .avatarWrap {
  width: 74px;
  height: 74px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.profileRoot .avatarImg { width: 100%; height: 100%; object-fit: cover; }

.profileRoot .avatarFallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-size: 28px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(16, 185, 129, 0.25));
}

.profileRoot .avatarActions {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.profileRoot .fileInput { display: none; }

.profileRoot .smallText { font-size: 12px; color: var(--muted); }

.profileRoot .toggleRow { display: flex; justify-content: flex-end; }

.profileRoot .checkbox {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--muted);
  font-size: 13px;
}

.profileRoot .checkbox input { transform: translateY(1px); }

.profileRoot .skeletonTitle,
.profileRoot .skeletonRow {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.profileRoot .skeletonTitle {
  height: 22px;
  width: 240px;
  margin-bottom: 14px;
}
.profileRoot .skeletonRow {
  height: 44px;
  width: 100%;
  margin-bottom: 10px;
}

.profileRoot .skeletonTitle::after,
.profileRoot .skeletonRow::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-60%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 1.15s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-60%); }
  100% { transform: translateX(60%); }
}

.profileRoot .lockBox {
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
}

.profileRoot .lockClosed { opacity: 0.75; }
.profileRoot .lockOpen { opacity: 1; border-color: rgba(74, 222, 128, 0.35); }

.profileRoot .lockHeader {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.profileRoot .lockIcon { font-size: 18px; }
.profileRoot .lockTitle { font-weight: 700; color: var(--profile-text); }
.profileRoot .lockHint { font-size: 12px; color: var(--muted); margin-top: 2px; }

.profileRoot .input:disabled { opacity: 0.6; cursor: not-allowed; }
`;

function ProfileStyles() {
  useEffect(() => {
    // Inject CSS
    const style = document.createElement("style");
    style.setAttribute("data-profile-css", "true");
    style.textContent = profileCss;
    document.head.appendChild(style);

    // Add body class for full-screen background (only on Profile)
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
  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }

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
        <header className="profile-header">
          <h1 className="title">Profile</h1>
          <p className="subtitle">
            Update your account info and change your password.
          </p>
        </header>

        <div className="grid">
          {/* Profile Card */}
          <section className="card">
            <div className="cardHeader">
              <h2 className="cardTitle">User Information</h2>
              <p className="cardHint">
                Edit your details and click “Update Profile”.
              </p>
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
                      Remove selection
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
                  Update Profile
                </button>
              </div>
            </form>
          </section>

          {/* Password Card */}
          <section className="card">
            <div className="cardHeader">
              <h2 className="cardTitle">Change Password</h2>
              <p className="cardHint">
                Use a strong password (8+ chars recommended).
              </p>
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
                    {passwordVerified ? "🔓" : "🔒"}
                  </span>
                  <div>
                    <div className="lockTitle">
                      {passwordVerified ? "Verified" : "Locked"}
                    </div>
                    <div className="lockHint">
                      {passwordVerified
                        ? "Set your new password below."
                        : "Verify current password to unlock."}
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
                    {changing ? "Changing..." : "Change Password"}
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
                  Clear
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
