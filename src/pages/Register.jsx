import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import { writeStorage } from "../utils/storage.js";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaWhatsapp,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] =
    useState(false);

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

    if (
      !formData.nama ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.password ||
      !formData.konfirmasiPassword
    ) {
      setError("Semua data wajib diisi.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(formData.whatsapp.replace(/[\s-]/g, ""))) {
      setError("Nomor WhatsApp harus terdiri dari 10–15 angka.");
      return;
    }

    if (formData.password !== formData.konfirmasiPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    writeStorage(localStorage, "spmb_registration_profile", {
      nama: formData.nama.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim(),
    });

    navigate("/login", {
      replace: true,
      state: {
        email: formData.email.trim(),
        message: "Registrasi berhasil. Silakan masuk menggunakan akun kamu.",
      },
    });
  };

  return (
    <AuthLayout>
      <div className="register-page">
      {/* Tombol kembali */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
        aria-label="Kembali ke halaman utama"
      >
        <FaArrowLeft />
      </button>

      {/* Card Register */}
      <div className="register-card">
        <span className="register-eyebrow">BUAT AKUN PENDAFTAR</span>
        <h1>Mulai pendaftaran</h1>
        <p className="register-subtitle">
          Buat akun untuk memulai proses penerimaan mahasiswa baru.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Nama Lengkap */}
          <div className="register-input-group">
            <FaUser className="register-input-icon" />

            <input
              type="text"
              name="nama"
              placeholder="Nama Lengkap"
              value={formData.nama}
              onChange={handleChange}
              autoComplete="name"
              aria-label="Nama lengkap"
            />
          </div>

          {/* Email */}
          <div className="register-input-group">
            <FaEnvelope className="register-input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-label="Email"
            />
          </div>

          {/* Whatsapp */}
          <div className="register-input-group">
            <FaWhatsapp className="register-input-icon" />

            <input
              type="tel"
              name="whatsapp"
              placeholder="Nomor WhatsApp"
              value={formData.whatsapp}
              onChange={handleChange}
              autoComplete="tel"
              aria-label="Nomor WhatsApp"
            />
          </div>

          {/* Password */}
          <div className="register-input-group">
            <FaLock className="register-input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              aria-label="Password"
            />

            <button
              type="button"
              className="password-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "Sembunyikan password"
                  : "Tampilkan password"
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Konfirmasi Password */}
          <div className="register-input-group">
            <FaLock className="register-input-icon" />

            <input
              type={
                showKonfirmasiPassword ? "text" : "password"
              }
              name="konfirmasiPassword"
              placeholder="Konfirmasi Password"
              value={formData.konfirmasiPassword}
              onChange={handleChange}
              autoComplete="new-password"
              aria-label="Konfirmasi password"
            />

            <button
              type="button"
              className="password-button"
              onClick={() =>
                setShowKonfirmasiPassword(
                  !showKonfirmasiPassword
                )
              }
              aria-label={
                showKonfirmasiPassword
                  ? "Sembunyikan konfirmasi password"
                  : "Tampilkan konfirmasi password"
              }
            >
              {showKonfirmasiPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {error && (
            <p className="register-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="register-submit"
          >
            Buat Akun
          </button>
        </form>

        <p className="login-text">
          Sudah punya akun?{" "}
          <Link to="/login">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
    </AuthLayout>
  );
}

export default Register;
