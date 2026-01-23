import React, { useEffect, useMemo, useState } from "react";
import "../components/Example.css";

/**
 * ProfilePage
 * - Loads current user (GET /api/users/me)
 * - Updates profile (PUT /api/users/me) via FormData (supports avatar file upload)
 * - Changes password (POST /api/users/me/password)
 *
 * Assumptions:
 * - Backend uses JWT in Authorization header: Bearer <token>
 * - Endpoints:
 *   GET  /api/users/me
 *   PUT  /api/users/me
 *   POST /api/users/me/password
 *
 * If your endpoints differ, change API_BASE / paths.
 */

const API_BASE = "http://localhost:5000"; // e.g. "http://localhost:4000"

function getAuthToken() {
  // Change to your token storage (localStorage/cookie/etc.)
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

  // Profile fields
  const [avatarUrl, setAvatarUrl] = useState(""); // existing avatar URL from backend
  const [avatarFile, setAvatarFile] = useState(null); // new chosen file
  const [avatarPreview, setAvatarPreview] = useState(""); // preview for selected file

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("prefer_not_to_say");

  // Messages
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const avatarShown = useMemo(() => {
    return avatarPreview || avatarUrl || "";
  }, [avatarPreview, avatarUrl]);

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

    // Simple client-side validation
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

    // Basic validation
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

      // Include avatar only if user selected a new file
      if (avatarFile) form.append("avatar", avatarFile);

      // IMPORTANT: Do NOT set Content-Type for FormData; browser sets boundary.
      const updated = await apiFetch("/api/users/me", {
        method: "PUT",
        body: form,
      });

      // Update UI with server response
      setAvatarUrl(updated?.avatarUrl || avatarUrl);
      setAvatarFile(null);

      // keep preview if server returns same; otherwise clear it
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
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      // reset
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
      <div className="page">
        <div className="card">
          <div className="skeletonTitle" />
          <div className="skeletonRow" />
          <div className="skeletonRow" />
          <div className="skeletonRow" />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
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
                  <img
                    className="avatarImg"
                    src={avatarShown}
                    alt="User avatar"
                  />
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
                  placeholder="e.g. tonydev"
                  autoComplete="username"
                />
              </div>

              <div className="field">
                <label className="label">Full Name</label>
                <input
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tony Murphy"
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
                  placeholder="you@example.com"
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

                  // If user edits current password after verifying, lock again (security + correctness)
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

            {/* Locked area */}
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
  );
}
