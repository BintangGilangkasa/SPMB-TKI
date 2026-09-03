import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import { readStorage } from "../utils/storage.js";
import AuthLayout from "../components/AuthLayout.jsx";

import {
  FaArrowLeft,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    const registrationProfile = readStorage(localStorage, "spmb_registration_profile", {});
    login({
      email: formData.email.trim(),
      nama: registrationProfile.email === formData.email.trim()
        ? registrationProfile.nama
        : undefined,
    });

    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="login-page">

      {/* Tombol kembali */}
      <button
        className="login-back-button"
        onClick={() => navigate("/")}
        aria-label="Kembali ke halaman utama"
      >
        <FaArrowLeft />
      </button>

      {/* Card Login */}
      <div className="login-card">

        <span className="login-eyebrow">SELAMAT DATANG KEMBALI</span>
        <h1>Masuk ke akun</h1>
        <p className="login-subtitle">
          Pantau proses pendaftaran dan lengkapi data kamu.
        </p>

        {location.state?.message && (
          <p className="login-success" role="status">{location.state.message}</p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email / Username */}
          <div className="login-input-group">

            <FaUser className="login-input-icon" />

            <input
              type="text"
              name="email"
              placeholder="email / username"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              aria-label="Email atau username"
            />

          </div>

          {/* Password */}
          <div className="login-input-group">

            <FaLock className="login-input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              aria-label="Password"
            />

            <button
              type="button"
              className="login-password-button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              aria-label={
                showPassword
                  ? "Sembunyikan password"
                  : "Tampilkan password"
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {/* Forgot Password */}
          <div className="forgot-password">

            <button
              type="button"
              onClick={() => setError("Pemulihan password belum tersedia. Silakan hubungi administrator SPMB.")}
            >
              Lupa password?
            </button>

          </div>

          {/* Error */}
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          {/* Sign In */}
          <button
            type="submit"
            className="login-submit"
          >
            Masuk
          </button>

        </form>

        {/* Register */}
        <p className="register-text">
          Belum punya akun?{" "}
          <Link to="/register">
            Registrasi di sini.
          </Link>
        </p>

      </div>
    </div>
    </AuthLayout>
  );
}

export default Login;
